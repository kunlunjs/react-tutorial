/* eslint-disable @typescript-eslint/no-var-requires */
const inquirer = require('inquirer')
const glob = require('glob')
const shelljs = require('shelljs')

const pages = glob
  .sync('**/*.js')
  .filter(
    i =>
      !i.startsWith('build') &&
      !i.startsWith('node_modules') &&
      i !== 'src/index.js' &&
      i !== 'start.js'
  )
  .map(i => i.match(/\/([\w-_]+)(\/|\.)/)[1])

inquirer
  .prompt([
    {
      type: 'list',
      name: 'command',
      message: '选择编译命令：',
      choices: ['start', 'build']
    },
    {
      type: 'list',
      name: 'page',
      message: '选择页面：',
      choices: pages
    }
  ])
  .then(answers => {
    shelljs.exec(
      `cross-env REACT_APP_PAGE=${answers.page} react-scripts ${answers.command}`
    )
  })
