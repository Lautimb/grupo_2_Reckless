const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join('public/imgs/products'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/ /g, ""));
  }
})

module.exports = multer({ 
    storage,

    fileFilter: (req, file, cb) => {
		
		const acceptedExt = ['.jpg','.webp','.jpeg','.png', '.gif']
		const ext = path.extname(file.originalname.replace(/ /g, ""))
		
		if(!acceptedExt.includes(ext)){
      
      req.files = [...req.files ,file]
      
		}
		cb(null,acceptedExt.includes(ext));
    }
})