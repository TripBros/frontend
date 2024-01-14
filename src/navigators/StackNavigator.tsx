import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
// 네비게이터 목적지
import KakaoLogin from '../screens/KakaoLogin';
import Signup from '../screens/SignUp';
import Wait from '../screens/WaitScreen';
import BottomNavigator from './BottomNavigator';

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="Home" component={BottomNavigator} />
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="Wait" component={Wait} />
    </Stack.Navigator>
    );
};

export default StackNavigator;
