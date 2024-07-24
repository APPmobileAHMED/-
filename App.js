import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from 'react';
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
    <View style={styles.container}>
      <Text style={styles.textStyle}>asslemedd ahmhed</Text>
      <StatusBar style="auto" />
    </View>
  );
}
//hey

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


