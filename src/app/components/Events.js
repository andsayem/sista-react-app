import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, ToastAndroid } from 'react-native';
import { ListItem, Icon} from 'react-native-elements';
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
                style={Styles.event_scroll_view} > 
                {getCats.map((item, i) => {
                    return (
                        <ListItem key={item.id} keyExtractor={(item, i) => item.id.toString()} >
                            <ListItem.Content 
                                style={ Styles.event_date}>
                                <View
                                    style={Styles.event_date_view} >
                                    <Text style={ Styles.event_date_day_month}> {getData(item.event_date, 'th')} </Text>
                                    <ListItem.Title
                                        style={Styles.event_date_title }
                                    > {getData(item.event_date, 'date')}
                                    </ListItem.Title>
                                    <ListItem.Subtitle
                                        style={ Styles.event_date_month_name}
                                    > {getData(item.event_date, 'month')} </ListItem.Subtitle>
                                </View>
                            </ListItem.Content>
                            <ListItem.Content
                                style={Styles.event_info} >
                                <Text
                                    onPress={() => EventDetails(item)}
                                    style={Styles.event_title} >{item.title}</Text>
                                <View style={{paddingBottom:5, fontFamily: 'IBMPlexSans-Regular', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Icon color="#fff" style={{ fontFamily: 'IBMPlexSans-Regular', padding: 2 }} type='font-awesome' name="clock-o" size={10} />
                                    <Text
                                        onPress={() => EventDetails(item)}
                                        style={Styles.event_time } >{formatAMPM(item.event_time)}</Text>
                                </View>
                                <View style={ Styles.event_icon}>
                                    <Icon color="#fff" style={{ fontFamily: 'IBMPlexSans-Regular', padding: 2 }} type='font-awesome' name="map-marker" size={10} />
                                    <Text
                                        onPress={() => EventDetails(item)}
                                        style={Styles.event_address} > {item.location}</Text>
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
export default React.memo(Events);