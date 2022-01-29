import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export function uploadImage(file: File) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const storage = getStorage();

            // create a storage ref
            const storageRef = ref(storage, 'covers/' + file.name);

            // upload file
            const snapshot = await uploadBytes(storageRef, file);

            const downloadURL = await getDownloadURL(snapshot.ref);

            resolve(downloadURL);
        } catch (error: any) {
            reject(error);
        }
    })
}