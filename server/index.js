const express = require('express')
const next = require('next')

const { getDirTree, getBasePath, getPostsInfo, getAllPostsInfo } = require('./lib/exec')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app.prepare()
.then(() => {
	const server = express()

    server.get('/_next*', (req, res) => {
        return handle(req, res)
    })

    server.get('/_webpack*', (req, res) => {
        return handle(req, res)
    })

    server.get('/category*', (req, res) => {
        let param = req.originalUrl.split('/category')[1]
        let basePath = getBasePath()
        let commonQueryParams = {dirJsonTree: getDirTree()}

        //Defending Semantic URL attack
        let targetPath = basePath+param
        if( targetPath.indexOf('//') !== -1 ||
            targetPath.indexOf('..') !== -1) {
            console.log('Wrong url access')
            res.statusCode = 403
            return app.renderError(null, req, res, '/category', req.query)
        }

        let postsInfo
        if(!param || param === '/')
            postsInfo = getAllPostsInfo(basePath)
        else
            postsInfo = getPostsInfo(basePath, param)

        commonQueryParams['postsInfo'] = postsInfo

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
