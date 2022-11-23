const { Client, Intents } = require('discord.js');
const exitHook = require('exit-hook');
const utils = require('./utils');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
const config_path = './config.json';

var commands = require('./commands');
var sucsessful_login = false;
var config;

client.once('ready', () => {
    sucsessful_login = true;
    utils.log(`${client.user.username} is online!`, config);

    // register commands
    if (config.update_commands) {

        // delete all global commands
        client.application.commands.set([]);

        // loop over guilds bot is in 
        client.guilds.fetch().then((all_guilds) => {
            for (let g of all_guilds) {
                let guild = utils.get_guild(client, g.at(0));
                let command_whitelist;

                // if guild is not in the guild whitelist, leave the guild, otherwise get command whitelist
                for (let guild_object of config.guild_whitelist) {
                    if (guild_object.id === guild.id) { 
                        command_whitelist = guild_object.command_whitelist;
                        break;
                    }
                }

                // delete all current commands
                guild.commands.set([]);
                // register commands
                for (let key of command_whitelist) {
                    utils.get_app(client, guild.id).commands.post(commands[key].register_data);
                }
            }
        });

        config.update_commands = false;
    }

    // run command on_start functions
    for (const key of Object.keys(commands)) {
        commands[key].on_start(client, config, commands);
    }

    // interaction listener
    client.on('interactionCreate', async (interaction) => {
        if (interaction.inGuild()) {
            commands[interaction.commandName].on_execution(
                client, 
                interaction, 
                utils.get_interaction_args(interaction.options.data),
                config,
                commands
            );
        }
    });

    // message listener
    client.on('messageCreate', async (message) => {
        if (!message.inGuild()) {
            // is a dm
        } else {
            // not a dm
        }
    });

    client.on('guildCreate', async (guild) => {
        // on guild join
    });
    client.on('guildDelete', async (guild) => {
        // on guild leave
    });


    // start site?

})

// run each command's on exit function
exitHook(() => {
    if (sucsessful_login) {
        for (const key of Object.keys(commands)) {
            commands[key].on_exit(client, config, commands);
        }
        // save config
        utils.store_json(config_path, config);
    }
});

function main() {

    // load config
    config = utils.load_json(config_path);
    if (config === {}) { utils.log_exit('ERROR config file is missing or empty'); };
    if (!config.hasOwnProperty('log')) { utils.log_exit('ERROR config missing log variable'); };
    if (!config.hasOwnProperty('discord_token')) { utils.log_exit('ERROR config missing token variable'); };
    if (!config.hasOwnProperty('update_commands')) { utils.log_exit('ERROR config missing update_commands variable'); };
    if (!config.hasOwnProperty('guild_whitelist')) { utils.log_exit('ERROR config missing guild_whitelist variable'); };

    // login the bot / start settings website
    client.login(config.discord_token);

}
  
if (require.main === module) { main(); }