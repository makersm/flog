const express = require('express')
const next = require('next')
const { getDirTree, getRootPath } = require('./lib/exec')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
	const server = express()

	server.get('*', (req, res) => {
        const queryParams = { dirJsonTree: getDirTree(), dirPath: getRootPath(), url: getURL()}
		app.render(req, res, req.originalUrl, queryParams)
	})

    server.get('category', (req, res) => {
        const queryParams = { dirJsonTree: getDirTree(), dirPath: getRootPath()}
	    app.render(req, res, req.originalUrl, queryParams)
    })

	server.listen(3000, (err) => {
		if (err) throw err
		console.log('> Ready on http://localhost:3000')
	})
})
.catch((ex) => {
	console.error(ex.stack)
	process.exit(1)
})
