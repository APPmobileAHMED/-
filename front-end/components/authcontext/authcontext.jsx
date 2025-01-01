import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode"; 
import {AdresseIPPP_} from '@env'

import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Linking from 'expo-linking';
import { useToast } from "../../toastProvider/toast";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [refreshh, setrefreshh] = useState(false)
const [searchInput, setSearchInput] = useState("");
  const [buyer, setbuyer] = useState({});
  const [seller, setseller] = useState({});
  const [tokenn, setToken] = useState("");
  const [image, setImage] = useState(null)
  const [infor, setinfor] = useState({});
  const [category, setcategory] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [role, setRole] = useState("buyer");
  const [wishlist, setwishlist] = useState([]);
  const [totalPriceTunisie, setTotalPriceTunisie] = useState(0);
  const [ProductSearch,setProdSearch]=useState([])
  const [code,setCode]=useState('')
  const [orders, setOrders] = useState([]);
  const [pendingOrders, SetPendingOrders] = useState([]);
  const [shippedOrders, setshippedOrder] = useState([]);
  const [ItemsOrder,setItemsOrder]=useState(0)
  const { showToast } = useToast();
   
 useEffect(() => {
  if(infor.id){
    axios.get(`${AdresseIPPP_}/api/order/get/${infor.id}`)
    .then((result)=>{setOrders(result.data)
      
      const pendingOrder = result.data.filter(order => order.status === 'pending')
      const shippedOrder = result.data.filter(order => order.status === 'shipped')  
      SetPendingOrders(pendingOrder)
      setItemsOrder(pendingOrder.length)
      setshippedOrder(shippedOrder)

    } )
    .catch((err)=>console.log(err))
  }
  }, [infor.id,refreshh])




  const handleGoogleSignIn = async () => {
    try {
      const authUrl = `${AdresseIPPP_}/auth/google?redirect_uri=${encodeURIComponent("https://59d4-2c0f-4280-3000-5b55-dcd0-fe70-7ab4-6621.ngrok-free.app/auth/google/callback")}&role=${role}`;
      const result = await WebBrowser.openAuthSessionAsync(authUrl, "exp://192.168.1.5:8081"); 
  console.log(result,"efklkzlefkzkfkezfkzek")
      if (result.type === 'success') {
        const params = Linking.parse(result.url);
        const { token } = params.queryParams;
        
  
        if (token) {
          
          await AsyncStorage.setItem('token', token);
  
          
          const decodedToken = jwtDecode(token);
          setToken(token);
  
          if (decodedToken.role === "buyer") {
            setbuyer(decodedToken);
            getuser(decodedToken.id);
          } else if (decodedToken.role === "seller") {
            setseller(decodedToken);
            getuser(decodedToken.id); 
          }
  
          navigation.navigate('Main', {
            screen: 'Profile',
          });
        } else {
          console.log('Token not found in URL parameters');
        }
      } else {
        console.log('Google Sign-In failed:', result);
       
      } 
    } catch (error) {
      showToast('❌ Error during Google Sign-In:',"red");
    }
  };

  
  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  
  const isProductInCart = (productId) => {
    return cartProducts.some(item => item.productId === productId);
  };


  const fetchWishlist = async (userId) => {
    if (!userId) return
    try {
      const response = await axios.get(`${AdresseIPPP_}/api/wishlist/get/${userId}`);
      setwishlist(Array.isArray(response.data) ? response.data : []);
      
    } catch (error) {
      console.log(error);
      setwishlist([]);
    }
  };

  const fetchCartItems = async (userId) => {
    if (!userId) return
    try {
      const response = await axios.get(`${AdresseIPPP_}/api/cart/cartitems/${userId}`);
      setCartProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setCartProducts([]);
    }
  };

 
  
  useEffect(() => {
    if (infor.id) {
      fetchCartItems(infor.id);
      fetchWishlist(infor.id)
    }
  }, [infor.id, refreshh]);
  
  useEffect(() => {
  console.log(AdresseIPPP_,"ippppp")
    axios.get(`${AdresseIPPP_}/api/category/showall`).then((res)=>{
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
        showToast('Erreur lors de la récupération du token:',"red");
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
        showToast("Error decoding token:", "red");
      }
    }
  }, [tokenn,refreshh]);



  const getuser=async(id)=>{
    try{
      const result=await axios.get(`${AdresseIPPP_}/api/get/${id}`)
       setinfor(result.data)
       setImage(result.data.photoDeprofile)
    }catch(err){
      console.log(err)
    }
  }
 
  
  const login =async (password, email) => {
   try{ 
    
    const res= await axios.post(`${AdresseIPPP_}/api/login`, {
        password:password,
        email:email,
      })   

         await AsyncStorage.setItem("token",res.data.token)
          
              setToken(res.data.token); 
              navigation.navigate('Main')
          
    }
      catch(err) {
        showToast("❌ Login error","red");
      }
  };

  const register = async (firstname, lastname, email, password, role) => {
    try {
      const res = await axios.post(`${AdresseIPPP_}/api/register`, {
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
      
      navigation.navigate('Main', {
        screen: 'Profile',
      });
    } catch (err) {
      showToast("❌ SignUp Error","red");
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
      showToast('Logout Error:', error)
    }
    
  };

  return (
    <AuthContext.Provider value={{ logout, login, tokenn,
       register,
      infor,buyer,seller,setrefreshh,
      refreshh,category,cartProducts,
      isProductInCart,
      isProductInWishlist,
      image, setImage,
      handleGoogleSignIn,
      wishlist,
      totalPriceTunisie, setTotalPriceTunisie,
      role, setRole,
      searchInput, setSearchInput,
      ProductSearch,setProdSearch,
      code,setCode,setcategory,
      orders,ItemsOrder, setOrders,
      shippedOrders, setshippedOrder,
      pendingOrders, SetPendingOrders,
      fetchCartItems}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
