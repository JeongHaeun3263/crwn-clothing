import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCbbK0JeVE8fWFx04N0PDgONHpaLXvdhGk",
    authDomain: "crwn-db-84c95.firebaseapp.com",
    databaseURL: "https://crwn-db-84c95.firebaseio.com",
    projectId: "crwn-db-84c95",
    storageBucket: "crwn-db-84c95.appspot.com",
    messagingSenderId: "45330936035",
    appId: "1:45330936035:web:7fc5789512742a54d595d6",
    measurementId: "G-YZM73EYKCQ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    // if userAuth object doesn't exist, we want to exit from the function
    if (!userAuth) return;

    // we are going to query inside a firestore for the document to see if it's already exist.    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // to give us access to this new Google auth provider class from the quthentication library.
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;