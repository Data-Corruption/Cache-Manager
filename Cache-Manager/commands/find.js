const utils = require('../utils');
const memes = require('../memes');
const failed_to_find_response = memes.responses;

module.exports = {
	name: 'find',
	register_data: {
        data: {
            name: 'find',
            type: 1,
            description: 'finds stuff for you.',
            options: [{
                name: 'stuff',
                description: 'stuff you want me to find for you',
                type: 3,
                required: true,
            }],
        },
    },
    on_execution(client, interaction, args, config, commands) {
        utils.temp_reply(interaction, failed_to_find_response[Math.floor( Math.random() * failed_to_find_response.length)], 40000);
        utils.log(`${interaction.member.user.username} find`, config); 
	},
    on_start(client, config, commands) {
        // on start
	},
    on_exit(client, config, commands) {
        // on exit
	},
};