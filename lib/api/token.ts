import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'ecc_access_token';

export async function getAccessToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function setAccessToken(token: string | null): Promise<void> {
  try {
    if (token == null || token === '') await AsyncStorage.removeItem(TOKEN_KEY);
    else await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}
