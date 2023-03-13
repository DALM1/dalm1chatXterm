const { spawn } = require('node-pty');
const term = spawn('bash', [], {
  name: 'xterm-color',
  cwd: process.env.HOME,
  env: process.env
});


const { Terminal } = require('xterm');
const { FitAddon } = require('xterm-addon-fit');

const terminalContainer = document.getElementById('terminal-container');
const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(terminalContainer);

term.onData((data) => {
  term.write(data);
  term._core._sendData(data);
});

term.onResize(({ cols, rows }) => {
  term._core.resize(cols, rows);
});

term.focus();
term._initialized = true;
