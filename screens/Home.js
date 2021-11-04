import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { observer } from "mobx-react-lite";
import * as Location from "expo-location";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Modal,
  Input,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import { sendIncedence, sendPanicSMS } from "./../sdk/FirebaseMethods";
import Spinner from "./components/Spinner";

import Styles from "../Styles";

const Home = observer(({ userstore, serviceStore }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState({});
  const windowHeight = Dimensions.get("screen").height;
  const [Service, setService] = useState("");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    console.log(userstore.user.uid);
    // Get permission for Coordinate
    (async () => {
      console.log("starta async");
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      let coordinates = {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      };
      console.log("Location: ", coordinates);
      setLocation(coordinates);
    })();
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch Products
    console.log(Service);
  }, [Service]);

  setIncedent = (inc) => {
    serviceStore.setService(inc);
    navigation.navigate("Service");
  };

  // The panic button

  const panicBtn = async () => {
    setLoading(true);
    console.log("panic");
    const incedentData = {
      location,
      service: "Panic",
      userid: userstore.user.uid,
      incent_date: new Date(),
    };
    const rt = await sendIncedence(incedentData);
    if (rt) {
      await sendPanicSMS(location, userstore.user.uid);
      alert(
        "The control center has been notified and your relative contacted!"
      );
      setLoading(false);
    } else {
      setLoading(false);
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
          {loading && <Spinner />}
          <ApplicationProvider {...eva} theme={eva.light}>
            <View style={[Styles.containerRow, Styles.homecontainer]}>
              <TouchableHighlight
                style={Styles.homeButton}
                onPress={() => setIncedent("Police")}
              >
                <Text category="h4" style={Styles.homeButtonText}>
                  Police
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={Styles.homeButton}
                onPress={() => setIncedent("Ambulance")}
              >
                <Text category="h4" style={Styles.homeButtonText}>
                  Ambulance
                </Text>
              </TouchableHighlight>
            </View>
            <View style={Styles.containerRow}>
              <TouchableHighlight
                style={Styles.homeButton}
                onPress={() => setIncedent("Electricity")}
              >
                <Text category="h4" style={Styles.homeButtonText}>
                  Electricity
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={Styles.homeButton}
                onPress={() => setIncedent("Water")}
              >
                <Text category="h4" style={Styles.homeButtonText}>
                  Water
                </Text>
              </TouchableHighlight>
            </View>
            <View style={Styles.containerRow}>
              <TouchableHighlight
                style={Styles.homeButton}
                onPress={() => setIncedent("Fire")}
              >
                <Text category="h4" style={Styles.homeButtonText}>
                  Fire
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[Styles.homeButton, Styles.panicBtn]}
                onPress={() => panicBtn()}
              >
                <Text category="h4" style={Styles.homeButtonText}>
                  Panic
                </Text>
              </TouchableHighlight>
            </View>

            {/* Modals */}
            <Modal
              visible={visible}
              backdropStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: windowHeight,
              }}
              onBackdropPress={() => setVisible(false)}
            >
              <View style={Styles.modalBody}>
                <Text category="h3" style={Styles.centerText}>
                  Alert Police
                </Text>
                <Input style={Styles.input} size="large" placeholder="Small" />

                <Input style={Styles.input} size="large" placeholder="Medium" />

                <Input style={Styles.input} size="large" placeholder="Large" />

                <Input
                  multiline={true}
                  textStyle={{ minHeight: 64 }}
                  placeholder="Multiline"
                  style={Styles.input}
                />
                <Button onPress={() => setVisible(false)}>SEND</Button>
                <Button appearance="outline" onPress={() => setVisible(false)}>
                  CANCEL
                </Button>
              </View>
            </Modal>
          </ApplicationProvider>
        </View>
      </ScrollView>
    </ImageBackground>
  );
});

export default Home;
