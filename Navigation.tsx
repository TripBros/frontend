import * as React from 'react';
import { Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store'; //백엔드로부터 받아오는 토큰을 저장하기 위한 저장소
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import KakaoLogin from './screens/kakaoLogin';
import Home from './screens/home-screen';
import Signup from './screens/signup';
import Wait from './screens/wait-screen';
import Recommend from './screens/recommend-screen';
import Chat from './screens/chat-screen';
import Mypage from './screens/mypage';
import { getAccessToken } from './Token';
import AuthContext from './auth-context';
import { RootStackParamList } from './types';

//헤더(tripbros 문구와 알림 아이콘)
const customHeaderOptions: StackNavigationOptions = {
  headerTitle: () => (
    <Text style={{ fontSize: 20, fontWeight: "800" }}>Tripbros</Text>
  ),
  headerTitleAlign: 'left',
  headerRight: () => (
    <View style={{ marginRight: 15 }}>
      <Ionicons 
        name="notifications-outline"  
        size={25}
      />
    </View>
  ),
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
  }
};

//하단 바
const HomeTabs: React.FC = () => {
  const BottomTab = createBottomTabNavigator();
//tabBarOptions={{activeTintColor: '#749BC2', inactiveTintColor: '#585858' }}
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name="홈" component={HomeStack}
        options={{tabBarIcon: ({color}) => <Ionicons name="home-outline" size={24} color={color} />}}/>
      <BottomTab.Screen name="추천" component={RecommendStack}
        options={{tabBarIcon: ({color}) => <Ionicons name="bookmark-outline" size={24} color={color} />}}/>
      <BottomTab.Screen name="채팅" component={Chat} 
        options={{tabBarIcon: ({color}) => <Ionicons name="chatbox-outline" size={24} color={color} />}}/>
      <BottomTab.Screen name="마이페이지" component={Mypage} 
        options={{tabBarIcon: ({color}) => <Ionicons name="person-outline" size={24} color={color} />}}/>
    </BottomTab.Navigator>
  );
}

//메인 화면 
const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={customHeaderOptions}
      />
    </Stack.Navigator>
  );
}

//맛집 추천 화면
const RecommendStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recommend"
        component={Recommend}
        options={customHeaderOptions}
      />
    </Stack.Navigator>
  );
}

//RootStackParamList을 이용하여 스택 내비게이터가 어떤 매개변수를 기대하는지 알려준다.
//이를 통해 각 화면 간 이동 시 올바른 매개변수를 전달하는지 검사할 수 있다.
const Stack = createStackNavigator<RootStackParamList>();

const StackScreen: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Wait" component={Wait} />
    </Stack.Navigator>
  );
}

const initialState = {
  isSignout: false,
  userToken: null,
};

//useReducer를 사용해 action에 따른 state 변화를 구현한다.
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
  }
};

const Navigation: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  //authContext 객체는 사용자 인증과 관련된 메서드(signIn, signOut)와 상태(userToken)를 제공한다.
  //signIn 메서드는 사용자가 로그인할 때 호출되며, dispatch를 사용해 인증 상태를 업데이트한다.
  //signOut 메서드는 로그아웃을 처리하고, SecureStore에서 토큰을 삭제한 후 상태를 업데이트한다.
  const authContext = {
    signIn: async (token: string) => {
      dispatch({ type: "SIGN_IN", token });
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      dispatch({ type: "SIGN_OUT" });
    },
    userToken: state.userToken,
  };

  //앱이 실행될때 SecureStore에 "accessToken"이 있는지 확인하고 있으면 받아온다.
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await getAccessToken();
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (e) {
        // Restoring token failed
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
//AuthContext는 context API를 통해 로그인과 로그아웃에 대한 메서드를 제공한다.
//useReducer는 state 관리를 도와준다.
export default Navigation;