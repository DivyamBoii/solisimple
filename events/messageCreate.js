const { MessageEmbed, Interaction } = require("discord.js");
const emoji = require(`../botcore/emoji.json`);
const config = require('../botcore/config.json');
module.exports = async (client, message) => {
    // Slash Command Handling
    if (message.author.bot || !message.guild) return 
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return 
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const [ cmdName, ...args ] = message.content.slice(matchedPrefix).trim().split(/ +/g);
        if(matchedPrefix.includes(client.user.id))
          return message.reply({embeds: [new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${emoji.ping} Hey, You Need Help`)
            .setDescription(`${emoji.bot} **PREFIX: __\`${config.prefix}\`__**\n${emoji.dev} **DEV:** <@863786843778449430>`)
            .setFooter({text: client.user.username + " | ©️ Palixi"})
          ]});
          
    const cmd = client.commands.get(cmdName.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmdName.toLowerCase()));

    if (!cmd) return;
    try {
        cmd.run(client, Interaction, args, prefix);
    } catch (e){
        console.error(e);
        Interaction.channel.send(`❌ Something went wrong, while running the ${cmd.name} Command`).catch(() => null);
    }
    
}


function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    }
