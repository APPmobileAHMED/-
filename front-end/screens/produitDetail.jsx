import { View, Text, StyleSheet, TouchableOpacity, Image, Animated,TextInput, ScrollView, Modal } from "react-native"
import React, { useEffect, useState, useRef } from "react"
import { Ionicons, Fontisto, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../components/authcontext/authcontext";
import {AdresseIPPP_} from '@env'
const ProductDetails = ({ navigation }) => {
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
    const [refresh, setrefresh] = useState(false)
    const {infor}=useAuth()

    const postComment=()=>{
      if(newComment===""){
        alert("please enter text")
      }else{
      axios.post(`${AdresseIPPP_}review/add/${infor.id}`,{
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
    axios.get(`${AdresseIPPP_}review/getall/${productId}`).then((ress)=>{
    setallcomment(ress.data)
    }).catch((err)=>console.log(err))



        axios.get(`${AdresseIPPP_}product/${productId}`).then((res) => {
            setOneproduct(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        axios.get(`${AdresseIPPP_}get/${sellerId}`).then((res)=>{
          setseller(res.data)
          console.log(res.data,"choch")
        })
        .catch((err)=>{console.log(err)})



    }, [productId,refresh]);
    const [isFavorite, setIsFavorite] = useState(false);

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
                <TouchableOpacity onPress={toggleFavorite}>
                <View style={{
                  top:10,
                    width: 35,
                    height: 35,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "black", 
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Ionicons 
                        name="heart" 
                        size={25}
                        style={{top:1}}
                        color={isFavorite ? "#f95151" : "black"} 
                    />
                </View>
            </TouchableOpacity>
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
          <View style={{marginBottom:40}}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>{oneproduct.title}</Text>
                
                <View style={styles.priceWrapper}>
                    
                    <Text style={styles.price}>{oneproduct.price} dt</Text>
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
    
                <View style={styles.rating}>
                  <TouchableOpacity onPress={increment}>
                      <SimpleLineIcons 
                        name="plus"
                        size={20}
                        color={COLORS.black}
                      />
                  </TouchableOpacity>
                  <Text style={styles.ratingText}>  {count}   </Text>
                  <TouchableOpacity onPress={()=>decrement}>
                      <SimpleLineIcons 
                        name="minus"
                        size={20}
                        color={COLORS.black}
                      />
                  </TouchableOpacity>
                </View>
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

            
    
            <View style={styles.cartRow}>
                <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                    <Text style={styles.cartTitle}>اشتري الآن</Text>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={() => {}} style={styles.addCard}>
                    <Fontisto name="shopping-bag" size={20} color={COLORS.lightWhite} />
                </TouchableOpacity>
            </View>
           </View>
          </View>
          
        </View>
    
      )
    }
    
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        
    },
    upperRow: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: SIZES.xLarge * 1.3,
        zIndex: 999,
        width: SIZES.width - 44
    },
    listItem: {
      top:10,
      right: 220,
      fontFamily: "bold",
      
      color: COLORS.gray,
    },
    image: {
        top: 100,
        aspectRatio: 1,
        height: 600,
        width: 360
    },
    navigationArrows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 400,
        width: '100%',
        paddingHorizontal: 20
    },

    
    
      details: {
        top: -18,
        backgroundColor: COLORS.lightWhite,
        width: SIZES.width,
        borderTopLeftRadius: SIZES.medium,
        marginBottom: SIZES.xLarge,
        borderTopRightRadius: SIZES.medium,
      },
      titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 44,
        top: 20,
        marginHorizontal: 20,
        paddingBottom: SIZES.small,
      },
      title: {
        fontFamily: "bold",
        fontSize: SIZES.large,
      },
      priceWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: SIZES.large
      },
      price: {
        fontFamily: "semibold",
        fontSize: SIZES.large,
        paddingHorizontal: 10,
      },
      ratingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 10,
        top: 5,
        paddingBottom: SIZES.small
      },
      rating: {
        top: SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: SIZES.large
      },
      ratingText: {
        color: COLORS.gray,
        fontFamily: "medium",
        marginLeft: 5,
        paddingHorizontal: SIZES.xSmall,
        
      },
      descriptionWrapper: {
    
        
        marginTop: 20,
        top: -55,
        marginHorizontal: SIZES.large,
      },
      
      description: {
        right:220,
        top:10,
        fontSize: SIZES.large - 2,
      },
      descText: {
        
        fontSize: SIZES.small,
        textAlign: "justify",
        marginBottom: SIZES.small,
      },
      location: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.secondary,
        alignItems: "center",
        padding: 5,
        borderRadius: SIZES.large,
        marginHorizontal: 12,
      },
      cartRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 22,
        paddingBottom: SIZES.small,
      },
      cartBtn: {
        width: SIZES.width * 0.7,
        backgroundColor: COLORS.black,
        padding: SIZES.xSmall,
        borderRadius: SIZES.large,
        marginLeft: 12,
        alignItems: "center"
      },
      cartTitle: {
        fontFamily: "bold",
        color: COLORS.lightWhite,
        fontSize: SIZES.medium
      },
      addCard: {
        width: 37,
        height: 37,
        borderRadius: 50,
        margin: SIZES.small,
        backgroundColor: COLORS.black,
        alignItems: "center",
        justifyContent: "center"
      },
      addCard1: {
        width: 37,
        height: 37,
        borderRadius: 50,
        marginTop:-30,
        backgroundColor:COLORS.lightWhite,
        alignItems: "center",
        justifyContent: "center",
        bottom:10,
        left:290,
      },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center'
        },
        modalCloseBtn: {
            marginTop: 20
        },
        modalCloseText: {
            color: '#0891b2',
            fontSize: 16,
            fontWeight: 'bold'
        },
        overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        modalBox: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20, maxHeight: '100%' },
        closeButton: { alignSelf: 'flex-end', padding: 10 },
        closeButtonText: { color: '#0891b2', fontFamily:"bold",fontSize:20,right:25,bottom:15 },
        commentsScroll: { flexGrow: 0, maxHeight: '60%' },  
        commentBox: { flexDirection: 'row', marginVertical: 10, alignItems: 'center',  marginBottom: 10, 
          marginLeft: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          paddingVertical: 5,
          
          color:'gray', },
        userImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
        commentTextBox: { flex: 1 },
        userName: { fontFamily:"bold",fontSize:20 },
        usercomments:{fontFamily:"regular",fontSize:18 },
        commentInputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
        commentInput: {   width: '100%', 
          marginTop:30,    
          height: "13%",        
          padding: 5,        
          fontSize: 14,      // size kbir kifaya besh tal9a text bech wa7da m4 barchaa
          borderColor: '#ccc',  // border 5fifa bel 7keya chwaya bech telmaha
          borderWidth: 2,     // border na3tiha chwaya 5fifa bch talma
          borderRadius: 5, },
        submitButton: { backgroundColor: '#0891b2', padding: 10, borderRadius: 5,top:10, },
        submitButtonText: { color: 'white', fontWeight: 'bold',left: '30%' },
        
    });
    export default ProductDetails