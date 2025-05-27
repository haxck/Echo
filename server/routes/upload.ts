import { Router } from 'express';
import { upload } from '../middleware/multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const router = Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const outputFilename = req.file.filename.replace(/\.[^/.]+$/, '') + '.webp';
    const outputPath = path.join(__dirname, '../../data/uploads', outputFilename);

    const inputBuffer = await fs.promises.readFile(req.file.path);
    const outputBuffer = await sharp(inputBuffer)
      .webp({ quality: 80, effort: 4 })
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    await fs.promises.writeFile(outputPath, outputBuffer);

    try { await fs.promises.unlink(req.file.path); } catch (e) { console.warn('Could not delete original file:', e); }

    const fileUrl = `/uploads/${outputFilename}`;
    res.json({ url: fileUrl, message: 'Upload and conversion successful' });
  } catch (error) {
    console.error('Upload/conversion error:', error);
    res.status(500).json({ error: 'Upload failed', message: error.message });
  }
});

export default router;