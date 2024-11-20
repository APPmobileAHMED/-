import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNav from './navigation/bottomTabNavigateur';
import Login from './components/auth/Login';
import SignUp from './components/auth/signup';
import SignUp2 from './components/auth/signup2';
import { Profile } from './screens';
import { AuthProvider } from './components/authcontext/authcontext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


import { Linking } from 'react-native';

const Stack = createNativeStackNavigator();
const linking = {
  prefixes: ['myapp://'],  // This should match the scheme you set in app.json
  config: {
    screens: {
      Profile: 'profile',  // This maps 'myapp://profile' to ProfileScreen
    },
  },
};
export default function App() {
 
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Zain-Regular.ttf'),
    bold: require('./assets/fonts/Zain-Bold.ttf'),
    extraBold: require('./assets/fonts/Zain-ExtraBold.ttf'),
    light: require('./assets/fonts/Zain-Light.ttf'),
    Black: require('./assets/fonts/Zain-Black.ttf'),
    extraLight: require('./assets/fonts/Zain-ExtraLight.ttf'),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer linking={linking}>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
         
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='SignUp2' component={SignUp2} />
          
        
          <Stack.Screen name='Main' component={BottomTabNav} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
