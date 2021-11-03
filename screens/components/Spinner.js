import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Spinner = () => {
  return (
    <View style={Styles.loading}>
      <ActivityIndicator size="large" animating={true} color="#eebb19" />
    </View>
  );
};

const Styles = StyleSheet.create({
  loading: {
    position: "absolute",
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});

export default Spinner;
