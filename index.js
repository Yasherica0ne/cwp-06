const fs = require('fs');

const { getLog } = require("./getLog");

const { sum } = require("./sum");

const { createArticle } = require("./createArticle");

const { deleteComment } = require("./deleteComment");

const { createComment } = require("./createComment");

const { deleteArticle } = require("./deleteArticle");

const { updateArticle } = require("./updateArticle");

const { read } = require("./read");

const { readAll } = require("./readAll");

const articles = require('./articles.json');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
    '/sum': sum,
    '/api/log': getLog,
    '/api/articles/readall': readAll,
    '/api/articles/read': read,
    '/api/articles/create': createArticle,
    '/api/articles/update': updateArticle,
    '/api/articles/delete': deleteArticle,
    '/api/comments/create': createComment,
    '/api/comments/delete': deleteComment,
};

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);

        handler(req, res, payload, (err, result) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));

                return;
            }

            res.statusCode = 200;
            changeArticles();
            res.end(JSON.stringify(result));
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
    return handlers[url] || notFound;
}

function changeArticles() {
    const file = fs.createWriteStream('articles.json');
    file.write(JSON.stringify(articles));
}

function notFound(req, res, payload, cb) {
    cb({ code: 404, message: 'Not found' });
}

function parseBodyJson(req, cb) {
    let body = [];

    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        let params;
        if (body) {
            params = JSON.parse(body);
        }

        cb(null, params);
    });
}