import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from './Claudinary';
import streamifier from 'streamifier';
import { PrismaClient } from "@prisma/client";
import LoginStatus from "../../Middleware/CheckLoginStatus";


const prisma = new PrismaClient();

const router = express.Router();

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary Image Upload Route
router.post('/upload',LoginStatus, upload.single('image'), async (req: MulterRequest, res: Response): Promise<void>  => {
  try {
    if (!req.file) {
       res.status(400).json({ error: 'No file uploaded' });
       return
    }

    const { type } = req.body;
 

    // ✅ Convert Buffer to Readable Stream
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'ServiceSphere',
      use_filename: true, 
      unique_filename: false,  // 🚀 Prevents duplicate copies with different names
      overwrite: true  
     },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return res.status(500).json({ error: error.message });
        }

        console.log('Cloudinary Upload Success:', result?.secure_url);

        if(type === "Professional") {
          const userId = (req as any).user.professionalId;
          await prisma.professionalProfile.update({
            where: { professionalId: userId },
            data: { image: result?.secure_url },
          });
        } else {
          const userId = (req as any).user.customerId;
          await prisma.customerProfile.update({
            where: { customerId: userId },
            data: { image: result?.secure_url },
          });
        }
     
        res.json({ imageUrl: result?.secure_url });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;
