# Master UI

## Code References
https://hackernoon.com/import-json-into-typescript-8d465beded79

Git hook to run pre-commit and pre-push commands. By enforcing that tests need to be ran, it prevents bad commits or pushes
https://github.com/typicode/husky

# Base Component

https://www.bountysource.com/issues/26302723-proposal-using-pure-es6-base-classes-over-formsy-mixins

https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e

https://draftjs.org/docs/overview.html#content


# Vendor and code splitting in webpack 2
https://medium.com/@adamrackis/vendor-and-code-splitting-in-webpack-2-6376358f1923

# Pure CSS toggle buttons
https://codepen.io/mallendeo/pen/eLIiG

# Navigation Menu
https://medialoot.com/blog/how-to-create-a-responsive-navigation-menu-using-only-css/
https://codepen.io/wanni/pen/zsDJb


Principles 

Architecture
------
- Context based architecture
- High Order Components (decorators)
- Centralized application settings
- Intentionally, it was not added any state management lib (redux, mobx, baobab, etc) as it can deviate a bit of the main purpose of creating a flexible and accessible 
- Async and Await despite of promises or callbacks

Navigation and Layout
-----
- Use of Stateless components whereever possible
- Professional responsive, cross-browser and customizable layout based on Flexbox
    - Menu positioning: vertical | horizontal
    - Footer
    - Topbar
    - Sliding panel (cool for settings and customization features)
- Components suite based on Semantic-UI React
- Flexible routing
- Animated Page transition


Authentication/Authorization
------------
- Flexible routing access control based on user role or claims (suggestion)
- Child component authorizar

Programming Stack
------
- Typescript 2.2.2

- Webpack 2.0 and several cool plugins
    - babel (stage-0),
    - HMR, devServer, hotMiddleware,
    - PostCSS and auto-prefix
    - ...

Best Practices
---------
- Linting: ESLint, TSLint and Stylelining (css and sass)

Testing
---------
- Components unit tests with Jest and Enzyme
- Integration (e2e) testing with nightwatch

https://github.com/archy-bold/ts-jest-test


Data Model

https://gist.github.com/hessryanm/177b0cada8c51516371e

Faster React Components
---------------
https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f

TypeScript Classes & Object-Oriented Programming
--------------
http://www.codebelt.com/typescript/typescript-classes-object-oriented-programming/