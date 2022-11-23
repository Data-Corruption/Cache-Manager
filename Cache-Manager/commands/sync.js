const { MessageActionRow, MessageButton } = require('discord.js');
const utils = require('../utils');

module.exports = {
	name: 'sync',
	register_data: {
        data: {
            name: 'sync',
            type: 1,
            description: `links the server's synctube room.`,
        },
    },
    on_execution(client, interaction, args, config, commands) {
        let guild = utils.get_guild(client, interaction.guildId);
        let url = "";

        // get url
        for (let guild_object of config.guild_whitelist) {
            if ((guild_object.id === guild.id) && (guild_object.hasOwnProperty('synctube_room_url'))) {
                url = guild_object.synctube_room_url;
            }
        }

        if (url === "") {
            interaction.reply(`Hmm this is strange, I'm searching my filesystem but can't find the requested url. Please wait while i contant my developer for further support. <@${'165664627588333568'}> HELP ME YOU FUCKING FAGGOT I'M BROKEN AGAIN`);
        } else {
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel('Join')
                    .setStyle('LINK')
                    .setURL(url),
            );
            interaction.reply({ components: [row] });
        }

        utils.log(`${interaction.member.user.username} sync`, config); 
	},
    on_start(client, config, commands) {
        // on start
	},
    on_exit(client, config, commands) {
        // on exit
	},
};
