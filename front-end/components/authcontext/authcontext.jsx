import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [refreshh, setrefreshh] = useState(false)
  const [buyer, setbuyer] = useState({});
  const [seller, setseller] = useState({});
  const [tokenn, setToken] = useState("");
  const [infor, setinfor] = useState({});
  
 
  
  
  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken !== null) {
      
          setToken(storedToken);
          console.log('Token récupéré:', storedToken);
        } else {
          console.log('Aucun token trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
      }
    };
    getTokenFromStorage()

    if (tokenn) {
      try {
        const decodedToken = jwtDecode(tokenn);
        console.log(decodedToken)
        
        if (decodedToken.role === "buyer") {
          setbuyer(decodedToken);
          getuser(decodedToken.id)
        } else if (decodedToken.role === "seller") {
          setseller(decodedToken);
          getuser(decodedToken.id)

        }
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, [tokenn,refreshh]);



  const getuser=async(id)=>{
    try{
      const result=await axios.get(`http://192.168.1.13:8080/api/get/${id}`)
       setinfor(result.data)
    }catch(err){
      console.log(err)
    }
  }
 
  
  const login =async (password, email) => {
   try{ 
    
    const res= await axios.post("http://192.168.1.13:8080/api/login", {
        password:password,
        email:email,
      })   

         await AsyncStorage.setItem("token",res.data.token)
          
              setToken(res.data.token); 
              navigation.navigate("BottomTabNav");
          
    }
      catch(err) {
        console.error("Login error:", err);
      }
  };

  const register = async (firstname, lastname, email, password, role) => {
    try {
      const res = await axios.post("http://192.168.1.13:8080/api/register", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: role,
      });

      console.log(res.data);

     
      await AsyncStorage.setItem("token", res.data.token);
      

      console.log("stored");

     
      setToken(res.data.token); 
      
      navigation.navigate("Profile");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    
    try {
      
      await AsyncStorage.removeItem('token')
      setbuyer({})
      setseller({})
      setinfor({})
      
      setToken("");
   
      
      
      console.log("Logged out and token cleared"); 
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    } catch (error) {
      console.error('Logout Error:', error)
    }
    
  };

  return (
    <AuthContext.Provider value={{ logout, login, tokenn, register,infor,buyer,seller,setrefreshh,refreshh}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
