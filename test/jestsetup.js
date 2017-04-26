// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';
const Console = console;
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Fail tests on any warning

Console.error = (message) => {
   throw new Error(message);
};