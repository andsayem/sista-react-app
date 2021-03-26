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
            centerComponent={{ text: 'Journal', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
      
          <ListItem > 
              <ListItem.Content
                style={{   
                  
                  borderWidth : 1 ,
                  borderRadius : 10  ,
                  height : 180,
                  borderColor : '#efefef',   
                  paddingHorizontal : 10
                  }} 
                  > 
                    <ListItem.Content style={{  
                    overflow: 'hidden', 
                    color : '#ffffff' , 
                    textAlign :'justify' ,
                    margin : 0 ,
                    height : 100 ,  
                    paddingHorizontal : 10
                    }}>
                      <ListItem.Title style={{ fontSize : 18 , fontWeight : 'bold' , paddingBottom : 8}}>
                      True Love Is
                      </ListItem.Title>
                      <Text>Far far away, behind the word mountains, far from the countries.</Text>
                      <ListItem.Title style={{ fontSize : 18  , paddingTop : 8}}>
                      08 September
                      </ListItem.Title>
                    </ListItem.Content> 
                  
                </ListItem.Content>  
                <ListItem.Content
                style={{   
                  
                  borderWidth : 1 ,
                  borderRadius : 10  ,
                  height : 180,
                  borderColor : '#efefef',   
                  paddingHorizontal : 10
                  }} 
                  > 
                    <ListItem.Content style={{  
                    overflow: 'hidden', 
                    color : '#ffffff' , 
                    textAlign :'justify' ,
                    margin : 0 ,
                    height : 100 ,  
                    paddingHorizontal : 10
                    }}>
                      <ListItem.Title style={{ fontSize : 18 , fontWeight : 'bold' , paddingBottom : 8}}>
                      True Love Is
                      </ListItem.Title>
                      <Text>Far far away, behind the word mountains, far from the countries.</Text>
                      <ListItem.Title style={{ fontSize : 18  , paddingTop : 8}}>
                      08 September
                      </ListItem.Title>
                    </ListItem.Content>  
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
