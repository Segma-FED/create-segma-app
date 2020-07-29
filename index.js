#!/usr/bin/env node
const path = require('path');
const childProcess = require('child_process');
const fs = require('fs-extra');
const argv = require('minimist')(process.argv.slice(2));

const ignoreFiles = ['node_modules', 'package.json', 'package-lock.json', 'yarn.lock', 'readme.md', '.npmignore', 'csa.js'];
const renameFiles = {
    _gitignore: '.gitignore',
};

async function init() {
    const targetDir = argv._[0] || '.';
    const cwd = process.cwd();
    const root = path.join(cwd, targetDir);
    console.log(`Scaffolding project in ${root}...`);

    await fs.ensureDir(root);
    const existing = await fs.readdir(root);
    if (existing.length) {
        console.error(`Error: target directory is not empty.`);
        process.exit(1);
    }

    const templateDir = path.join(__dirname, `template-${argv.t || argv.template || 'vue'}`);
    const write = async (file, content) => {
        const targetPath = path.join(root, renameFiles[file] || file);
        if (content) {
            await fs.writeFile(targetPath, content);
        } else {
            console.log('writing', renameFiles[file] || file);
            await fs.copy(path.join(templateDir, file), targetPath);
        }
    };

    const files = await fs.readdir(templateDir);
    for (const file of files.filter(f => !ignoreFiles.includes(f.toLowerCase()))) {
        await write(file);
    }

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
        await write('package.json', JSON.stringify(pkg, null, 4));
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
