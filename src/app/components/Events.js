import React, { useEffect, useState } from "react";
import { View, ImageBackground, StyleSheet, ScrollView, Text, ToastAndroid } from 'react-native';
import { ListItem, Avatar, colors, Icon, Header } from 'react-native-elements';
import Styles from "../../theme/styles";
import api from '../../providers/api'; 
import { useNavigation } from '@react-navigation/native';
const Events = () => {
    const navigation = useNavigation();
    const [successtext, setSuccesstext] = useState(false);
    const [errortext, setErrortext] = useState(false);
    const [getCats, setCats] = useState([]);
    const getEvents = async => {
        api.getData('events')
            .then((res) => {
                setCats(res.data.data);
            })
            .catch((error) => {
            })
    };
    const Toast = ({ visible, message }) => {
        if (visible) {
            ToastAndroid.showWithGravityAndOffset(
                message,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return null;
        }
        return null;
    };
    const allEvents = () => {
        navigation.navigate("EventsList");
    }
    const EventDetails = (item) => {
        navigation.navigate("EventDetails", { item: item });
    }
    useEffect(() => setSuccesstext(false), [successtext]);
    useEffect(() => setErrortext(false), [errortext]);
    useEffect(() => { getEvents() }, []);
    const getData = (data, type) => {
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
    const formatAMPM = (time) => {
        const myArr = time.split(":");
        var hours = myArr[0];
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        var minutes = myArr[1];
        hours = hours ? hours : 12;
        var strTime = hours + ':' + minutes + '' + ampm;
        return strTime;
    }
    return (
        <View style={{ fontFamily: 'IBMPlexSans-Regular', paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 0, marginBottom: 10, paddingTop: 10 }}>
            <Toast visible={errortext} message={errortext.message} />
            <Toast visible={successtext} message={successtext.message} />

            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={{ fontFamily: 'IBMPlexSans-SemiBold', width: '20%', fontSize: 14, paddingLeft: 5, color: '#535353' }}>Events </Text>
                <Text onPress={allEvents} style={{ fontFamily: 'IBMPlexSans-Medium', textAlign: 'right', fontSize: 13, width: '80%', color: '#535353' }}>See All </Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    marginHorizontal: -10,
                    // paddingEnd: 20,
                    marginRight: -8,
                    marginTop: 1
                }}
            >

                {getCats.map((item, i) => {
                    //var icon = item.bg_style_image == 'event_bg_1.png' ? require('../img/bg/event_bg_1.png') : require('../img/bg/event_bg_2.png');
                    return (
                        <ListItem style={{}} key={item.id} keyExtractor={(item, i) => item.id.toString()} >
                            <ListItem.Content

                                style={{
                                    backgroundColor: "#341BA9",
                                    borderTopLeftRadius: 10,
                                    borderBottomLeftRadius: 10,
                                    height: 100,
                                    width: 80,
                                    // paddingStart: 10,
                                    paddingVertical:20,
                                    color: '#ffffff',
                                    alignItems: 'center'
                                }}>
                                <View
                                    style={{
                                        fontFamily: 'IBMPlexSans-Regular',
                                        borderRadius: 8,
                                        backgroundColor: '#FFFFFF',
                                        height: 80,
                                        width: 55,
                                        paddingTop: 15,
                                        paddingLeft: 6
                                    }} >
                                    <Text style={{
                                        fontFamily: 'IBMPlexSans-Bold',
                                        fontSize: 14,
                                        position: 'absolute',
                                        alignItems: 'flex-end',
                                        textAlign: 'right',
                                        marginTop: 15,
                                        marginLeft:1,
                                        paddingEnd: 0,
                                        color: '#341BA9',
                                        width: '100%'
                                    }}> {getData(item.event_date, 'th')} </Text>
                                    <ListItem.Title
                                        style={{
                                            fontFamily: 'IBMPlexSans-Bold',
                                            color: '#341BA9',
                                            fontSize: 22
                                        }}
                                    > {getData(item.event_date, 'date')}
                                    </ListItem.Title>
                                    <ListItem.Subtitle
                                        style={{ fontFamily: 'IBMPlexSans-Light', color: '#000000', fontSize: 12, textAlign: 'center' }}
                                    > {getData(item.event_date, 'month')} </ListItem.Subtitle>
                                </View>
                            </ListItem.Content>
                            <ListItem.Content
                                style={{
                                    fontFamily: 'IBMPlexSans-Regular',
                                    marginHorizontal: -17,
                                    backgroundColor: "#3D21B2",
                                    borderTopRightRadius: 10,
                                    borderBottomRightRadius: 10,
                                    height: 100,
                                    width: 140,
                                    paddingStart: 5,
                                    color: '#ffffff'
                                }} >
                                <Text
                                    onPress={() => EventDetails(item)}
                                    style={{
                                        fontFamily: 'IBMPlexSans-SemiBold',
                                        color: '#FFFFFF',
                                        marginTop:-10,
                                        paddingTop: 0,
                                        paddingBottom: 5,
                                        fontSize: 14
                                    }} >{item.title}</Text>
                                {/* <Text style={{fontFamily: 'IBMPlexSans-Regular',
                                    color: '#ffffff',
                                }} >  </Text> */}
                                <View style={{paddingBottom:5, fontFamily: 'IBMPlexSans-Regular', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon color="#fff" style={{ fontFamily: 'IBMPlexSans-Regular', padding: 2 }} type='font-awesome' name="clock-o" size={10} />
                                    <Text
                                        onPress={() => EventDetails(item)}
                                        style={{
                                            fontFamily: 'Montserrat-Regular',
                                            paddingLeft: 5,
                                            color: '#ffffff',
                                            fontSize:10,
                                        }} >{formatAMPM(item.event_time)}</Text>
                                </View>
                                <View style={{ fontFamily: 'IBMPlexSans-Regular', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon color="#fff" style={{ fontFamily: 'IBMPlexSans-Regular', padding: 2 }} type='font-awesome' name="map-marker" size={10} />
                                    <Text
                                        onPress={() => EventDetails(item)}
                                        style={{
                                            fontFamily: 'Montserrat-Regular',
                                            paddingLeft: 5,
                                            fontSize:10,
                                            color: '#ffffff',
                                        }} > {item.location}</Text>
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
                }
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    image_bg: {
        flex: 1,
        justifyContent: "center"
    },
});
export default React.memo(Events);