const { MessageActionRow, MessageButton } = require('discord.js');
const utils = require('../utils');

module.exports = {
	name: 'music',
	register_data: {
        data: {
            type: 1,
            name: 'music',
            description: 'links the server\'s music playlists that are automatically synced to a channel.',
        },
    },
    on_execution(client, interaction, args, config, commands) {
        utils.temp_reply(interaction, 'wip', 5000);
        utils.log(`${interaction.member.user.username} music`, config); 
	},
    on_start(client, config, commands) {
        // on start
	},
    on_exit(client, config, commands) {
        // on exit
	},
};
