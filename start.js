
#!/usr/bin/env node

// This script allows running the app with a simple "npm start" command
const { spawn } = require('child_process');
const path = require('path');

// Run the vite dev command
const viteProcess = spawn('npm', ['run', 'dev'], { 
  stdio: 'inherit',
  shell: true
});

console.log('Starting development server...');

// Handle process termination
process.on('SIGINT', () => {
  viteProcess.kill('SIGINT');
  process.exit(0);
});

viteProcess.on('close', (code) => {
  process.exit(code);
});
