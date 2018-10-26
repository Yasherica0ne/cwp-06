let articles = require('./articles.json');
const log = require('./log');
let sort;

function createDateObject(date) {
    const dateObj = new Date
}

function compareNumbers(a, b) {
    return a - b;
}

function compareStrings(a, b) {
    return a.localeCompare(b);
}

function CompareNumbersWithOrder(param1, param2, isAsc) {
    if (isAsc) return compareNumbers(param1, param2);
    else return compareNumbers(param2, param1);
}

function CompareStringsWithOrder(param1, param2, isAsc) {
    if (isAsc) return compareStrings(param1, param2);
    else return compareStrings(param2, param1);
}

function sortById(article1, article2, isAsc) {
    const param1 = article1.id;
    const param2 = article2.id;
    return CompareNumbersWithOrder(param1, param2, isAsc);
}

function sortByTitle(article1, article2, isAsc) {
    const param1 = article1.title;
    const param2 = article2.title;
    return CompareStringsWithOrder(param1, param2, isAsc);
}

function sortByText(article1, article2, isAsc) {
    const param1 = article1.text;
    const param2 = article2.text;
    return CompareStringsWithOrder(param1, param2, isAsc);
}

function sortByDate(article1, article2, isAsc) {
    const param1 = article1.id;
    const param2 = article2.id;
    return CompareNumbersWithOrder(param1, param2, isAsc);
}

function sortByAuthor(article1, article2, isAsc) {
    const param1 = article1.id;
    const param2 = article2.id;
    return CompareStringsWithOrder(param1, param2, isAsc);
}

function SortArticles(sort) {
    let isAsc;
    if (sort.sortOrder === 'asc') isAsc = true;
    else if (sort.sortOrder === 'desc') isAsc = false;
    switch (sort.sortField) {
        case 'id': {
            const sorted = articles.sort((article1, article2) =>
                sortById(article1, article2, isAsc));
            return sorted;
        }
        case 'title': {
            const sorted = articles.sort((article1, article2) =>
                sortByTitle(article1, article2, isAsc));
            return sorted;
        }
        case 'text': {
            const sorted = articles.sort((article1, article2) =>
                sortByText(article1, article2, isAsc));
            return sorted;
        }
        case 'date': {
            const sorted = articles.sort((article1, article2) =>
                sortByDate(article1, article2, isAsc));
            return sorted;
        }
        case 'author': {
            const sorted = articles.sort((article1, article2) =>
                sortByAuthor(article1, article2, isAsc));
            return sorted;
        }
    }
}

function makeResultObject(sortedArticles, sort) {
    const articlesCount = sortedArticles.length;
    const page = parseInt(sort.page);
    const limit = parseInt(sort.limit);
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const resultArticles = sortedArticles.slice(startIndex, endIndex);
    const result = {
        "items": resultArticles,
        "meta": {
            "page": sort.page,
            "pages": articlesCount / sort.limit,
            "count": articlesCount,
            "limit": sort.limit
        }
    }
    return result;
}

function readAll(req, res, payload, cb) {
    log.log('/api/articles/readall', payload);
    sort = payload;
    if (!sort) sort = {
        "sortField": "date",
        "sortOrder": "desc",
        "page": "1",
        "limit": "10",
        "includeDeps": false
    };
    let sortedArticles = SortArticles(sort);
    let articlesResult = [];
    if(!sort.includeDeps) {
        for(let article of sortedArticles){
            const comentless = Object.assign({}, article);
            comentless.comments = null;
            articlesResult.push(comentless);
        }
    }
    else articlesResult = sortedArticles;
    const result = makeResultObject(articlesResult, sort);

    cb(null, result);
}
exports.readAll = readAll;