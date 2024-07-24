import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNav from './navigation/bottomTabNavigateur';
const Stack= createNativeStackNavigator()

export default function App() {
 
  const [fontsLoaded]=useFonts({
    regular:require('./assets/fonts/Zain-Regular.ttf'),
    bold:require('./assets/fonts/Zain-Bold.ttf'),
    extraBold:require('./assets/fonts/Zain-ExtraBold.ttf'),
    light:require('./assets/fonts/Zain-Light.ttf'),
    Black:require('./assets/fonts/Zain-Black.ttf'),
    extraLight:require('./assets/fonts/Zain-ExtraLight.ttf')
  })

const onLayoutRootView= useCallback(async()=>{
  if (fontsLoaded){
   await SplashScreen.hideAsync();

  }

},[fontsLoaded])

   if(!fontsLoaded){
    return null
   }


  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='BottomTabNav' component={BottomTabNav} options={{headerShown:false}}/>
    </Stack.Navigator>
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
  textStyle:{
    fontFamily:"regular",
    fontSize:30,

  }
});


