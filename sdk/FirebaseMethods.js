import * as firebase from "firebase";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(
  email,
  password,
  secondname,
  firstname,
  cellphone
) {
  console.log("sdk - registration starts");
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();

    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      lastName: secondname,
      firstName: firstname,
      cellphone: cellphone,
      userid: currentUser.uid,
    });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signInUser(email, password) {
  try {
    console.log(email);
    let usr = await firebase.auth().signInWithEmailAndPassword(email, password);
    return usr;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function updateProfile(UserDetails) {
  console.log("Update User details");
  // console.log("UserDetails", UserDetails);
  // return;
  let updateData = {
    firstName: UserDetails.firstName,
    lastName: UserDetails.lastName,
    cellphone: UserDetails.cellphone,
    email: UserDetails.email,
    userid: UserDetails.userid,
    address: UserDetails.address,
    resNumber: UserDetails.resNumber,
  };
  console.log(updateData);
  try {
    const db = firebase.firestore();
    await db.collection("users").doc(UserDetails.userid).update(updateData);
    return true;
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

/*

    //// RELATIVES SECTION

*/

// Add relatives
export async function saveRelative(relativedata, userid) {
  console.log("adding relative");
  let newrelative = { ...relativedata };
  newrelative["userid"] = userid;

  try {
    const db = firebase.firestore();
    await db.collection("relatives").add(newrelative);
    return true;
  } catch (error) {
    Alert.alert("There is something wrong!", error.message);
  }
}

// Fetch Relatives
export async function fetchRelatives(userid) {
  // return "relatives";
  try {
    const db = firebase.firestore();
    const relatives = await db
      .collection("relatives")
      .where("userid", "==", userid)
      .get();
    return relatives;
  } catch (error) {
    Alert.alert("There is something wrong!", error.message);
  }
}

// remove relative
export async function deleteRelatives(id) {
  try {
    const db = firebase.firestore();
    const ret = await db.collection("relatives").doc(id).delete();
    return ret;
  } catch (error) {
    Alert.alert("There is something wrong!", error.message);
  }
}

export async function registerWithGoogle() {
  console.log("google");
  //return;
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithRedirect(provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log("Error: ", error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

export async function passwordReset(email) {
  try {
    console.log("running....");
    // const send = await firebase.auth().sendPasswordResetEmail(email);
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    console.log(error);
    Alert.alert("There is something wrong!", error.message);
  }
}
