import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import api from '../api';
function Giftedchat(props) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
            sent: true, 
            received: true, 
            pending: true,
          },
        ])
      }, [])
     
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
     
      return (
        <GiftedChat
          messages={messages}
          text={customText}
          onInputTextChanged={text => this.setCustomText(text)}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      )
}

export default Giftedchat;
