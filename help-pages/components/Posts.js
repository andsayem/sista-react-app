import React, { Component } from 'react'; 
import { StyleSheet, FlatList, Text, View,Image,SafeAreaView, ScrollView, ActivityIndicator,RefreshControl } from 'react-native';
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { data:[], isLoading: true, page:1, refreshing:false, totalData:0, moreLoading:true };  
  }
  componentDidMount() { 
    this.fatchData(); 
  }  
  componentWillUnmount() {
    this.fatchData();
    this.renderFooter();
  }  
  fatchData = async() => { 
    fetch('https://speechbd.com/api/v1/fontend/posts?column=id&direction=desc&per_page=5&page='+this.state.page)
      .then((response) => response.json()) 
      .then((json) => { 
        if( Number(this.state.totalData) === Number(this.state.data.length) ){
          this.setState({moreLoading:false}) 
        }else{
          this.setState({moreLoading:true}) 
        }
        if(this.state.isLoading){
          this.setState({moreLoading:true})
        }
        
        this.setState({  
          data:this.state.data.concat(json.model.data),  // working...
          totalData:json.model.total, 
          //data:[...this.state.data, ...json.model.data] /// working ...
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false, refreshing:false});
      });
  }
  ChildView=({childData})=>{
    return(
      <ScrollView>
        <View style={{flexDirection:'row', backgroundColor:'white', margin:5, flex:100}}> 
        <ActivityIndicator/>
          <View style={{flex:30}}>
          <Image style={{height:90,width:"100%"}} 
          source={{uri:'https://speechbd.com/public/img/post/large_thumbnail/'+childData.featured_img}}/>
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
  handleLoadMore = () => { 
    this.setState({page: this.state.page + 1},()=>{
      this.fatchData();
    })    
  } 
  renderFooter = () => { 
    return(  
        <View>  
          {this.state.moreLoading ? (
            <View> 
            <ActivityIndicator size="large" color="#0000ff" /> 
            <Text style={styles.title}>Loading Data...</Text>
            </View>
          ) : (
            <View>  
              {this.state.refreshing ? ( <Text style={styles.title}>Please wait a moment</Text> ) : ( <Text style={styles.title}>No more Data...</Text>)} 
            </View>
          )}
        </View>
      
    );
  }
  handleOnRefresh = () => { 
    this.setState({page:1, data:[]})
    this.setState({page:1, refreshing:true, seed: this.state.seed+1},() => {
      this.fatchData();
    })
  }
  render(){  
    return(  
      <View>
      {this.state.isLoading ? (
        <View style={[styles.activityIndicator]}>  
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text style={styles.title}>Loading Data...</Text>
      </View>
      ) : ( 
        <SafeAreaView>
        <FlatList 
          data={this.state.data}   
          keyExtractor={(item) => item.id.toString()} 
          onEndReached={this.handleLoadMore}
          renderItem={({item})=><this.ChildView childData={item} />}         
          ListFooterComponent={this.renderFooter}         
          onEndReachedThreshold={200}
          refreshing={this.state.refreshing}
          onRefresh={this.handleOnRefresh}
           />
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