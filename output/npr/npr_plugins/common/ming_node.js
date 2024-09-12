const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const M={};
M.exec = function (comand) {
    let promise = new Promise(function (reslove, reject) {
        child_process.exec(comand, function (err, stdout, stderr) {
            if (err || stderr) console.error(err, stderr);
            reslove(stdout);
        });

    })
    return promise;
}

M.copyFile= (relfile)=>{
    let dir=path.parse(relfile).dir;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let srcText= fs.readFileSync(path.join(CUR_DIR,relfile), "utf-8");
    fs.writeFileSync(relfile,srcText);
    return true;
}
const checkDirectory = function (src, dst, callback) {
    fs.access(dst, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(dst);
            callback(src, dst);
        } else {
            callback(src, dst);
        }
    });
};

M.copyDir = function (src, dst) {
    if (!fs.existsSync(dst)) {
        fs.mkdirSync(dst);
    }
    let paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach(function (path) {
        let _src = src + '/' + path;
        let _dst = dst + '/' + path;
        fs.stat(_src, function (err, stats) {  //stats  该对�? 包含文件属�?
            if (err) throw err;
            if (stats.isFile()) { //如果是个文件则拷�?
                let readable = fs.createReadStream(_src);//创建读取�?
                let writable = fs.createWriteStream(_dst);//创建写入�?
                readable.pipe(writable);
            } else if (stats.isDirectory()) { //是目录则 递归
                checkDirectory(_src, _dst, M.copyDir);
            }
        });
    });
}

module.exports = M;