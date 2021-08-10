import React, { Component } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet';  
import Styles from "../styles";
function Journaladd({navigation}) {
    return ( 
      
        <ScrollView >
          <Header 
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Writing Prompts', style: { color: '#fff' } }} 
          />
      
          <ListItem > 
              <ListItem.Content 
                style={{
                  width: 30
                }}
              >  
                    <ListItem.Subtitle>Title : </ListItem.Subtitle> 
              </ListItem.Content>  
              <ListItem.Content
               style={{
                width: 30
              }}>  
                  
                  <ListItem.Input style={{
                    textAlign: 'left'
                  }}  placeholder="Title here" ></ListItem.Input>
                  
              </ListItem.Content>   
            </ListItem>
          
            <ListItem > 
             
              <ListItem.Content >   
                  <ListItem.Input style={{
                    textAlign: 'left'
                  }}  placeholder="Type here" ></ListItem.Input>
                  
              </ListItem.Content>   
            </ListItem>
          
          <ListItem>
            <TouchableOpacity
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText} >Save</Text>
            </TouchableOpacity>

             
          </ListItem>
          
        </ScrollView>
      
    );
}

export default Journaladd;
