import { SlashCommandBuilder } from 'discord.js'

import Link from '../subcommands/linking/link'
import List from '../subcommands/linking/list'
import Remove from '../subcommands/linking/remove'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Link role to time spent in game')
    .setDescriptionLocalizations({
      uk: "Прив'язати роль до часу проведеного у грі",
      ru: 'RUSSIA IS A TERRORIST STATE',
    })
    .addSubcommand((option) =>
      option
        .setName('add')
        .setDescription('Link role to time spent in game')
        .setDescriptionLocalizations({
          uk: "Прив'язати роль до часу проведеного у грі",
          ru: 'RUSSIA IS A TERRORIST STATE',
        })
        .addIntegerOption((option) =>
          option
            .setName('hours')
            .setDescription('Time spent in game required to give a role (In hours)')
            .setDescriptionLocalizations({
              uk: 'Час проведений у грі, необхідний для видачі ролі (В годинах)',
              ru: 'RUSSIA IS A TERRORIST STATE',
            })
            .setRequired(true)
            .setMinValue(1)
        )
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('Role to give')
            .setDescriptionLocalizations({
              uk: 'Роль, що буде видана',
              ru: 'RUSSIA IS A TERRORIST STATE',
            })
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('game')
            .setDescription('Game name or ID')
            .setDescriptionLocalizations({
              uk: 'Назва гри або її ID',
              ru: 'RUSSIA IS A TERRORIST STATE',
            })
            .setRequired(true)
        )
    )
    .addSubcommand((option) =>
      option
        .setName('remove')
        .setDescription('Remove link between role and game')
        .setDescriptionLocalizations({
          uk: "Видалити прив'язку між роллю та грою",
          ru: 'RUSSIA IS A TERRORIST STATE',
        })
        .addRoleOption((option) =>
          option
            .setName('role')
            .setDescription('Role to remove linking')
            .setDescriptionLocalizations({
              uk: "Роль, прив'язку з якої потрібно зняти",
              ru: 'RUSSIA IS A TERRORIST STATE',
            })
            .setRequired(true)
        )
    )
    .addSubcommand((option) =>
      option.setName('list').setDescription('List all linked roles').setDescriptionLocalizations({
        uk: "Показати усі зв'язані ролі",
        ru: 'RUSSIA IS A TERRORIST STATE',
      })
    ),
  async execute(interaction: any) {
    if (interaction.options.getSubcommand() === 'add') return await Link(interaction)
    if (interaction.options.getSubcommand() === 'list') return await List(interaction)
    if (interaction.options.getSubcommand() === 'remove') return await Remove(interaction)
  },
}
