import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons'; 
import axios from 'axios';

interface PlaceRecommendProps {
  numberOfPlaces: number;
}

const PlaceRecommend : React.FC<PlaceRecommendProps> = ({ numberOfPlaces }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [imageHeight, setImageHeight] = useState(180);
  const [imageWidth, setImageWidth] = useState(() => {
    const viewportWidth = Dimensions.get('window').width;
    return viewportWidth * 0.85;
  });

  const [placeData, setPlaceData] = useState<Array<{
    name: string;
    address: string;
    rating: number;
    review: string;
    link: string;
    img: string;
    isSaved: boolean;
  }>>([]);

  const handlePress = (index) => {
    setPlaceData(prevData => 
      prevData.map((place, i) =>
      i===index ? {...place, isSaved: !place.isSaved} : place));
  };
  //prevData: 장소 객체들의 배열

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://13.125.95.174:8080/api/test/restaurant?city=Fukuoka_TEST&width=${Math.round(imageWidth)}&height=${imageHeight}`);
        const modifiedData = response.data.slice(0,numberOfPlaces).map(place => ({...place, isSaved: false}));
        setPlaceData(modifiedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [numberOfPlaces]); // numberOfPlaces가 변경되면 데이터를 다시 불러옵니다.

  return (
    <View style={styles.outerContainer}>
      {placeData && placeData.map((place, index) => (
        <View key={index} style={styles.container}>
          <Image 
          source={{ uri: place.img }} 
          style={[styles.image, { width: imageWidth, height: imageHeight }]}/>
          <TouchableOpacity style={styles.heartButton} onPress={()=>handlePress(index)}>
            <FontAwesome name={place.isSaved ? 'heart' : 'heart-o'} size={20} color={place.isSaved ? 'red' : 'grey'} />
          </TouchableOpacity>
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.review}>{place.rating}</Text>
          <View style={styles.addressContainer}>
            <FontAwesome5 name="map-marker-alt" size={16} color='#D9D9D9'/>
            <Text style={styles.address}>{place.address}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default PlaceRecommend;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',  //가운데 정렬
  },
  container: {
    width: '85%',
  },
  image: {
    //width: '100%', //컨테이너 너비
    //height: 180,
    borderRadius: 20,
    marginTop: 15,
  },
  heartButton: {
    position: 'absolute',
    top: 25,
    right: 10,
  },
  title: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  review: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 15,
    textAlign: 'left',
  },
  addressContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
  },
  address: {
    fontSize: 12,
    color: '#D9D9D9',
    marginLeft: 5,  // 텍스트와 아이콘 사이의 간격
  },
});