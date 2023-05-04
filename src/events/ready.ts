import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { ActivityType } from 'discord.js'
require('dotenv').config()

module.exports = {
    name: 'ready',
    once: true,
    execute (client: any, commands: any[]) {
        console.log(`${client.user.tag} is online.`)

        const info: any = {}
        info.Guilds = client.guilds.cache.size
        info.Users = client.users.cache.size
        info.Channels = client.channels.cache.size
        console.table(info)

        client.user.setActivity('what does society playing', { type: ActivityType.Watching });

        const CLIENT_ID = client.user.id 
        const rest = new REST({
            version: '10'
        }).setToken(process.env.TOKEN!);
        (async () => {
            if(1 > 2){
                try{
                    rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID!), { body: [] })
                    .then(() => console.log('All commands were deleted [GLOBAL]'))
                }catch (err) {
                    if(err) console.error(err)
                }
            }else{
                try {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    });
                    console.log("All commands were loaded [GLOBAL]")
                } catch (err) {
                    if(err) console.error(err)
                }
            }
        })(); 

    }
}