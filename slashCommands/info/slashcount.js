const Discord = require('discord.js');
const emoji = require('../../botcore/emoji.json');
const ss = require('../../botcore/embed.json');

module.exports = {
    name: "slashcount", 
    description: "shows the no of slashcommands", 
    category: "info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 1, 
    run: async (client, interaction, args) => {
        let slashcmds = new Discord.MessageEmbed()
        .setColor(ss.color)
        .setDescription(`${emoji.gear} **[${client.slashCommands.size}] Slashcommands**\n${emoji.folder} **[${client.categories.length}] Categories**`)
        .setFooter({text: `${client.user.username} | ©️ Palixi`, iconURL: `${ss.footericon}`})
        interaction.reply({ embeds: [slashcmds], ephemeral: true });
    }
}