import { EmbedBuilder } from "discord.js";
import getLocale from "../../functions/getLocale"
import Link from "../../models/links";
import Game from "../../models/game";

const subcommand = async(interaction: any):Promise<void> => {
    const links: any = await Link.findAll({
        where: { guildId: interaction.guildId },
        include: { model: Game, attributes: ['name'] }
    })

    const embed = new EmbedBuilder()
    .setAuthor({ name: await getLocale(interaction.locale, "list-author") })
    .setColor(0x0099ff)
    .setDescription(links.map((link: { game: { name: string; }; time: number; roleId: string; }) => `**${link.game.name}** - ${link.time} = ${interaction.guild.roles.cache.get(link.roleId)}`).join("\n") || await getLocale(interaction.locale, "list-nolinks"))

    return interaction.reply({ embeds: [embed], ephemeral: true })

}

export default subcommand;