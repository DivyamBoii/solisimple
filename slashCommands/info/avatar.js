const { MessageEmbed, MessageButton ,MessageActionRow } = require('discord.js');
const emoji = require('../../botcore/emoji.json');
const ss = require('../../botcore/embed.json');

module.exports = {
    name: "avatar", 
    description: "shows user/bot avatar",
    category: "info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 1, 
    run: async (client, interaction, args) => {
      let avatarembed = new MessageEmbed()
      .setColor(ss.color)
      .setTitle(`${emoji.image} • ${interaction.user.username}'s AVATAR`)
      .setDescription(`> \`Click the button below to download!\``)
      .setImage(interaction.user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    const row = new MessageActionRow()
        .addComponents([
            new MessageButton() .setURL(interaction.user.displayAvatarURL({ size: 2048, dynamic: true, format: "png"})) .setLabel("PNG") .setEmoji("924584875690967050") .setStyle("LINK"),
            new MessageButton() .setURL(interaction.user.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg"})) .setLabel("JPG") .setEmoji("924584875690967050") .setStyle("LINK"),
            new MessageButton() .setURL(interaction.user.displayAvatarURL({ size: 2048, dynamic: true, format: "gif"})) .setLabel("GIF") .setEmoji("924584875690967050") .setStyle("LINK")
        ])

        interaction.reply({ embeds: [avatarembed], components: [row] });
    }
};