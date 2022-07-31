const config = require(`../botcore/config.json`);
const ss = require(`../botcore/embed.json`);
const emoji = require(`../botcore/emoji.json`);
const { MessageEmbed } = require("discord.js");
const logchannel = config.logchannel;

module.exports = (client, member) => { 
 client.on("guildCreate", async guild => {
    let theowner = config.ownerIDS;
    await guild.fetchOwner().then(({ user }) => { theowner = user; }).catch(() => {})
    let join = new MessageEmbed()
      .setColor(ss.color)
      .setTitle(`${emoji.join} Joined a New Guild`)
      .addField(`${emoji.info} **Guild Info**`, `${emoji.arrow} \`${guild.name} (${guild.id})\``)
      .addField(`${emoji.crown} **Owner Info**`, `${emoji.arrow} \`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\``)
      .addField(`${emoji.member} **Server Member Count**`, `${emoji.arrow} \`${guild.memberCount}\``)
      .addField(`${emoji.guild} **Total Servers**`, `${emoji.arrow} \`${client.guilds.cache.size}\``)
      .setFooter({text: `${client.user.username} | ©️ Palixi`, iconURL: `${ss.footericon}`})
      .setThumbnail(guild.iconURL({dynamic: true}));
    const LogChannel = client.channels.cache.get(logchannel) || await client.channels.fetch(logchannel).catch(()=>{}) || false 
    if(LogChannel) LogChannel.send({ embeds: [join] })
  });
}