import React, { createContext, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
     const navigation=useNavigation()

const [token,setToken]=useState(AsyncStorage.getItem("token") || "");

const login=(password,email)=>{

  axios.post("http://192.168.1.11:8080/api/login",{
    password:password,
    email:email
  }).then((response)=>{
   AsyncStorage.setItem("token",response.data.token)
  navigation.navigate("BottomTabNav")
  }).catch((err)=>{
    console.error(err);
  }) 

}

const logout=()=>{
  AsyncStorage.removeItem('token')
}




    return (
        <AuthContext.Provider value={{ logout,login,token }}>
          {children}
        </AuthContext.Provider>
      );
    
}

export const useAuth = () => {
    return useContext(AuthContext);
  };
  