import admin from '../firebase/nodeApp';

export const getProfileData = async (name) => {
  const db = admin.firestore();
  const profileCollection = db.collection('profile');
  const profileDoc = await profileCollection.doc(name).get();

  if (!profileDoc.exists) {
    return null;
  }

  return profileDoc.data();
};
