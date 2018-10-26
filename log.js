let file = require('./articles.json');

module.exports.log = function log(url, data) {
    const current = new Date();
    let info = {
        date: (current.getDay() + 1) + '.' + (current.getMonth() + 1) + '.' + current.getFullYear() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds(),
        url: url,
        data: JSON.stringify(data)
    };
    file.push(info);
    require('fs').createWriteStream('logfile.json').write(JSON.stringify(file));
}