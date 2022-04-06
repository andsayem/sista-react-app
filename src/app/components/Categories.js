import React, { useEffect, useState } from "react";
import { View,  Text, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Icon } from 'react-native-elements';
import Styles from "../../theme/styles";
import api from '../../providers/api'; 
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
  useEffect(() => setSuccesstext(false), [successtext]);
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => { getCategories() }, []);
  return (
    <View style={{ fontFamily: 'IBMPlexSans-Regular', paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 0, marginBottom: 1, height:160 }}>
      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
        {getCats.length > 0}
        <Text style={{ fontFamily: 'IBMPlexSans-SemiBold',  paddingLeft: 5, width: '100%', fontSize: 14, color: '#535353' }}>Category </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          fontFamily: 'IBMPlexSans-Regular',
          marginHorizontal: -15,
          // paddingEnd: 10,
          marginRight: 5,
          marginTop: 1
        }}
      >
        <ListItem style={{ padding: 0 ,height:100}} >
          {getCats.length > 0}
          <ListItem key={'all'} style={{ padding: -10, margin: 0 }} >
            <ListItem.Content style={{  padding: 0, margin: 0, marginRight: -10, marginLeft: -10 }} >
              <TouchableOpacity onPress={props.handleAllPost}
                style={[props.cat_id == '' ? Styles.cat_icon_active_style : Styles.cat_icon_style]}
              >

                <Icon
                  color={props.cat_id == '' ? '#FFFFFF' : '#000000'}
                  name='border-all' />
              </TouchableOpacity>
              <Text style={{paddingTop:10, textAlign: 'center', width: '100%', color: '#535353' }} >All</Text>
            </ListItem.Content>
          </ListItem>

          {getCats.map((item, i) => (
            <ListItem.Content key={item.id} data={item} keyExtractor={(item, i) => item.id.toString()} style={{  height:55, width:55, padding: 0, margin: 0, marginRight: 10, }} >
              <TouchableOpacity
                onPress={() => props.handlePostCate(item.id)}
                style={[props.cat_id == item.id ? Styles.cat_icon_active_style : Styles.cat_icon_style]}
              >
                <Icon
                  color={props.cat_id == item.id ? '#FFFFFF' : '#000000'}
                  name={item.cat_image} />
              </TouchableOpacity>
              <Text style={{ paddingTop:10,textAlign: 'center', width: '100%', color: '#535353' }} >
                {item.cat_name} </Text>
            </ListItem.Content>
          ))
          }
        </ListItem>
      </ScrollView>
    </View>

  );
};

export default React.memo(Categories);