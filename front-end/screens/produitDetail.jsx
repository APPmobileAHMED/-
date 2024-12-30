import { View, Text, StyleSheet, TouchableOpacity, Image, Animated,TextInput, ScrollView, Modal } from "react-native"
import React, { useEffect, useState, useRef } from "react"
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../components/authcontext/authcontext";
import {AdresseIPPP_} from '@env'
import { useNavigation } from "@react-navigation/native";
import styles from "../styleScreens/styleProductDetails"
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import PaymentModalByOneproduct from '../modals/paymentModalByOneproduct';
const ProductDetails = () => {
    const navigation = useNavigation();
    const [oneproduct, setOneproduct] = useState({});
    const [seller, setseller] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const route = useRoute();
    const { productId,sellerId } = route.params;
    const scrollViewRef = useRef();
    const [newComment, setNewComment] = useState('');
    const [count,setCount]=useState(1)
    const [modalVisible, setModalVisible] = useState(false); 
    const [visibleComment, setsVisibleComment] = useState(false); 
    const [allcomments, setallcomment] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [refresh, setrefresh] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {infor,isProductInWishlist,setrefreshh,refreshh}=useAuth()
     const [selectedPayment, setSelectedPayment] = useState(null);


    const calculTotal=(price,quantity)=>{
      return price*quantity
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible); 
      }

      const handlePaymentOptionSelect = (option) => {
        setSelectedPayment(option);
      }

      const nextPage=( selected,totalPrice )=>{
        if(selected==="Visa"){
          navigation.navigate('PaymentScreen',{methodpayment:selectedPayment,totalPrice:totalPrice})
          setIsModalVisible(false)
        }else if(selected==="MasterCard"){
        
          navigation.navigate('PaymentScreen',{methodpayment:selectedPayment,totalPrice:totalPrice})
          setIsModalVisible(false)
        
        }
        else if(selected==="Flouci"){
          axios.post(`${AdresseIPPP_}/api/flouci/buy`,{
            amount:totalPrice
          })
          .then((res)=>{
            const {result}=res.data
            if(result){
              console.log(result.link)
        
                WebBrowser.openBrowserAsync(result.link);
                 setIsModalVisible(false) 
            }
          })
          .catch((err)=>console.log(err))
        }
        }

    const postComment=()=>{
      if(newComment===""){
        alert("please enter text")
      }else{
      axios.post(`${AdresseIPPP_}/api/review/add/${infor.id}`,{
        comment:newComment,
        productId:productId
      }).then((res)=>{
        console.log(res) 
        setNewComment("")
        alert("success")
        setrefresh(!refresh)
      }).catch((err)=>console.log(err))}
    }



    const increment=()=>{
        setCount(count+1)
    }
    const decrement=()=>{
        if(count>1){
        setCount(count-1)}
    }

    const images = [oneproduct.img1, oneproduct.img2, oneproduct.img3, oneproduct.img4];

    useEffect(() => {
    axios.get(`${AdresseIPPP_}/api/review/getall/${productId}`).then((ress)=>{
    setallcomment(ress.data)
    }).catch((err)=>console.log(err))



        axios.get(`${AdresseIPPP_}/api/product/${productId}`).then((res) => {
            setOneproduct(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        axios.get(`${AdresseIPPP_}/api/get/${sellerId}`).then((res)=>{
          setseller(res.data)
          console.log(res.data,"choch")  
        })
        .catch((err)=>{console.log(err)})



    }, [productId,refresh]);
    

    const addtoWishlist=(product)=>{
      axios.post(`${AdresseIPPP_}/api/wishlist/add/${infor.id}`,{
        productId: product
  }).then((res)=>{
        console.log(res.data)
        
        setrefreshh(!refreshh) 
        alert("added to cart")
      }).catch((error)=>{console.log("kkjf")})
    }

    deleteFavoriteItem=(id)=>{
      axios.delete(`${AdresseIPPP_}/api/wishlist/delete/${id}`)
      .then((res) => {
           alert("item deleted")
       setrefreshh(!refreshh)
     })
     .catch((error) => {
       console.log("oops");
         
     });
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            scrollViewRef.current.scrollTo({ x: SIZES.width * (currentIndex + 1), animated: true });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            scrollViewRef.current.scrollTo({ x: SIZES.width * (currentIndex - 1), animated: true });
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.upperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}> 
                    <Ionicons  
                        name="chevron-back-circle"
                        size={30}
                        style={{ top: 10 }}
                    />
                </TouchableOpacity>
                {infor.role==="buyer"&&(
                    <TouchableOpacity onPress={toggleFavorite}>
                <View style={{
                  top:10,
                    width: 35,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    

 {isProductInWishlist(productId) ? (
        <TouchableOpacity onPress={() => deleteFavoriteItem(productId)}>
          <Ionicons 
                        name="heart-dislike" 
                        size={25}
                        style={{top:1}}
                        color={"#f95151"} 
                    />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => addtoWishlist(productId)}>
          <Ionicons 
                        name="heart-circle" 
                        size={33}
                        style={{top:1}}
                        color={"black"} 
                    />
        </TouchableOpacity>
      )}

                </View>
            </TouchableOpacity>
                )}
                
            </View>

            <ScrollView 
                horizontal
                pagingEnabled
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
            >
                {images.map((image, index) => (
                    image && (
                        <Image key={index} source={{ uri: image }} height={360} width={360}top={80} style={{aspectRatio:1/1}}  />
                    )
                ))}
            </ScrollView>

            <View style={styles.navigationArrows}>
                {currentIndex > 0 && (
                    <TouchableOpacity onPress={handlePrevious}>
                        <Ionicons name="arrow-back-circle" size={40} color={COLORS.lightWhite} />
                    </TouchableOpacity>
                )}
                {currentIndex < images.length - 1 && (
                    <TouchableOpacity onPress={handleNext}>
                        <Ionicons name="arrow-forward-circle" size={40} color={COLORS.lightWhite} />
                    </TouchableOpacity>
                )}
            </View>

          <View style={styles.details}>
          <View style={{marginBottom: infor.role === "buyer" ? 40 : 80}}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>{oneproduct.title}</Text>
                
                <View style={styles.priceWrapper}>
                    
                    <Text style={styles.price}>{calculTotal(oneproduct.price,count)} dt</Text>
                    
                </View>
                
            </View>
    
            <View style={styles.ratingRow}>
                <View style={styles.rating}>
                    {[1,2,3,4,5].map((index) => (
                      <Ionicons  
                        key={index}
                        name="star"
                        size={24}
                        color="gold"
                        style={{top:-50}}
                      />
                    ))}
    
                    <Text style={{top:-50}}>(4.9)</Text>
                </View>
                 {infor.role==="buyer"&&(<View style={styles.rating}>
                  <TouchableOpacity onPress={increment}>
                      <SimpleLineIcons 
                        name="plus"
                        size={20}
                        color={COLORS.black}
                      />
                  </TouchableOpacity>
                  <Text style={styles.ratingText}>  {count}   </Text>
                  <TouchableOpacity onPress={()=>decrement()}>
                      <SimpleLineIcons 
                        name="minus"
                        size={20}
                        color={COLORS.black}
                      />
                  </TouchableOpacity>
                </View>)}
                
            </View>
    
            <View style={styles.descriptionWrapper}>
              <View></View>
                <Text style={styles.description}>
                القياس :
                </Text>
                <Text style={styles.listItem}>- الطول: {oneproduct.length}</Text>
                <Text style={styles.listItem}>-العرض: {oneproduct.width}</Text>
                
     
            </View>
          
           

            <TouchableOpacity style={styles.addCard1} >

            <TouchableOpacity onPress={() => setModalVisible(true)} >
 <Fontisto name="male" size={20} color={"#0891b2"} style={{top:20,left:20}} />
            <Text style={{right:60, marginHorizontal:-50,bottom:-3}}>معلومات عن البائع</Text>
            </TouchableOpacity>

                 <TouchableOpacity onPress={() => setsVisibleComment(true)}  >
                <Fontisto name="comments" size={24} color={"#0891b2"} style={{left:-250,top:-20}}/>
            </TouchableOpacity>

            </TouchableOpacity>
            <Modal
            animationType="slide"
            transparent={true}
            visible={visibleComment}
            onRequestClose={() => setsVisibleComment(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <TouchableOpacity onPress={() => setsVisibleComment(false)} style={styles.closeButton}>
                    <Fontisto name="close" size={24} color={"#0891b2"} style={{left:20,bottom:10}}/>
                        <Text style={styles.closeButtonText}>إغلاق</Text>
                    </TouchableOpacity>

                  
                    <ScrollView style={styles.commentsScroll}>
                      {allcomments.length > 0 ?(
 allcomments.map((comment, index) => (
  <View key={index} style={styles.commentBox}>
      <Image
          source={{ uri: comment.User.photoDeprofile || "https://refugedulacdulou.com/wp-content/uploads/2019/01/avatar-anonyme.png" }}
          style={styles.userImage}
      />
      <View style={styles.commentTextBox}>
          <Text style={styles.userName}>{comment.User.firstname + " " + comment.User.lastname}</Text>
          <Text style={styles.usercomments}>{comment.comment}</Text>
      </View>
      
  </View>
  
))
                      ):(
                        <View>
                        
                        <Text style={{ fontFamily: 'bold', fontSize: 40, color:"gray",top:50,left:-40  }}>
          لا توجد تعليقات     
        </Text>
        <Fontisto name="commenting" size={45} color={"gray"} style={{left:220,bottom:50}}/>
                        </View>
                        

                      ) }
                       
                        
                    </ScrollView>
                   

                   
                    <TextInput
                    
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={()=>postComment()}>
                        <Text style={styles.submitButtonText}>Post Comment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
           
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} 
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{fontFamily:"bold",fontSize:24}}> البائع: {seller.username}</Text>
                        <Text style={{fontFamily:"bold",fontSize:15,top:10}}>الاسم و اللقب:  {seller.firstname+" "+seller.lastname}  </Text>
                        <Text style={{fontFamily:"bold",fontSize:15,top:10}}>البريد الإلكتروني:  {seller.email} </Text>
                        <Text style={{fontFamily:"bold",fontSize:15,top:10}}>رقم الهاتف :  {seller.phoneNumber} </Text>
                        <Text style={{fontFamily:"bold",fontSize:15,top:10}}>المكان :  {seller.location} </Text>
                       
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseBtn}>
                            <Text style={styles.modalCloseText}>إغلاق</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            
             {infor.role==="buyer" &&(<View style={styles.cartRow}>
                <TouchableOpacity onPress={() => {toggleModal()}} style={styles.cartBtn}>
                    <Text style={styles.cartTitle}>اشتري الآن</Text>
                </TouchableOpacity>
    
                
            </View>)}
            
           </View>
          </View>
          <PaymentModalByOneproduct
  isModalVisible={isModalVisible}
  toggleModal={toggleModal}
  handlePaymentOptionSelect={handlePaymentOptionSelect}
  selectedPayment={selectedPayment}
  nextPage={nextPage}
  calculTotal={calculTotal}
  count={count}
  price={oneproduct.price}
  
/>
        </View>
    
      )
    }
    
    
    
   
    export default ProductDetails