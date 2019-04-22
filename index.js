const notifier = require('node-notifier');
const child_process = require('child_process');

module.exports = (argv, title) => {
    const icons = {
        success: __dirname + '/assets/success.png',
        fail: __dirname + '/assets/error.png',
    }

    const command = argv
        .filter((v, i) => i > 1)
        .join(' ');

    if (command === '') {
        console.log(`${process.env.USERNAME || 'You'} used '${title}'`);
        console.log(`It's not very effective.`);
        process.exit(1);
    }

    const subprocess = child_process.spawn(command, {
        shell: true,
        stdio: 'inherit',
    });

    subprocess.on('close', (code) => {
        notifier.notify({
            title: title,
            message: `The command "${command}" is done.`,
            icon: icons[(code === 0) ? 'success' : 'fail'],
            sound: false,
        });
    });
};
