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

const Emergencies = observer(() => {
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
        padding: 10,
        paddingTop: 100,
      }}>
      <ScrollView>
        <View>
          <ApplicationProvider {...eva} theme={eva.light}>
            <TouchableHighlight style={Styles.card}>
              <View>
                <Text category="h5" style={Styles.cardHeader}>
                  Emergencies header Tet
                </Text>
                <Text>
                  Fermentum enim ea rem rutrum voluptates diamlorem mi, metus
                  mi! Excepteur laoreet sapiente torquent wisi! Fermentum
                  aliquid, ullamco bibendum facilisis.
                </Text>
                <View style={Styles.cardfooter}>
                  <Button appearance="ghost" status="info">
                    View
                  </Button>
                </View>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={Styles.card}>
              <View>
                <Text category="h5" style={Styles.cardHeader}>
                  Emergencies header Tet
                </Text>
                <Text>
                  Fermentum enim ea rem rutrum voluptates diamlorem mi, metus
                  mi! Excepteur laoreet sapiente torquent wisi! Fermentum
                  aliquid, ullamco bibendum facilisis.
                </Text>
                <View style={Styles.cardfooter}>
                  <Button appearance="ghost" status="info">
                    View
                  </Button>
                </View>
              </View>
            </TouchableHighlight>
          </ApplicationProvider>
        </View>
      </ScrollView>
    </ImageBackground>
  );
});

export default Emergencies;
