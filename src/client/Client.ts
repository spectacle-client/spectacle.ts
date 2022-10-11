import {EventEmitter} from "events";
import Redis, {Cluster} from "ioredis";
import {GatewayConnection, GatewayConnectOptions} from "./gateway/GatewayConnection.js";

export enum ClientEvents {
    Ready = "ready",
    MessageCreate = "messageCreate",
}

interface ClientEventHandlers {

}

export type ClientOptions = {
    cache: {
        urls: string[];
        password?: string;
    }
}

export declare interface Client {
    on<U extends keyof ClientEventHandlers>(event: U, listener: ClientEventHandlers[U]): this;
}

export class Client extends EventEmitter {
    public gateway = new GatewayConnection(this);
    public token: string | null = null;
    public cache: Cluster | Redis;

    constructor(options: ClientOptions) {
        super();

        if (!options.cache.urls.length)
            throw new Error("No redis cache urls provided");
        if (options.cache.urls.length > 1)
            this.cache = new Cluster(options.cache.urls);
        else
            this.cache = new Redis(options.cache.urls[0]);
    }


    public async login(token: string, options: GatewayConnectOptions, subscribe = true) {
        await this.gateway.connect(options);
        this.token = token;

        if (subscribe)
            this.gateway.subscribe();
    }

    public destroy() {
        this.cache.disconnect();
        this.gateway.unsubscribe();
    }
}
