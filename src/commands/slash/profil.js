const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../../database/schema/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profil')
        .setDescription('Profilinizi görüntülersiniz.'),
        run: async (client, interaction) => {
           
            try {
                const data = await User.findOne({
                  id: interaction.user.id,
                });
          
                if (!data) {
                  User.create({
                    id: interaction.user.id,
                    registeredAt: Date.now(),
                  });

                  interaction.reply({ content: 'Profiliniz oluşturuldu. Lütfen komutu tekrar kullanın.', ephemeral: true });
                }
          
                if (data) {
                    const embed = new EmbedBuilder()
                    .addFields(
                        { name: "Kayıt Tarihi", value: `<t:${Math.floor(data.registeredAt / 1000)}:R>`, inline: true },
                        { name: "ID", value: data.id, inline: true },
                    )
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
              } catch (error) {
                console.log(error);
              }
            },
    };