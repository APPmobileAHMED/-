import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode"; 
import {AdresseIPPP_,ID_CLIENT,CLIENT_SECRET,GOOGLE_REDIRECT_URI} from '@env'
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession()

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [refreshh, setrefreshh] = useState(false)
  const [userInfo,setUserInfo]=useState([]);
  const [buyer, setbuyer] = useState({});
  const [seller, setseller] = useState({});
  const [tokenn, setToken] = useState("");
  const [infor, setinfor] = useState({});
  const [category, setcategory] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
 
const [request,response ,PromptAsync]=Google.useAuthRequest({
  androidClientId:"142946286343-hfd5eff0mui4k8mpvh7o1rajk21nroem.apps.googleusercontent.com",
  webClientId:"142946286343-qdkepot78adi9p4hv3mfrggf54tebhri.apps.googleusercontent.com"
})


  const isProductInCart = (productId) => {
    return cartProducts.some(item => item.productId === productId);
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const authUrl = `http://192.168.100.4:8080/auth/google?redirect_uri=${encodeURIComponent("https://ab71-2c0f-4280-10-60fa-6531-7296-7a49-d87b.ngrok-free.app/auth/google/callback")}`;
  //     const result = await WebBrowser.openAuthSessionAsync(authUrl, "https://ab71-2c0f-4280-10-60fa-6531-7296-7a49-d87b.ngrok-free.app/auth/google/callback");
  
  //     if (result.type === 'success') {
  //       const params = Linking.parse(result.url);
  //       const { token } = params.queryParams;
  
  //       if (token) {
  //         // Save token to AsyncStorage
  //         await AsyncStorage.setItem('token', token);
  
  //         // Decode token and update state
  //         const decodedToken = jwtDecode(token);
  //         setToken(token);
  
  //         if (decodedToken.role === "buyer") {
  //           setbuyer(decodedToken);
  //           getuser(decodedToken.id);
  //         } else if (decodedToken.role === "seller") {
  //           setseller(decodedToken);
  //           getuser(decodedToken.id);
  //         }
  
  //         navigation.navigate('Main');
  //       } else {
  //         console.log('Token not found in URL parameters');
  //       }
  //     } else {
  //       console.log('Google Sign-In failed:', result);
  //     }
  //   } catch (error) {
  //     console.error('Error during Google Sign-In:', error);
  //   }
  // };
  

  const fetchCartItems = async (userId) => {
    if (!userId) return
    try {
      const response = await axios.get(`${AdresseIPPP_}cart/cartitems/${userId}`);
      setCartProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setCartProducts([]);
    }
  };

 
  
  useEffect(() => {
    if (infor.id) {
      fetchCartItems(infor.id);
    }
  }, [infor.id, refreshh]);
  
  useEffect(() => {
  
    axios.get(`${AdresseIPPP_}category/showall`).then((res)=>{
      setcategory(res.data)
      
    }).catch((err)=>console.log(err))

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
      const result=await axios.get(`${AdresseIPPP_}get/${id}`)
       setinfor(result.data)
    }catch(err){
      console.log(err)
    }
  }
 
  
  const login =async (password, email) => {
   try{ 
    
    const res= await axios.post(`${AdresseIPPP_}login`, {
        password:password,
        email:email,
      })   

         await AsyncStorage.setItem("token",res.data.token)
          
              setToken(res.data.token); 
              navigation.navigate('Main')
          
    }
      catch(err) {
        console.error("Login error:", err);
      }
  };

  const register = async (firstname, lastname, email, password, role) => {
    try {
      const res = await axios.post(`${AdresseIPPP_}register`, {
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
      
      navigation.navigate('Main');
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
    <AuthContext.Provider value={{ logout, login, tokenn,
       register,
      infor,buyer,seller,setrefreshh,
      refreshh,category,cartProducts,
      isProductInCart,
      
      PromptAsync,
      fetchCartItems}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
