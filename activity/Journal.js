import React, { Component} from "react";
import { View, FlatList, Text, ActivityIndicator, Button , ImageBackground , SafeAreaView ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, colors, Icon, Header } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet';  
import Styles from "../styles";
import api from '../api';  
import IconAnt from 'react-native-vector-icons/AntDesign'; 
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';
import RBSheet from "react-native-raw-bottom-sheet"; 
  class Journal extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        items:[], 
        numLines : 3 ,
        numColumns : 2 ,
        isLoading: false,
        gridView: true, btnText: 'Show List' 
        };  
      }
      componentDidMount() {
        this.fatchData();
      }
      componentwillmount(){
        this.fatchData();
      }
      fatchData = () => { 
        this.setState({isLoading:true})  
        api.getData('journals')
        .then(response => response.data.data)
        .then(json => this.setState({items:json}))
        .finally( ()=>this.setState({isLoading: false})) 
      } 
      changeView = () => {
        this.setState({ gridView: !this.state.gridView }, () => {
          if (this.state.gridView) {
            this.setState({ btnText: 'Show List' });
          }
          else {
            this.setState({ btnText: 'Show Grid' });
          }
        });
      }

      getData =  (dete) => {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "December"
      ];
      var  d  =  new Date(dete) ;
      var month =  d.getMonth()  ;
     
      var date = d.getDate();
      return  date + ' '+  monthNames[month ];
    }
    onPressJournalDetails = (id) => {
        this.props.navigation.navigate('JournalDetails', {id: id });
    } 

    handlePressAddJurnal = () =>{ 
      this.props.navigation.navigate('Journal_add');
    }
    journalSettings = () =>{ 
      this.props.navigation.navigate("JournalSettings");
    }
    handleOnRefresh = () => { 
      this.setState({page:1, data:[]})
      this.setState({page:1, refreshing:true, seed: this.state.seed+1},() => {
        this.fatchData();
      })
    } 
    state = {                                                                                 
      items: {}                                                                               
      // Other states                                                                         
    } 
    renderRow = ({ item , index }) => { 
      //console.log('itemitemitemitemitemitemitemitemitemitem',index); 
      const { liked, like, props } = item
      return (
        <ListItem   
        style={{
          flex: 1,
          flexDirection: 'column',
          margin: 6,
          borderStyle : 'solid',
          borderWidth : 1,
          borderColor : '#ABABAB',
          borderRadius: 7
         
        }}
       // style={{ padding : 0 ,  margin : 0 , }} 
        >  
              <ListItem.Content> 
                <ListItem.Content 
                   onPress={() => this.onPressJournalDetails(this.item.id)} 
                 style={{   
                  }}>
                  <ListItem.Title style={{ fontSize : 18 , fontWeight : 'bold' , paddingBottom : 8}}>
                  {item.title}
                    </ListItem.Title>
                    <Text numberOfLines={this.state.numLines} > teas : {item.details}</Text>
                    <ListItem.Title style={{ fontSize : 18  , paddingTop : 8}}>
                    { this.getData(item.created_at)}
                    </ListItem.Title>
                  </ListItem.Content>  
              </ListItem.Content>    
          </ListItem> 
      )
    } 
    renderFooter = () => { 
      return(  
          <View>  
            {this.state.isLoading ? (
              <View> 
              <ActivityIndicator size="large" color="#0000ff" /> 
              <Text style={styles.title}>Loading Data..</Text>
              </View>
            ) : (
              <View>  
                {this.state.refreshing ? ( <Text style={styles.title}>Please wait a moment</Text> ) : ( <Text style={styles.title}>No more Data...</Text>)} 
              </View>
            )}
          </View> 
      );
    }
    render(){
      let {items, isLoading} = this.state;
    return (  
         <SafeAreaView>  
           <Header 
              leftComponent={<Icon color={colors.black} size={30} name='menu' 
              onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } ></Icon> }
              centerComponent={{ text: 'Journal', style: { color: '#1E1E1E' , fontSize : 20 } }}
              rightComponent={
                <IconEnt name="dots-three-vertical" size={25} color="#FF5D8F" 
                 onPress ={ ( ) => this.RBSheet.open() } /> 
              }
              containerStyle={{   
                color : '1E1E1E',
                backgroundColor: '#E4E4E4' }}
          />  
           <RBSheet
                  ref={ref => {
                    this.RBSheet = ref;
                  }}
                  height={100}
                  openDuration={250}
                  customStyles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  }}
                > 
                <View style={{width : '100%'}}> 
                  <Text onPress={this.changeView}  style={Styles.share_item}>{this.state.btnText}</Text>
                  <Text onPress={this.journalSettings} style={Styles.share_item}>Settings</Text>
                   
                </View>
                </RBSheet> 
          <FlatList 
           keyExtractor={(item) => item.id}
            style={{
              backgroundColor : '#ffffff'
            }}
            data={Object.values(this.state.items)}
            renderItem={this.renderRow} 
            key={(this.state.gridView) ? 1 : 0}
            numColumns={this.state.gridView ? 2 : 1}
            refreshing={isLoading}
            extraData={this.state}
            ListFooterComponent={this.renderFooter}         
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            onRefresh={this.fatchData}     
          /> 
          
          <ListItem  style={styles.submitButton}>
            <TouchableOpacity
           
              style={Styles.journalBtn}
              activeOpacity={0.5}
              onPress = {this.handlePressAddJurnal} >
              <Text style={Styles.journalText}  
              >Create a new Journal</Text>
            </TouchableOpacity>  
          </ListItem> 
        </SafeAreaView> 
    )
   }
}

const styles = StyleSheet.create({
  submitButton: {
      position: 'absolute',
      bottom:65,
      padding : 0 ,
      margin : 0 ,
    
      left:0,
  },
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

export default Journal;
