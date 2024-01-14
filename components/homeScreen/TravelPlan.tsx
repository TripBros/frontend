import React, { useContext, Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AuthContext from '../../auth/AuthContext';
import { Ionicons } from '@expo/vector-icons';

//로그인 여부, 일정 등록 여부에 따라 다르게 보여져야 하는 컴포넌트인데, 현재 하드코딩 되어있습니다.
//등록 버튼을 클릭하면 모달 창이 뜨면서 카카오 로그인 페이지로 이동할 수 있습니다.
//3초만에 회원가입 부분을 말풍선으로 만들고 싶었는데..실패하여 이 부분 코드 수정 필요합니다.
//이 외에도 스타일 부분들 전체적으로 코드 수정 필요합니다..!!

interface TravelPlanProps {
  onButtonPress: () => void;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const TravelPlan: React.FC<TravelPlanProps> = ({ onButtonPress, modalVisible, setModalVisible }) => {
  const authContext = useContext(AuthContext);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.whiteSection}>
          <Text style={styles.text1}>여행 계획이 아직 없어요</Text>
          <Text style={styles.text2}>일정을 등록하고 관련 게시글을 받아보세요.</Text>
        </View>

        <TouchableOpacity style={styles.blueSection} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>등록 {'>'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.backgroundView}>
          <View style={styles.modalContent}>
            <Text style={styles.text3}>일정을 등록하려면</Text>
            <Text style={styles.text4}>계정이 필요해요</Text>
            
            <View style={{ alignItems: 'center', marginTop: 15 }}> 
              <View style={styles.bubble}>
                <Text style={styles.text5}>⚡3초 만에 빠른 회원가입</Text>
              </View>
            </View>
            
            <TouchableOpacity onPress={onButtonPress}>
              <View style={styles.kakaoButton}>
                <Ionicons name="chatbubble" size={24} color="#3A1D1D" style={styles.iconStyle}/>
                <Text style={styles.kakaoText}>카카오로 시작하기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 13, color: '#BFBFBF' }}>더 둘러보기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

//flex 값을 제거하면, 각 섹션은 내용의 크기에 따라 자동으로 크기가 조정된다.
const styles = StyleSheet.create({
  outerContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: '2%',
    marginBottom: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, //Android의 그림자 설정
  },
  innerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  whiteSection: {
    backgroundColor: 'white',
    paddingHorizontal: 15, //height 조절
    paddingVertical: 30,
  },
  blueSection: {
    backgroundColor: '#91C8E4',
    padding: 5,
  },
  text1: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: 'center',
  },
  text2: {
    fontSize: 14,
    color: '#323232',
    textAlign: 'center',
    marginTop: 5,
  },
  text3: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  text4: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  text5: {
    fontSize: 11,
    fontWeight: "800",
  },
  buttonText: {
    color: 'white',
    textAlign: 'right',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 13
  },
  backgroundView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '40%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
bubble: {
  marginTop: 20,  //triangle의 borderBottomWidth와 같거나 그보다 크게 설정
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
  kakaoButton: {
    margin: 20,
    backgroundColor: '#F7E600',
    borderRadius: 50,
    flexDirection: 'row',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    marginRight: 5, 
  },
  kakaoText: {
    textAlign: 'center', 
  },
  closeButton: {
    alignItems: 'center',
  },
});

export default TravelPlan;