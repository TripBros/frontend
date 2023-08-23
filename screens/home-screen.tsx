import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
//해당 컴포넌트 내에서 네비게이션 액션을 수행할 때 사용되는 navigation prop의 타입을 정의한다.
//'Home': 현재 컴포넌트가 어떤 화면에 해당하는지 나타낸다.

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  //navigation 객체를 사용하여 HomeScreen에서 수행할 수 있는 모든 내비게이션 액션을 알게 된다.

  return (
    <View style={Styles.container}>      
      <TouchableOpacity
          onPress={() => navigation.navigate("KakaoLogin")}>
          <Text>카카오 화면으로</Text>
        </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
