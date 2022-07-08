const { MessageEmbed, Collection } = require("discord.js");
const config = require('../botcore/config.json');
const emoji = require('../botcore/emoji.json');
const cooldowns = new Collection();
module.exports = async (client, interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply({ content: `${emoji.warn} An error occured.` }).catch(() => null);

        if (!cooldowns.has(cmd.name)) {
            const coll = new Collection();
            cooldowns.set(cmd.name, coll);
          }
          const current_time = Date.now();
          const time_stamps = cooldowns.get(cmd.name);
          const cooldown_amount = cmd.cooldown * 1000;
          if (time_stamps.has(interaction.user.id)) {
            const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amount;
            if (current_time < expiration_time) {
              const time_left = (expiration_time - current_time) / 1000;      
              const timeoutt = new MessageEmbed()
              .setColor("RED")
              .setTitle(`${emoji.timer} Your in a cooldown!`)
              .setDescription(`**Please wait \`${time_left.toFixed(1)}\` seconds, To Use /\`${cmd.name}\` Again**!`)
              return interaction.reply({ embeds: [timeoutt], ephemeral: true });
            }
          }
          time_stamps.set(interaction.user.id, current_time);
          setTimeout(() => time_stamps.delete(interaction.user.id), cooldown_amount);

          if (cmd) {
            // checking user perms
            if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
              let nouserperms = new MessageEmbed()
              .setColor("RED")
              .setTitle(`${emoji.error} • INSUFFICANT USER PERMS`)
              .setDescription(`> You Don't Have \`${cmd.userPermissions}\` Permission! To Use \`${cmd.name}\` Command!!`)
              return interaction.reply({ embeds: [nouserperms], ephemeral: true});
            } 
          }

          if (cmd) {
            // checking bot perms
            if (!interaction.guild.me.permissions.has(cmd.botPermissions || [])) {
              let nobotperms = new MessageEmbed()
              .setColor("RED")
              .setTitle(`${emoji.error} • INSUFFICANT BOT PERMS`)
              .setDescription(`> I Don't Have \`${cmd.botPermissions}\` Permission To Run \`${cmd.name}\` Command!\n> Give Me Requested Permission To Use \`${cmd.name}\` Command!!`)
              return interaction.reply({ embeds: [nobotperms], ephemeral: true});
            } 
          }

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id) || await interaction.guild.members.fetch(interaction.user.id).catch(() => null)

        cmd.run(client, interaction, args, "/");
    }
}