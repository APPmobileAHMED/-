import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, SIZES } from "../constants";
import { useAuth } from '../components/authcontext/authcontext';
import axios from 'axios';
import {AdresseIPPP_} from '@env'

import { useTranslation } from 'react-i18next';

const ModalSearch = ({ setModalVisible, modalVisible }) => {
  const { t} = useTranslation()
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const {category,ProductSearch,setProdSearch,setSearchInput} = useAuth()
  const [categoryName, setCategoryName] = useState([
    { label: t('categoryNames:door'), value: "أبواب" },
    { label: t('categoryNames:Windows'), value: "نوافذ" },
    { label: t('categoryNames:IronDoors'), value: "أبواب حديدية كبيرة" },
    { label: t('categoryNames:KitchenSupplies'), value: "مستلزمات المطبخ"},
  ]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [typeItems, setTypeItems] = useState([
    { label:t('categoryNames:alum'), value: "ألمنيوم" },
    { label: t('categoryNames:wood'), value: "خشب" },
    { label: t('categoryNames:iron'), value: "حديد" },
  ]);
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
 
  

const search=()=>{
  if(selectedCategoryName && selectedType && width && length){
    axios.get(`${AdresseIPPP_}/api/search/searchBycategoriesBySpecifqueTypeAndMeasuresAndName/${selectedCategoryName}/${selectedType}/${width}/${length}`)
  .then((response)=>{
    setProdSearch(response.data)
      
      
  })
  .catch((err)=>console.log(err)) 

  }else if(selectedType && width && length){
    axios.get(`${AdresseIPPP_}/api/search/searchBycategoriesBySpecifqueTypeAndMeasures/${selectedType}/${width}/${length}`)
    .then((response)=>{
      setProdSearch(response.data)
        
        
    })
    .catch((err)=>console.log(err)) 
    
  }else if(selectedCategoryName && width && length){

    axios.get(`${AdresseIPPP_}/api/search/serachByMeasureAndName/${selectedCategoryName}/${width}/${length}`)
    .then((response)=>{
      setProdSearch(response.data)
        
        
    })
    .catch((err)=>console.log(err)) 

  }else if(selectedCategoryName && selectedType){

    axios.get(`${AdresseIPPP_}/api/search/searchBycategoriesBySpecifqueTypeAndName/${selectedCategoryName}/${selectedType}`)
    .then((response)=>{
      setProdSearch(response.data)
        
        
    })
    .catch((err)=>console.log(err)) 
  }else if(selectedType){
    axios.get(`${AdresseIPPP_}/api/search/searchBycategoriesBySpecifqueType/${selectedType}`)
    .then((response)=>{
      setProdSearch(response.data)
        
        
    })
    .catch((err)=>console.log(err)) 
  }else if(selectedCategoryName){
    axios.get(`${AdresseIPPP_}/api/search/searchByName/${selectedCategoryName}`)
    .then((response)=>{
      setProdSearch(response.data)
        
        
    })
    .catch((err)=>console.log(err)) 
  }
  
  setSelectedType(null)
  setSelectedCategoryName(null)
  setWidth("")
  setLength("")
  setSearchInput("")
  
}



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('modalSearch:title')}</Text>

          
          <Text style={styles.modalLabel}>{t('modalSearch:inputCatgories')}:</Text>
          <View style={{ zIndex: categoryOpen ? 1000 : 1 }}>
            <DropDownPicker
              open={categoryOpen}
              value={selectedCategoryName}
              items={[
                { label: t('categoryNames:door'), value: "أبواب" },
                { label: t('categoryNames:Windows'), value: "نوافذ" },
                { label: t('categoryNames:IronDoors'), value: "أبواب حديدية كبيرة" },
                { label: t('categoryNames:KitchenSupplies'), value: "مستلزمات المطبخ"},
              ]}
              setOpen={setCategoryOpen}
              setValue={setSelectedCategoryName}
              setItems={setCategoryName}
              style={styles.dropdown}
              placeholder={t('modalSearch:placeholderCatgories')}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

          
          <Text style={styles.modalLabel}>{t('modalSearch:inputType')}:</Text>
          <View style={{ zIndex: typeOpen ? 1000 : 1 }}>
            <DropDownPicker
              open={typeOpen}
              value={selectedType}
              items={[
                { label:t('categoryNames:alum'), value: "ألمنيوم" },
                { label: t('categoryNames:wood'), value: "خشب" },
                { label: t('categoryNames:iron'), value: "حديد" },
              ]}
              setOpen={setTypeOpen}
              setValue={setSelectedType}
              setItems={setTypeItems}
              style={styles.dropdown}
              placeholder={t('modalSearch:placeholderType')}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          </View>

        
          <Text style={styles.modalLabel}>{t('modalSearch:inputMeasure')}:</Text>
          <View style={styles.inputsRow}>
       
            <TextInput
              style={styles.input}
              value={width}
              onChangeText={setWidth}
              placeholder={t('modalSearch:placeholderWidth')}
              keyboardType="numeric"
            />

         
            <TextInput
              style={styles.input}
              value={length}
              onChangeText={setLength}
              placeholder={t('modalSearch:placeholderLength')}
              keyboardType="numeric"
            />
          </View>

         
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => {
              search()
              setModalVisible(false);
            }}
          >
            <Text style={styles.applyText}>{t('modalSearch:buttonSearch')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: COLORS.offwhite,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: SIZES.small,
  },
  modalLabel: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    marginVertical: SIZES.small,
  },
  dropdown: {
    width: "100%",
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    backgroundColor: COLORS.white,
  },
  dropdownContainer: {
    borderColor: COLORS.lightGray,
  },
  input: {
    width: "48%", // Adjusted width to fit next to each other
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.small,
  },
  applyBtn: {
    marginTop: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
  },
  applyText: {
    color: COLORS.offwhite,
    fontFamily: "bold",
  },
});

export default ModalSearch;
