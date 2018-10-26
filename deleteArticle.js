let articles = require('./articles.json');
const log = require('./log');

function deleteArticle(req, res, payload, cb) {
    const index = articles.findIndex(article => article.id == payload.id);
    if (index != -1) {
        articles.splice(index, 1);
        log.log('/api/articles/delete', payload);
        cb(null, 'article deleted');
    }
    else {
        cb('error');
    }
}
exports.deleteArticle = deleteArticle;