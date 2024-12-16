import { StatusBar } from 'expo-status-bar';
import React, { createRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNav from './navigation/bottomTabNavigateur';
import Login from './components/auth/Login';
import SignUp from './components/auth/signup';
import { StripeProvider } from '@stripe/stripe-react-native';
import SignUp2 from './components/auth/signup2';
import { Profile } from './screens';
import { AuthProvider } from './components/authcontext/authcontext';
import {PUBLISH_KEY_STRIPE} from "@env"


import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();
const linking = {
  prefixes: ["learningrn://"], // تأكد أن البادئة تتطابق مع البادئة في الـ app.json
  config: {
    screens: {
      Main: {
        screens: {
          Profile: "profile",
          Cart: "cart",
        },
      },
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
    <StripeProvider publishableKey={PUBLISH_KEY_STRIPE} >
    <NavigationContainer  >
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
         
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='SignUp2' component={SignUp2} />
          
        
          <Stack.Screen name='Main' component={BottomTabNav} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
    </StripeProvider>
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
