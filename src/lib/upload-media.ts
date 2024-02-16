import app from "@/config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadImageToFirebase = async (file: []) => {
  try {
    const storage = getStorage(app);

    const uploadedFileResponse = await Promise.all(
      file.map(async (file: any) => {
        const fileRef = ref(storage, `images/${file.name}`);
        return uploadBytes(fileRef, file);
      })
    );

    const returnUrl = await Promise.all(
      uploadedFileResponse.map(async (response: any) => {
        return getDownloadURL(response.ref);
      })
    );

    return returnUrl;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
