import React from "react";
import { useEffect, useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAccessToken } from '../../Token';
import AuthContext from '../../auth/AuthContext';
import * as SecureStore from 'expo-secure-store';
import StackNavigator from "./StackNavigator";

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

const Navigator: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
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
    useEffect(() => {
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
          <StackNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
  //AuthContext는 context API를 통해 로그인과 로그아웃에 대한 메서드를 제공한다.
  //useReducer는 state 관리를 도와준다.
  export default Navigator;