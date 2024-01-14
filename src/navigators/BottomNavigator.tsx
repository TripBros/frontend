import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();


const BottomNavigator: React.FC = () => {
    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false}}>
            {/* Your navigation items go here */}
            <BottomTab.Screen name="홈" component={HomeStack}
                options={{tabBarIcon: ({color}) => <Ionicons name="home-outline" size={24} color={color} />}}/>
            <BottomTab.Screen name="추천" component={RecommendStack}
                options={{tabBarIcon: ({color}) => <Ionicons name="bookmark-outline" size={24} color={color} />}}/>
            <BottomTab.Screen name="채팅" component={Chat} 
                options={{tabBarIcon: ({color}) => <Ionicons name="chatbox-outline" size={24} color={color} />}}/>
            <BottomTab.Screen name="마이페이지" component={Mypage} 
                options={{tabBarIcon: ({color}) => <Ionicons name="person-outline" size={24} color={color} />}}/>
        </BottomTab.Navigator>
    );
};

export default BottomNavigator;
