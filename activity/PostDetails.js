import React, { useEffect, useState } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet'; 
import { Icon } from 'react-native-elements'
import Styles from "../styles";
import api from '../api';
function PostDetails({navigation,route}) {
  const { item } = route.params.id;
  const [getPost, setPost] = useState(false);

  const fatchData = async => {
    api.getData('post_datas/'+route.params.id)
    .then((res)=>{
      setPost( res.data.data); 
      console.log('res.data.data',res.data.data); 
    })
    .catch((error) => {
        console.log(error)
    }) 
  };  
  useEffect(() => {
    fatchData();
  }, []);
  //useEffect(() => fatchData(false),[getPost]);
  //const stripedHtml = item.description.replace(/<[^>]+>/g, '');
    return (
      <View  >
         <View
            style={{
              backgroundColor: '#fff' ,
              height: 200,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
            }}
          >
           
          <Image source={getPost.file ? {uri: getPost.file } : null}  
            style={{ width: '100%', borderRadius: 10, height: 200 }}   />
             
            
          </View>
          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
              <Text style={{ textAlign : 'center' , width : '100%'}} >{ getPost.caption }</Text>
             <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              
              <ListItem.Content>
                <ListItem.Title>{ getPost.userjoin ? getPost.userjoin.name : ''} </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{  marginTop: -10 , marginLeft : 80 }}
            >
            <View
                style={{
                  width: 80, 
                }}
              >
                <Text style={{ color : '#a21919'}}> Like </Text>
              </View>
              <View
                style={{ 
                  width: 120,
                }}
              >
                <Text> Reply</Text>
              </View>
            </ScrollView> 
          </View>

          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
                  <ListItem style={{
                    backgroundColor: "#FEFEFE",
                    width: '100%',
                  }}>
                    <Avatar rounded   size="medium" source={require('../img/images/user_2.jpg')} />
                    <ListItem.Content>
                      <ListItem.Title> Chris   </ListItem.Title>
                      <ListItem.Subtitle>  Chairman</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{  marginTop: -10 , marginLeft : 80 }}
                  >
                  <View
                      style={{
                        width: 80, 
                      }}
                    >
                      <Text style={{ color : '#a21919'}}> Like </Text>
                    </View>
                    <View
                      style={{ 
                        width: 120,
                      }}
                    >
                      <Text> Reply</Text>
                    </View>
                  </ScrollView> 
                  <View
                    style={{
                      backgroundColor: '#fff' , 
                      borderRadius: 10,
                      padding: 5,
                      marginBottom :2,
                      marginLeft : 50 ,
                      marginRight :20 
                    }}
                  >
                  <ListItem style={{
                    backgroundColor: "#FEFEFE",
                    width: '100%',
                  }}>
                    <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
                    <ListItem.Content>
                      <ListItem.Title> Chris Jackson </ListItem.Title>
                      <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{  marginTop: -10 , marginLeft : 80 }}
                  >
                  <View
                      style={{
                        width: 80, 
                      }}
                    >
                      <Text style={{ color : '#a21919'}}> Like </Text>
                    </View>
                    <View
                      style={{ 
                        width: 120,
                      }}
                    >
                      <Text> Reply</Text>
                    </View>
                  </ScrollView> 
                </View>
          </View>
     
          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
             <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{  marginTop: -10 , marginLeft : 80 }}
            >
            <View
                style={{
                  width: 80, 
                }}
              >
                <Text style={{ color : '#a21919'}}> Like </Text>
              </View>
              <View
                style={{ 
                  width: 120,
                }}
              >
                <Text> Reply</Text>
              </View>
            </ScrollView> 
          </View>
         
      </View>
    );
}

export default PostDetails;
