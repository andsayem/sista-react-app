import React, { Component } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { colors, Icon, Header } from 'react-native-elements';
//function About({navigation}) {
class Support extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Header
          leftComponent={<Icon color={colors.black} size={30} name='menu'
            onPress={() => this.props.navigation.toggleDrawer()} ></Icon>}
          centerComponent={{ text: 'Support', style: { color: '#1E1E1E', fontSize: 20 } }}
          rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
          containerStyle={{
            color: '1E1E1E',
            backgroundColor: '#E4E4E4'
          }}
        />
        <View>
          <View style={{ textAlign: 'center', paddingTop: 30 }}>
            <Image style={{ alignSelf: 'center' }} source={require('../../img/bg/support.png')} />
          </View>
          <Text style={{ textAlign: 'center', paddingTop: 30, color: '#000000', fontSize: 18, paddingEnd: 25, paddingStart: 25 }}>Did you face any app problem ?
            Feel free to tell us</Text>
        </View>
        <View
          style={{
            paddingStart : 20, 
            borderBottomColor: '#CEC7C7',
            borderBottomWidth: 1 
          }}
        />
      </SafeAreaView>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator: {
    marginBottom: 20
  }
});

export default Support;
