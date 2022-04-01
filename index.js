import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json'; 
import Pusher from 'pusher-js/react-native';
AppRegistry.registerComponent(appName, () => App);
Pusher.logToConsole = false;
import { typography } from './typography'

typography()
 
