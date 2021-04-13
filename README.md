# react-tutorial

- [redux](./REDUX.md)
- [react-router-dom]()
- [redux-saga]()

## Update

- `npx react-codemod rename-unsafe-lifecycles --force` 将已 deprecated 生命周期重命名
- `npx react-codemod update-react-imports --force` 移除非毕业 `import React from 'react'`

## 注意
- 使用 `webpack serve --config webpack.config.js --progress --profile --content-base src/` 替代 `webpack-dev-server`，webpack-dev-server 包依然需要
- 执行 `webpack` 命令默认执行 build 构建，需要 `webpack-cli` 包
- 如果使用到 [Generator 语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 则需要在代码入口引入 `import 'regenerator-runtime/runtime'`
- 需要研究 `@babel/preset-env` 的 `useBuiltIns` 选项的使用
- `@babel/polyfills` 已被废弃