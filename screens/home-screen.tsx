import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import AuthContext from '../auth-context';
import TravelPlan from "../components/home-screen/travel-plan";
import PlaceRecommend from '../components/home-screen/place-recommend';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
//해당 컴포넌트 내에서 네비게이션 액션을 수행할 때 사용되는 navigation prop의 타입을 정의한다.
//'Home': 현재 컴포넌트가 어떤 화면에 해당하는지 나타낸다.

const HomeScreen: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();
  //navigation 객체를 사용하여 HomeScreen에서 수행할 수 있는 모든 내비게이션 액션을 알게 된다.
  const [modalVisible, setModalVisible] = useState<boolean>(false); //부모 컴포넌트로 올려줌.

  const onButtonPress = () => {
    navigation.navigate("KakaoLogin");
    setModalVisible(false);
  }

  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>나의 여행 일정</Text>
      <TravelPlan onButtonPress={onButtonPress}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}/>
      <Text style={Styles.title}>이런 여행지는 어때요?</Text>
      <PlaceRecommend numberOfPlaces={20}/>
      {authContext?.userToken ? (
        <View>
          <Text>로그인 되었습니다!</Text>
          <Button title="로그아웃" onPress={() => authContext?.signOut()} />
        </View>
      ) : (
        <Text>로그인이 필요합니다.</Text>
      )}
    </ScrollView>
  );
}

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 30,
    marginVertical: 10,
  }
});
