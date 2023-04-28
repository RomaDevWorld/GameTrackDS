const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping command'),
    async execute(interaction: any) {
        interaction.reply("Pong " + interaction.client.ws.ping, { ephemeral: true })
    }
}