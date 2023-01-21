const express = require('express')
const path = require('path')
const multer = require('multer')
const { mergedpdfs } = require('./merge') // using the destructuring in the javascript
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.send("<h1>The number of the file is good in the project</h1>")
    res.sendFile(path.join(__dirname + '/templates/index.html'))
})

// app.get('/pdfviewer', (req, res, next) => {
//     res.sendFile(path.join(__dirname, '/public/merged.pdf'))
// })

app.post('/merge', upload.array('pdfs', 100), async (req, res, next) => {
    let arrayOfFiles = req.files
    // console.log(req.files);
    let d;
    for (let i of arrayOfFiles) {
        d = await mergedpdfs(path.join(__dirname, i.path))
    }
    res.sendFile(path.join(__dirname, `/public/mergedFolder/${d}.pdf`), (err) => {
        console.log(err); // if the error is thrown in the given function which the file being not able to send..
    })

    fs.readdir('./public/mergedFolder', (err, files) => {
        // console.log(files); // this will give me list of files in the form of the array.
        for (let file of files) {
            fs.unlink(path.join(__dirname, `/public/mergedFolder/${file}`), err => {
                if (err) {
                    console.log(err);
                }
            })

        }
    })
    fs.readdir('./uploads', (err, files) => {
        // console.log(files); // this will give me list of files in the form of the array.
        for (let file of files) {
            fs.unlink(path.join(__dirname, `/uploads/${file}`), err => {
                if (err) {
                    console.log(err);
                }
            })
        }
    })
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