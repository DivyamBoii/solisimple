const Discord = require('discord.js');
const ss = require('../../botcore/embed.json');

module.exports = {
    name: "ping",
    description: "Shows the Bot's ping",
    category: "info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 1,
    run: async (client, interaction, args) => {
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        let days = Math.floor(client.uptime / 86400000)
        let hours = Math.floor(client.uptime / 3600000) % 24
        let minutes = Math.floor(client.uptime / 60000) % 60
        let seconds = Math.floor(client.uptime / 1000) % 60

        let botLatency = new Date() - interaction.createdAt
        let apiLatency = client.ws.ping;

        const pingEmbed = new Discord.MessageEmbed()
            .setColor(ss.color)
            .addField("Bot Latency",
                `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`
                , true
            )
            .addField("API Latency",
                `${apiLatency <= 200 ? circles.yellow : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`
                , true
            )
            .setFooter(ss.footertext, ss.footericon)
        return interaction.reply({ embeds: [pingEmbed], ephemeral: true })
    }
};