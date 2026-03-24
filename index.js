import express from 'express';
import multer from 'multer';

const app = express();
const storage = multer.diskStorage({
     destination: function (req, file, cd) {
        cd(null, 'upload')
    },
    filename: function (req, file, cd) {
        cd(null, file.originalname)
    },
})
const upload = multer( {storage})
app.get("/", (req, resp) => {
    resp.send(`
            <from action='/upload' method="post" enctype="multipart/from-data">
            <input type="file" name="myfile" />
            <button>Upload file</button>
            </form>
            `)
})

app.post("/upload", upload.single('myfile'), (req, resp) => {
    resp.send({
        massage: 'file uploaded',
        info: null
    })
})

app.listen(5000);