import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAxu_Pqm9bQqcWGxHUmQvQIxHYCnH_rfPA",
    authDomain: "apicafe-6bc7f.firebaseapp.com",
    projectId: "apicafe-6bc7f",
    storageBucket: "apicafe-6bc7f.appspot.com",
    messagingSenderId: "254887461835",
    appId: "1:254887461835:web:89dfe98d614b89aaef2c4e",
    measurementId: "G-ZC8YZHLTVD"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
