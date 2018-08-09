#!/usr/bin/env node

const githubRepositories = require('github-repositories');
const mkdirp = require('mkdirp');
const path = require('path');
const download = require('download-git-repo');

githubRepositories(process.argv[process.argv.length-1]).then(data => {
    let reposNumber = data.length;
    let successNumber = 0;
    let errorNumber = 0;
    console.log('Downloading ' + reposNumber + ' files.');
    let time = (new Date()).getTime();
    data.forEach(el => {
        let p = path.join(process.cwd(),time.toString(), el.name);
        mkdirp.sync(p)
        download(el.full_name, p, function (err) {
            if (err) {
                errorNumber++;
                console.log(`Can't download ${el.name}`);
            } else {
                successNumber++
                console.log(`${el.name} downloaded ${successNumber}/${reposNumber}`);
            }
            if (errorNumber + successNumber == reposNumber) {
                console.log(`${successNumber}/${reposNumber} repos downloaded with sucess.`);
            }
        })
    });
}).catch(err => {
    console.error('Can\'t do request to Github', err);
});
