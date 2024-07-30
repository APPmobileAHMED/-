import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants'
import { SIZES } from '../../constants'

const Headings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Rivals</Text>
        <TouchableOpacity>
          <Ionicons name='grid' size={24} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Headings



const styles=StyleSheet.create({
    container:{
        marginTop:SIZES.medium,
        marginHorizontal:12
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    headerTitle:{
        fontFamily:"semibold",
        fontSize:SIZES.xLarge -2
    }
})