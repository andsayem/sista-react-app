import React, { useEffect} from "react";
import { View, FlatList ,Text, TouchableOpacity, ActivityIndicator} from "react-native";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Icon } from 'react-native-elements';  
import api from '../api'; 
class Categories extends  React.Component{      
  constructor(props) {
    super(props);
    this.state = { 
      items:[], 
      successtext:false, 
      errortext: false, 
      isLoading: false,
      };  
  }   
  fatchData = () => { 
    this.setState({isLoading:true})  
    api.getData('post_categories')
    .then((response) => { 
      this.setState({items:response.data.data})}) 
    .finally(() => this.setState({isLoading: false})) 
  } 

  renderRow = ({ item , index }) => {  
    return(
      <ListItem> 
      <ListItem.Content key={item.id} data={item} keyExtractor={(item , i) => item.id.toString()}  
      style={{marginHorizontal:12,flexWrap: "wrap", padding : 0 , margin : 0 , marginRight : 4  , marginLeft  : 3}}  > 
        <TouchableOpacity 
          style={{ justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#EEEEEE", }}
          > 
          <Icon color='#000000' name={item.cat_image} />  
        </TouchableOpacity> 
        <Text onPress={() => this.props.handlePostCateWise(item.id)} style={{ textAlign : 'center' , width : '100%'}} >{item.cat_name}</Text>
      </ListItem.Content> 
      </ListItem> 
      
    )
  } 
  componentDidMount() {
    this.fatchData();
  }
  async componentwillmount(){
   
    this.fatchData();
  }
  render(){ 
    return ( 
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 15 , marginTop : 10}}>        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -30}} >
          <ListItem key={'all'} style={{ padding : 0 , margin : 0}} > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#944CD4", 
              }}
              > 
              <Icon color='#FFFFFF'  name='book' />  
            </TouchableOpacity> 
            <Text style={{ textAlign: 'center', width: '100%'}} >All</Text>
            </ListItem.Content>
            </ListItem>   
            <FlatList 
              data={Object.values(this.state.items)}
              renderItem={this.renderRow}
              keyExtractor={(item, i) => item.id.toString()}  
              extraData={this.state} 
              onEndReachedThreshold={0.1} 
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }} 
            />   
          </ScrollView>
        </View> 
    );
};
}
export default Categories;