// https://github.com/kulshekhar/ts-jest#known-limitations-for-ts-compiler-options
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { shallow, render, mount } from 'enzyme';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

global.document = new JSDOM('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

// console.error = (message) => {
//    throw new Error(message);
// };

// Reference
// https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f
// };