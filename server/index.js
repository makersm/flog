const express = require('express');
const next = require('next');
const path = require('path');

const {getBasePath} = require('./lib/exec');
const {renderCategory, renderPost, renderIndex} = require('./lib/render');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const imgReg = new RegExp(/\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$/);


app.prepare()
    .then(() => {
        const server = express();

        server.get('/_next*', (req, res) => {
            return handle(req, res);
        });

        server.get('/_webpack*', (req, res) => {
            return handle(req, res);
        });

        server.route('/category*')
            .get((req, res) => {
                return renderCategory(req, res,
                    (query) => { app.render(req, res, '/category', query); },
                    (err) => { app.render(req, res, '/_error', err); });
            })
            .post((req, res) => {
                return renderCategory(req, res,
                    (query) => { res.json(query); },
                    (err) => { app.render(req, res, '/_error', err); });
            });

        server.route('/post*')
            .get((req, res) => {
                return renderPost(req, res,
                    (query) => { app.render(req, res, '/post', query); },
                    (err) => { app.render(req, res, '/_error', err); })
            })
            .post((req, res) => {
                return renderPost(req, res,
                    (query) => { res.json(query); },
                    (err) => { app.render(req, res, '/_error', err); })
            });

        server.route('/')
            .get((req, res) => {
                return renderIndex(req, res,
                    (query) => { app.render(req, res, '/', query); },
                    (err) => { app.render(req, res, '/_error', err); })
            })
            .post((req, res) => {
                return renderIndex(req, res,
                    (query) => { res.json(query); },
                    (err) => { app.render(req, res, '/_error', err); })
            });

        server.use('/*\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$', (req, res) => {
            let basePath = getBasePath();
            let name = decodeURIComponent(req.originalUrl);
            let postFix = imgReg.exec(name)[1];
            res.set('Content-Type', `image/${postFix}`);
            res.sendFile(path.join(basePath, name));
        });

        server.get('*', (req, res) => {
            return app.render(req, res, '/_error', req.query);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
