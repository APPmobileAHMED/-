import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();

  const [token, setToken] = useState("");
 
  const [tokenDecoded, setTokenDecoded] = useState({});

  
  const login = (password, email) => {
    axios
      .post("http://192.168.179.160:8080/api/login", {
        password,
        email,
      })
      .then((response) => {
        console.log("heyy", response.data.token);
        const tokenn = response.data.token;

        if (tokenn) {
          
          AsyncStorage.setItem("token", tokenn)
            .then(() => {
              console.log("Token stored successfully");
              const decoded = jwtDecode(tokenn); 
              setTokenDecoded(decoded); 
              setToken(tokenn); 
              navigation.navigate("BottomTabNav");
            })
            .catch((error) => {
              console.error("Error storing token:", error);
            });
        } else {
          console.error("please enter your correct information");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const register = async (firstname, lastname, email, password, role) => {
    try {
      const res = await axios.post("http://192.168.179.160:8080/api/register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: role,
      });

      console.log(res.data);

     
      await AsyncStorage.setItem("token", res.data.token);
      

      console.log("stored");

      const decoded = jwtDecode(res.data.token);
      setTokenDecoded(decoded); 
      setToken(res.data.token); 
      
      navigation.navigate("Profile");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    // Remove token and info from AsyncStorage
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("infor");
    
    // Clear the state
    setToken("");
   
    setTokenDecoded({});
    
    console.log("Logged out and token cleared");
  };

  return (
    <AuthContext.Provider value={{ logout, login, token, register,  tokenDecoded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
