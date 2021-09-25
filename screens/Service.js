import React, { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { observer } from "mobx-react-lite";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Text,
  Button,
  Input,
} from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Styles from "../Styles";

import { sendIncedence } from "./../sdk/FirebaseMethods";

import { signInUser } from "./../sdk/FirebaseMethods";

const Service = observer(({ userstore, serviceStore }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch Products
    console.log("Services.js");
    console.log(serviceStore);
  }, []);

  function clearForm() {
    setTitle("");
    setAddress("");
    setMessage("");
    navigation.navigate("Home");
  }

  const sendInc = async () => {
    console.log("sendInc()");
    const incedentData = {
      title,
      address,
      message,
      service: serviceStore.service,
      userid: userstore.user.uid,
      incent_date: new Date(),
      status: "Open",
    };
    const rt = await sendIncedence(incedentData);
    if (rt) {
      alert("Incedent sent");
      clearForm();
    }
  };

  return (
    <ImageBackground
      source={require("../assets/backdrop.jpg")}
      resizeMode="cover"
      style={{ fex: 1, height: "100%" }}
    >
      <ScrollView>
        <View>
          <ApplicationProvider {...eva} theme={eva.light}>
            <View style={Styles.homecontainer}>
              <Text category="h3" style={Styles.authHeader}>
                {serviceStore.service}
              </Text>
              <Input
                size="large"
                placeholder="Title"
                defaultValue={title}
                onChangeText={(text) => setTitle(text)}
                style={Styles.input}
              />
              <Input
                size="large"
                placeholder="Address"
                defaultValue={address}
                onChangeText={(text) => setAddress(text)}
                style={Styles.input}
              />
              <Input
                multiline={true}
                textStyle={{ minHeight: 64 }}
                placeholder="Multiline"
                style={Styles.input}
                defaultValue={message}
                onChangeText={(text) => setMessage(text)}
              />
              <Button style={Styles.authButton} onPress={() => sendInc()}>
                SEND
              </Button>
            </View>
          </ApplicationProvider>
        </View>
      </ScrollView>
    </ImageBackground>
  );
});

export default Service;
