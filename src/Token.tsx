import * as SecureStore from 'expo-secure-store';

export const storeTokens = async (accessToken, refreshToken) => {
  try {
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
  } catch (error) {
      console.error("Error storing the tokens:", error);
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    console.log("Access Token:", accessToken);
    
    return accessToken;
  } catch (error) {
      console.error("Error getting the Accesstoken:", error);
  }
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    console.log("Refresh Token:", refreshToken);

    return refreshToken;
  } catch (error) {
      console.error("Error getting the Refreshtoken:", error);
  }
};