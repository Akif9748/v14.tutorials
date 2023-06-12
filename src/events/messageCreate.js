const { prefix } = require("../config.js");
const ms = require("ms");
const sonkomut = {};
module.exports = {
  name: 'messageCreate',
  execute: async message => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const client = message.client;

    const args = message.content.slice(prefix.length).split(/ +/g).filter(Boolean),
      cmd = args.shift()?.toLowerCase(),
      command = client.commands.get(cmd) || client.commands.get(client.commandaliases.get(cmd));

    if (!command) return;
    if (command.cooldown &&
      sonkomut[command.name + message.author.id] &&
      sonkomut[command.name + message.author.id] > Date.now() - command.cooldown)
      return message.reply({
        content: `Cooldown şuan aktif lütfen \`${Date.now() - ms(sonkomut[command.name + message.author.id], { long: true })
          .replace("minutes", `dakika`).replace("seconds", `saniye`)
          .replace("second", `saniye`).replace("ms", `milisaniye`)}\` sonra tekrar deneyin.`
      })
        .then(msg => setTimeout(() => msg.delete().catch(_ => _), command.cooldown))

    try {
      sonkomut[command.name + message.author.id] = Date.now();
      await command.run(client, message, args);
    } catch {

    }

  }
};
