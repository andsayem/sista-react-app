import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native"; 
import { colors, Icon, Header } from 'react-native-elements'; 
class Events extends React.Component {
  render() {
    return (
      <SafeAreaView >
        <Header
          leftComponent={<Icon color={colors.black} size={30} name='menu'
            onPress={() => this.props.navigation.toggleDrawer()} ></Icon>}
          centerComponent={{ text: 'About My Sista\'s KeepHer', style: { fontFamily: 'IBMPlexSans-Regular', color: '#1E1E1E', fontSize: 18 } }}
          rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
          containerStyle={{
            color: '1E1E1E',
            backgroundColor: '#F5F5F5'
          }}
        />

        <View>
          <Text style={{fontFamily : 'IBMPlexSans-Regular',
            padding: 20,
            lineHeight: 30,
          }}>
            <Text
              style={{fontFamily : 'IBMPlexSans-Regular',
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

export default Events;
