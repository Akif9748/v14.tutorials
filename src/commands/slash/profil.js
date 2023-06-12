const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profil')
    .setDescription('Profilinizi görüntülersiniz.'),
  async run(client, interaction) {

    const data = await client.Database.fetchUser(interaction.user.id);

    const embed = new EmbedBuilder()
      .addFields(
        { name: "Kayıt Tarihi", value: `<t:${Math.floor(data.registeredAt / 1000)}:R>`, inline: true },
        { name: "ID", value: data.id, inline: true },
      )
    return interaction.reply({ embeds: [embed], ephemeral: true });


  }
};