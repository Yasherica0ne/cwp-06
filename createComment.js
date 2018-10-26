let articles = require('./articles.json');
const log = require('./log');

function createComment(req, res, payload, cb) {
    let comment = payload;
    comment.id = Date.now();
    const article = articles.find(article => article.id == payload.articleId);
    if (article) {
        article.comments.push(comment);
        log.log('/api/comments/create', payload);
        cb(null, comment);
    }
    else {
        cb('error');
    }
}
exports.createComment = createComment;