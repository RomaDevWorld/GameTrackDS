import { Collection } from 'discord.js'
import * as fs from 'fs'
import dotenv from 'dotenv'
import syncdb from './syncdb'

dotenv.config()

import client from './utils/client'

const commandFiles = fs.readdirSync(__dirname + '/commands/')
const commands: any[] = []
client.commands = new Collection()
for (let file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
  client.commands.set(command.data.name, command)
}

const eventFiles = fs.readdirSync(__dirname + '/events/')
for (const file of eventFiles) {
  const event = require(`./events/${file}`)

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commands))
  } else {
    client.on(event.name, (...args) => event.execute(...args, commands))
  }
}

client.login(process.env.TOKEN)

syncdb()
