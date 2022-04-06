import React from "react";
import { View, Text,  StyleSheet } from "react-native"; 
import { ScrollView } from "react-native-gesture-handler";
import {   Header } from 'react-native-elements';
import IconAnt from 'react-native-vector-icons/AntDesign';
class PrivacyPolicy extends React.Component { 
  constructor(props) {
    super(props);
  }
  render() {
    return ( 
      <ScrollView > 
        <Header
          leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300, minHeight: 30 }}>
            <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} />
            <Text style={{ paddingTop: 0, paddingLeft: 10, marginTop: -5, textAlign: 'right', fontFamily: 'IBMPlexSans-SemiBold', color: '#000000', fontSize: 18 }}>Privacy and Policy</Text>
          </View>
          }
          rightComponent={{}}
          containerStyle={{
            fontFamily: 'IBMPlexSans-Regular',
            color: '1E1E1E',
            backgroundColor: '#F5F5F5',
            height: 90
          }} />
        <View>
          <Text style={{
            fontFamily: 'IBMPlexSans-Regular',
            padding: 20,
            color: '#000000',
            lineHeight: 30,
          }}>
            <Text
              style={{
                fontFamily: 'IBMPlexSans-Regular',
                fontWeight: 'bold'
              }}>It</Text> is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly
          </Text>
        </View> 
      </ScrollView> 
    )
  }
}
var styles = StyleSheet.create({
  container: {
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator: {
    fontFamily: 'IBMPlexSans-Regular',
    marginBottom: 20
  }
});

export default PrivacyPolicy;
