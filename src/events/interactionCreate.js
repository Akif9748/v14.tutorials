const { InteractionType } = require("discord.js");

module.exports = {
	name: 'interactionCreate',
	execute: async interaction => {
		if (interaction.user.bot) return;

		const client = interaction.client;
		if (interaction.type == InteractionType.ApplicationCommand) {
			try {
				const command = client.slashcommands.get(interaction.commandName)
				await command.run(client, interaction);
			} catch (e) {
				console.error(e)
				return interaction.reply({ content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true });
			}
		}
	}
}
