import React, { Component, } from 'react';
import { StyleSheet, Dimensions, Text, View, SafeAreaView, ToastAndroid } from 'react-native';
import api from '../api';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Header } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import { ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
const win = Dimensions.get('window').width;
const Toast = ({ visible, message }) => {
    if (visible) {
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
        return null;
    }
    return null;
};

class JournalDetails extends Component {
    constructor(props) {
        super(props);
        this.fatchData = this.fatchData.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.state = {
            items: [],
            journal_items: [],
            isLoading: false,
            errortext: '',
            successtext: '',
            loading: false,
            token: '',
            journal_id: 0,
            isOnline: null,
            sending: false
        };
    }
    componentDidMount() {
        this.fatchData();
    }
    componentWillUnmount() {
        this.fatchData();
    }
    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('TOKEN');
            if (value !== null) {
                this.setState({ token: value });
            }
        } catch (error) {
            // Error retrieving data  
        }
    };
    fatchData = () => {
        this.setState({ isLoading: true })
        api.getData('journals/' + this.props.route.params.id)
            .then(response => {
                this.setState({ journal_items: response.data.data })
            })
            .finally(() => this.setState({ isLoading: false }))
    }
    renderFooter = () => {
        return (<
            View >
        </View>
        );
    }
    validation = () => {
    }

    getData = (dete) => {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "December"
        ];
        var d = new Date(dete);
        var month = d.getMonth();

        var date = d.getDate();
        return date + ' ' + monthNames[month];
    }

    render() {
        let { items, isLoading } = this.state;
        return (
            <SafeAreaView   >
                <Header
                    leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300, minHeight: 30 }}>
                        <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} />
                        <Text style={{ paddingTop: 0, paddingLeft: 10, marginTop: -5, textAlign: 'right', fontFamily: 'IBMPlexSans-SemiBold', color: '#000000', fontSize: 18 }}>Journal Details</Text>
                    </View>
                    }
                    
                    rightComponent={{}}
                    containerStyle={{
                        fontFamily: 'IBMPlexSans-Regular',
                        color: '1E1E1E',
                        backgroundColor: '#E4E4E4',
                        height: 90
                    }} />

                <ScrollView >
                    <ListItem style={{
                        fontFamily: 'IBMPlexSans-Regular',
                        flex: 1,
                        flexDirection: 'column',
                        margin: 6,
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#ABABAB',
                        borderRadius: 7,
                        overflow: 'hidden',
                        shadowColor: '#efefefe',
                        shadowRadius: 10,
                        shadowOpacity: 1,
                    }}>
                        <ListItem.Content
                            style={{
                                fontFamily: 'IBMPlexSans-Regular',
                            }}>
                            <ListItem.Title style={{ fontFamily: 'IBMPlexSans-Regular', fontSize: 18, fontWeight: 'bold', paddingBottom: 8 }}  >
                                {this.state.journal_items.title}
                            </ListItem.Title>
                            <Text style={{ color : '#000000'}} numberOfLines={this.state.numLines} >{this.state.journal_items.details}</Text>
                            <ListItem.Title style={{ fontFamily: 'IBMPlexSans-Regular', fontSize: 18, paddingTop: 8 }}>
                                { this.state.journal_items.created_at ? this.getData(this.state.journal_items.created_at) : ''}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>

                </ScrollView>
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        fontFamily: 'IBMPlexSans-Regular',
        marginTop: 60,
        flex: 1,
        padding: 2,
        width: '100%'
    },
    header: {
        fontFamily: 'IBMPlexSans-Regular',
        backgroundColor: '#fff',
        top: 20,
        width: '100%',
        borderRadius: 15,
        paddingBottom: 20,
        marginBottom: 10
    },
    caption: {
        fontFamily: 'IBMPlexSans-Regular',
        paddingTop: 5,
        textAlign: 'center',
        fontSize: 18,
        color: "#535353"
    },
    main_footer: {
        fontFamily: 'IBMPlexSans-Regular',
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40
    },
    footer: {
        fontFamily: 'IBMPlexSans-Regular',
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        width: '90%'
    },
    textAreaContainer: {
        fontFamily: 'IBMPlexSans-Regular',
        borderColor: '#944CD4',
        backgroundColor: 'blue',
        // width: '90%'
    },
    textArea: {
        fontFamily: 'IBMPlexSans-Regular',
        height: 50,
    },
    submit: {
        fontFamily: 'IBMPlexSans-Regular',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 1,
        paddingLeft: 1,
        margin: 4,
        borderRadius: 40,
        position: 'absolute',
        right: 2,
        top: 3.2,
        backgroundColor: '#fff'
    },
    image_bg: {
        fontFamily: 'IBMPlexSans-Regular',
        flex: 1,
        justifyContent: "center"
    },
    text_bg: {
        fontFamily: 'IBMPlexSans-Regular',
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
})
export default JournalDetails;