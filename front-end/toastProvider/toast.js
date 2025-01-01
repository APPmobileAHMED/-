import React, { createContext, useContext, useRef, useState } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [textColor, setTextColor] = useState(COLORS.primary);
  const animation = useRef(new Animated.Value(-100)).current;

  const showToast = (msg, color = COLORS.primary) => {
    setMessage(msg);
    setTextColor(color); 
    setIsVisible(true);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000), 
      Animated.timing(animation, {
        toValue: -100,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
    });
  };


  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{ translateY: animation }],
            },
          ]}
        >
          <Text style={[styles.toastText, { color: textColor }]}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60,
    left:30,
    right: 0,
    backgroundColor: COLORS.lightWhite,
    elevation:50,
    borderRadius:20,
    borderColor:COLORS.gray2,
    borderWidth:2,
    padding: 10,
    zIndex: 1000,
    alignItems: "center",
    width:310
  },
  toastText: {
  
    fontSize: 13,
    fontWeight: "bold",
  },
});
