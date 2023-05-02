import { Client, GatewayIntentBits, Collection } from "discord.js"

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
] })

client.activities = {}

export default client;

declare module "discord.js" {
    export interface Client {
      commands: Collection<unknown, any>
      activities: any
    }
}