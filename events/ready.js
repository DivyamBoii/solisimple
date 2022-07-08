module.exports = (client) => {
    console.log(`😎 :: Logged in as ${client.user.tag}!`);
    const statuses = [
        `/help | @${client.user.username}`,
        "⚙️SOLIDIUM",
        "🧨BetaV0.1",
        "😎DIVYAM"
    ]
   const status = statuses[Math.floor(Math.random() * statuses.length)]
   client.user.setActivity(status, { type: "WATCHING" })
    setInterval(() => {
        client.user.setActivity(status, { type: "WATCHING" })
    }, 10000)
}