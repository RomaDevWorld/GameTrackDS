import { SlashCommandBuilder, EmbedBuilder, GuildManager } from 'discord.js';
import Game from '../models/game';
import Activity from '../models/activity';
import formatTime from '../functions/formatTime';
import getLocale from '../functions/getLocale';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('top')
        .setDescription('Get the top 10 players in a specific game')
        .setDescriptionLocalizations({
        "uk": "Отримати топ 10 гравців у конкретній грі",
        "ru": "RUSSIA IS A TERRORIST STATE"
        })
        .addStringOption(option => 
            option
            .setName('game')
            .setDescription('Game to get stats')
            .setRequired(true)
            .setDescriptionLocalizations({
                "uk": "Гра по якій потрібно отримати статистику",
                "ru": "RUSSIA IS A TERRORIST STATE",
            })
        ),
    async execute(interaction: {
            reply(arg0: { content?: any, embeds?: EmbedBuilder[], ephemeral?: boolean }): void;
            options: { getString: (arg0: string) => string; };
            locale: string;
            [key: string]: any;
        }) {

        const game = interaction.options.getString('game');

        //fetch game by name
        let fetchedGame: any = await Game.findOne({ where: { name: game } });
        //if game not found, fetch by id
        if(!fetchedGame) fetchedGame = await Game.findOne({ where: { id: game } });

        if(!fetchedGame){
            const notfoundEmbed = new EmbedBuilder()
            .setAuthor({ name:  await getLocale(interaction.locale, 'top-notfound') })
            .setColor("Red")
            .setFooter({ text: await getLocale(interaction.locale, 'top-notfound-footer')  })
            return await interaction.reply({ embeds: [notfoundEmbed], ephemeral: true });
        }

        const members = interaction.guild.members.cache.filter((member: { user: { bot: boolean; }; }) => !member.user.bot).map((member: { id: number; }) => member.id);

        const activities: any = await Activity.findAll({ 
            where: { userId: members },
        });

        let activitiesId: string[] = []
        let activitiesList: any = {}
        for (let i in activities) {
            activitiesId.push(activities[i].dataValues.id)
            activitiesList[activities[i].dataValues.id] = {
                user: activities[i].dataValues.userId,
                time: activities[i].dataValues.time
            }
        }

        activitiesId.sort((a, b) => activitiesList[b].time - activitiesList[a].time)
            .slice(0, 10)

        const top = activitiesId.map(( i, index ) => `**${index + 1}.** ${interaction.guild.members.cache.get(activitiesList[i].user)} - ${formatTime(activitiesList[i].time, interaction.locale)}`).join(`\n`)

        const embed = new EmbedBuilder()
        .setAuthor({ name: await getLocale(interaction.locale, 'top-embed-author', fetchedGame.name, fetchedGame.id) })
        .setDescription(top)
        .setColor("Blue")

        await interaction.reply({ embeds: [embed] });

    //END
    }}