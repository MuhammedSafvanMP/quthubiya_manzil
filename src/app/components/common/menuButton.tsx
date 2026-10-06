import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export const MenuButton = ({ icon, label, iconLib = "Ionicons" }: { icon: string; label: string; iconLib?: string }) => {
  const IconComponent = 
    iconLib === "Ionicons" ? Ionicons : 
    iconLib === "FontAwesome5" ? FontAwesome5 : 
    MaterialCommunityIcons;

  return (
    <View style={styles.menuButtonWrapper}>
      <TouchableOpacity style={styles.menuButton}>
        <IconComponent name={icon} size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
  );
};


const styles =  StyleSheet.create({


  // Grid Menu
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuButtonWrapper: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 24,
  },
  menuButton: {
    backgroundColor: '#1A1A1A',
    width: '100%',
    aspectRatio: 1, // Creates a perfect square
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  menuLabel: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },


});