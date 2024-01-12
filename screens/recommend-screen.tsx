import React from 'react';
import { Text, StyleSheet, ScrollView } from "react-native";
import PlaceRecommend from '../components/place-recommend';

const RecommendScreen: React.FC = () => {
  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.title}>이런 여행지는 어때요?</Text>
        <PlaceRecommend numberOfPlaces={20}/>
    </ScrollView>
  );
}
export default RecommendScreen;

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