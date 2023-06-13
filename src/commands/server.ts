import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from 'discord.js'
import Game from '../models/game'
import Activity from '../models/activity'
import formatTime from '../functions/formatTime'
import getLocale from '../functions/getLocale'

module.exports = {
  data: new SlashCommandBuilder().setName('server').setDescription('Get a stat for an entire server').setDescriptionLocalizations({
    uk: 'Отримати статистику для усього серверу',
    'en-GB': "We'll suss out everyone's stats for ya!",
    ru: 'RUSSIA IS A TERRORIST STATE',
  }),
  async execute(interaction: CommandInteraction) {
    const members = interaction!.guild!.members.cache.filter((member: { user: { bot: boolean } }) => !member.user.bot).map((member) => member.id)

    const games: Activity[] = await Activity.findAll({
      where: { userId: members },
      include: { model: Game, attributes: ['name', 'id'] },
    })

    if (!games[0]) return await interaction.reply({ content: await getLocale(interaction.locale, 'server-nostat'), ephemeral: true })

    let gamesId: string[] = []
    let gamesList: any = {}
    for (let i in games) {
      if (!gamesId.includes(games[i].game.id)) {
        gamesId.push(games[i].game.id)
        gamesList[games[i].game.id] = {
          id: games[i].game.id,
          name: games[i].game.name,
          time: games[i].time,
        }
      } else {
        gamesList[games[i].game.id].time += games[i].time
      }
    }

    gamesList = Object.values(gamesList).sort((a: any, b: any) => b.time - a.time)

    const embed = new EmbedBuilder()
      .setAuthor({ name: await getLocale(interaction.locale, 'server-embed-author') })
      .setDescription(gamesList.map((i: { name: string; time: number }) => `**${i.name}** - ${formatTime(i.time)}`).join('\n'))
      .setFooter({ text: await getLocale(interaction.locale, 'timeformat') })
      .setColor('Random')
    await interaction.reply({ embeds: [embed] })
  },
}
