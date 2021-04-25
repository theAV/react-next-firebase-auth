import config from './configs';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const fireBaseAuth = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
// const db = 
export default fireBaseAuth;
export {}