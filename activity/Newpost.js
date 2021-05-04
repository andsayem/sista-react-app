import React, { Component, useEffect, useState, createRef } from "react";
import { View, Text, Image, Button , ToastAndroid ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header } from 'react-native-elements'; 
import Styles from "../styles";
import PostNextButton from "../navigation/PostNextButton";
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../components/Loader'; 
 
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};


function Newpost({navigation}) { 
  const [post_caption, setCaption] = useState(false);
  const [category, setCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false);   
  
  useEffect(() => setSuccesstext(false), [successText]);  
  useEffect(() => setErrortext(false), [errortext]);

  useEffect(()=>{
    setErrortext(false);
    setSuccesstext(false);
  },[handleSubmitButton])
  const handleSubmitButton = () => {    
    setErrortext(false);
    if (!post_caption) { 
      setErrortext({message : 'Please fill caption'});  
      return;
    }else{
      setSuccesstext(false);
    }
    setLoading(true); 
    var dataToSend = { 
      user_id: 1,
      post_type: 1,
      caption: post_caption,
      cat_id: category,
      background_id : 1,
      font_style: 'small',
      font_size: 12,
      files_base: ["data:image/png;base64,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"]
    }; 
    console.log('caption Data',dataToSend.caption);
    fetch('http://sista.abdulmazidcse.com/api/post_datas', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend) 
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log('newpost_res',responseJson); 
        // If server response message same as Data Matched
        if (responseJson.success === true) { 
          setSuccesstext({message:'Post Submit Successful'}); 
          setCaption('');
          setCategories('');
          // navigation.replace('Login')
        } else {
          // setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  }; 

    return (       
        <ScrollView >
          <Loader loading={loading} />
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Add', style: { color: '#fff' } }}
            rightComponent={<PostNextButton onPress={()=> navigation.navigate("Newpost_text")  }/>}
          /> 
          <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)}/>
          <Toast visible={successText} message ={successText.message} />
               
          <ListItem>
            <ListItem.Content>
              <Image  source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 190 }}  /> 
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
                  onChangeText={(post_caption) => setCaption(post_caption)} 
                  value={post_caption}
                  blurOnSubmit={true}
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey" 
                  multiline={true}
                />
                </View> 
                <View > 
                </View> 
                <View >
                <DropDownPicker
                  items={[
                        {label: 'Test Cat', value: '1'},
                        {label: 'Test Cat 2', value: '2'},
                        {label: 'Test Cat 3', value: '3'},
                        {label: 'Test Cat 4', value: '4'},
                    ]} 
                    placeholder="Select category"
                    containerStyle={{height: 40, width:280}}
                    style={Styles.DropDown} 
                    itemStyle={{ justifyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setCategories(item.value)}  
                    value={setCategories}
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
                <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
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
             onPress={handleSubmitButton} 
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText}               
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
