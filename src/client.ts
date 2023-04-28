import { Client, GatewayIntentBits, Collection } from "discord.js"

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
] })

export default client;

declare module "discord.js" {
    export interface Client {
      commands: Collection<unknown, any>
    }
}