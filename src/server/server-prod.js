import config from 'config'
import express from 'express'
import fs from 'fs'
import path from 'path'
import compression from 'compression'

const app = express()
app.use(compression())
app.use(express.static(config.buildDir))

app.listen(config.port, () => {
	console.log(`Listening at ${config.host}:${config.port}`)
})
