let articles = require('./articles.json');
const log = require('./log');

function updateArticle(req, res, payload, cb) {
    let article = payload;
    const index = articles.findIndex(article => article.id == payload.id);
    if (index != -1) {
        articles.splice(index, 1, article);
        log.log('/api/articles/update', payload);
        cb(null, 'article updated');
    }
    else {
        cb('error');
    }
}

exports.updateArticle = updateArticle;