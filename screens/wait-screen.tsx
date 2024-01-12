import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//임시 화면 <- 수정 필요

const WaitScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>잠시만 기다려주세요...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 20,
    }
});

export default WaitScreen;
