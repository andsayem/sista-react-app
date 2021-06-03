
import React from 'react';
import {Button, View, Text,StyleSheet} from 'react-native'

function Screen1({navigation, route}){
  const { itemId , otherParam} = route.params;
    return(
      <View style={styles.screen}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <View style={styles.hr}></View>
        <Text style={styles.title}>Screen 1</Text> 
        <Button
          title="Go to Screen 2"
          onPress={() => 
            navigation.navigate('Screen2',{
              name: 'Screen 2',
              itemId: 2,
              otherParam: 'I am from home screen 1' 
            })
          }
        />
        <Button
          title="Go to Screen 3"
          onPress={() => 
            navigation.navigate('Screen3', { 
              name: 'Screen 3',
              itemId: 3,
              otherParam: 'I am from home screen 1' 
             })
          }
        />
        <Button
          title="Go to Home Screen"
          onPress={() => 
            navigation.navigate('HomeScreen', { 
              name: 'Home Screen',
              itemId: 0,
              otherParam: 'I am from home screen 1' 
            })
          }
        /> 
      </View>
    )
}
export default Screen1;
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