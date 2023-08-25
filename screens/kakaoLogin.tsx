import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../types';
import { REST_API_KEY, REDIRECT_URI } from "@env"

type NavigationProp = StackNavigationProp<RootStackParamList, 'KakaoLogin'>;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLogin: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  function KakaoLoginWebView(data: string) {
    const exp = "code=";
    var condition = data.indexOf(exp);    
    if (condition !== -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log(authorize_code);
      navigation.navigate("Wait");

      axios.get('https://3118-219-255-158-170.ngrok-free.app/api/login/kakao', {
        params: { code: authorize_code }
      })
      .then(response => {
        console.log("User data received from backend:", response.data);
        navigation.navigate('Signup', { data: response.data });
      })
      .catch(error => {
        console.error("Error sending the code:", error);
      });
    };
  }

  return (
    <View style={Styles.container}>      
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => { KakaoLoginWebView(event.nativeEvent.url); }}
      />
    </View>
  );
}

export default KakaoLogin;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },    
});
