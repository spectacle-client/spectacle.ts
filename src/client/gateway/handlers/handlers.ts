import {GatewayDispatchEvents} from "discord-api-types/v10";
import {Client} from "../../Client.js";

export const handlers: {[K in GatewayDispatchEvents]: (client: Client, data: any) => void} = {
    APPLICATION_COMMAND_PERMISSIONS_UPDATE(_client: Client, _data: any): void {},
    CHANNEL_CREATE(_client: Client, _data: any): void {},
    CHANNEL_DELETE(_client: Client, _data: any): void {},
    CHANNEL_PINS_UPDATE(_client: Client, _data: any): void {},
    CHANNEL_UPDATE(_client: Client, _data: any): void {},
    GUILD_BAN_ADD(_client: Client, _data: any): void {},
    GUILD_BAN_REMOVE(_client: Client, _data: any): void {},
    GUILD_CREATE(_client: Client, _data: any): void {},
    GUILD_DELETE(_client: Client, _data: any): void {},
    GUILD_EMOJIS_UPDATE(_client: Client, _data: any): void {},
    GUILD_INTEGRATIONS_UPDATE(_client: Client, _data: any): void {},
    GUILD_MEMBERS_CHUNK(_client: Client, _data: any): void {},
    GUILD_MEMBER_ADD(_client: Client, _data: any): void {},
    GUILD_MEMBER_REMOVE(_client: Client, _data: any): void {},
    GUILD_MEMBER_UPDATE(_client: Client, _data: any): void {},
    GUILD_ROLE_CREATE(_client: Client, _data: any): void {},
    GUILD_ROLE_DELETE(_client: Client, _data: any): void {},
    GUILD_ROLE_UPDATE(_client: Client, _data: any): void {},
    GUILD_SCHEDULED_EVENT_CREATE(_client: Client, _data: any): void {},
    GUILD_SCHEDULED_EVENT_DELETE(_client: Client, _data: any): void {},
    GUILD_SCHEDULED_EVENT_UPDATE(_client: Client, _data: any): void {},
    GUILD_SCHEDULED_EVENT_USER_ADD(_client: Client, _data: any): void {},
    GUILD_SCHEDULED_EVENT_USER_REMOVE(_client: Client, _data: any): void {},
    GUILD_STICKERS_UPDATE(_client: Client, _data: any): void {},
    GUILD_UPDATE(_client: Client, _data: any): void {},
    INTEGRATION_CREATE(_client: Client, _data: any): void {},
    INTEGRATION_DELETE(_client: Client, _data: any): void {},
    INTEGRATION_UPDATE(_client: Client, _data: any): void {},
    INTERACTION_CREATE(_client: Client, _data: any): void {},
    INVITE_CREATE(_client: Client, _data: any): void {},
    INVITE_DELETE(_client: Client, _data: any): void {},
    MESSAGE_DELETE(_client: Client, _data: any): void {},
    MESSAGE_DELETE_BULK(_client: Client, _data: any): void {},
    MESSAGE_REACTION_ADD(_client: Client, _data: any): void {},
    MESSAGE_REACTION_REMOVE(_client: Client, _data: any): void {},
    MESSAGE_REACTION_REMOVE_ALL(_client: Client, _data: any): void {},
    MESSAGE_REACTION_REMOVE_EMOJI(_client: Client, _data: any): void {},
    MESSAGE_UPDATE(_client: Client, _data: any): void {},
    PRESENCE_UPDATE(_client: Client, _data: any): void {},
    RESUMED(_client: Client, _data: any): void {},
    STAGE_INSTANCE_CREATE(_client: Client, _data: any): void {},
    STAGE_INSTANCE_DELETE(_client: Client, _data: any): void {},
    STAGE_INSTANCE_UPDATE(_client: Client, _data: any): void {},
    THREAD_CREATE(_client: Client, _data: any): void {},
    THREAD_DELETE(_client: Client, _data: any): void {},
    THREAD_LIST_SYNC(_client: Client, _data: any): void {},
    THREAD_MEMBERS_UPDATE(_client: Client, _data: any): void {},
    THREAD_MEMBER_UPDATE(_client: Client, _data: any): void {},
    THREAD_UPDATE(_client: Client, _data: any): void {},
    TYPING_START(_client: Client, _data: any): void {},
    USER_UPDATE(_client: Client, _data: any): void {},
    VOICE_SERVER_UPDATE(_client: Client, _data: any): void {},
    VOICE_STATE_UPDATE(_client: Client, _data: any): void {},
    WEBHOOKS_UPDATE(_client: Client, _data: any): void {},
    READY(_client: Client, _data: any): void {},
    MESSAGE_CREATE(_client: Client, _data: any): void {},
}