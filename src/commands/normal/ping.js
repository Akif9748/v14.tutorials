module.exports = {
    name: "ping",
    aliases: ["pong"],
    cooldown: 5000,
    async run(client, message, args) {
      return message.reply(`Pong 🏓`)
    }
 };
