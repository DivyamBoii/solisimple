const { Client, Collection } = require('discord.js'); //v13
const fs = require('fs');
const config  = require("./botcore/config.json");

const client = new Client(clientSettingsObject());
// Slash Commands deployment settings
client.deploySlash = {
  enabled: true,
  guild: false, // false | "ID" (if it's false, just set global once, and then never needed again!)
}

// Create global collection
client.events = new Collection();
client.slashCommands = new Collection();

// load handler
client.categories = fs.readdirSync("./slashCommands/");
["events", "slashcommands", "antiHarm"]
    .filter(Boolean)
    .forEach(h => {
        require(`./util/${h}`)(client);
})  

/*  WEB SERVER FOR REPLIT USERS  */   
if(config.hostingweb == true) {
  require("./webport")();
}

client.login(config.token);

function clientSettingsObject() {
  return {
    allowedMentions: {
      parse: ["roles", "users", "everyone"],
      repliedUser: true, //set false if you don't want the bot to reply upon @ping
    },
    failIfNotExists: false,
    partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
    intents: [ 
      'GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS',
      'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS',
      'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS',
      'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'
    ],
    presence: {
      status: "idle"// change it to dnd or idle your choice  
    }
  }
}