const Discord = require('discord.js');
const emoji = require('../../botcore/emoji.json');
const ss = require('../../botcore/embed.json');

module.exports = {
    name: "uptime",
    description: "Show the Bot's uptime",
    category: "info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 3,
    run: async (client, interaction, args) => {
        let date = new Date()
        let timestamp = date.getTime() - Math.floor(client.uptime);
        let uptimeembed = new Discord.MessageEmbed()
         .setColor(ss.color)
         .addFields(
            { name: `${emoji.uptime} • UPTIME`, value: `<t:${Math.floor(timestamp / 1000)}:R>`, inline: true },
            { name: `${emoji.rocket} • START DATE`, value: `<t:${Math.floor(timestamp / 1000)}:F>`, inline: true}
                  )
         .setFooter(ss.footertext, ss.footericon)
        interaction.reply({ embeds: [uptimeembed], ephemeral: true});
    }
};