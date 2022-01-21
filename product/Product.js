import React, { Component } from "react";
import { View, Text, ScrollView,  SafeAreaView , StyleSheet , 
  Image, 
  TouchableOpacity,
  FlatList} from "react-native";
import api from '../api';
import { SearchBar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {colors , Icon , Header } from 'react-native-elements';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
const TOKEN = 'token';
  class Product extends  Component {   
    constructor(props) {
      super(props); 
      this.fatchData = this.fatchData.bind(this);
      this.state = {
        search: '', 
        destinations:[], 
        book:[], 
        isLoading: false,
        cat_id:'',
        cat_active:'',
        };  
    }  
    componentDidMount(){     
      this.fatchData();  
    }
    fatchData = async () => {  
      this.setState({isLoading:true})    
      api.getData('products')
      .then((response) => {
        let json =  response.data.data ;
        this.setState({destinations:json});
        this.setState({book:json[0]});
      })
      .finally( ()=>this.setState({isLoading: false})) 
    }  
    handleProductDetails = (id) => {
      this.props.navigation.navigate('ProductDetail', {id: id });
    }
    renderDestinations(item, index) {
      var destinationStyle = {};

      if (index == 0) {
        //  destinationStyle = { marginLeft: SIZES.padding, }
      }

      return (
          <TouchableOpacity 
           onPress={() => this.handleProductDetails(item.id)} 
           style={{ paddingRight : 15}} 
          >
              <Image
                  source={item.file ? {uri: item.file } : null} 
                  resizeMode="cover"
                  style={{
                      width: SIZES.width * 0.35,
                      height: 200,
                      borderRadius: 15
                  }}
              />
               <View
                  style={{
                    position : 'absolute',
                    top : 0 ,
                    height : 30  ,
                    width :  60,
                    backgroundColor : 'rgba(0, 0, 0, 0.5)', 
                    borderTopLeftRadius :SIZES.radius,
                    borderBottomRightRadius  : SIZES.radius,
                  
                    //backgroundColor : '#000',
                    alignItems :'center',
                    justifyContent : 'center'
                  }}
                  >
                  <Text style={{ color :  '#ffffff' , opacity :  1 , position : 'absolute'}}>50% off </Text>
              </View>
              <View
                 style={{
                  position : 'absolute',
                  bottom : 0 ,
                  height : 60  ,
                  width :  '100%',
                  backgroundColor : 'rgba(0, 0, 0, 0.5)', 
                  borderBottomLeftRadius :SIZES.radius,
                  borderBottomRightRadius  : SIZES.radius, 
                  alignItems :'flex-start',
                  justifyContent : 'flex-start'
                }}
                >
                <Text  style={{ paddingHorizontal : 10 , paddingVertical : 6 , fontWeight : 'bold', color :  '#ffffff'}} >{item.title}</Text>
                 <Text  style={{ paddingHorizontal : 10 , color :  '#ffffff'}} >
                  Price :  <Text  >{item.price}$</Text >  {item.price_offer}$</Text>
              </View>

              {/* <Text >{item.name}</Text> */}
          </TouchableOpacity>
      )
  }
    render(){
      let {isLoading} = this.state;
      return ( 
      <SafeAreaView style={styles.container}>
        <ScrollView >  
           
            <Header 
                leftComponent={<Icon color={colors.black} size={30} name='menu' 
                onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } ></Icon> }
                centerComponent={{ text: 'Products', style: { color: '#1E1E1E' , fontSize : 20 } }}
                rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
                containerStyle={{   
                  color : '1E1E1E',
                  backgroundColor: '#ffffff' }}
            /> 
             <View style={{ flex: 1, marginTop: SIZES.base, paddingHorizontal: SIZES.padding, }}>
                <SearchBar 
                  lightTheme
                  //  containerStyle={{backgroundColor: '#ffffff' , borderWidth : 0 }}
                  //  iconStyle={{backgroundColor:'#fff'}}
                  //  inputStyle={{backgroundColor: '#ffffff'}}
                  showLoading={false}
                  clearIcon={true} 
                  placeholder="Type Here..."   />
               <Text style={ styles.sectionTitle}>Book</Text>
               <View>
                  <Image
                    source={images.homeBanner} 
                    //resizeMode="cover"
                    style={{
                        width: "100%",
                       // height: "100%",
                        borderRadius: 15,
                    }}
                  />
                  <View
                  style={{
                    position : 'absolute',
                    top : 0 ,
                    height : 30  ,
                    width :  60,
                    backgroundColor : 'rgba(0, 0, 0, 0.5)', 
                    borderTopLeftRadius :SIZES.radius,
                    borderBottomRightRadius  : SIZES.radius,
                  
                    //backgroundColor : '#000',
                    alignItems :'center',
                    justifyContent : 'center'
                  }}
                  >
                  <Text style={{ color :  '#ffffff' , opacity :  1 , position : 'absolute'}}>50% off </Text>
              </View>
              <View
                 style={{
                  position : 'absolute',
                  bottom : 0 ,
                  height : 60  ,
                  width :  '100%',
                  backgroundColor : 'rgba(0, 0, 0, 0.5)', 
                  borderBottomLeftRadius :SIZES.radius,
                  borderBottomRightRadius  : SIZES.radius, 
                  alignItems :'flex-start',
                  justifyContent : 'flex-start'
                }}
                >
                <Text  style={{ paddingHorizontal : 10 , paddingVertical : 6 , fontWeight : 'bold', color :  '#ffffff'}} >{this.state.book.title }</Text>
                 <Text  style={{ paddingHorizontal : 10 , color :  '#ffffff'}} >
                  Price :  <Text  >{this.state.book.price}$</Text >  {this.state.book.price_offer }$</Text>
              </View>
              </View>
            </View> 
              {/* Destination */}
              <View style={{ flex: 1 ,  paddingHorizontal: SIZES.padding }}>
                <Text style={ styles.sectionTitle} >Basic T-Shirt</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.destinations}
                    refreshing={isLoading}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => this.renderDestinations(item, index)}
                />
            </View> 

            <View style={{ flex: 1 ,  paddingHorizontal: SIZES.padding }}>
                <Text style={ styles.sectionTitle} >Blink T-shirt</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.destinations}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => this.renderDestinations(item, index)}
                />
            </View> 


            <View style={{ flex: 1 ,  paddingHorizontal: SIZES.padding }}>
                <Text style={ styles.sectionTitle} >Bracelet</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.destinations}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => this.renderDestinations(item, index)}
                />
            </View> 
            <View style={{ flex: 1 ,  paddingHorizontal: SIZES.padding }}>
                <Text style={ styles.sectionTitle} >Resources & Tool</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.destinations}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => this.renderDestinations(item, index)}
                />
            </View> 
      </ScrollView>
      </SafeAreaView>
    );
  }
}
var styles = StyleSheet.create({
 
shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle : {
    color : '#000000',
    fontSize : 20,
    paddingVertical :17
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator:{
    marginBottom: 20
  }
});

 

export default Product;
