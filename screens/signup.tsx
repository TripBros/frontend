import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation';
import axios from 'axios';

type SignupProps = RouteProp<RootStackParamList, 'Signup'>;

type InitialData = {
  email: string;
  gender: string;
  ageStart: number;
  ageEnd: number;
};

const Signup: React.FC< {route : SignupProps} > = ({ route }) => {
  const { data } = route.params;
  const { email, gender, ageStart, ageEnd } = data;

  const [userData, setUserData] = useState<InitialData>({
    email,
    gender,
    ageStart,
    ageEnd,
  });

  const handleChange = (field: keyof InitialData, value: string) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(userData);
  };

  return (
    <View style={styles.container}>
      <TextInput value={userData.email} placeholder="Email" editable={false} style={styles.input} />
      <TextInput value={userData.gender} placeholder="Gender" editable={false} style={styles.input} />
      <TextInput value={String(userData.ageStart)} placeholder="Age Start" editable={false} style={styles.input} />
      <TextInput value={String(userData.ageEnd)} placeholder="Age End" editable={false} style={styles.input} />
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