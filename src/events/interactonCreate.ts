const cd = new Set(); //New set for the cooldowns
const cdTime = 5000; //If you want to, you can change the cooldown time (miliseconds)
import getLocale from "../functions/getLocale";
 
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute (interaction: any) {

        if(interaction.isCommand()){ //If interaction is command
        if (cd.has(interaction.user.id)) { //If Set has user id
            await interaction.reply(await getLocale(interaction.locale, "cooldown"), { ephemeral: true })
            //Reply with cd message
          } else {
            const command = interaction.client.commands.get(interaction.commandName) //Get command name from interaction
            if(!command) return; //if command is not exist return (should add an error message)
            try { //Try to
                await command.execute(interaction); //Execute command

                cd.add(interaction.user.id); //Add an user id to Set
                setTimeout(() => {
                  cd.delete(interaction.user.id);
                }, cdTime); //Make an timeout
            } catch (err) { //If error
                if(err) console.error(err)
            }
        }

    }
}}