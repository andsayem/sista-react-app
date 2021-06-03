
import React from 'react';
import {Button, View, Text,StyleSheet} from 'react-native'

function Screen2({navigation,route}){
  const { itemId , otherParam} = route.params;
    return(
      <View style={styles.screen}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <View style={styles.hr}></View>
        <Text style={styles.title}>Screen 2</Text> 
        <Button
          title="Go to Screen 1"
          onPress={() => 
            navigation.navigate('Screen1', { 
              name: 'Screen 1',
              itemId: 1,
              otherParam: 'I am from home screen 2' 
             })
          }
        />
        <Button
          title="Go to Screen 3"
          onPress={() => 
            navigation.navigate('Screen3', { 
              name: 'Screen 3',
              itemId: 3,
              otherParam: 'I am from home screen 2' 
             })
          }
        />
        <Button
          title="Go to Home Screen"
          onPress={() => 
            navigation.navigate('HomeScreen', { 
              name: 'Home Screen',
              itemId: 0,
              otherParam: 'I am from home screen 2' 
            })
          }
        />
        <Button
          title="Go Back"
          onPress={() => 
            navigation.goBack()
          }
        />
      </View>
    )
}
export default Screen2;
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