import React, {
    Component,
  } from 'react';
  import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Platform,
    SafeAreaView
  } from 'react-native';
  
  function StatusBarCoolr() { 
    return (
    <SafeAreaView>
        <View>
            <SafeAreaView>
                <StatusBar backgroundColor="#5E8D48" translucent/> 
            </SafeAreaView>
        </View>
    </SafeAreaView>); 
  }
  
export default StatusBarCoolr;