import React, { Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, FlatList,Image } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);
const newLocal = '#fff';
class TestComponent extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: this.myData,
      isLoading: true
    };
  } 
  myData =[
    {title:'Bangladesh',img:'https://cdn.pixabay.com/photo/2020/10/01/09/35/bee-5618012_960_720.jpg', subtitle:'It is recommended to set accessibility Label.'},
    {title:'Pakistan', img:'https://cdn.pixabay.com/photo/2019/09/24/17/26/metro-4501839_960_720.jpg', subtitle:'It is recommended to set accessibility Label.'},
    {title:'Irac', img:'https://cdn.pixabay.com/photo/2020/10/03/10/56/mountains-5623208_960_720.jpg', subtitle:'It is recommended to set accessibility Label.'},
    {title:'Katar', img:'https://cdn.pixabay.com/photo/2020/10/03/11/08/girl-5623231_960_720.jpg', subtitle:'It is recommended to set accessibility Label.'},
    {title:'Turky', img:'https://cdn.pixabay.com/photo/2020/09/17/05/12/river-5578051_960_720.jpg', subtitle:'It is recommended to set accessibility Label.'},
    {title:'Japan', img:'https://cdn.pixabay.com/photo/2020/04/16/11/41/waterfall-5050298_960_720.jpg', subtitle:'It is recommended to set accessibility Label to help make your app usable by everyone.'},
    {title:'Zarman', img:'https://cdn.pixabay.com/photo/2020/09/29/02/39/aircraft-5611528_960_720.jpg', subtitle:'It is recommended to set accessibility Label to help make your app usable by everyone.'},
    {title:'Italy', img:'https://cdn.pixabay.com/photo/2020/09/29/09/13/sea-5612286_960_720.jpg', subtitle:'It is recommended to set accessibility Label to help make your app usable by everyone.'},
    {title:'Maleisiya', img:'https://cdn.pixabay.com/photo/2020/06/14/17/51/dragonfly-5298749_960_720.jpg', subtitle:'It is recommended to set accessibility Label to help make your app usable by everyone.'},
    {title:'Italy', img:'https://cdn.pixabay.com/photo/2020/09/06/22/11/neptune-5550216_960_720.jpg', subtitle:'It is recommended to set accessibility make your app usable by everyone.'}
  ]; 
  ChildView=({childTitle, childSubTitle,img})=>{
    return(
      <View style={{flexDirection:'column', width:"20%", height:350, backgroundColor:'white', margin:5, flex:200}}> 
         <View>
           <Image style={styles.img} source={{uri:img}}/>
         </View>
         <View >
    <Text style={styles.title} >{childTitle}</Text>
          <Text style={styles.container} >{childSubTitle}</Text>
         </View>
      </View>      
    )
  }
  render(){
    return(
      <FlatList horizontal={true} data={this.state.data} renderItem={({item})=><this.ChildView key={item.key} childTitle={item.title} childSubTitle={item.subtitle} img={item.img}/>}/>
    );       
  }
}
 
const styles = StyleSheet.create({
  container: { 
    justifyContent: 'center', 
    textAlign:'justify',
    backgroundColor:'red',
    height:300
  },
  img: {
    width: 220,
    height: 205,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default TestComponent;
