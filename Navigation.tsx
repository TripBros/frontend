import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import KakaoLogin from './screens/kakaoLogin';
import Home from './screens/home-screen';
import Signup from './screens/signup';
import Wait from './screens/wait-screen';

//export 
export type RootStackParamList = {
  Wait: undefined;
  Signup: { data: { email: string; gender: string; ageStart: number; ageEnd: number; } };
  Home: undefined;
  KakaoLogin: undefined;
};
//Signup 화면으로 이동할 때 data라는 객체를 매개변수로 전달할 수 있다. data는 email, gender, ageStart, ageEnd 등의 속성을 가질 수 있다.
//Wait, Home, KakaoLogin은 매개변수를 전달받지 않는다.

const Stack = createStackNavigator<RootStackParamList>();
//앞서 정의한 RootStackParamList을 이용하여 스택 내비게이터가 어떤 매개변수를 기대하는지 알려준다. 
//이를 통해 각 화면 간 이동 시 올바른 매개변수를 전달하는지 검사할 수 있다.

const StackScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Wait" component={Wait} />
    </Stack.Navigator>
  );
}

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
}

export default Navigation;
