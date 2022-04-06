import React, { Component } from "react";
import { ImageBackground, StyleSheet, FlatList, Text, View, Alert } from "react-native";
import { ListItem, colors, Icon, Header } from 'react-native-elements';
import api from '../../providers/api';
import { ActivityIndicator } from 'react-native-paper';
export default class EventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            refreshing: false,
            isLoading: true,
            moreLoding: true,
        };
    }
    componentDidMount() {
        this.getEvents();
    }

    handleOnRefresh = () => {
        this.setState({ refreshing: false }, () => {
            this.getEvents();
        })
    }

    renderFooter = () => {
        return (
            <View style={{ height: 60 }}>
                {this.state.moreLoding ? (
                    <View>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View>
                        <Text> </Text>
                    </View>
                )}
            </View>
        );
    }
    //fatchData = async () => {
    getEvents = async () => {
        api.getData('events')
            .then((res) => {
                this.setState({ items: res.data.data });
            })
            .catch((error) => {
            })
            .finally(() => {
                this.setState({ isLoading: false, refreshing: false, moreLoding: false })
            })
    };
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

    GetGridViewItem(item) {
        Alert.alert(item);
    }
    EventDetails = (item) => {
        this.props.navigation.navigate("EventDetails", { item: item });
    }
    render() {
        return (
            <View style={styles.container}> 
                <Header
                    leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300, minHeight: 30 }}>
                        <Icon color={colors.black} size={30} name='menu'
                            onPress={() => this.props.navigation.toggleDrawer()} ></Icon>
                        <Text style={{ paddingTop: 0, paddingLeft: 10, marginTop: 0, textAlign: 'right', fontFamily: 'IBMPlexSans-SemiBold', color: '#000000', fontSize: 18 }}>Events</Text>
                    </View>
                    }
                    rightComponent={{}}
                    containerStyle={{
                        fontFamily: 'IBMPlexSans-Regular',
                        color: '1E1E1E',
                        backgroundColor: '#F5F5F5',
                        height: 90
                    }}
                />
                <FlatList
                    style={{ margin: 10 }}
                    data={this.state.items}
                    renderItem={({ item, index }) => {
                        var icon = item.bg_style_image == 'event_bg_1.png' ? require('../../assets/img/bg/event_bg_1.png') : require('../../assets/img/bg/event_bg_2.png');
                        return (
                            <ImageBackground source={icon} resizeMode="cover" style={styles.image_bg} >
                                <View
                                    style={styles.GridViewContainer}>
                                    <Text
                                        onPress={() => this.EventDetails(item)}
                                        style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                                    <Text style={{
                                        color: '#ffffff',
                                    }} > <Icon color="#fff" style={{ padding: 5 }} type='font-awesome' name="clock-o" size={12} /> {this.formatAMPM(item.event_time)}</Text>
                                    <Text
                                        onPress={() => this.EventDetails(item)}
                                        style={{
                                            color: '#ffffff',
                                        }} > <Icon color="#fff" style={{ padding: 5 }} type='font-awesome' name="map-marker" size={12} />{item.location} </Text>

                                    <Text numberOfLines={3} style={{ color: '#FFFFFF', width: '76%' }} >{item.details} </Text>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 110,
                                            right: 20,
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
                                </View>
                            </ImageBackground>
                        )
                    }
                    }
                    ListFooterComponent={this.renderFooter}
                    onEndReachedThreshold={200}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleOnRefresh}
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