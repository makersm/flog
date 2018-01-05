const express = require('express')
const next = require('next')

const { getDirTree, getBasePath, getPostsInfo, getAllPostsInfo, getPostInfo, getCurrentPostInfo} = require('./lib/exec')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
	const server = express()
    let imgReg = new RegExp(/\.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$/)

    server.get('/_next*', (req, res) => {
        return handle(req, res)
    })

    server.get('/_webpack*', (req, res) => {
        return handle(req, res)
    })

    server.get('/category*', (req, res) => {
        let param = req.originalUrl.split('/category')[1]
        param = decodeURIComponent(param)
        let basePath = getBasePath()
        let commonQueryParams = {dirJsonTree: getDirTree()}

        //Defending Semantic URL attack
        let targetPath = basePath+param
        if( targetPath.indexOf('//') !== -1 ||
            targetPath.indexOf('../') !== -1) {
            console.log('Wrong url access')
            res.statusCode = 403
            return app.renderError(null, req, res, '/category', req.query)
        }

        let postsInfo
        if(!param || param === '/')
            postsInfo = getAllPostsInfo(basePath)
        else
            postsInfo = getPostsInfo(basePath, param, () => {
                res.statusCode = 404
                return app.renderError(null, req, res, '/category', req.query)
            })

        commonQueryParams['postsInfo'] = postsInfo

        if(req.get('http_x_requested_with')) {
            res.send(commonQueryParams)
        } else {
            return app.render(req, res, '/category', commonQueryParams)
        }
    })

    server.get('/post*', (req, res) => {
        let param = req.originalUrl.split('/post')[1]
        param = decodeURIComponent(param)
        let basePath = getBasePath()

        //Defending Semantic URL attack
        let targetPath = basePath+param
        if( targetPath.indexOf('//') !== -1 ||
            targetPath.indexOf('../') !== -1) {
            console.log('Wrong url access')
            res.statusCode = 403
            return app.renderError(null, req, res, '/post', req.query)
        }

        ////// send img file ///////////////////////////////////////
        if(imgReg.test(param)) {
            let postFix = imgReg.exec(param)[1]
            res.set('Content-Type', `image/${postFix}`)
            res.sendFile(basePath+param)
        }

        ////// send text ////////////////////////////////////////////
        let commonQueryParams = {dirJsonTree: getDirTree()}

        let postInfo
        postInfo = getPostInfo(basePath, param, () => {
            res.statusCode = 404
            return app.renderError(null, req, res, '/post', req.query)
        })

        commonQueryParams['postInfo'] = postInfo

        if(req.get('http_x_requested_with')) {
            res.send(commonQueryParams)
        } else {
            return app.render(req, res, '/post', commonQueryParams)
        }
    })

    server.use('/*.(png|jpg|jpeg|gif|pdf|raw|svg|bmp)$', (req, res) => {
        let basePath = getBasePath()
        let name = req.originalUrl
        let postFix = imgReg.exec(name)[1]
        res.set('Content-Type', `image/${postFix}`)
        res.sendFile(basePath+name)
    })

	server.get('/', (req, res) => {
	    let commonQueryParams = {dirJsonTree: getDirTree(), postInfo: getCurrentPostInfo()}

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
