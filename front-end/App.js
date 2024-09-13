import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 import Cart from './screens/cart';
 import ProductDetails from "./screens/produitDetail"
import BottomTabNav from './navigation/bottomTabNavigateur';
import Login from './components/auth/Login';
import SignUp from './components/auth/signup';
import SignUp2 from './components/auth/signup2';
import { AuthProvider } from './components/authcontext/authcontext';
import ProductWithCategorie from './components/home/productCategories';
import { Profile } from './screens';
const Stack= createNativeStackNavigator()

export default function App() {
 
  const [fontsLoaded]=useFonts({
    regular:require('./assets/fonts/Zain-Regular.ttf'),
    bold:require('./assets/fonts/Zain-Bold.ttf'),
    extraBold:require('./assets/fonts/Zain-ExtraBold.ttf'),
    light:require('./assets/fonts/Zain-Light.ttf'),
    Black:require('./assets/fonts/Zain-Black.ttf'),
    extraLight:require('./assets/fonts/Zain-ExtraLight.ttf'),
    semibold:require("./assets/fonts/Poppins-SemiBold.ttf")
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
     <AuthProvider>
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
    <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
    <Stack.Screen name='SignUp2' component={SignUp2} options={{headerShown:false}}/>
 
      <Stack.Screen name='BottomTabNav' component={BottomTabNav} options={{headerShown:false}}/>
      <Stack.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
      <Stack.Screen name='Cart' component={Cart} options={{headerShown:false}}/>
      <Stack.Screen name='CategoriProd' component={ProductWithCategorie} options={{headerShown:false}}/>
      <Stack.Screen name='ProductDetails' component={ProductDetails} options={{headerShown:false}}/>
      
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
  textStyle:{
    fontFamily:"regular",
    fontSize:30,

  }
});


