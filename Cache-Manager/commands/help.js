const utils = require('../utils');

module.exports = {
	name: 'help',
	register_data: {
        data: {
            type: 1,
            name: 'help',
            description: `lists the bot's commands.`,
        },
    },
    on_execution(client, interaction, args, config, commands) {
        let guild = utils.get_guild(client, interaction.guildId);

        // get command_whitelist
        let command_whitelist;
        for (let guild_object of config.guild_whitelist) {
            if (guild_object.id === guild.id) { 
                command_whitelist = guild_object.command_whitelist;
                break;
            }
        }

        // create reply
        let content = `Hi, nice to meet you ${interaction.member.user.username}. Here are the commands i have enabled on this server. :purple_heart:\n\n`;
        for (let key of command_whitelist) {
            if (commands[key].register_data.data.type === 1) {
                content += `/${commands[key].register_data.data.name} - ${commands[key].register_data.data.description}\n`;
            }
            if (commands[key].register_data.data.type === 3) {
                content += `*Message options under "Apps"* ${commands[key].register_data.data.name} - ${commands[key].description}\n`;
            }
        }
        content += `\n https://github.com/Data-Corruption/Cache-Manager`

        utils.reply(interaction, content);
        utils.log(`${interaction.member.user.username} help`, config);
	},
    on_start(client, config, commands) {
        // on start
	},
    on_exit(client, config, commands) {
        // on exit
	},
};