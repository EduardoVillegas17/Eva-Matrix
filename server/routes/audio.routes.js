const express = require('express');
const path = require('path');
const router = express.Router();
var multer  = require('multer');

const audio = require('../controllers/audio.controller');

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../../sonidos'),
	filename: (req, file, cb) => {
		cb(null, file.originalname.replace(/ /gi, '_'));
	}
});

const upload = multer({ 
    storage, 
    dest: path.join(__dirname, 'sonidos'),
    limits: {fileSize: 100000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /wav/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("El archivo debe ser un audio");
    }
}).array('file');

router.get('/', audio.getList);
router.post('/', upload, (req, res) => {
	res.status(200).send('subido');
})
router.delete('/:id', audio.delete);

module.exports = router;