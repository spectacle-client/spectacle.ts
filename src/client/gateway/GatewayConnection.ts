import {Amqp as AmqpBroker, AmqpOptions, Broker, Redis as RedisBroker} from '@spectacles/brokers';
import {ClientOptions} from "@spectacles/brokers/typings/src/Redis.js";
import {GatewayDispatchEvents, GatewayReadyDispatchData} from 'discord-api-types/v10';
import Redis, {RedisOptions} from "ioredis";
import {Client} from "../Client.js";
import {handleEvent} from "./handlers/handleEvent.js";

export enum GatewayConnectionTypes {
    Amqp = 'amqp',
    Redis = 'redis',
}

export type GatewayConnectionBaseOptions = {
    url: string;
    group: string;
}

export type GatewayConnectionOptionsRedis = GatewayConnectionBaseOptions & {
    type: GatewayConnectionTypes.Redis;
    clientOptions?: ClientOptions;
    redisOptions?: RedisOptions;
}

export type GatewayConnectionOptionsAmqp = GatewayConnectionBaseOptions & {
    type: GatewayConnectionTypes.Amqp;
    subgroup?: string;
    amqpOptions?: AmqpOptions;
    connectionOptions?: any;
}

export type GatewayConnectOptions = GatewayConnectionOptionsRedis | GatewayConnectionOptionsAmqp;

export declare interface GatewayConnection {
    on(event: GatewayDispatchEvents.Ready, listener: (payload: GatewayReadyDispatchData) => void): this;
}

export class GatewayConnection {
    public broker: Broker | null = null;

    constructor(public client: Client) {

    }

    /**
     * Sets the broker to use for the connection (AMQP or Redis).
     * @param options The options to use for the broker.
     */
    public async connect(options: GatewayConnectOptions) {
        switch (options.type) {
            case GatewayConnectionTypes.Amqp:
                this.broker = options.subgroup
                    ? new AmqpBroker(options.group, options.subgroup, options.amqpOptions)
                    : new AmqpBroker(options.group, options.amqpOptions);

                await (this.broker as AmqpBroker).connect(options.url, options.connectionOptions);
                break;
            case GatewayConnectionTypes.Redis:
                const redis = options.redisOptions
                    ? new Redis(options.url, {...options.redisOptions, lazyConnect: true})
                    : new Redis(options.url, {lazyConnect: true});

                await redis.connect()
                this.broker = new RedisBroker(options.group, redis, options.clientOptions);

                break;
            default:
                throw new Error("Invalid connection type");
        }

        console.log(`Connected to gateway using the ${options.type} broker`);
    }

    /**
     * Subscribes to events emitted by the broker.
     * @param events The events to subscribe to, defaults to all gateway events.
     * @param registerHandlers Whether to register the default handlers for the events.
     */
    public subscribe(events?: GatewayDispatchEvents[], registerHandlers = true) {
        if (!this.broker)
            throw new Error("Broker was not set, cannot subscribe to events");

        if (!events)
            events = Object.values(GatewayDispatchEvents);

        if (registerHandlers)
            for (const event of events)
                this.broker.on(event, handleEvent.bind(null, this.client, event));

        this.broker.subscribe(events);

        console.log(`Subscribed to ${events.length} gateway events`);
    }

    /**
     * Unsubscribes from events emitted by the broker.
     * @param events The events to unsubscribe from, defaults to all gateway events.
     * @param unregisterHandlers Whether to unregister the default handlers for the events.
     */
    public unsubscribe(events?: GatewayDispatchEvents[], unregisterHandlers = true) {
        if (!this.broker)
            throw new Error("Broker was not set, cannot unsubscribe from events");

        if (!events)
            events = Object.values(GatewayDispatchEvents);

        if (unregisterHandlers)
            for (const event of events)
                this.broker.off(event, handleEvent.bind(null, this.client, event));

        this.broker.unsubscribe(events);

        console.log(`Unsubscribed from ${events.length} gateway events`);
    }
}

