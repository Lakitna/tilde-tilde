const notifier = require('node-notifier');
const child_process = require('child_process');
const pkg = require('./package.json');

const icons = {
    success: __dirname + '/assets/success.png',
    fail: __dirname + '/assets/error.png',
}

const command = process.argv
    .filter((v, i) => i > 1)
    .join(' ');

const subprocess = child_process.spawn(command, {
    shell: true,
    stdio: 'inherit',
});

subprocess.on('close', (code) => {
    notifier.notify({
        title: pkg.name,
        message: `The command "${command}" is done.`,
        icon: icons[(code === 0) ? 'success' : 'fail'],
        sound: false,
    });
});
