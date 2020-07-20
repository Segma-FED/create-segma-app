# create-segma-app

## 简介

使用不同的模板来初始化一个新的工程。

inspired by [create-vite-app](https://github.com/vitejs/create-vite-app)。

## 仓库地址

```
https://github.com/RanSatious/create-segma-app
```

## 快速开始

```bash
# set the correct registry first
$ npm config set registry http://npm.segma.tech/

$ npm init segma-app <project-name>
$ cd <project-name>
$ npm i
$ npm run dev
```

## 模板

**可用的模板**

-   `vue` (default)
-   `vue3`
-   `typescript`

**注意**

`vue` 、 `vue3` 2 个模板只包含基本的配置，主要是为创建新的 vue 工程提供便利，要为新项目创建正式模板，需使用 [segma-vue-cli](http://npm.segma.tech/-/web/detail/@segma/segma-vue-cli)。

`typescript` 模板作为 [template-typescript](https://github.com/RanSatious/segma-template-typescript) 的替代者，可使用该模板来创建新的 typescript 工程。

**使用指定的模板进行初始化：**

```bash
$ npm init segma-app <project-name> --template typescript
# or
$ npm init segma-app <project-name> -t typescript
```
