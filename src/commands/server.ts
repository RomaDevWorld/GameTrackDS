import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import Game from '../models/game';
import Activity from '../models/activity';
import formatTime from '../functions/formatTime';
import getLocale from '../functions/getLocale';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Get a stat for an entire server')
        .setDescriptionLocalizations({
            "uk": "Отримати статистику для усього серверу",
            "ru": "RUSSIA IS A TERRORIST STATE"
        }),
    async execute(interaction: any) {

        const members = interaction.guild.members.cache.filter((member: { user: { bot: boolean; }; }) => !member.user.bot).map((member: { id: number; }) => member.id);

        const games: any = await Activity.findAll({ 
            where: { userId: members },
            include: { model: Game, attributes: ['name', 'id'] }
        });

        if(!games[0]) return await interaction.reply({ content: await getLocale(interaction.locale, "server-nostat"), ephemeral: true })

        let gamesId: string[] = []
        let gamesList: any = {}
        for (let i in games) {
            if(!gamesId.includes(games[i].dataValues.game.id)){
                gamesId.push(games[i].dataValues.game.id)
                gamesList[games[i].dataValues.game.id] = {
                    id: games[i].dataValues.game.id,
                    name: games[i].dataValues.game.name,
                    time: games[i].dataValues.time
                }
            }else{
                gamesList[games[i].dataValues.game.id].time += games[i].dataValues.time
            }
        }

        gamesList = Object.values(gamesList).sort((a: any, b: any) => b.time - a.time);

        const embed = new EmbedBuilder()
        .setAuthor({ name: await(getLocale(interaction.locale, 'server-embed-author')) })
        .setDescription(gamesList.map((i: { name: string; time: number; }) => `**${i.name}** - ${formatTime(i.time, interaction.locale)}`).join('\n'))
        .setColor('Blue')
        await interaction.reply({ embeds: [embed], ephemeral: true });

    }
}