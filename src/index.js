const { readdir } = require("fs").promises
const { join } = require("path")
const express = require("express")
const app = express()
require("./db/dbconnection")

const routerPath = join(__dirname, "router")

//Auto require all endpoints on the routes directory
readdir(routerPath)
    .then((files) => {
        files.forEach((file) => app.use(require(`./router/${file}`)))
    })
    .catch((e) => console.error(e))

app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`\n=== Server up and running on port: ${PORT} ===\n`)
})
