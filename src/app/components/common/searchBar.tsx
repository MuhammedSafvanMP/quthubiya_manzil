import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <Ionicons name="search-outline" size={24} color="#666" />
    <TextInput 
      placeholder="Search Quran, Adkar, Swalath, ..." 
      placeholderTextColor="#999"
      style={styles.searchInput}
    />
  </View>
);



const styles =  StyleSheet.create({
      // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
});