const colors = require('colors');
module.exports = (client) => {
    console.log(`😎 :: Logged in as ${client.user.tag}!`.blue);
    const statuses = [
        `/help | @${client.user.username}`,
        "⚙️Palixi",
        "🧨V1.3.0 release",
        "😎DIVYAM"
    ]
   const status = statuses[Math.floor(Math.random() * statuses.length)]
   client.user.setActivity(status, { type: "WATCHING" })
    setInterval(() => {
        client.user.setActivity(status, { type: "WATCHING" })
    }, 10000)
}