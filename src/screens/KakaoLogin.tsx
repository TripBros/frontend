import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../src/types';
import { REST_API_KEY, REDIRECT_URI } from "@env"

//1. 인증코드 추출 후 사용자에게 로그인 처리 중임을 알리기 위해 Wait 화면으로 네비게이션
//2. 백엔드 서버에 인증 코드를 보내는 요청을 성공하면, 'Signup' 화면으로 네비게이션

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

      axios.get('http://13.125.95.174:8080/api/login/kakao', {
        params: { code: authorize_code }
      })
      .then(response => {
        console.log("User data received from backend:", response.data);
        navigation.navigate('Signup', { data: response.data });
      })
      .catch(error => {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        console.error("Error Response Headers:", error.response.headers);
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
    backgroundColor: 'white',
    paddingTop: '20%',
  },    
});
//margintop하니까 backgroundcolor 적용 안됨.
