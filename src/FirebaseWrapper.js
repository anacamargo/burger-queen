import firebase from './firebase-config';

class FirebaseAuthWrapper {
  constructor() {
    this.auth = firebase.auth();
  }

  getCurrentUserID() {
    return this.auth.currentUser.uid;
  }

  async createUserWithEmailAndPassword(email, password) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  };

  async signInWithEmailAndPassword(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  };

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        sessionStorage.clear();
        window.location = '/';
      }, function(error) {
        console.error(error);
      });
  }
}

class FirebaseFirestoreWrapper {
  constructor() {
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

  async getUserById(id) {
    const doc = await this.firestore.collection('users').doc(id).get();
    const user = doc.data();
    user['id'] = id;
    return user;
  }

  async createOrder(obj, id) {
    await this.firestore.doc(`orders/${id}`).set({
      employeeID: obj.employeeID,
      employeeName: obj.employeeName,
      clientName: obj.clientName,
      cart: obj.cart,
      total: obj.total,
      timeStamp: obj.timeStamp,
      status: obj.status
    });
  }

  async getOrdersByStatus(status) {
    const dbOrders = await this.firestore.collection('orders').where('status', '==', status).get();
    const orders = [];
    dbOrders.forEach((child) =>{
      let order = child.data();
      order['id'] = child.id;
      orders.push(order);
    });
    return orders;
  }
  
  async changeOrderStatus(id, status) {
    await this.firestore.doc(`orders/${id}`).update({status});
  }
}
  
class FirebaseWrapper {
  constructor() {
    this.auth = new FirebaseAuthWrapper();
    this.firestore = new FirebaseFirestoreWrapper();
  }
}

export default new FirebaseWrapper();