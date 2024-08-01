import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(new Error('Formato incorrecto'), false);
    }

    cb(null, true);
  }
});

export default upload;