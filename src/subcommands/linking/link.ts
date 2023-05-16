import getLocale from "../../functions/getLocale"
import Link from "../../models/links"
import Game from "../../models/game"

const subcommand = async(interaction: any):Promise<void> => {
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

    return interaction.reply({ content: await getLocale(interaction.locale, "link-success"), ephemeral: true })
}

export default subcommand;