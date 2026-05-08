import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  get,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2Mb6SERVnydm27AfpEZ9nuUJ_UW_7AF8",
  authDomain: "car-rental-cbb53.firebaseapp.com",
  databaseURL: "https://car-rental-cbb53-default-rtdb.firebaseio.com",
  projectId: "car-rental-cbb53",
  storageBucket: "car-rental-cbb53.appspot.com",
  messagingSenderId: "488253288250",
  appId: "1:488253288250:web:1a4973d2b8bd6bacf66a03",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, onValue, getDatabase, remove, get, update };
