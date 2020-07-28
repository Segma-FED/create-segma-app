const path = require('path');
const fs = require('fs-extra');
const pkg = require('./package.json');
const targetPath = process.env.TARGET;

pkg.files = ['dist'];
pkg.name = path.basename(targetPath);

fs.writeFileSync(path.join(targetPath, 'package.json'), JSON.stringify(pkg, null, 4));
console.log('writing package.json');
