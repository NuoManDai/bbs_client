# react-redux-webpack-antd-template

> lets you quickly set up a project including karma test runner and [Webpack](http://webpack.github.io/) module system. It depends on [generator-react-webpack](https://github.com/newtriks/generator-react-webpack) as a base and extends it to create new reducers and actions.

> 这是一个基于reactJs的框架包它基于[Webpack](http://webpack.github.io/) 快速构建的模块系统. 它是在 [generator-react-webpack](https://github.com/newtriks/generator-react-webpack)  模块之上添加了redux和antd-moblie形成的。

# About
react-redux-webpack-antd-template will help you build new React projects using modern technologies.

react-redux-webpack-antd-template 帮助你快速创建一个React-redux-antd-moblie webapp工程项目.

Out of the box it comes with support for:

创建完成后它将直接支持以下内容:
- antd-mobile
- react-router
- react-addons-css-transition-group
- redux
- redux-devtools-extension
- redux-logger
- redux-thunk
- redux-immutable
- Webpack
- ES2015 via Babel-Loader
- ES7 async/await
- isomorphic-fetch
- Style transformations via PostCSS
- Automatic code linting via esLint
- Ability to unit test components via Karma and Mocha/Chai

## Installation
```bash
git clone https://github.com/linkeyd/react-redux-webpack-antd-template.git yourname
npm install
```

### Global npm packages
Install the following packages system wide, to decrease the time needed to scaffold a new project:
```bash
npm install -g phantomjs-prebuilt
```

## Usage
The following commands are available in your project:
```bash
# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Auto-run unit tests on file changes
npm run test:watch

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy
```

### Running Tests
`npm test` or `node node_modules/.bin/mocha`
