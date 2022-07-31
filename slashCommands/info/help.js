const { MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');
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
      const embed = new MessageEmbed()
            .setTitle(`${client.user.username} • HELP-MENU`)
            .setDescription(`${emoji.arrow} __Please select options from the menu to view commands.__`)
            .setColor(ss.color)
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        await interaction.deferReply({
            ephemeral: false,
        });

        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('help1')
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder('View my commands') // manu lable
                .addOptions([
                    {
                        label: 'Information',
                        value: 'A',
                        emoji: `${emoji.info}`,
                    },
                    {
                        label: 'DevOnly',
                        value: 'B',
                        emoji: `${emoji.dev}`,
                    },
                    {
                        label: 'Home',
                        value: 'C',
                        emoji: `${emoji.leave}`,
                    },
                ]),
        );

        const m = await interaction.editReply({ embeds: [embed], components: [row] });

        const row2 = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('disable_1')
                .setDisabled(true)
                .setPlaceholder(`Help-Menu Expired Run /help again.`)
                .addOptions([
                    {
                        label: 'Information',
                        value: 'A',
                        emoji: `${emoji.info}`,
                    },
                    {
                        label: 'DevOnly',
                        value: 'B',
                        emoji: `${emoji.dev}`,
                    },
                    {
                        label: 'Home',
                        value: 'C',
                        emoji: `${emoji.leave}`,
                    },
                ]),
        );

        // only commands user acces this embeds or help manu 
        const collector = m.createMessageComponentCollector({
            filter: (b) => {
                if (b.user.id === interaction.user.id) return true;
                else {
                    b.reply({
                        ephemeral: true,
                        embeds: [new MessageEmbed()
                            .setDescription(`${emoji.error} Only **<@${interaction.user.id}>** can use this button, if you want then you've to run the command again.`)
                            .setColor('#5e5bf7')]
                    });
                     // only commands user acces this embeds or help manu
                    return false;
                }
            },
            componentType: 'SELECT_MENU',
            time: 60000,    // 60s buttons off
            idle: 60000 / 2,
        });


        collector.on('end', async () => {
            if (!m) return;
            return m.edit({ components: [row2] }).catch(() => { }); // adding row3
        });

        collector.on('collect', (interaction) => {
            if (!interaction.deferred) interaction.deferUpdate();
            const options = interaction.values[0];


            // drop down manu 1   
            if (options === 'A') {
                editEmbed = new MessageEmbed()
                    .setColor(ss.color)
                    .setTitle(`${emoji.info} • Information Commands`)
                    .setDescription(`${emoji.arrow} \`help\`, \`invite\`, \`avatar\`,\`ping\`, \`serverinfo\`, \`serverlogo\`, \`slashcount\`, \`uptime\``)

                if (!m) return;
                return m.edit({
                    embeds: [editEmbed],
                    components: [row],
                });
            }
            if (options === 'B') {
                editEmbed = new MessageEmbed()
                    .setColor(ss.color)
                    .setTitle(`${emoji.dev} • DevOnly Commands`)
                    .setDescription(`${emoji.arrow} \`serverlist\``)

                if (!m) return;
                return m.edit({
                    embeds: [editEmbed],
                    components: [row],
                });
            }

            // drop down menu 2 

            if (options === 'C') {
                if (!m) return;
                return m.edit({
                    embeds: [embed],
                    components: [row],
                });
            }
        });
    }
};
