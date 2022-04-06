import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage'; 
const TOKEN = 'token'; 
import helpers from './helpers';
export default {  getData : async (path) =>
    axios({
        'method':'GET',
        'url':helpers.baseurl()+'api/'+path,
        'headers': { "Content-Type": "application/json",  
        Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
        }
    }) 
};  