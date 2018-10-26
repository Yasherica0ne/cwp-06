const file = require('./logfile.json');
const log = require('./log');

function getLog(req, res, payload, cb) {
    log.log('/api/log', payload);
    const result = file;
    cb(null, result);
}
exports.getLog = getLog;