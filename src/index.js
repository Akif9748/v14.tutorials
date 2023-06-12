const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]
});
const config = require("../config.json");
const { readdirSync } = require("fs")
const mongoose = require('mongoose');

let token = config.token

client.commands = new Collection()
client.slashcommands = new Collection()
client.commandaliases = new Collection()
client.Database = require('./database/mongodb.js')

const log = x => console.log(`[${new Date().toLocaleString()}]`, x);
client.log = log;
mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>
  log('MongoDB Connected.')
).catch(log)

readdirSync('./src/commands/normal').forEach(file => {
  const command = require(`./commands/normal/${file}`);
  if (command) {
    client.commands.set(command.name, command)
    if (command.aliases && Array.isArray(command.aliases))
      command.aliases.forEach(alias => client.commandaliases.set(alias, command.name))
  }
});

readdirSync('./src/commands/slash').forEach(file => {
  const command = require(`./commands/slash/${file}`);
  client.slashcommands.set(command.data.name, command);
});

readdirSync('./src/events').forEach(file => {
  const event = require(`./events/${file}`);
  client[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
})

process.on("unhandledRejection", log)
process.on("uncaughtException", log)
process.on("uncaughtExceptionMonitor", log)

client.login(token);

require("./express.js");