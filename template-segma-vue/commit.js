const fs = require('fs');
const path = require('path');
const msgPath = process.env.HUSKY_GIT_PARAMS;

let msg;
try {
    msg = fs.readFileSync(path.resolve(msgPath), 'utf-8').trim();
} catch (error) {
    msg = fs.readFileSync(path.resolve('../', msgPath), 'utf-8').trim();
}
const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,100}/;

if (!commitRE.test(msg)) {
    console.log();
    console.error(
        `  无效的提交信息格式。\n\n` +
            `  请遵守使用规范的提交信息格式，如：\n\n` +
            `    feat(登录): 添加密码提示\n` +
            `    fix(注册): 修复重复提交的问题\n\n` +
            `  参考 http://blog.segma.tech/pages/661f09/#提交规范 获取更多提交信息规范的信息`
    );
    process.exit(1);
}
