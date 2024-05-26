import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@env';
import {initializeApp} from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import Student from '../models/student';
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const fetchStudentData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const dataList = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return new Student(doc.id, data.firstName, data.lastName, data.email);
    });
    return dataList;
  } catch (error) {
    console.error('Error fetching student data: ', error);
    throw error;
  }
};

export const addStudent = async studentData => {
  try {
    const studentDocRef = doc(
      collection(db, 'students'),
      studentData.id || undefined,
    );
    await setDoc(studentDocRef, {
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      email: studentData.email,
    });
    console.log('Student added with ID: ', studentDocRef.id);
    return new Student(
      studentDocRef.id,
      studentData.firstName,
      studentData.lastName,
      studentData.email,
    );
  } catch (error) {
    console.error('Error adding student: ', error);
    throw error;
  }
};