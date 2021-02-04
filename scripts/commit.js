const co = require('co');
const inquirer = require('inquirer');
const chalk = require('chalk');
const exec = require('child_process').exec;

const commitOptions = [
  {
    name: 'commitType',
    message: '👉 请选择commit类型',
    type: 'list',
    choices: [
      {
        name: 'feature（新功能）',
        value: 'feature'
      },
      {
        name: 'fixbug（修复bug）',
        value: 'fixbug'
      },
      {
        name: 'docs（文档相关）',
        value: 'docs'
      },
      {
        name: 'style（样式相关）',
        value: 'style'
      },
      {
        name: 'refactor（重构）',
        value: 'refactor'
      },
      {
        name: 'test（测试相关）',
        value: 'test'
      },
      {
        name: 'chore（核心模块）',
        value: 'chore'
      },
      {
        name: 'performance（性能相关）',
        value: 'performance'
      }
    ]
  }
];

const commitInput = [
  {
    name: 'commitMsg',
    message: '👉 请输入commit信息',
    type: 'input'
  }
];

co(function*() {
  const { commitType } = yield inquirer.prompt(commitOptions);
  console.log(commitType);
  const tips = getTips(commitType);
  console.log(chalk.yellow(`\n${tips}\n`));
  const { commitMsg } = yield inquirer.prompt(commitInput);
  exec(`git commit -m ${commitMsg}`);
});

const getTips = type => {
  let tips;
  switch (type) {
    case 'feature':
      tips = '输入相关需求名称';
      break;
    case 'fixbug':
      tips = '输入解决的bugId,以横杆或下划线分隔';
      break;
    case 'docs':
      tips = '输入修改文档的文件路径以及修改内容概要';
      break;
    case 'style':
      tips = '输入修改样式的文件路径以及修改内容概要';
      break;
    case 'refactor':
      tips = '输入重构模块的文件路径以及修改内容概要';
      break;
    case 'test':
      tips = '输入相关test的文件路径以及修改内容概要';
      break;
    case 'chore':
      tips = '输入修改核心模块的文件路径以及修改内容概要';
      break;
    case 'performance':
      tips = '输入提升相关性能的模块名称以及修改内容概要';
      break;
    default:
      break;
  }
  return tips;
};
