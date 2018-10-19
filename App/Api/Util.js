import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = 'AUTH_TOKEN';
const USER_ID = 'USER_ID';

export const get = async (key) => {
    return await AsyncStorage.getItem(key);
};


export const signIn = async (newToken) => {
    await AsyncStorage.setItem(AUTH_TOKEN, newToken.token);
    await AsyncStorage.setItem(USER_ID, newToken._id);
};

export const signOut = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN);
};
