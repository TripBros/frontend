import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { storeTokens, getAccessToken } from "../Token";
import AuthContext from '../auth-context';

type SignupProps = RouteProp<RootStackParamList, 'Signup'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

type userData = {
  email: string;
  gender: string;
  age: string;
  nickname: string;
};

const Signup: React.FC< {route : SignupProps} > = ({ route }) => {
  const { data } = route.params;
  const { email, gender, ageStart, ageEnd } = data;
  const navigation = useNavigation<NavigationProp>();
  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState<userData>({
    email,
    gender,
    nickname: '',
    age: '',
  });

  const handleChange = (field: keyof userData, value: string) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    if (parseInt(userData.age) < ageStart || parseInt(userData.age) > ageEnd) {
      Alert.alert("나이를 다시 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post('https://3118-219-255-158-170.ngrok-free.app/api/signup', userData);
      console.log("Response Headers:", response.headers);
  
      if (response.status === 200) {
        const accessToken = response.headers['authorization'];
        const refreshToken = response.headers['refreshtoken'];

        if (accessToken && refreshToken) {
          await storeTokens(accessToken, refreshToken);
        }

        console.log("Signup Successful:", response.data);

        await getAccessToken(); //확인용

        if (accessToken) {
          authContext?.signIn(accessToken); //로그인 처리
        }
        
        navigation.navigate('Home'); //확인용
      } else {
        console.log("Signup Failed:", response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput value={userData.email} placeholder="Email" editable={false} style={styles.input} />
      <TextInput value={userData.gender} placeholder="Gender" editable={false} style={styles.input} />
      <TextInput
        value={userData.nickname}
        placeholder="닉네임을 입력해주세요."
        onChangeText={(value) => handleChange('nickname', value)}
        style={styles.input}/>
      <TextInput
        value={userData.age}
        placeholder="나이를 입력해주세요."
        keyboardType="numeric"
        onChangeText={(value) => handleChange('age', value)}
        style={styles.input}/>
      <Button title="Sign Up" onPress={handleSubmit} />
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});