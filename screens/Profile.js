import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';

import Styles from '../Styles';

const Profile = observer(() => {
  const [Products, setProducts] = useState([]);
  const windowHeight = Dimensions.get('screen').height;

  useEffect(() => {
    // Fetch Products
    console.log('Home');
  }, []);

  return (
    <ImageBackground
      source={require('../assets/backdrop.jpg')}
      resizeMode="cover"
      style={{
        fex: 1,
        height: windowHeight - 50,
      }}>
      <ScrollView>
        <View>
          <ApplicationProvider {...eva} theme={eva.light}>
            <View style={Styles.profileHeader}>
              <Text category="h5" style={Styles.profileName}>
                Full Name
              </Text>
              <Text style={Styles.profileName}>Email@domain.com</Text>
            </View>
            <View style={Styles.profileDetails}>
              <View style={Styles.personalDetails}>
                <Text category="h6">Address</Text>
                <Text>30 Main street Rosettenville</Text>
                <Text category="h6">Cell Phone</Text>
                <Text>078 965 3452</Text>
                <Text category="h6">Residential Number</Text>
                <Text>011 965 3452</Text>
              </View>
              <Text category="h4">Relatives</Text>
              <View style={Styles.card}>
                <Text category="h5">Realted name</Text>
                <Text category="h6">Address</Text>
                <Text>30 Main street Rosettenville</Text>
                <Text category="h6">Cell Phone</Text>
                <Text>078 965 3452</Text>
                <Text category="h6">Residential Number</Text>
                <Text>011 965 3452</Text>
              </View>
              <View style={Styles.card}>
                <Text category="h5">Realted name</Text>
                <Text category="h6">Address</Text>
                <Text>30 Main street Rosettenville</Text>
                <Text category="h6">Cell Phone</Text>
                <Text>078 965 3452</Text>
                <Text category="h6">Residential Number</Text>
                <Text>011 965 3452</Text>
              </View>
            </View>
          </ApplicationProvider>
        </View>
      </ScrollView>
    </ImageBackground>
  );
});

export default Profile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
});
