const express = require('express')
const next = require('next')

const { getDirTree, getRootPath, getPostNames } = require('./lib/exec')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare()
.then(() => {
	const server = express()

    server.get('/_next*', (req, res) => {
        console.log('fuck you'+req.url)
        return handle(req, res)
    })

    server.get('/category*', (req, res) => {
        console.log('hello world')
        let basePath = getRootPath()
        let commonQueryParams = {dirJsonTree: getDirTree()}

        //Defending Semantic URL attack
        if( req.param.id.indexOf('//') !== -1 ||
            req.param.id.indexOf('..') !== -1) {
            console.log('Wrong url access')
            res.statusCode = 403
            return app.renderError(null, req, res, '/category', req.query)
        }

        // commonQueryParams['postNames'] = getPostNames(basePath+req.query.id)

        if(req.get('http_x_requested_with')) {
            return res.send(commonQueryParams)
        } else {
            return app.render(req, res, '/category', commonQueryParams)
        }
    })

	server.get('/', (req, res) => {
        let commonQueryParams = {dirJsonTree: getDirTree()}

		if(req.get('http_x_requested_with')) {
		    return res.send(commonQueryParams)
        } else {
            return app.render(req, res, req.originalUrl, commonQueryParams)
        }
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
