module.exports = async (client) => {
    process.on('unhandledRejection', (reason, p) => {
        console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase());
        console.log('Reason: ', reason.stack ? String(reason.stack) : String(reason));
        console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase());
    });
    process.on("uncaughtException", (err, origin) => {
        console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase());
        console.log('Exception: ', err.stack ? err.stack : err)
        console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase());
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase());
    });
    process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase());
    console.log(type, promise, reason);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase());
    });
}