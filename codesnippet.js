const MessageEmbed = require('discord.js');
const emoji = require('../../botcore/emoji.json');
const ss = require('../../botcore/embed.json'); //remove if you don't need it in your code

module.exports = {
    name: "", //name of the command ex: ping
    description: "", //description of your command ex: shows latency of bot
    cooldown: 1, //how much seconds till the user can use the command again
    run: async (client, interaction, args) => {
        interaction.reply({
            //code here
        });
    }
};