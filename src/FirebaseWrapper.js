import firebase from './firebase-config';

class FirebaseAuthWrapper{
  constructor(){
    this.auth = firebase.auth();
  }

  getCurrentUserID(){
    return this.auth.currentUser.uid;
  }

  async createUserWithEmailAndPassword(email, password){
    return await this.auth.createUserWithEmailAndPassword(email, password);
  };
  
  async signInWithEmailAndPassword(email, password){
    return await this.auth.signInWithEmailAndPassword(email, password);
  };
  
  async signOut(){
    sessionStorage['userID'] = null; 
    await this.auth.signOut(); 
  }

}

class FirebaseFirestoreWrapper{
  constructor(){
    this.firestore = firebase.firestore()
  }

  async createUser(userID, role, email, name) {
    return await this.firestore.doc(`users/${userID}`).set({
      email: email,
      displayName: name,
      photoURL: '../images/avatar.png',
      createdAt: new Date(),
      role: role
    });
  }


}

class FirebaseWrapper{
  constructor(){
    this.auth = new FirebaseAuthWrapper();
    this.firestore = new FirebaseFirestoreWrapper();
  }
}

export default new FirebaseWrapper();