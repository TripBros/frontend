import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
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
  age: number;
  nickname: string;
  travelStyle: string,
  profileImage: string,
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
    age: 0,
    travelStyle: '',
    profileImage: ''
  });

  const [selections, setSelections] = useState({
    plan: '',
    budget: '',
    picture: '',
    food: '',
    transportation: '',
  });

  const handleSelection = (question, option) => {
    setSelections(prev => ({
      ...prev,
      [question]: option,
    }));
  };

  // 각 선택지에 대한 버튼을 렌더링하는 함수
  const renderOptions = (question, options) => {
    return (
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selections[question] === option && styles.selectedOptionButton,
            ]}
            onPress={() => handleSelection(question, option)}
          >
            <Text
              style={[
                styles.optionText,
                selections[question] === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // selections 상태가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // selections 객체의 각 항목을 하나의 문자열로 연결합니다.
    const travelStyleString = Object.values(selections).filter(Boolean).join("/");
    
    setUserData(prevUserData => ({
      ...prevUserData,
      travelStyle: travelStyleString
    }));
  }, [selections]);

  const handleChange = (field: keyof userData, value: string) => {
    const newValue = field === 'age' ? parseInt(value, 10) : value;
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log(userData.travelStyle)
    if (parseInt(userData.age) < ageStart || parseInt(userData.age) > ageEnd) {
      Alert.alert("나이를 다시 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post('http://13.125.95.174:8080//api/signup', userData);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        <View style={styles.styleContainer}>
          <Text style={styles.question}>일정</Text>
          {renderOptions('plan', ['즉흥적', '계획적'])}

          <Text style={styles.question}>예산</Text>
          {renderOptions('budget', ['플렉스', '절약'])}

          <Text style={styles.question}>사진</Text>
          {renderOptions('picture', ['사진 많이', '눈에 담기'])}

          <Text style={styles.question}>음식</Text>
          {renderOptions('food', ['아는 맛', '모르는 맛'])}

          <Text style={styles.question}>교통수단</Text>
          {renderOptions('transportation', ['대중교통', '렌트카'])}
        </View>
        <Button title="Sign Up" onPress={handleSubmit} />
      </View>
    </TouchableWithoutFeedback>
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
  styleContainer: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
  },
  selectedOptionButton: {
    backgroundColor: '#91C8E4',
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
});