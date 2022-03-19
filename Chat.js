/**
 * Sample React Native Chat
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat'
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';
 
const Chat = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const [messages, setMessages] = useState([]); 
  const [tostNotificetion, setTostNotificetion] = useState('Test');
  const [senderId, setSenderId] = useState(route.params.record.sender_id)
  const [receiverId, setReceiverId] = useState(route.params.record.receiver_id)
  const [name, setName] = useState(route.params.record.name)
  const [image_path, setImage_path] = useState(route.params.record.image_path)
  const ws = useRef(null);
  const echo = new Echo({
    host: 'http://127.0.0.1:6379',
    broadcaster: 'socket.io',
    client: socketio,
  });
 // console.log('777777777777777777777777777');
  echo
    .channel('chats.1')
    .listen('ChatMessageCreated', ev =>{
    //  console.log('8888888888888888888888888888888888888888');
    setTostNotificetion(ev.message.text);
    console.log(ev.message.text)});
  useEffect(() => {
    console.log("initiateSocketConnection")
    // enter your websocket url
    ws.current = new WebSocket("wss://echo.websocket.org/")
    ws.current.onopen = () => {
      console.log("connection establish open")
    };
    // ws.current.onclose = () => {
    //   console.log("connection establish closed");
    // }
    return () => {
      ws.current.close();
    };
  }, [])

  useEffect(() => {
    setMessages([
      {
        _id: receiverId,// receiver id
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: senderId,  // sender id
          name: name,
          avatar: image_path,
        },
      },
    ])
  }, [])

  useEffect(() => {
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log("onmessage=>", JSON.stringify(response));
      var sentMessages = {
        _id: response.receiverId,
        text: response.message,
        createdAt: new Date(response.createdAt * 1000),
        user: {
          _id: response.senderId,
          name: name,
          avatar: image_path,
        },
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages))
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    let obj = {
      "senderId": senderId,
      "receiverId": receiverId,
      "message": messages[0].text,
      "action": "message"
    }
    ws.current.send(JSON.stringify(obj))
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tostNotificetion}</Text>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: senderId,  // set sender id
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
export default Chat;
