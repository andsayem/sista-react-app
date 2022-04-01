import React, { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import IconAnt from 'react-native-vector-icons/AntDesign';
import { colors, Icon, Header } from 'react-native-elements';
//function About({navigation}) {
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView >
        <Header
          
          leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300 , minHeight  : 30}}>
            {/* <Icon style={{ textAlign: 'left' }} color={colors.black} size={24} name='arrow-back'
           onPress={() => props.navigation.goBack()} ></Icon> */}
            <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} />
            <Text style={{ paddingTop : 0 , paddingLeft: 10, marginTop : -5 , textAlign: 'right', fontFamily: 'IBMPlexSans-SemiBold', color: '#000000', fontSize: 18 }}>About My Sista's KeepHer</Text>
          </View>
          }
         
          rightComponent={{}}
          containerStyle={{
            fontFamily: 'IBMPlexSans-Regular',
            color: '1E1E1E',
            backgroundColor: '#E4E4E4',
            height : 90
          }}
        />

        <View>
          <Text style={{
            fontFamily: 'IBMPlexSans-Regular',
            padding: 20,
            lineHeight: 30,
            color: '#000000'
          }}>
            <Text
              style={{
                fontFamily: 'IBMPlexSans-Regular',
                fontWeight: 'bold'
              }}>It</Text> is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly
          </Text>
        </View>
      </SafeAreaView>
    );
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
    marginBottom: 20
  }
});

export default About;
