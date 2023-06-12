const { ActivityType } = require("discord.js");
const { REST } = require('@discordjs/rest');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		let activities = [`merhaba`, `${client.user.username}`], i = 0;

		setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }), 22000);
		try {
			const rest = new REST({ version: '10' }).setToken(client.token);
			await rest.put(
				`/applications/${client.user.id}/commands`, { body: client.slashcommands.toJSON().map(cmd => cmd.data) }
			);
		} catch (error) {
			console.error(error);
		} finally {
			client.log('Komutlar aktif!');
		}
	
	}
};
