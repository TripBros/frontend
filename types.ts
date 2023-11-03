export type RootStackParamList = {
  Wait: undefined;
  Signup: { data: { email: string; gender: string; ageStart: number; ageEnd: number; } };
  Home: undefined;
  Recommend: undefined;
  KakaoLogin: undefined;
  HomeTabs: undefined;
};
//Signup 화면으로 이동할 때 data라는 객체를 매개변수로 전달할 수 있다. data는 email, gender, ageStart, ageEnd 등의 속성을 가질 수 있다.
//Wait, Home, KakaoLogin은 매개변수를 전달받지 않는다.