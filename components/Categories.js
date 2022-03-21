import React, { useEffect, useState} from "react";
import { View, FlatList ,Text, Image, LogBox, refreshControl, SafeAreaView, Alert , Button ,TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../styles";   
import api from '../api'; 
const Categories = (props) => {
    const [successtext, setSuccesstext] = useState(false);
    const [errortext, setErrortext] = useState(false);
    const [getCats, setCats] = useState([]);
    const getCategories = async => {
        api.getData('post_categories')
        .then((res)=>{ 
          setCats( res.data.data);  
        })
        .catch((error) => { 
        }) 
    };   
    useEffect(() => getCategories(false),[getCats]); 
    useEffect(() => setSuccesstext(false), [successtext]); 
    useEffect(() => setErrortext(false), [errortext]);
    useEffect(() => {getCategories()},[]);  
    return (   
            <ListItem >  
            { getCats.map((item, i) => (
            <ListItem.Content key={item.id} data={item} keyExtractor={(item , i) => item.id.toString()}  style={{ padding : 0 , margin : 0 , marginRight : 4  , marginLeft  : 3}} > 
              <TouchableOpacity
                onPress={() => props.handlePostCates(item.id)}
                //style={Styles.cat_icon_style}
                style={[props.cat_id == item.id ? Styles.cat_icon_active_style : Styles.cat_icon_style  ]}
              > 
              <Icon 
              color={ props.cat_id == item.id ? '#FFFFFF' : '#000000'} 
               name={item.cat_image} />  
            </TouchableOpacity> 
            <Text style={{ textAlign: 'center', width:'100%', color:'#535353'}} >
              {item.cat_name} </Text>
            </ListItem.Content>
            ))
            }
            </ListItem>
           
    );
};

export default React.memo(Categories);