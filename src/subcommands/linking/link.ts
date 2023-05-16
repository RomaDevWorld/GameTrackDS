import getLocale from "../../functions/getLocale"
import Link from "../../models/links"
import Game from "../../models/game"
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

const subcommand = async(interaction: any):Promise<void> => {
    if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) return await interaction.reply({ content: await getLocale(interaction.locale, "link-nopermission"), ephemeral: true })

    let game: any = await Game.findOne({ where: { name: interaction.options.getString('game') } });
    if(!game) game = await Game.findOne({ where: { id: interaction.options.getString('game') } });

    if(!game) return await interaction.reply({ content: await getLocale(interaction.locale, "link-nogame"), ephemeral: true })

    const [link, created] = await Link.findOrCreate({
        where: {
            guildId: interaction.guild.id,
            gameId: game.id
        },
    })

    link.update({ time: interaction.options.getInteger("hours"), roleId: interaction.options.getRole("role").id })

    const embed = new EmbedBuilder()
    .setAuthor({ name: await getLocale(interaction.locale, "link-author") })
    .setDescription(await getLocale(interaction.locale, "link-success", link.time, game.name, interaction.guild.roles.cache.get(link.roleId)))
    .setColor("Green")
    return interaction.reply({ embeds: [embed], ephemeral: true })
}

export default subcommand;