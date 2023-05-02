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

        if(!oldPresence.activity) return;
        if(oldPresence.activity?.type !== 0) return;
        if(!oldPresence.activity?.applicationId) return;
        
        const time = Date.now() - oldPresence?.activity?.createdTimestamp

        const activity = await Activity.findOne({
            where: {
                userId: newMember.user.id,
                gameId: oldPresence.activity.applicationId,    
            },
        });
        
        const [ gameName, created ] = await Game.findOrCreate({ where: { id: oldPresence.activity.applicationId } }); 

        await gameName.update({ name: oldPresence.activity.name });

        if (activity) {
            await activity.update({
                time: activity.time + time,
            });
        } else {
            await Activity.create({
                time: time,
                userId: newMember.user.id,
                gameId: oldPresence.activity.applicationId,
            });
        }

}}

interface Presence {
    id: number,
    status: string,
    activity: any
}