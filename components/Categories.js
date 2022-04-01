import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, LogBox, refreshControl, SafeAreaView, Alert, Button, TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import api from '../api';
const Categories = (props) => {
  const [successtext, setSuccesstext] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [getCats, setCats] = useState([]);
  const getCategories = async => {
    api.getData('post_categories')
      .then((res) => {
        setCats(res.data.data);
      })
      .catch((error) => {
      })
  };
  //useEffect(() => getCategories(false), [getCats]);
  useEffect(() => setSuccesstext(false), [successtext]);
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => { getCategories() }, []);
  return (
    <View style={{fontFamily: 'IBMPlexSans-Regular', paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 0, marginBottom: 1 }}>
      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
      { getCats.length > 0 }
        <Text style={{ fontFamily: 'IBMPlexSans-Regular', paddingStart: 20 , width: '100%', fontSize: 14,   fontWeight: 'bold', color: '#535353' }}>Category </Text> 
      </View>

      <ListItem style={{ padding: -10 ,margin: 0 }} >
        { getCats.length > 0 }
        <ListItem key={'all'} style={{ padding: -10, margin: 0 }} >
          <ListItem.Content style={{ padding: 0, margin: 0, marginRight: -10, marginLeft: -10 }} >
            <TouchableOpacity onPress={props.handleAllPost}
              style={[props.cat_id == '' ? Styles.cat_icon_active_style : Styles.cat_icon_style]}
            >

              <Icon
                color={props.cat_id == '' ? '#FFFFFF' : '#000000'}
                name='border-all' />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', width: '100%', color: '#535353' }} >All</Text>
          </ListItem.Content>
        </ListItem>

      {getCats.map((item, i) => (
          <ListItem.Content key={item.id} data={item} keyExtractor={(item, i) => item.id.toString()} style={{ padding: 0, margin: 0, marginRight: 4, marginLeft: 3 }} >
            <TouchableOpacity
              onPress={() => props.handlePostCate(item.id)}
              style={[props.cat_id == item.id ? Styles.cat_icon_active_style : Styles.cat_icon_style]}
            >
              <Icon
                color={props.cat_id == item.id ? '#FFFFFF' : '#000000'}
                name={item.cat_image} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', width: '100%', color: '#535353' }} >
              {item.cat_name} </Text>
          </ListItem.Content>
        ))
        }  
      </ListItem>
    </View>

  );
};

export default React.memo(Categories);