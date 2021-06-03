import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native' 
import { StyleSheet, FlatList, Text, View,Image,SafeAreaView,ScrollView,Button, ActivityIndicator } from 'react-native'; 
import Post from './Post';
const Root = createStackNavigator();
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:'',
      isLoading: true
    };
  }
  componentDidMount() {
    fetch('http://speechbd.com/api/v1/fontend/posts?column=id&direction=desc&per_page=12')
      .then((response) => response.json()) 
      .then((json) => {
        console.log('Hi! Console data');  
        this.setState({ data: json.model });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }   
  ChildView=({childTitle, childId, childDesc, childSlug, childExcerpts, childImg})=>{
    return(
      <ScrollView>
        <View style={{flexDirection:'row', backgroundColor:'white', margin:5, flex:100}}> 
        <ActivityIndicator/>
          <View style={{flex:30}}>
          <Image style={{height:90,width:"100%"}} source={{uri:'http://speechbd.com/public/img/post/large_thumbnail/'+childImg}}/>
          </View>
          <View style={{flex:70,padding:5}}> 
            <Text numberOfLines={1} style={styles.title} 
              onPress={() => 
                this.props.navigation.navigate('Post', { 
                  name: childTitle,
                  itemId: childId,
                  Slug: childSlug,
                  excerpts: childExcerpts,
                  desc: childDesc,
                  img:childImg,
                  otherParam: 'I am from home screen 3' 
                 })
              } >{childTitle}</Text>
            <Text note numberOfLines={2}>{childExcerpts}</Text> 
          </View>
        </View>  
      </ScrollView>    
    )
  } 
  render(){
    const {data, isLoading} = this.state;   
    return(  
      <View>
      {isLoading ? (
        <View style={[styles.activityIndicator]}>  
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text style={styles.title}>Loading Data...</Text>
      </View>
      ) : ( 
        <FlatList 
          data={this.state.data.data}   
          renderItem={({item})=><this.ChildView 
          childTitle={item.title} 
          childId={item.id} 
          childDesc={item.description} 
          childSlug={item.slug} 
          childExcerpts={item.excerpts} 
          childImg={item.featured_img}
          keyExtractor={(item) => item.id.toString()} />}/> 
      )}
    </View>
    );       
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  activityIndicator:{  
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  }
});

export default Posts;