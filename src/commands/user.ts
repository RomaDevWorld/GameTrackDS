import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from 'discord.js'
import Game from '../models/game'
import Activity from '../models/activity'
import formatTime from '../functions/formatTime'
import getLocale from '../functions/getLocale'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Get a stat for specific user')
    .setDescriptionLocalizations({
      uk: 'Отримати статистику для вказаного учасника',
      'en-GB': "If you're lookin' to get the inside particular user's stats, then we've got the lowdown for ya!",
      ru: 'RUSSIA IS A TERRORIST STATE',
    })
    .addUserOption((option) =>
      option.setName('user').setDescription('User to get stats').setDescriptionLocalizations({
        'en-GB': "Put a usea' innere mate",
        uk: 'Учасник, статистику якого потрібно отримати',
        ru: 'RUSSIA IS A TERRORIST STATE',
      })
    ),
  async execute(interaction: CommandInteraction) {
    let user = interaction.options.getUser('user')
    if (!user) user = interaction.user

    let games: any = await Activity.findAll({
      where: { userId: user.id },
      include: { model: Game, attributes: ['name'] },
    })

    games = Object.values(games).sort((a: any, b: any) => b.time - a.time)

    if (!games[0] && user.id === interaction.user.id) return await interaction.reply({ content: `${await getLocale(interaction.locale, 'user-self-nostat')}`, ephemeral: true })
    else if (!games[0] && user.id !== interaction.user.id) return await interaction.reply({ content: `${await getLocale(interaction.locale, 'user-user-nostat', user)}`, ephemeral: true })

    const embed = new EmbedBuilder()
      .setAuthor({ name: await getLocale(interaction.locale, 'user-embed-author', user.username) })
      .setDescription(games.map((i: { dataValues: { game: { name: any }; time: any } }) => `**${i.dataValues.game.name}** - ${formatTime(i.dataValues.time)}`).join('\n'))
      .setColor('Random')
      .setFooter({ text: await getLocale(interaction.locale, 'timeformat') })

    await interaction.reply({ embeds: [embed] })
  },
}
