const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Get information about the server",
    category: "info",
    cooldown: 1, 

    /**
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const { guild } = interaction

    const { name, memberCount, OwnerId, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`"${name}" SERVERINFO`)
      .setThumbnail({icon})
      .addFields(
        {
          name: 'Members',
          value: memberCount,
        },
        {
          name: 'Owner',
          value: OwnerId,
        },
        {
          name: 'AFK Timeout',
          value: afkTimeout / 60,
        }
      )

    interaction.followUp({ embeds: [embed] })
    },
};