declare module 'bootstrap/dist/js/bootstrap.bundle.min.js';

const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for the src folder
    },
  },
};