const { readdirSync } = require(`fs`);

module.exports = async (client) => {
    console.log(`⚙️  :: Loading Events`);
    readdirSync(`${process.cwd()}/events/`).filter((file) => file.endsWith(`.js`))
        .forEach((file) => {
            const pull = require(`${process.cwd()}/events/${file}`)
            let eventName = file.split(`.`)[0];
            client.on(eventName, pull.bind(null, client));
        });
}