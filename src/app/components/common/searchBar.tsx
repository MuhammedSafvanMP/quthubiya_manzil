import { Ionicons } from "@expo/vector-icons";
import { Search } from "lucide-react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export const SearchBar = ({ search, setSearch }: { search: string; setSearch: (text: string) => void }) => (

  
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>

            <Search width={20} />
          </Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search Surah..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />

          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              style={styles.clearButton}
            >
              <Text style={styles.clearText}>×</Text>
            </TouchableOpacity>
          )}
        </View>
);



const styles =  StyleSheet.create({
      // Search Bar
  searchContainer: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 12,
    marginBottom: 8,
  },

  searchIcon: {
    fontSize: 24,
    color: "#6B7280",
    marginRight: 8,
    lineHeight: 24,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: "#111827",
  },

  clearButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    fontSize: 26,
    color: "#9CA3AF",
    lineHeight: 26,
  },
});