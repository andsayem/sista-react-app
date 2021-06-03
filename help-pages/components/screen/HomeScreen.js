
import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native'

const HomeScreen = ({ navigation,route }) => { 
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
        <Button
          title="Go to Screen1"
          onPress={() =>
            navigation.navigate('Screen1', { 
                name: 'Home',
                itemId: 1,
                otherParam: 'I am from home screen' })
          }
        />
        <Button
          title="Go to Screen2"
          onPress={() =>
            navigation.navigate('Screen2', { 
                name: 'Home',
                itemId: 2,
                otherParam: 'I am from home screen' 
             })
          }
        /> 
        <Button
          title="Go to Screen3"
          onPress={() =>
            navigation.navigate('Screen3', { 
                name: 'Home',
                itemId: 3,
                otherParam: 'I am from home screen' 
             })
          }
        />  
      </View>  
    )
  }
export default HomeScreen;
const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
})