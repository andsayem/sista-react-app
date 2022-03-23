import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, ToastAndroid } from 'react-native';
import { ListItem, Avatar, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import api from '../api';
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
        // var year = new Date().getFullYear();  
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
        <View style={{ paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 0 }}>
            <Toast visible={errortext} message={errortext.message} />
            <Toast visible={successtext} message={successtext.message} />
            {/* <Text  onPress={() => navigation.navigate('PostDetails', {id: 69 }) } style={Styles.box_title} >
        Events Alert
        </Text>  */}
            <View style={{ backgroundColor: "#FEFEFE", width: '100%' }}>
                <ListItem bottomDivider>
                    <ListItem.Content >
                        <ListItem.Title>
                            <Text style={{ backgroundColor: '#fff', paddingBottom: 0, paddingTop: 14, paddingLeft: 12, color: '#535353' }}>Events </Text>
                        </ListItem.Title>
                    </ListItem.Content>
                    <View>
                        <Text onPress={allEvents} style={{ backgroundColor: '#fff', paddingBottom: 0, paddingTop: 14, paddingLeft: 12, color: '#535353', alignSelf: 'flex-end' }}>See All </Text>
                    </View>
                </ListItem>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                    marginHorizontal: -10,
                    paddingEnd: 20,
                    marginRight: 5,
                    marginTop: 1
                }}
            >

                {getCats.map((item, i) => (
                    <ListItem key={item.id} keyExtractor={(item, i) => item.id.toString()} >
                        <ListItem.Content
                            style={{
                                backgroundColor: "#341BA9",
                                borderTopLeftRadius: 20,
                                borderBottomLeftRadius: 20,
                                height: 100,
                                width: 70,
                                paddingStart: 10,
                                color: '#ffffff',
                                alignItems: 'center',
                                paddingHorizontal: 10
                            }}>
                            <View
                                style={{
                                    borderRadius: 8,
                                    backgroundColor: '#FFFFFF',
                                    height: 80,
                                    width: 55,
                                    paddingTop: 15,
                                    paddingLeft: 6
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
                                }}> {getData(item.event_date, 'th')} </Text>
                                <ListItem.Title
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#341BA9',
                                        fontSize: 20
                                    }}
                                > {getData(item.event_date, 'date')}
                                </ListItem.Title>
                                <ListItem.Subtitle
                                    style={{ color: '#341BA9', paddingLeft: 5 }}
                                > {getData(item.event_date, 'month')} </ListItem.Subtitle>
                            </View>
                        </ListItem.Content>
                        <ListItem.Content
                            style={{
                                marginHorizontal: -17,
                                backgroundColor: "#3D21B2",
                                borderTopRightRadius: 22,
                                borderBottomRightRadius: 22,
                                height: 100,
                                width: 150,
                                paddingStart: 10,
                                color: '#ffffff'
                            }} >
                            <Text
                                style={{
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    paddingTop: 0,
                                    paddingBottom: 3,
                                    fontSize: 16
                                }} >{item.title}</Text>
                            <Text style={{
                                color: '#ffffff',
                            }} > <Icon color="#fff" style={{ padding: 2 }} type='font-awesome' name="clock-o" size={12} />  {formatAMPM(item.event_time)}</Text>
                            <Text style={{
                                color: '#ffffff',
                            }} > <Icon color="#fff" style={{ padding: 2 }} type='font-awesome' name="map-marker" size={12} /> {item.location}</Text>

                        </ListItem.Content>
                    </ListItem>
                ))
                }
            </ScrollView>
        </View>
    );
};

export default React.memo(Events);