import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import AuthContext from '../auth/AuthContext';
import TravelPlan from "../components/homeScreen/TravelPlan";
import PlaceRecommend from '../components/PlaceRecommend';

//해당 컴포넌트 내에서 네비게이션 액션을 수행할 때 사용되는 navigation prop의 타입을 정의한다.
type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();

  const [modalVisible, setModalVisible] = useState<boolean>(false); //부모 컴포넌트로 올려줌.

  const onButtonPress = () => {
    navigation.navigate("KakaoLogin");
    setModalVisible(false);
  }

  //원래는 로그인 여부에 따라 travelplan 컴포넌트 부분이 다르게 보여야 하는데, 현재는 로그인 상태 & 일정을 등록하지 않았다는 가정으로 하드코딩되어 있습니다.
  //authcontext 부분도 travelplan 부분과 별개로 토큰을 사용하여 로그인, 로그아웃 테스트를 하는 부분이며, 추후 삭제될 부분입니다.
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
