const utils = require('../utils');

module.exports = {
	name: 'ping',
	register_data: {
        data: {
            type: 1,
            name: 'ping',
            description: 'simple ping command for testing connection.',
        },
    },
    on_execution(client, interaction, args, config, commands) {
        utils.temp_reply(interaction, `pong ;p`, 5000);
        utils.log(`${interaction.member.user.username} ping`, config);
	},
    on_start(client, config, commands) {
        // on start
	},
    on_exit(client, config, commands) {
        // on exit
	},
};