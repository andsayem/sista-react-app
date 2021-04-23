import React, { Component } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet';  
import Styles from "../styles";
function Newpost({navigation}) {
    return ( 
      
        <ScrollView >
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Add', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          /> 
               
          <ListItem>
            <ListItem.Content>
              <Image  source={require("../img/images/1.jpg")}  style={{ width: '100%', borderRadius: 10, height: 160 }}  /> 
            </ListItem.Content> 
          </ListItem>
          <ListItem > 
              <ListItem.Content  > 
                  <ListItem.Content >
                    <ListItem.Title style={{ fontWeight : 'bold'}} >
                      Write a caption  
                    </ListItem.Title> 
                  </ListItem.Content>  
              </ListItem.Content>  
          </ListItem>     
             <View style={styles.textAreaContainer} >
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey" 
                  multiline={true}
                />
              </View>      
         
          <ListItem > 
              <ListItem.Content  > 
                  <ListItem.Content >
                    <ListItem.Title style={{ fontWeight : 'bold'}} >
                      Photo
                    </ListItem.Title> 
                  </ListItem.Content>  
              </ListItem.Content>  
              <ListItem.Content  > 
                  <ListItem.Content >
                    <ListItem.Title  >
                      Video
                    </ListItem.Title> 
                  </ListItem.Content>  
              </ListItem.Content> 
              <ListItem.Content  > 
                  <ListItem.Content >
                    <ListItem.Title  >
                      Text
                    </ListItem.Title> 
                  </ListItem.Content>  
              </ListItem.Content>  
              <ListItem.Content  > 
              </ListItem.Content> 
            </ListItem>

          
            <ListItem>
              <ListItem.Content>
                <Image   source={require("../img/images/1.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
              <ListItem.Content>
                <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
              <ListItem.Content>
                <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
            </ListItem>
            <ListItem>
            <TouchableOpacity
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText} 
               onPress={() => navigation.navigate('Journal_add') }
              >Submit</Text>
            </TouchableOpacity>  
          </ListItem>
          
        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor:  '#efefef',
    borderWidth: 1,  
  },
  textArea: {
    height: 150, 
    
  }
})
export default Newpost;
