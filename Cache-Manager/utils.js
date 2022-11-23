const fs = require('fs'); 

module.exports = {

    // discord stuff
    get_app(client, guild_id) {
        const app = client.api.applications(client.user.id);
        if (guild_id) { app.guilds(guild_id); };
        return app
	},
    get_interaction_args(data) {
        const args = {};
        for (const arg of data) {
            const { name, value } = arg;
            args[name] = value;
        }
        return args;
	},
    get_guild(client, id) {
        var guild = client.guilds.cache.get(id);
        if (!guild) { guild = client.guilds.fetch(id); };
        if (!guild) { console.error(`Failed to get guild: ${id}`); };
        return guild;
	},
    get_channel(guild, id) {
        var channel = guild.channels.cache.get(id);
        if (!channel) { channel = guild.channels.fetch(id); };
        if (!channel) { console.error(`Failed to get channel: ${id} in guild: ${guild}`); };
        return channel;
	},
    get_guild_member(guild, id) {
        var member = guild.members.cache.get(id);
        if (!member) { member = guild.members.fetch(id); };
        if (!member) { console.error(`Failed to get guild member: ${id} from guild: ${guild.id}`); };
        return member;
	},
    get_user(client, id) {
        var user = client.users.cache.get(id);
        if (!user) { user = client.users.fetch(id); };
        if (!user) { console.error(`Failed to get user: ${id}`); };
        return user;
	},
    reply(interaction, message) {
        interaction.reply(message);
    },
    temp_reply(interaction, message, delay_in_ms) {
        interaction.reply(message);
        setTimeout(function () { 
            interaction.deleteReply().catch((err) => { console.log(err)} ); 
        }, delay_in_ms);
    },

    // non discord stuff

    log(message, config) {
        if (config.log === true) { console.log(`${new Date().toLocaleString()}: ${message}`) };
    },
    log_exit(message) {
        console.error(`${new Date().toLocaleString()}: ${message}`);
        process.exitCode = 1;
    },
    load_json(path) {
        if (!(fs.existsSync(path))) { return null };
        let rawdata = fs.readFileSync(path);
        let fileData = JSON.parse(rawdata);
        return fileData;
    },
    store_json(path, object) {
        fs.writeFileSync(path, JSON.stringify(object));
    },

};