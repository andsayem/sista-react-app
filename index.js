/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json'; 

import Pusher from 'pusher-js/react-native';

AppRegistry.registerComponent(appName, () => App);
Pusher.logToConsole = true;

var pusher = new Pusher('28f66afb2b72c8e97219', {
  cluster: 'ap2'
});

var channel = pusher.subscribe('blog-channel');
channel.bind('App\Events\ChatMessageCreated', function(data) { 
  console.log(data);
  alert("2345");
});