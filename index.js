#!/usr/bin/env node
const path = require('path');
const os = require('os');
const childProcess = require('child_process');
const fs = require('fs-extra');
const argv = require('minimist')(process.argv.slice(2));

const ignoreFiles = ['node_modules', 'package.json', 'package-lock.json', 'yarn.lock', 'readme.md', '.npmignore', 'csa.js'];
const renameFiles = {
    _gitignore: '.gitignore',
};
const extReg = /.(json|js|jsx|ts|tsx|vue|html|css|scss|less|gitignore|md|prettierrc|browserslistrc|eslintignore)$/;
const eolMap = {
    lf: '\n',
    crlf: '\r\n',
    auto: os.EOL,
};

async function init() {
    const targetDir = argv._[0] || '.';
    const cwd = process.cwd();
    const root = path.join(cwd, targetDir);
    console.log(`Scaffolding project in ${root}...`);

    const eol = eolMap[(argv.eol || 'auto').toLowerCase()];
    if (!eol) {
        console.error(`Error: eol must be one of lf | crlf | auto.`);
        process.exit(1);
    }

    await fs.ensureDir(root);
    const existing = await fs.readdir(root);
    if (existing.length) {
        console.error(`Error: target directory is not empty.`);
        process.exit(1);
    }

    const templateDir = path.join(__dirname, `template-${argv.t || argv.template || 'vue'}`);
    const write = async (file, relative, content) => {
        await fs.ensureDir(path.join(root, relative));
        const targetPath = path.join(root, relative, renameFiles[file] || file);

        console.log(content ? 'writing' : 'copying', path.join(relative, renameFiles[file] || file));
        if (content) {
            await fs.writeFile(targetPath, content.replace(/\n/g, eol));
        } else {
            await fs.copy(path.join(templateDir, relative, file), targetPath);
        }
    };

    const read = async (dir, relative) => {
        const files = await fs.readdir(dir);
        for (const file of files.filter(f => !ignoreFiles.includes(f.toLowerCase()))) {
            let stat = await fs.lstat(path.join(dir, file));
            if (stat.isDirectory()) {
                await read(path.join(dir, file), path.join(relative, file));
            } else {
                let content = '';
                if (extReg.test(file) && eol === eolMap.crlf) {
                    content = await fs.readFile(path.join(dir, file), 'utf8');
                }
                await write(file, relative, content);
            }
        }
    };

    await read(templateDir, '');

    const scriptPath = path.join(templateDir, 'csa.js');
    if (fs.existsSync(scriptPath)) {
        await new Promise((resolve, reject) => {
            childProcess.exec(
                `node ${scriptPath}`,
                {
                    encoding: 'utf-8',
                    env: {
                        ...process.env,
                        TARGET: root,
                    },
                },
                (err, stdout) => {
                    console.log(stdout);
                    resolve();
                }
            );
        });
    } else {
        const pkg = require(path.join(templateDir, `package.json`));
        pkg.name = path.basename(root);
        await write('package.json', '', JSON.stringify(pkg, null, 4));
    }

    console.log(`\nDone. Now run:\n`);
    if (root !== cwd) {
        console.log(`  cd ${path.relative(cwd, root)}`);
    }
    console.log(`  npm install`);
    console.log(`  npm run dev`);
    console.log();
}

init().catch(e => {
    console.error(e);
});
