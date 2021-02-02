# segma 前端模板项目

## 项目说明

本项目是关于西格马前端团队使用 Vue 开发项目的模板项目。  
更多请见：[create-segma-app](http://npm.segma.tech/-/web/detail/create-segma-app)

## 运行前须知

-   请检查`public/index.html`中`title`字段修改为项目所需 title
-   请检查`package.json`中`name`和`version`字段修改
-   检查`README.md`中关于项目说明修改

## 安装依赖

```shell
npm install --registry=http://npm.segma.tech/
```

### 本地运行

```shell script
npm run serve
```

### 打包

```shell script
npm run build
```

### Eslint 代码检查

```shell script
npm run lint
```

### Eslint 代码自动修复

```shell script
# 只能修复部分问题，有些问题需要手动修复
npm run lint:fix
```

**Eslint 工具说明：**

-   本项目所用命令默认只会检查`src`目录下所有的`js`和`vue`文件。
-   `.eslintignore`文件默认添加了对`src/assets`目录下所有 js 文件的忽略

### Stylelint 代码检查

```shell script
npm run stylelint
```

### Stylelint 代码自动修复

```shell script
# 只能修复部分问题，有些问题需要手动修复
npm run stylelint:fix
```

**Stylelint 工具说明：**

-   本项目所用命令默认只会检查`src`目录下所有的`html,vue,css,less`文件。
-   在`src/assets`目录下新增样式文件会进行检测，如果有不需要检测（如第三方样式、已经压缩的样式）的文件请添加至`.stylelintignore`
-   如果在`src/assets`目录下添加了需要忽略的文件，但是检查未通过，可以将 package.json 中这段代码暂时删除（删除但不要提交到代码仓库）：

```$json
"src/**/*.{html,css,less,vue}": [
     "stylelint --fix",
     "git add"
 ]
```

### SonarScanner 检查工具

```shell script
npm run sonar
```

**SonarScanner 检查工具说明：**  
[详细说明](https://docs.qq.com/doc/DUmVNQ3JDSEZNRWlU)

## 私有化部署

1. 将`.env.privatization`Vue 应用环境变量文件中的需要动态变化的参数改为`变量名=#变量名`的形式。
2. 在`Dockerfile`文件中添加 docker 运行环境变量。（可选）
3. Vue 应用构建命令`npm run build`。
4. docker 运行命令，通过`-e`指定环境变量:

```shell script
docker run --name DOCKER_NAME -p 8080:80 -e VUE_APP_TEST=TEST  -d IMAGE_NAME:TAG
```

**默认 nginx 代理地址可通过`VUE_APP_SERVER_URL`变量配置，路径格式为完整 url，如`http://127.0.0.1`（地址结尾请勿加`/`）**

## 开发规范

[SEGMA 技术团队-前端开发规范](https://docs.qq.com/doc/DUnVnY0RnemhEdnpC)
