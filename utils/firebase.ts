import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  UploadMetadata,
} from 'firebase/storage';
import { initFirebase } from '../services/firebase';

function getPathStorageFromUrl(url: string) {
  const baseUrlFirestore =
    'https://firebasestorage.googleapis.com/v0/b/portfolio-c6350.appspot.com/o/';
  if (!url.includes(baseUrlFirestore)) return false;

  let imagePath = url.replace(baseUrlFirestore, '');

  const indexOfEndPath = imagePath.indexOf('?');

  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace('%2F', '/');

  return decodeURIComponent(imagePath);
}

export function uploadImage(file: File) {
  const app = initFirebase();

  return new Promise<string>(async (resolve, reject) => {
    try {
      const storage = getStorage(app);

      // create a storage ref
      const storageRef = ref(storage, 'covers/' + file.name);

      // upload file
      const metadata: UploadMetadata = { contentType: file.type };
      const snapshot = await uploadBytes(storageRef, file, metadata);

      const downloadURL = await getDownloadURL(snapshot.ref);

      resolve(downloadURL);
    } catch (error: any) {
      reject(error);
    }
  });
}

export function deleteImage(url: string) {
  const app = initFirebase();

  return new Promise<void>(async (resolve, reject) => {
    try {
      const pathOldImage = getPathStorageFromUrl(url);
      const storage = getStorage(app);

      if (pathOldImage) {
        const storageRef = ref(storage, pathOldImage);

        await deleteObject(storageRef);
        resolve();
      } else {
        reject('Não foi encontrado imagem para deletar.');
      }
    } catch (error: any) {
      reject(error);
    }
  });
}

export function uploadMultiImages(files: File[], path: string = 'images/') {
  const app = initFirebase();

  return new Promise<string[]>(async (resolve, reject) => {
    try {
      const storage = getStorage(app);
      let linkImages: string[] = [];

      for (const file of files) {
        // create a storage ref
        const storageRef = ref(storage, path + file.name);

        // upload file
        const metadata: UploadMetadata = { contentType: file.type };
        const snapshot = await uploadBytes(storageRef, file, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);
        linkImages.push(downloadURL);
      }

      resolve(linkImages);
    } catch (error: any) {
      reject(error);
    }
  });
}

export function deleteMultiImages(urls: string[]) {
  const app = initFirebase();

  return new Promise<void>(async (resolve, reject) => {
    try {
      for (const url of urls) {
        const pathOldImage = getPathStorageFromUrl(url);
        const storage = getStorage(app);

        if (pathOldImage) {
          const storageRef = ref(storage, pathOldImage);

          await deleteObject(storageRef);
        } else {
          reject('Não foi encontrado imagem para deletar.');
        }
      }

      resolve();
    } catch (error: any) {
      reject(error);
    }
  });
}
