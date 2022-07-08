const { MessageEmbed, MessageButton ,MessageActionRow } = require('discord.js');
const emoji = require('../../botcore/emoji.json');
const ss = require('../../botcore/embed.json');

module.exports = {
    name: "serverlogo", 
    description: "shows server logo", 
    category: "info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 1, 
    run: async (client, interaction, args) => {
        let serverlogo = new MessageEmbed()
      .setColor(ss.color)
      .setTitle(`${emoji.image} ${interaction.guild.name}'s LOGO`)
      .setDescription(`> \`Click the button below to download!\``)
      .setFooter(`${ss.footertext}`, ss.footericon)
      .setImage(interaction.guild.iconURL({ size: 2048, dynamic: true, format: "png" }));

    const row = new MessageActionRow()
        .addComponents([
            new MessageButton() .setURL(interaction.guild.iconURL({ size: 2048, dynamic: true, format: "png"})) .setLabel("PNG") .setEmoji("924584875690967050") .setStyle("LINK"),
            new MessageButton() .setURL(interaction.guild.iconURL({ size: 2048, dynamic: true, format: "jpg"})) .setLabel("JPG") .setEmoji("924584875690967050") .setStyle("LINK"),
            new MessageButton() .setURL(interaction.guild.iconURL({ size: 2048, dynamic: true, format: "gif"})) .setLabel("GIF") .setEmoji("924584875690967050") .setStyle("LINK")
        ])

      interaction.reply({ embeds: [serverlogo], components: [row], ephemeral: true});
    }
};