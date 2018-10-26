const fs = require('fs');

module.exports.appJS = (req, res, payload, cb)=>{
    fs.readFile('./data/app.js', (err, data)=>{
        if(!err)
            cb(null, data, 'text/javascript');
        else
            console.error(err);
    })
}

module.exports.formJS = (req, res, payload, cb)=>{
    fs.readFile('./Public/form.js', (err, data)=>{
        if(!err)
            cb(null, data, 'text/javascript');
        else  
            console.error(err);
    })
}

module.exports.getIndexHtml = (req, res, payload, cb)=>{
    fs.readFile('./Public/index.html', (err, data)=>{
        if(!err)
            cb(null, data, 'text/html');
        else
            console.error(err);
    })
}

module.exports.getFormHtml = (req, res, payload, cb)=>{
    fs.readFile('./Public/form.html', (err, data)=>{
        if(!err)
            cb(null, data, 'text/html');
        else
            console.error(err);
    })
}

module.exports.siteCSS = (req, res, payload, cb)=>{
    fs.readFile('./Public/site.css', (err, data)=>{
        if(!err)
            cb(null, data, 'text/css');
        else
            console.error(err);
    })
}