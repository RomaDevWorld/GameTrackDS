import Activity from '../models/activity'
import Game from '../models/game'
import client from '../utils/client'
import Links from '../models/links'

module.exports = {
  name: 'presenceUpdate',
  once: false,
  async execute(oldMember: any, newMember: any) {
    const oldPresence: Presence = {
      id: oldMember?.id,
      status: oldMember?.status,
      activity: oldMember?.activities[0],
    }

    const newPresence: Presence = {
      id: newMember?.id,
      status: newMember?.status,
      activity: newMember?.activities[0],
    }

    if (!oldPresence.activity) return
    if (oldPresence.activity?.type !== 0) return
    if (!oldPresence.activity?.applicationId) return

    const ignoreList = [
      '356876590342340608', //"Rainbow Six Siedge"
      '575412499399180288', //"MORDHAU"
      '356873622985506820', //"PUBG"
      '451540626270584833', //"FOR THE KING"
    ]
    if (ignoreList.includes(oldPresence.activity.applicationId)) return

    const time = Date.now() - oldPresence?.activity?.createdTimestamp
    if (time < 60000) return

    const [gameName, created] = await Game.findOrCreate({ where: { id: oldPresence.activity.applicationId } })
    await gameName.update({ name: oldPresence.activity.name })

    const [activity, createdActivity] = await Activity.findOrCreate({ where: { gameId: oldPresence.activity.applicationId, userId: newMember.user.id } })
    await activity.update({ time: activity.time + time })

    //linking roles
    const guilds = client.guilds.cache
    guilds.forEach(async (guild) => {
      const member = guild.members.cache.get(newMember.user.id)
      if (member) {
        const link: any = await Links.findOne({ where: { guildId: guild.id, gameId: oldPresence.activity.applicationId } })

        if (link) {
          if (activity.time >= link.time) {
            const role = guild.roles.cache.get(link.roleId)
            if (role) member.roles.add(role).catch((err) => console.error(err))
          }
        }
      }
    })
  },
}

interface Presence {
  id: string
  status: string
  activity: any
}
