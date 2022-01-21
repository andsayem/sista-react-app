import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity, Text, Linking, AsyncStorage } from 'react-native';
import { Input, CheckBox } from 'react-native-elements'; 

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:"",
            token: "",
            remember: false
        };
        this.getData();
    };

    handleUsernameChange = username => {
        this.setState({ username })
    };

    handlePasswordChange = password => {
        this.setState({ password })
    };

    onLogin = async () => {
        try {
            await AsyncStorage.setItem("userprofile", JSON.stringify({ username: this.state.username, password: this.state.password }));
            this.props.navigation.navigate("Home", {
                screen: "HomeScreen",
            });
        } catch (err) { 
        }
    };

    getData = async () => {
        try { 
            const userprofile = await AsyncStorage.getItem("userprofile");
            const userProfile = JSON.parse(userprofile);
            if (userProfile !== null) {
                this.setState({ ...userProfile })
            }
            if (username !== null) {
                this.setState({ username })
            }
            if (password !== null) {
            this.setState({ password })
            }
        } catch (err) { 
        }
    }

    render() {
        const { username, password } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.titleText}>Login</Text>
                    <Text style={styles.fillerText}>Hi there! Nice to see you again.</Text>
                    <Input 
                        inputStyle={{color: 'white'}}
                        placeholder="Enter username"
                        onChangeText={this.handleUsernameChange}
                        value={username}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        leftIcon={{ type: 'font-awesome', name: 'user-circle-o', color: 'white', marginRight: 10 }}
                    />
                    <Input
                        inputStyle={{color: 'white'}}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={this.handlePasswordChange}
                        value={password}
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white', marginRight: 10 }}
                    />
                    <CheckBox 
                        title="Remember Me"
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.rememberCheckbox}
                        textStyle={{color: 'white'}}
                        checkedColor="crimson"
                    />
                    <TouchableOpacity 
                        style={styles.loginButton} 
                        title="Login" type="submit" 
                        onPress={this.onLogin}
                        >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{textAlign: 'center', color: 'grey', marginTop: 20}}>
                        OR use an account from one of the following:
                    </Text> 
                    <View style={{alignItems: 'center'}}> 
                    </View>
                    <View style={styles.linkContainer}>
                        <TouchableOpacity style={{marginTop: 75}} onPress={() => Linking.openURL('#')}>
                            <Text style={{color: 'white'}}>
                                Forgot Your Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop: 75, marginLeft: 210}} onPress={() => Linking.openURL('#')}>
                            <Text style={{color: 'white'}}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    buttonsContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    linkContainer: {
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 26,
        color: 'white',
        marginBottom: 30,
        marginTop: 20
    },  
    fillerText: {
        color: 'grey',
        marginBottom: 20
    },
    loginButton: {
        backgroundColor: 'crimson',
        paddingVertical: 17,
        paddingHorizontal: 25,
        borderRadius: 20,
        textAlign: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    twitterButton: {
        backgroundColor: '#00acee',
        marginTop: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginLeft: 20,
        flexDirection: 'row',
        borderRadius: 20
    },
    facebookButton: {
        backgroundColor: '#4267B2',
        marginTop: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginLeft: 20,
        flexDirection: 'row',
        borderRadius: 20
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        marginTop: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginLeft: 20,
        flexDirection: 'row',
        borderRadius: 20
    },
    rememberCheckbox: {
        margin: 10,
        marginBottom: 20,
        backgroundColor: null
    }
});

export default LoginScreen;