const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");
const emoji = require('../../botcore/emoji.json');
const ss = require('../../botcore/embed.json');

module.exports = {
    name: "help",
    description: "Show all of the Commands",
    category: "info",
    userPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES"],
    cooldown: 2,
    Devonly: true,
    run: async (client, interaction, args) => {
     const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId("select")
      .setPlaceholder("Select your option")
      .addOptions([
        {
          label: "INFO",
          description: "Click here to see info commands",
          emoji: "913828764557918238",
          value: "first"
        }
      ])
    )

    let embed = new MessageEmbed()
    .setTitle(client.user.username + " Help Menu")
    .setDescription("Interact below to see my commands")
    .setColor(ss.color)

    let sendmsg = await interaction.channel.send({ embeds : [embed], components:[row], ephemeral:true })


    
let infoembed = new MessageEmbed()
  .setColor(ss.color)
  .setTitle(`${emoji.info} • INFORMATION`)
  .setDescription(`>>> ${client.slashCommands
    .filter((cmd) => cmd.category === "info")
    .map((cmd) => `\`${cmd.name}\``)
    .join(", ")}`)
    .setFooter(ss.footertext, ss.footericon)


const collector = interaction.channel.createMessageComponentCollector({
  componentType: "SELECT_MENU"
})

collector.on("collect", async (collected) => {
const value = collected.values[0]

if(value === "first") {
  collected.reply({embeds:[infoembed], ephemeral:true})
}

})
    }
};
