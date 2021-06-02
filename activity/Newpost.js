import React, { Component, useEffect, useState, createRef } from "react";
import { View, Text , Image, Button , ToastAndroid ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header } from 'react-native-elements'; 
import Styles from "../styles";
import PostNextButton from "../navigation/PostNextButton";
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../components/Loader'; 
import SegmentedControl from '@react-native-community/segmented-control';
import { launchImageLibrary } from 'react-native-image-picker';
import api from '../api';
//import renderIf from './renderIf'
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
  const [index, setIndex] = useState(0);
  const [photo, setPhoto] = useState({uri : ""});
  const [getCats, setCats] = useState([]);

  useEffect(() => setSuccesstext(false), [successText]);  
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => getCategories(false));  
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
      files_base: ["data:"+photo.type+";base64,"+ photo.base64 ]
    }; 
    console.log('caption Data',dataToSend);
    fetch('http://sista.abdulmazidcse.com/api/post_datas', {
      method: 'POST', 
      headers: { 
        Authorization :"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MmU5Njg1Ny00ZmQ4LTQ0N2ItYjEyZC05MGRjMzBlMTU2MTYiLCJqdGkiOiI2MDQwOGNlMmQ4MzkzM2MxNWI1N2VlOWM0ZGZmYTJlZmQyZjFlMTliM2YzOGIwMDkxNjRhOTkwNThkNTEyNzlhNGE0MGU0NWUwNDRhNzMzMiIsImlhdCI6IjE2MjIxNDAwNjkuMzYxMTMxIiwibmJmIjoiMTYyMjE0MDA2OS4zNjExMzQiLCJleHAiOiIxNjUzNjc2MDY5LjM1ODUyMCIsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.A0w81TgcNg-dRAWmxM1dxYgGsgjwjuMnv2oRPbXsZfzqUqawH7uJl9P9iWKQSYIx2uO8SUxdTE2Ky9zray-fHFKW_TF0MPllEyeg6uh0GWDEveHjz8UV3e1W8TzCj9OYcSDjG40ORuKNZrPK2WgrPOzjjyr0w-vhmn4tyBL1XEHlW4gRxRYBjdXBay5LBjSHF_k_7cv_DagK4bscjWYTC5sJpjjYOVIKBj1vyQo6z13s6tAK6DPS899bM89E7AqW_JdUuwI95R6UwVnl1OqFvc0j2DArrHl1XLWa0-iRMseM1k4zibQA10-mzBftuJ-ivfH0zxRQAMg_9U4wIlSkFtNpGF3r93pmdvgvhhoShyEwwvsG8UGr_a3hIq23v2xXBID8flW7239AI__Ss8eDOPoq0A-_B3FFDu2TPVnej7cYl1PS29zi6EtXMVVM2o2hSHKCcY2m5OornonklaUZLrJwWShNG2SchxuLqhAVZsZFoHUjqH6R_451Keke2wyZXNkfprb7MIqiogBkkUWUQtyl5O9qducahbnWwY6CkSNNiLo0rxPhxYYsgQ_oUWUYiYZNhm8FUOIFWMaGQOH56dJVrKAZ-UIU-0Bqt6Zi4FuE6uxjGMHFzbRFT_CYlmC3xE3-F8y_WswE0nqqqYkEe1qnLOGG400I5XQ05mtWXik",
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

  const handleChoosePhoto = () => {
    let options = {
      title: 'Select Image',
      noData: true,
      includeBase64: true
    };
    launchImageLibrary(options, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        console.log('------response');
        console.log(response);
        console.log('response---------');
      }
    });
  };
  const getCategories = async => {
    api.getData('post_categories')
    .then((res)=>{  
        setCats( res.data.data);
    })
    .catch((error) => {
        console.log(error)
    })

    // fetch('http://sista.abdulmazidcse.com/api/post_categories', {
    //   method: 'GET',  
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => { 
    //     setCats(responseJson.data);

    //     console.log('getCatss', getCats);
    //     console.log('newpost_res',responseJson.data);  
    //   })
  };
  ChildViewEliment=()=>{
    if(index == 0){
      return(
        <View> 
            <ListItem >
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
            <ListItem >
            <ListItem.Content>
                <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
              <ListItem.Content>
                <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content>  
              <ListItem.Content>
                <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
             
            </ListItem>
        </View> 
      ) 
    } else if(index == 1){
      return(
        <View> 
        <ListItem >
          
          <ListItem.Content>
            <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
        </ListItem>
    </View> 
      ) 
    }else {
      return(
        <View> 
        <ListItem >
          <ListItem.Content>
            <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
         
          <ListItem.Content>
            <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
        </ListItem>
    </View>
      ) 
    }
  }
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
                <ListItem.Content > 
                <Image 
                  source={{ uri: photo.uri ?  photo.uri : '' }}
                  style={{  width: '100%', height: photo.uri  ? 300 : 0 }}
                />
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
                  items={getCats.map(item=> ({label:item.cat_name,value:item.id}))}  
                    placeholder="Select category"
                    containerStyle={{height: 50, width:'100%'}}
                    style={Styles.DropDown} 
                    itemStyle={{ justifyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setCategories(item.value)}  
                    value={setCategories}
              /> 
              </View>      
         
     

            <SegmentedControl   selectedIndex={index}  values={['Photo', 'Video' , 'Text']}   onChange={(event) =>  {  setIndex(event.nativeEvent.selectedSegmentIndex);  }}  />
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
            { ChildViewEliment() } 
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
