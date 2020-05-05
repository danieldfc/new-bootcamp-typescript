import { resolve } from 'path';
import crypto from 'crypto';

import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadFolder: resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const filehash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${filehash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
