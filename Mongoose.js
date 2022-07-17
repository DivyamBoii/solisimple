const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require(`../botcore/config.json`);

if (!config.MONGOURI) {
    process.exit(1);
}

mongoose.connect(config.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log(`${chalk.grey.bold('🗄️ :: ')}${chalk.green.bold('Connected to the database!')}`));