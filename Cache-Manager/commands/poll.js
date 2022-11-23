const utils = require('../utils');

module.exports = {
	name: 'poll',
	register_data: {
        data: {
            name: 'poll',
            type: 1,
            description: 'creates a poll.',
            options: [{
                name: 'question_and_options',
                description: 'format question-option 1-option 2-option 3',
                type: 3,
                required: true,
            }],
        },
    },
    on_execution(client, interaction, args, config, commands) {
        utils.temp_reply(interaction, 'wip', 5000);
        utils.log(`${interaction.member.user.username} poll`, config); 
	},
    on_start(client, config, commands) {
        // on start
	},
    on_exit(client, config, commands) {
        // on exit
	},
};