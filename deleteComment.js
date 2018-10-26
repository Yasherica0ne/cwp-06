let articles = require('./articles.json');
const log = require('./log');

function deleteComment(req, res, payload, cb) {
    try {
        let commentD = payload;
        let index;
        const article = articles.find(article => (index = article.comments.findIndex(comment => comment.id == commentD.articleId)) !== -1);
        if (article) {
            article.comments.splice(index, 1);
            log.log('/api/comments/delete', payload);
            cb(null, 'comment deleted');
        }
        else {
            cb('error');
        }
    }
    catch (exception) {
        console.log(exception.message);
    }
}
exports.deleteComment = deleteComment;