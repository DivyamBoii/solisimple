const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ss = require('../../botcore/embed.json');

module.exports = {
    name: "invite", 
    description: "sends an invite link of the bot", 
    category: "info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 1, 
    run: async (client, interaction, args) => {
        let row = new MessageActionRow()
			.addComponents(
        new MessageButton()
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
	    .setEmoji("923205285064106014")
	    .setStyle('LINK'),
	    new MessageButton()
        .setEmoji("926786636950429736")
	    .setStyle('LINK')
        .setURL("https://discord.gg/wZtPN2JQMB"),
			);
      
        let invite = new MessageEmbed()
        .setTitle(`**INVITE ${client.user.username}**`)
        .setFooter({text: `${client.user.username} | ©️ Palixi`, iconURL: `${ss.footericon}`})
		interaction.reply({ embeds: [invite], components: [row] });
    }
};