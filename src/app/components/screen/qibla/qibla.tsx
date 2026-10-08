import React from "react";
import { View, StyleSheet, Text } from "react-native";
import QiblaCompass from "react-native-qibla-compass";
import AppBar from "../../common/AppBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QiblaScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <AppBar title="Qibla" />
        <View style = {styles.qibla}>
       
      <QiblaCompass
        color="#176B52"
      />

       <View style={styles.card}>
        {/* Left Side: Icon Circle */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name="compass-outline" 
            size={26} 
            color="#2E5A4C" 
          />
        </View>

        {/* Right Side: Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Hold Phone Flat & Steady</Text>
          <Text style={styles.description}>
            For true accuracy, position your device horizontally away from metallic surfaces and magnetic smartphone cases.
          </Text>
        </View>
      </View>

       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
  },
  qibla: {
    width: "100%",
    marginTop: "5%",
padding: 20,
  },

  card: {
    backgroundColor: '#F5F5F7', // Light gray background for the card
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row', // Aligns icon and text horizontally
    alignItems: 'flex-start', // Aligns items to the top
    width: '100%',
    // Optional: subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,

  },
  iconContainer: {
    backgroundColor: '#E2EAE6', // Light sage green circle
    width: 48,
    height: 48,
    borderRadius: 24, // Makes it a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16, // Space between icon and text
  },
  textContainer: {
    flex: 1, // Ensures text wraps instead of overflowing
  },
  title: {
    fontSize: 18,
    fontWeight: '700', // Bold
    color: '#1A1A1A',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22, // Good line height for readability
    color: '#666666', // Dark gray for body text
  },
});