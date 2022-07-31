const { readdirSync } = require(`fs`);
const colors = require('colors');

module.exports = async (client) => {
    console.log(`🪄  :: Loading SlashCommands`.brightBlue);
    const slashCommandsArray = [];
    readdirSync(`${process.cwd()}/slashCommands/`)
        .forEach((directory) => {
            readdirSync(`${process.cwd()}/slashCommands/${directory}/`)
                .filter((file) => file.endsWith(`.js`))
                .forEach(file => {
                    let pull = require(`${process.cwd()}/slashCommands/${directory}/${file}`);
                    client.slashCommands.set(pull.name, pull);
                    slashCommandsArray.push(pull);
                })
        })

        client.on(`ready`, async () => {
            if(client.deploySlash.enabled) {
                if(client.deploySlash.guild) {
                    client.guilds.cache.get(client.deploySlash.guild).commands.set(slashCommandsArray); 
                } else {
                    client.application.commands.set(slashCommandsArray);
                }
    
            } 
        });
}