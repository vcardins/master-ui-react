// https://github.com/kulshekhar/ts-jest#known-limitations-for-ts-compiler-options
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { shallow, render, mount } from 'enzyme';

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Fail tests on any warning
// console.error = (message) => {
//    throw new Error(message);
// };

// Reference
// https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f