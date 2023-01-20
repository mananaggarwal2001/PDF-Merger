const PDFMerger = require('pdf-merger-js');
var merger = new PDFMerger();
const path= require('path')
const mergedpdfs = async (...arr) => {
    for(let i of arr){
        await merger.add(i)
    }
    // await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
    // await merger.add(p2); // merge only page 2
    //save under given name and reset the internal document
    // let date= new Date().getTime()
    await merger.save(path.join(__dirname, `public/merged.pdf`));
    // Export the merged PDF as a nodejs Buffer
    // const mergedPdfBuffer = await merger.saveAsBuffer();
    // fs.writeSync('merged.pdf', mergedPdfBuffer);
};

module.exports= {mergedpdfs}