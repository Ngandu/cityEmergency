import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { observer } from "mobx-react-lite";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Modal,
  Input,
  Icon,
  Spinner,
} from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Styles from "../Styles";

import { signInUser } from "./../sdk/FirebaseMethods";

const Signin = observer(({ userstore }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("pngandu@yahoo.com");
  const [password, setPassword] = useState("P@ssword1");

  useEffect(() => {
    // Fetch Products
    console.log("Signin.js");
    setLoading(true);
  }, []);

  const emptyState = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignin = async () => {
    console.log("handleSignin()");
    setLoading(true);
    if (!email) {
      // Alert.alert("Email field is required.");
      setLoading(false);
      return;
    } else if (!password) {
      // Alert.alert("Password field is required.");
      setLoading(false);
      return;
    } else {
      const user = await signInUser(email, password);
      console.log(user);
      if (user) {
        setLoading(false);
        userstore.setUser(user);
      }
      // navigation.navigate("Loading");
    }
  };

  firebase.auth().onAuthStateChanged((user) => {
    setLoading(false);
    console.log("user -", user);
    if (user) {
      emptyState();
      // Update Mobx User and Login
      console.log("setUser");
      userstore.setUser(user);
      //navigation.replace("Home");
    }
  });

  return (
    <ImageBackground
      source={require("../assets/backdrop.jpg")}
      resizeMode="cover"
      style={{ fex: 1, height: "100%" }}
    >
      <ScrollView>
        <View>
          <ApplicationProvider {...eva} theme={eva.light}>
            <View style={Styles.authFormContainer}>
              <Text category="h3" style={Styles.authHeader}>
                HI
              </Text>
              <Input
                size="large"
                placeholder="Email"
                defaultValue={email}
                onChangeText={(text) => setEmail(text)}
                style={Styles.authInput}
              />
              <Input
                size="large"
                placeholder="Password"
                defaultValue={password}
                onChangeText={(text) => setPassword(text)}
                style={Styles.authInput}
                secureTextEntry={true}
              />
              {loading ? (
                <Button
                  style={Styles.authButton}
                  onPress={() => handleSignin()}
                >
                  <ActivityIndicator animating={true} color="white" />
                </Button>
              ) : (
                <Button
                  style={Styles.authButton}
                  onPress={() => handleSignin()}
                >
                  SIGNIN
                </Button>
              )}
              {/* <Button style={Styles.authGoogleButton}>
                <FontAwesome5 name="google" size={14} color="white" /> Sign in
                with Google
              </Button> */}
              <Button
                appearance="ghost"
                status="basic"
                onPress={() => navigation.navigate("SignUp")}
              >
                Or Create a new account
              </Button>
            </View>
          </ApplicationProvider>
        </View>
      </ScrollView>
    </ImageBackground>
  );
});

export default Signin;
