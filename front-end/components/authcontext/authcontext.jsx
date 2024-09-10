import React, { createContext, useContext, useState ,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

     const navigation=useNavigation()


const [token,setToken]=useState({});
const [information,setinformation]=useState({})

useEffect(() => {
  
  AsyncStorage.getItem("token").then((storedToken) => {
    if (storedToken) {
      setToken(storedToken);
    }
  });

  AsyncStorage.getItem("infor").then((storedInfor) => {
    if (storedInfor) {
      setinformation(JSON.parse(storedInfor));
    }
  });
}, []);

const login = (password, email) => {
  axios.post("http://192.168.43.136:8080/api/login", {
    password,
    email,
  })
  .then((response) => {
    // Check the response data to make sure it contains the token
    console.log(response.data);
    const tokenn = response.data; // Adjust this based on the actual response structure

    if (token) {
      AsyncStorage.setItem("token", tokenn)
        .then(() => {
          console.log("Token stored successfully");
          navigation.navigate("BottomTabNav");
        })
        .catch((error) => {
          console.error("Error storing token:", error);
        });
    } else {
      console.error("Token not found in response");
    }
  })
  .catch((err) => {
    console.error("Login error:", err);
  });
};


const register=(firstname,lastname,email,password,role)=>{
  axios.post('http://192.168.43.136:8080/api/register',{
    firstname:firstname,
    lastname:lastname,
    email:email,
    password:password,
    role:role
  }).then((res)=>{
    AsyncStorage.setItem("token",res.data.token).then(()=>{
      return  AsyncStorage.setItem("infor",JSON.stringify(res.data))
    }).then(()=>{navigation.navigate("BottomTabNav")}).catch(()=>{
      console.error("dosent stored")
    })
   
    
  }).catch((err)=>{console.error(err)})
}

const logout=()=>{
  AsyncStorage.removeItem('token')
  AsyncStorage.removeItem('infor')

}




    return (
        <AuthContext.Provider value={{ logout,login,token,register,information }}>
          {children}
        </AuthContext.Provider>
      );
    
}

export const useAuth = () => {
    return useContext(AuthContext);
  };
  