# @segma/template-typescript

## 简介

使用 typescript 编写第三方库的参考模板，包含了基本的开发/打包命令，预先配置好的 tsconfig.json 以及 jest 单元测试环境，基本做到开箱即用。

## 仓库地址

```bash
https://github.com/RanSatious/segma-template-typescript
```

## 快速使用

```bash
# 获取模板
git clone https://github.com/RanSatious/segma-template-typescript.git my-ts-package --depth=1

# 清除模板原有的 git 信息
# linux
rm -rf my-ts-package/.git
# windows
rd /S my-ts-package/.git

# 重新初始化 git 仓库
cd my-ts-package
git init

# 使用 vscode 打开模板
code ./
```

## 开发模式

执行 `npm run dev` 命令可进入开发模式，开发模式主要是使用了 typescript 的 watch 模式，可以对文件的变动实时监听并重新编译。

执行 `npm link` 命令可将开发中的库 link 到全局，供其他项目使用。

```bash
# my-ts-lib
# link
npm link

# unlink
npm unlink

# my-project
# link
# 注意 my-ts-lib 应来源于 package.json 中的 name 属性
npm link my-ts-lib

# unlink
npm unlink my-ts-lib
```

## 单元测试

执行 `npm run test` 命令来执行单元测试，所有的单元测试代码都应放到 tests 目录下，单元测试文件名都应遵循 `*.test.ts` 的命名规则。

更多有关单元测试的信息，可参考 [jest](https://jestjs.io/) 官方网站。

## 打包

执行 `npm run prepack` 命令来将 ts 代码编译为 js 代码并输出到 dist 目录，在发布并执行 `npm publish` 命令时，会先执行 `prepack` 命令来生成发布需要的文件，当然也可以手动执行 `prepack` 命令。

## 参考

-   https://www.typescriptlang.org/
-   https://jestjs.io/
-   https://babeljs.io/
