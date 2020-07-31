const fs = require('fs-extra');
const path = require('path');
const reg = /.(json|js|jsx|ts|tsx|vue|html|css|scss|less|gitignore|md|prettierrc|browserslistrc|eslintignore)$/;
(async () => {
    // let paths = await fs.readdir(path.resolve());
    // for (let i = 0; i < paths.length; i++) {
    //     let stat = await fs.lstat(path.resolve(paths[i]));
    //     console.log(paths[i], stat.isDirectory(), !stat.isDirectory() && reg.test(paths[i]));
    // }
    let content = await fs.readFile(path.join(__dirname, 'template-vue', '.browserslistrc'), 'utf8');
    console.log(content.replace(/\r\n/g, '123'));
    content = await fs.readFile(path.join(__dirname, 'template-vue', '.eslintignore'), 'utf8');
    console.log(content.replace(/\n/g, '123'));
})();
