import React, { Component } from "react";
import firebase from "react-native-firebase";
import { StyleSheet } from 'react-native';
import CustomChatbot from './components/chatbot/CustomChatbot';
import { Scene, Router } from "react-native-router-flux";

export default class App extends Component {
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBR6LcbLf2_yBmMVKl2ypbmQG8D7kcceiE",
      authDomain: "fir-authentication-6b21f.firebaseapp.com",
      databaseURL: "https://fir-authentication-6b21f.firebaseio.com",
      projectId: "fir-authentication-6b21f",
      storageBucket: "fir-authentication-6b21f.appspot.com",
      messagingSenderId: "270811940114",
      appId: "1:270811940114:web:69ebb195ecd98772"
    };
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
    <Router navigationBarStyle={styles.naviBar} >
      <Scene key="root" hideNavBar>
        <Scene key="Chatbot">
          <Scene titleStyle={styles.naviBarTitle}
            key="chatbot"
            component={CustomChatbot}
            title="YoYo Pizza Chatbot"
            initial
          />
        </Scene>
        </Scene>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  naviBar: {
    height: 50,
    width: 'auto',
    backgroundColor: '#E88452'
  },
  naviBarTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '200'
  }
});


  

