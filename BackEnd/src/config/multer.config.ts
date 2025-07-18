import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { join } from 'path';

export const multerConfig = {
    storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads', 'courses'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            cb(null, filename);
        },
    }),
};
