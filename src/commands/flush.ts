import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import getLocale from '../functions/getLocale';
import Activity from '../models/activity';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flush')
        .setDescription('Flush all the data about the games you have played')
        .setDescriptionLocalizations({
            "uk": "Обнулити всі данні, про те які ігри ти грав",
            "en-GB": "Time for a bit of digital cleaning, eh?",
            "ru": "RUSSIA IS A TERRORIST STATE"
        }),
    async execute(interaction: any) {

        const allAct = await Activity.findAll({
            where: { userId: interaction.user.id }
        })

        if(!allAct[0]){
            const embed = new EmbedBuilder()
            .setAuthor({ name: await getLocale(interaction.locale, 'flush-nostat') })
            .setColor('Orange')
            await interaction.reply({ embeds: [embed], ephemeral: true })
            return;
        }

        const embed = new EmbedBuilder()
        .setAuthor({ name: await getLocale(interaction.locale, 'flush-confirm-author') })
        .setDescription(await getLocale(interaction.locale, 'flush-confirm-desc', allAct.length))
        .setColor("Red")
        .setFooter({ text: await getLocale(interaction.locale, 'flush-confirm-footer') })

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(await getLocale(interaction.locale, 'flush-confirm-button'))
            .setEmoji("⚠️")
            .setStyle(ButtonStyle.Danger)
            .setCustomId("flush-confirm")
        )

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })

        const filter = (i: any) => i.user.id === interaction.user.id;
        const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 15000, max: 1});
        collector?.on('collect', async (i: any) => {
            if(i.customId === "flush-confirm"){
                await Activity.destroy({
                    where: { userId: interaction.user.id },
                });
                await i.reply({ content: await getLocale(interaction.locale, 'flush-success'), ephemeral: true })
                return await interaction.editReply({ components: [] })
            }
        })
        collector?.on('end', async (collected: any) => {
            if(!collected.first()){
                interaction.followUp({ content: await getLocale(interaction.locale, 'flush-timeout'), ephemeral: true })
                return await interaction.editReply({ components: [] })
            }
        })
    }
}