const colors = require('colors');
module.exports = (client) => {
    console.log(`😎 :: Logged in as ${client.user.tag}!`.blue);
    setInterval(() => {
        client.user.setActivity({name: `⚙️Palixi`, type: "WATCHING"})
    })
}
