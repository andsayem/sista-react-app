import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert } from "react-native";
import { ListItem, Avatar, SearchBar, colors, Icon, Header } from 'react-native-elements';
import api from '../api';
export default class EventsList extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            items: []
        };
    }
    componentDidMount(){  
       this.getEvents(); 
    }
     getEvents = async => {
        api.getData('events')
        .then((res)=>{
            console.log('hhhhhhhhhhhhhhhhhhhh');
            this.setState({items: res.data.data });
          //setCats( res.data.data);  
        })
        .catch((error) => { 
        }) 
    }; 
     getData =(data , type )=>{ 
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "December"
                ];
        var  d  =  new Date(data) ;
        var  n  =  new Date(data) ;
        var date = d.getDate();
        var month =  d.getMonth();
       // var year = new Date().getFullYear();  
       if(type ==  'date'){
        return date  ;
       }else if(type =='month'){
        return  monthNames[month]; 
       }else if( type=='th'){
        return   (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : ''); 
       }  
    }
     formatAMPM = (time) => { 
        const myArr = time.split(":");
        var hours = myArr[0];
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        var minutes =  myArr[1];
        hours = hours ? hours : 12; 
        var strTime = hours + ':' + minutes + '' + ampm;
        return strTime;
      }

    GetGridViewItem(item) {
        Alert.alert(item);
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<View>
                        <Icon color={colors.black} size={30} name='menu'
                            onPress={() => props.navigation.toggleDrawer()} ></Icon>
                    </View>}
                    centerComponent={{ text: 'Events', style: { color: '#1E1E1E', fontSize: 20  , textAlign : 'left'} }} 
                    containerStyle={{ color: '1E1E1E', backgroundColor: '#E4E4E4' }}

                />
                <FlatList
                    style={{ margin: 10 }}
                    data={this.state.items}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewContainer}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }} onPress={this.GetGridViewItem.bind(this, item.key)} >{ item.title }</Text>
                            <Text style={{
                                color: '#ffffff',
                            }} > <Icon color="#fff" style={{ padding: 5 }} type='font-awesome' name="clock-o" size={12} /> { this.formatAMPM(item.event_time) }</Text>
                            <Text style={{
                                color: '#ffffff',
                            }} > <Icon color="#fff" style={{ padding: 5 }} type='font-awesome' name="map-marker" size={12} />{item.location} </Text>

                            <Text style={{ color: '#FFFFFF' }} >{ item.details } It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of</Text>
                            <View
                                style={{
                                    position : 'absolute',
                                    top : 110,
                                    right : 20,
                                    shadowColor : '#f00000', 
                                    borderRadius: 8,
                                    backgroundColor: '#efefef',
                                    height: 60,
                                    width: 55,
                                   
                                }} >
                                <Text style={{
                                    fontSize: 14,
                                    position: 'absolute',
                                    fontWeight: 'bold',
                                    alignItems: 'flex-end',
                                    textAlign: 'right',
                                    marginTop: 15,
                                    paddingEnd: 0,
                                    color: '#341BA9',
                                    width: '100%'
                                }}> {this.getData(item.event_date, 'th')} </Text>
                                <ListItem.Title
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#341BA9',
                                        fontSize: 20
                                    }}
                                > {this.getData(item.event_date, 'date')}
                                </ListItem.Title>
                                <ListItem.Subtitle
                                    style={{ color: '#341BA9', paddingLeft: 5 }}
                                > {this.getData(item.event_date, 'month')} </ListItem.Subtitle>
                            </View>
                        </View>}
                    numColumns={1}
                />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    GridViewContainer: {
        flex: 1,
        padding: 10,
        //    justifyContent: 'center',
        //    alignItems: 'center',
        height: 150,
        margin: 15,
        borderRadius: 10,
        backgroundColor: '#6C63FF'
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        padding: 10,
    }
});