const { MessageActionRow, MessageButton } = require('discord.js');
const date = require('date-and-time');
const utils = require('../utils');

module.exports = {
	name: 'archive',
	register_data: {
        data: {
            name: 'archive',
            type: 3,
        },
    },
    description: 'sends a copy of the target message to an archive channel.',
    on_execution(client, interaction, args, config, commands) {
        if (interaction.targetType !== 'MESSAGE') { return; };

        let guild = utils.get_guild(client, interaction.guildId);
        let source_channel = utils.get_channel(guild, interaction.channelId);
        let archive_channel;

        for (let guild_object of config.guild_whitelist) {
            if ((guild_object.id === guild.id) && (guild_object.hasOwnProperty('archive_channel_id'))) {
                archive_channel = utils.get_channel(guild, guild_object.archive_channel_id);
            }
        }

        utils.temp_reply(interaction, 'archived message', 5000);

        source_channel.messages.fetch(interaction.targetId).then((message) => {

            // create links to message and reference if present
            let content = `Jump To Message - https://discord.com/channels/${guild.id}/${source_channel.id}/${message.id}\n`;
            if (message.reference) {
                content += `Referenced Message - https://discord.com/channels/${guild.id}/${source_channel.id}/${message.reference.messageId}\n`;
            }

            // create date
            let message_date = new Date(message.createdTimestamp);
            content += `\`\`\`${message.author.username} in ${source_channel.name} on ${date.format(message_date,'MM/DD/YYYY')}\`\`\``;
            content += message.content;
            if (message.attachments) {
                for (a of message.attachments) {
                    content += `\n ${a.at(1).url}`;
                }
            }

            archive_channel.send(content);
        });

        utils.log(`${interaction.member.user.username} archived ${interaction.targetId} from ${interaction.channel.name} in ${interaction.guild.name}`, config);
	},
    on_start(client, config, commands) {
        // on start
	},
    on_exit(client, config, commands) {
        // on exit
	},
};