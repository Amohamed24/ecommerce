import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder (needed for React Router)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}