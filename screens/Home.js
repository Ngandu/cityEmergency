import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Modal,
  Input,
} from '@ui-kitten/components';

import Styles from '../Styles';

const Home = observer(() => {
  const [visible, setVisible] = useState(false);
  const windowHeight = Dimensions.get('screen').height;

  useEffect(() => {
    // Fetch Products
    console.log('Home');
  }, []);

  return (
    <ImageBackground
      source={require('../assets/backdrop.jpg')}
      resizeMode="cover"
      style={{fex: 1, height: '100%'}}>
      <ScrollView>
        <View>
          <ApplicationProvider {...eva} theme={eva.light}>
            <View style={[Styles.containerRow, Styles.homecontainer]}>
              <TouchableHighlight
                style={Styles.homeButton}
                onPress={() => setVisible(true)}>
                <Text category="h4" style={Styles.homeButtonText}>
                  Police
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={Styles.homeButton}>
                <Text category="h4" style={Styles.homeButtonText}>
                  Ambulance
                </Text>
              </TouchableHighlight>
            </View>
            <View style={Styles.containerRow}>
              <TouchableHighlight style={Styles.homeButton}>
                <Text category="h4" style={Styles.homeButtonText}>
                  Electricity
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={Styles.homeButton}>
                <Text category="h4" style={Styles.homeButtonText}>
                  Water
                </Text>
              </TouchableHighlight>
            </View>
            <View style={Styles.containerRow}>
              <TouchableHighlight style={Styles.homeButton}>
                <Text category="h4" style={Styles.homeButtonText}>
                  Fire
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={[Styles.homeButton, Styles.panicBtn]}>
                <Text category="h4" style={Styles.homeButtonText}>
                  Panic
                </Text>
              </TouchableHighlight>
            </View>

            {/* Modals */}
            <Modal
              visible={visible}
              backdropStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: windowHeight,
              }}
              onBackdropPress={() => setVisible(false)}>
              <View style={Styles.modalBody}>
                <Text category="h3" style={Styles.centerText}>
                  Alert Police
                </Text>
                <Input style={Styles.input} size="large" placeholder="Small" />

                <Input style={Styles.input} size="large" placeholder="Medium" />

                <Input style={Styles.input} size="large" placeholder="Large" />

                <Input
                  multiline={true}
                  textStyle={{minHeight: 64}}
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
