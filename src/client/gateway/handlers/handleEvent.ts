import {GatewayDispatchEvents} from "discord-api-types/v10";
import {Client} from "../../Client.js";
import {handlers} from "./handlers.js";

export async function handleEvent(client: Client, event: GatewayDispatchEvents, data: any, { ack }: { ack: () => Promise<void> }) {
    console.log(`Received event from gateway: ${event}`);
    handlers[event](client, data);
    await ack();
}
