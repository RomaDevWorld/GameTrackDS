import getLocale from '../../functions/getLocale'
import Link from '../../models/links'

const subcommand = async (interaction: any): Promise<void> => {
  const link: any = await Link.findAll({
    where: {
      guildId: interaction.guildId,
      roleId: interaction.options.getRole('role').id,
    },
  })

  if (link.length === 0) return await interaction.reply({ content: await getLocale(interaction.locale, 'remove-nolink'), ephemeral: true })

  Link.destroy({
    where: {
      guildId: interaction.guildId,
      roleId: interaction.options.getRole('role').id,
    },
  })

  return interaction.reply({ content: await getLocale(interaction.locale, 'remove-success'), ephemeral: true })
}

export default subcommand
