import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { ActivityType, Client } from 'discord.js'
require('dotenv').config()

module.exports = {
  name: 'ready',
  once: true,
  execute(client: Client, commands: any[]) {
    console.log(`${client!.user!.tag} is online.`)

    const info: any = {}
    info.Guilds = client.guilds.cache.size
    info.Users = client.users.cache.size
    info.Channels = client.channels.cache.size
    console.table(info)

    const activities = ['what does society playing', 'help Ukraine gain freedom!']

    setInterval(() => {
      client!.user!.setActivity(activities[Math.floor(Math.random() * activities.length)], { type: ActivityType.Watching })
    }, 60000 * 5)

    const CLIENT_ID = client!.user!.id
    const rest = new REST({
      version: '10',
    }).setToken(process.env.TOKEN!)
    ;(async () => {
      if (1 > 2) {
        try {
          rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID!), { body: [] }).then(() => console.log('All commands were deleted [GLOBAL]'))
        } catch (err) {
          if (err) console.error(err)
        }
      } else {
        try {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          })
          console.log('All commands were loaded [GLOBAL]')
        } catch (err) {
          if (err) console.error(err)
        }
      }
    })()
  },
}
