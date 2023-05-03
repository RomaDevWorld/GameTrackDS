import Activity from "../models/activity"
import Game from "../models/game"

module.exports = {
    name: 'presenceUpdate',
    once: false,
    async execute (oldMember: any, newMember: any) {
        const oldPresence:Presence = {
            id: oldMember?.id,
            status: oldMember?.status,
            activity: oldMember?.activities[0]
        }

        const newPresence:Presence = {
            id: newMember?.id,
            status: newMember?.status,
            activity: newMember?.activities[0]
        }

        if(!oldPresence.activity) return console.log("No activity before")
        if(oldPresence.activity?.type !== 0) return console.log("Not a game")
        // if(!oldPresence.activity?.applicationId) oldPresence.activity.applicationId = "0"
        if(!oldPresence.activity?.applicationId) return console.log("No APP id")
        
        const time = Date.now() - oldPresence?.activity?.createdTimestamp
        
        const [ gameName, created ] = await Game.findOrCreate({ where: { id: oldPresence.activity.applicationId } }); 
        await gameName.update({ name: oldPresence.activity.name });

        const [ activity, createdAcitity ] = await Activity.findOrCreate({ where: { gameId: oldPresence.activity.applicationId, userId: newMember.user.id } }); 
        await activity.update({ time: activity.time + time })

        console.log(activity)
}}

interface Presence {
    id: number,
    status: string,
    activity: any
}