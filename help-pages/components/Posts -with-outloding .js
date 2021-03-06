import React, { Component } from 'react'; 
import { StyleSheet, FlatList, Text, View,Image,SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';  
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data:'',
      isLoading: true,
      offset:1
    };  
  }
  componentDidMount() {
    fetch('http://speechbd.com/api/v1/fontend/posts?column=id&direction=desc&per_page=7&page='+this.state.offset)
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
  ChildView=({childData})=>{
    return(
      <ScrollView>
        <View style={{flexDirection:'row', backgroundColor:'white', margin:5, flex:100}}> 
        <ActivityIndicator/>
          <View style={{flex:30}}>
          <Image style={{height:90,width:"100%"}} 
          source={{uri:'http://speechbd.com/public/img/post/large_thumbnail/'+childData.featured_img}}/>
          </View>
          <View style={{flex:70,padding:5}}> 
            <Text numberOfLines={1} style={styles.title} 
              onPress={() => 
                this.props.navigation.navigate('Post', { 
                  item: childData,
                 })
              } >{childData.title}</Text>
            <Text note numberOfLines={2}>{childData.excerpts}</Text> 
          </View>
        </View>  
      </ScrollView>          
    )
  }  
  render(){
    const {isLoading} = this.state;   
    return(  
      <View>
      {isLoading ? (
        <View style={[styles.activityIndicator]}>  
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text style={styles.title}>Loading Data...</Text>
      </View>
      ) : ( 
        <SafeAreaView>
        <FlatList 
          data={this.state.data.data}   
          renderItem={({item})=><this.ChildView 
          childData={item}
          keyExtractor={(item) => item.id.toString()} 
          onEndReachedThreshold={.05} />}/>
          </SafeAreaView>           
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