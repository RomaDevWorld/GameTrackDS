import { SlashCommandBuilder } from 'discord.js';
import getLocale from '../functions/getLocale';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping command')
        .setDescriptionLocalizations({
            "uk": "Команда пінгу",
            "ru": "RUSSIA IS A TERRORIST STATE"
        }),
    async execute(interaction: any) {
        interaction.reply(await getLocale(interaction.locale, "ping-main", interaction.client.ws.ping), { ephemeral: true })
    }
}