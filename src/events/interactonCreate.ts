const cd = new Set()
const cdTime = 5000
import { CommandInteraction } from 'discord.js'
import getLocale from '../functions/getLocale'

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction: CommandInteraction) {
    if (interaction.isCommand()) {
      if (cd.has(interaction.user.id)) {
        await interaction.reply({ content: await getLocale(interaction.locale, 'cooldown'), ephemeral: true })
      } else {
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return
        try {
          await command.execute(interaction)

          cd.add(interaction.user.id)
          setTimeout(() => {
            cd.delete(interaction.user.id)
          }, cdTime)
        } catch (err) {
          if (err) console.error(err)
        }
      }
    }
  },
}
