import React, { Component } from "react";
import { View, Text, ScrollView , StyleSheet , TouchableOpacity , AppRegistry, FlatList, Alert, Platform } from "react-native"; 
import { Avatar, ListItem , Icon , Image , Header} from "react-native-elements"; 

import Styles from "../styles";
function Profile ({navigation}){ 
    return ( <ScrollView>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      
        <View  style={{  backgroundColor: "#FEFEFE",   padding : 10 }}  > 
            <ScrollView
              horizontal 
              style={{ marginRight: 0, width:'100%',  marginTop: 10 }}
            >
               <View style={{ width : 110}} >
                  <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
                  <Text style={{ fontSize : 16 , fontWeight : '600' , paddingBottom : 17}}>Alina Hall </Text> 
                </View> 
                <View style={{ width : 110}} > 
               
                  <Text style={{ fontSize : 16 , fontWeight : '600' , paddingBottom : 17 , borderColor : 'red'}}>Message</Text> 
                </View> 
                <View style={{ width : 110}} > 
                  <Text   style={{    justifyContent:"center",  backgroundColor : '#FF5D8E'  }}>Follow </Text> 
                </View>  

            </ScrollView>
           
            <Text>
                Coventry is a city with a thousand years of history that has plenty to offer the visiting tourist.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
            </Text>  
            <ScrollView   horizontal   style={{ marginRight: 0, width:'100%',  marginTop: 10 }}  > 
              <View  style={{   width: 110,   alignItems : 'center' }} >
                <Text style={{ color : '#1c81b0'}}> 488 </Text>
                <Text style={{ color : '#1c81b0'}}> Photos </Text>
              </View>
              <View style={{  width: 110, alignItems : 'center' }} >
                <Text style={{ color : '#1c81b0'}}> 23423 </Text>
                <Text style={{ color : '#1c81b0'}}> Followers </Text> 
              </View>
              <View  style={{   width: 110, alignItems : 'center'  }}  >
                <Text style={{ color : '#1c81b0'}}> 234243 </Text>
                <Text style={{ color : '#1c81b0'}}> Posts </Text> 
              </View>
            </ScrollView> 
        </View>
        <View  style={{  backgroundColor: "#FEFEFE",   padding : 10 , marginTop: 10 , borderRadius: 10  }}  > 
            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 10 }}  > 
              <View  style={{   width: 210,   alignItems : 'flex-start' }} > 
                <Text style={{ color : '#0D0E10'}}> Videos </Text>
                
              </View> 
              <View  style={{   width: 110, alignItems : 'flex-end'  }}  > 
                <Text style={{ color : '#707070'}}> View all </Text>  
              </View> 
            </ScrollView>

            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 10 }}  > 
              
              <View  style={{   width: 110,   alignItems : 'flex-start' }} > 
               
                <Image
                source={require('../img/images/v1.png')}
                style={{ height: 100, width: 150 , borderRadius: 10 }}
              />
              </View> 
              <View  style={{  width: 220  , alignItems : 'flex-end'  }}  > 
               
                <Image
                source={require('../img/images/v2.png')}
                style={{ height: 100, width: 150 ,  borderRadius: 10 }}
              />
              </View>
            </ScrollView>
            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 20 }}  > 
              <View  style={{   width: 210,   alignItems : 'flex-start' }} > 
                <Text style={{ color : '#0D0E10'}}> Photos </Text>
                
              </View> 
              <View  style={{   width: 110, alignItems : 'flex-end'  }}  > 
                <Text style={{ color : '#707070'}}> View all </Text>  
              </View> 
            </ScrollView>
            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 10 }}  > 
              
              <View  style={{   width: 110,   alignItems : 'flex-start' }} > 
               
                <Image
                source={require('../img/images/photo.png')}
                style={{ height: 150, width: 150 , borderRadius: 10 }}
              />
              </View> 
              <View  style={{  width: 220  , alignItems : 'flex-end'  }}  > 
               
                <Image
                source={require('../img/images/p1.png')}
                style={{ height: 65, width: 150 ,  borderRadius: 10 }}
              />
              <Image
                source={require('../img/images/p1.png')}
                style={{ height: 65, width: 150 , marginTop :15 ,  borderRadius: 10 }}
              />
              </View>
              
            </ScrollView>
        </View>
      </ScrollView>
      );
  }  
  const styles = StyleSheet.create({

    MainContainer :{
    
    justifyContent: 'center',
    flex:1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    
    },
    
    GridViewBlockStyle: {
    
      justifyContent: 'center',
      flex:1,
      alignItems: 'center',
      height: 100,
      margin: 5,
      backgroundColor: '#00BCD4'
    
    }
    ,
    
    GridViewInsideTextItemStyle: {
    
       color: '#fff',
       padding: 10,
       fontSize: 18,
       justifyContent: 'center',
       
     },
    
    });
export default Profile;
