import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const isDemo = process.env.APP_MODE === 'demo' && process.env.NODE_ENV !== 'production';

/**
 * Uploads a file buffer to the configured storage provider.
 * @param {Buffer} fileBuffer 
 * @param {string} fileName 
 * @returns {Promise<{url: string, storageKey: string, size: number}>}
 */
export async function uploadFile(fileBuffer, fileName) {
  if (isDemo) {
    console.log(`[FileStorage] Demo mode active. Mocking upload for ${fileName}`);
    return {
      url: `/mock-storage/${Date.now()}_${fileName}`,
      storageKey: `mock/${fileName}`,
      size: fileBuffer.length
    };
  }

  if (process.env.FILE_STORAGE_PROVIDER === 'cloudinary') {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'buildogram_assets' }, 
        (error, result) => {
          if (error) {
            console.error('[FileStorage] Cloudinary Upload Error:', error);
            return reject(error);
          }
          resolve({
            url: result.secure_url,
            storageKey: result.public_id,
            size: result.bytes
          });
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  throw new Error('Unsupported or missing FILE_STORAGE_PROVIDER configured.');
}

/**
 * Deletes a file from the configured storage provider.
 * @param {string} storageKey 
 */
export async function deleteFile(storageKey) {
  if (isDemo) {
    console.log(`[FileStorage] Demo mode active. Mocking deletion for ${storageKey}`);
    return true;
  }

  if (process.env.FILE_STORAGE_PROVIDER === 'cloudinary') {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(storageKey, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  throw new Error('Unsupported or missing FILE_STORAGE_PROVIDER configured.');
}
