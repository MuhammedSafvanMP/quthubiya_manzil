import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Asmaulhusna from './asmaulhusna'
import  asmaulHusnaNabi  from '../../../constants/asmaal_nabi_202_names.json'
import AppBar from '../../common/AppBar'

export default function asmaulhusnAllah() {
  return (
    <SafeAreaView style={styles.container}>
       <AppBar title='Asmaul Nabi' />
      <Asmaulhusna title="Asmaul Nabi" data={asmaulHusnaNabi} subtitle="201 Names of Nabi" name="Nabi" />
    </ SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});