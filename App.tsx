import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigators/Navigation';

// 실행시 splash screen 사용하면 좋을것 같습니다. - 승준

const App: React.FC = () => {
  return (
      <Navigation />
  );
}

export default App;
