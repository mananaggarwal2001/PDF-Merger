const express = require('express')
const path = require('path')
const multer = require('multer')
const mergedpdfs = require('./merge').mergedpdfs
const upload = multer({ dest: 'uploads/' })
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.send("<h1>The number of the file is good in the project</h1>")
    res.sendFile(path.join(__dirname + '/templates/index.html'))
})

app.get('/pdfviewer', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/public/merged.pdf'))
})

app.post('/merge', upload.array('pdfs', 100), async (req, res, next) => {
    let arrayOfFiles = req.files
    // console.log(req.files);
    for (let i of arrayOfFiles) {
        await mergedpdfs(path.join(__dirname, i.path))
    }
    res.redirect('http://localhost:3000/pdfviewer')
    // res.redirect("http://localhost:3000/static/merged.pdf")
    // res.send({ data: req.files })
})

app.listen(port, (err) => {
    if (err) {
        console.log(`The error is coming on the port number which is :- ${port}`)
    } else {
        console.log(`Server is listening on the port number http://localhost:${port}`)
    }
})