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
    <View style={Styles.cat_section}>
      <View style={ Styles.cat_view}>
        {getCats.length > 0}
        <Text style={Styles.cat_section_title }>Category </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={Styles.cat_scrollview} >
        <ListItem style={Styles.cat_list_item} >
          {getCats.length > 0}
          <ListItem key={'all'} style={Styles.cat_all} >
            <ListItem.Content style={Styles.cat_all_listItem} >
              <TouchableOpacity onPress={props.handleAllPost}
                style={[props.cat_id == '' ? Styles.cat_icon_active_style : Styles.cat_icon_style]}
              > 
                <Icon
                  color={props.cat_id == '' ? '#FFFFFF' : '#000000'}
                  name='border-all' />
              </TouchableOpacity>
              <Text style={Styles.cat_all_title} >All</Text>
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
              <Text style={Styles.cat_name} >
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