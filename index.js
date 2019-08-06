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

    const startTime = new Date();

    const subprocess = child_process.spawn(command, {
        shell: true,
        stdio: 'inherit',
    });

    subprocess.on('close', (code) => {
        notifier.notify({
            title: title,
            message: `The command "${command}" finished in `
                + formatTime(new Date(new Date() - startTime))
                + ((code === 0) ? '' : ` with exit code ${code}`)
                + '.',
            icon: icons[(code === 0) ? 'success' : 'fail'],
            sound: false,
        });
    });
};


/**
 * Format to kind of relative time without resolution loss.
 * @param {Date} time
 */
function formatTime(time) {
    let h = time.getUTCHours();
    let m = time.getUTCMinutes();
    let s = time.getUTCSeconds();
    const ms = time.getUTCMilliseconds();

    if (h === 0 && m === 0 && s === 0) {
        return `${ms} milliseconds`;
    }
    if (h === 0 && m === 0) {
        return `${s}.${Math.round(ms / 100)} seconds`;
    }

    m = `${m}`.padStart(2, '0');
    s = `${s}`.padStart(2, '0');
    if (h === 0 ) {
        return `${m}:${s}`;
    }

    h = `${h}`.padStart(2, '0');
    return `${h}:${m}:${s}`;
}
