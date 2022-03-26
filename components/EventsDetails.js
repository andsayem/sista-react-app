import React, { Component } from "react";
import { Platform, Image, ImageBackground, StyleSheet, FlatList, Text, View, Alert } from "react-native";
import { ListItem, Avatar, SearchBar, colors, Icon, Header } from 'react-native-elements';
import api from '../api';
export default class EventsDetails extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            item:this.props.route.params.item 
        };
    }
    componentDidMount() {
       // this.getEvent();
    }
    // getEvent = async => {
    //     api.getData('events/'+this.props.route.params.id)
    //         .then((res) => {
    //             this.setState({ item: res.data.data });
    //         })
    //         .catch((error) => {
    //         })
    // };
    getData = (data, type) => {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "December"
        ];
        var d = new Date(data);
        var n = new Date(data);
        var date = d.getDate();
        var month = d.getMonth();
        if (type == 'date') {
            return date;
        } else if (type == 'month') {
            return monthNames[month];
        } else if (type == 'th') {
            return (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
        }
    }
    formatAMPM = (time) => {
        const myArr = time.split(":");
        var hours = myArr[0];
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        var minutes = myArr[1];
        hours = hours ? hours : 12;
        var strTime = hours + ':' + minutes + '' + ampm;
        return strTime;
    }
    eventRegister =() => {
        console.log('Text');
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<View>
                        <Icon color={colors.black} size={30} name='menu'
                            onPress={() => props.navigation.toggleDrawer()} ></Icon>
                    </View>}
                    centerComponent={{ text: 'Events', style: { color: '#1E1E1E', fontSize: 20, textAlign: 'left' } }}
                    containerStyle={{ color: '1E1E1E', backgroundColor: '#E4E4E4' }} />
                <View style={{ height: 200 }}>
                    <ImageBackground source={require('../img/bg/event_bg_1.png')} resizeMode="cover" style={styles.image_bg} >
                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}> {this.state.item.title}</Text>
                    </ImageBackground>
                </View>
                <Text style={{ color: '#0D0E10', fontSize: 16, paddingStart: 20, fontWeight: 'bold' }}>{this.state.item.title}</Text>
                <Text style={{ color: '#0D0E10', paddingStart: 20 }} > <Icon style={{ padding: 5 }} type='font-awesome' name="clock-o" size={12} /> {this.state.item.event_time}</Text>
                <Text style={{ color: '#0D0E10', paddingStart: 20 }} > <Icon style={{ padding: 5 }} type='font-awesome' name="clock-o" size={12} /> {this.state.item.event_date}</Text>
                <Text style={{ color: '#0D0E10', paddingStart: 20 }} > <Icon style={{ padding: 5 }} type='font-awesome' name="map-marker" size={12} />{this.state.item.location} </Text>
                <Text style={{ color: '#0D0E10', padding: 20 }} >{this.state.item.details} </Text>

                <View onPress={this.eventRegister()} style={{ textAlign : 'center' , }}>
                    <Image   style={{ alignSelf: 'center' }} source={require('../img/bg/event_register_now.png')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
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
        //backgroundColor: '#6C63FF'
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        padding: 10,
    },
    image_bg: {
        flex: 1,
        justifyContent: "center"
    },
});