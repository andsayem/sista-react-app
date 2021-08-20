import React, { useEffect, useState} from "react";
import { View, FlatList ,Text, Image, LogBox, refreshControl, SafeAreaView, Alert , Button ,TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../styles";   
import api from '../api'; 
const Categories = () => {
    const [successtext, setSuccesstext] = useState(false);
    const [errortext, setErrortext] = useState(false);
    const [getCats, setCats] = useState([]);
    const getCategories = async => {
        api.getData('post_categories')
        .then((res)=>{
          setCats( res.data.data);  
        })
        .catch((error) => {
            console.log(error)
        }) 
    };  
    const Toast = ({ visible, message }) => {
        if (visible) {
          ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          return null;
        }
        return null;
    };
    useEffect(() => setSuccesstext(false), [successtext]); 
    useEffect(() => setErrortext(false), [errortext]);
    useEffect(() => getCategories(false),[getCats]); 
    return ( 
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 15 , marginTop : 10}}>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginRight: -30}}
          >
            <ListItem style={{ padding : 0 , margin : 0}} > 
              <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#9253C1", 
              }}
              > 
              <Icon  
                color='#FFFFFF' 
                name='book' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%'}} >All</Text>
              </ListItem.Content>
            </ListItem>

            <ListItem >  
            { getCats.map((item, i) => (
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : 4  , marginLeft  : 3}} > 
              <TouchableOpacity              
                style={{ 
                  justifyContent: "center",
                  height: 66,
                  width: 66,
                  borderRadius: 50,
                  backgroundColor: "#EEEEEE", 
                }}
              > 
              <Icon  
                color='#000000' 
                name={item.cat_image} />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%'}} >{item.cat_name}</Text>
              </ListItem.Content>
            ))
            }
            </ListItem>
          </ScrollView>
        </View> 
    );
};

export default React.memo(Categories);