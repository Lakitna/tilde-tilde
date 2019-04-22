# Triple dash

A simple command line utility to notify you when your command is done.

I've created this package after I could not find a good way to get notified after my application was done compiling. It's just a small workflow optimisation.

Only tested on Windows 10, but uses the cross-platform [node-notifier](https://www.npmjs.com/package/node-notifier) so there is a chance it'll work fine on Linux and MacOS. Please let me know if it does.

## Installation

There is no reason to install this package as part of a project. Install it global instead.

```bash
npm install triple-dash --global
```

Windows: If `triple-dash` does not work after that make sure the npm global installation folder is included in the Windows environment variable PATH. Then restart the command line and try again.

## Usage

Simply prefix any command with `---` or one of the aliases:

```bash
--- ping google.com
```

```bash
notify ping google.com
```

```bash
hey ping google.com
```
