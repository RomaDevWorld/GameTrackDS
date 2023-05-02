import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import Game from '../models/game';
import Activity from '../models/activity';
import formatTime from '../functions/formatTime';
import getLocale from '../functions/getLocale';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Get a stat for specific user')
        .addUserOption(option => 
            option
            .setName('user')
            .setDescription('User to get stats')
            .setDescriptionLocalizations({
                "uk": "Участник, статистику якого потрібно отримати",
                "ru": "RUSSIA IS A TERRORIST STATE",
            })
        )
        .setDescriptionLocalizations({
            "uk": "Отримати статистику для вказаного участника",
            "ru": "RUSSIA IS A TERRORIST STATE"
        }),
    async execute(interaction: any) {
    
        let user = interaction.options.getUser('user');
        if(!user) user = interaction.user;

        let games: any = await Activity.findAll({ 
            where: { userId: interaction.user.id },
            include: { model: Game, attributes: ['name'] } // злиття з таблицею Game та вибірка лише колонки з іменем гри
        });

        games = Object.values(games).sort((a: any, b: any) => b.time - a.time);

        if(!games[0] && user.id === interaction.user.id) return await interaction.reply({ content: `${await getLocale(interaction.locale, 'user-self-nostat')}`, ephemeral: true })
        else if(!games[0] && user.id !== interaction.user.id) return await interaction.reply({ content: `${await getLocale(interaction.locale, 'user-user-nostat', user)}`, ephemeral: true })

        const embed = new EmbedBuilder()
        .setAuthor({ name: await getLocale(interaction.locale, 'user-embed-author') })
        .setDescription(games.map((i: { dataValues: { game: { name: any; }; time: any; }; }) => `**${i.dataValues.game.name}** - ${formatTime(i.dataValues.time, interaction.locale)}`).join('\n'))

        await interaction.reply({ embeds: [embed] });
    }
}