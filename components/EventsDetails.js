import React, { Component } from "react";
import { Image, ImageBackground, StyleSheet, Text, View, BackHandler } from "react-native";
import { colors, Icon, Header } from 'react-native-elements';
import api from '../api';
import IconAnt from 'react-native-vector-icons/AntDesign';
export default class EventsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.route.params.item,
            img: this.props.route.params.item.bg_style_image == 'event_bg_1.png' ? require('../img/bg/event_bg_1.png') : require('../img/bg/event_bg_2.png')
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    handleBackButtonClick() {
        return true;   // when back button don't need to go back 
    }
    
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
    eventRegister = () => {
        console.log('Textfghjkl=============');
    }
    render() {
        return (
            <View style={styles.container}>
                <Header 
          leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300 , minHeight  : 30}}> 
            <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} />
            <Text style={{ paddingTop : 0 , paddingLeft: 10, marginTop : -5 , textAlign: 'right', fontFamily: 'IBMPlexSans-SemiBold', color: '#000000', fontSize: 18 }}>Events</Text>
          </View>
          } 
          rightComponent={{}}
          containerStyle={{
            fontFamily: 'IBMPlexSans-Regular',
            color: '1E1E1E',
            backgroundColor: '#F5F5F5',
            height : 90
          }} />
                {/* <Header
                    leftComponent={<View>
                        <Icon color={colors.black} size={30} name='menu'
                            onPress={() => props.navigation.toggleDrawer()} ></Icon>
                    </View>}
                    centerComponent={{ text: 'Events', style: { color: '#1E1E1E', fontSize: 20, textAlign: 'left' } }}
                    containerStyle={{ color: '1E1E1E', backgroundColor: '#F5F5F5' }} /> */}
                <View style={{ height: 200 }}>
                    <ImageBackground source={this.state.img} resizeMode="cover" style={styles.image_bg} >
                        <Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}> {this.state.item.title}</Text>
                    </ImageBackground>
                </View>
                <Text style={{ color: '#0D0E10', fontSize: 16, paddingStart: 20, fontWeight: 'bold' }}>{this.state.item.title}</Text>
                <Text style={{ color: '#0D0E10', paddingStart: 20 }} > <Icon style={{ padding: 5 }} type='font-awesome' name="clock-o" size={12} /> {this.state.item.event_time}</Text>
                <Text style={{ color: '#0D0E10', paddingStart: 20 }} > <Icon style={{ padding: 5 }} type='font-awesome' name="clock-o" size={12} /> {this.state.item.event_date}</Text>
                <Text style={{ color: '#0D0E10', paddingStart: 20 }} > <Icon style={{ padding: 5 }} type='font-awesome' name="map-marker" size={12} />{this.state.item.location} </Text>
                <Text style={{ color: '#0D0E10', padding: 20 }} >{this.state.item.details} </Text>

                <View  onPress={() => this.eventRegister()}  style={{ textAlign: 'center', }}>
                    <Image style={{ alignSelf: 'center' }} source={require('../img/bg/event_register_now.png')} />
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