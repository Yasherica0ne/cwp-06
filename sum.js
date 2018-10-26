const log = require('./log');

function sum(req, res, payload, cb) {
    const result = { c: payload.a + payload.b };
    log.log('/api/articles/sum', payload);
    cb(null, result);
}
exports.sum = sum;