import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Asmaulhusna from './asmaulhusna'
import  asmaulHusna  from '../../../constants/asmaul_husna.json'
import AppBar from '../../common/AppBar'

export default function asmaulhusnAllah() {
  return (
    <SafeAreaView style={styles.container}>
       <AppBar title='Asmaul Husna' />
      <Asmaulhusna title="Asmaul Husna" data={asmaulHusna} subtitle="99 Names of Allah" name="Allah" />
    </ SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});