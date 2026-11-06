import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { menu, menuIcons } from "../../../constants/menu";
import AppBar from "../../components/common/AppBar";
import MenuButton from "../../components/common/menuButton";

export default function SearchIndex() {
  const [search, setSearch] = useState("");

  const filteredMenu = menu.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase().trim()),
  );

  const handleSearchChange = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const handleNativeSearchChange = useCallback((event: any) => {
    setSearch(event.nativeEvent.text);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Stack.Screen
        options={{
          headerShown: Platform.OS === "ios",
          title: "Categories",
        }}
      />

      {Platform.OS !== "ios" && <AppBar title="Categories" />}

      {Platform.OS === "android" && (
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#737373"
            style={styles.searchIcon}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search categories"
            placeholderTextColor="#999"
            value={search}
            onChangeText={handleSearchChange}
            returnKeyType="search"
          />

          {search.length > 0 && (
            <Ionicons
              name="close-circle"
              size={20}
              color="#999"
              style={styles.clearIcon}
              onPress={() => setSearch("")}
            />
          )}
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.gridContainer}>
          {filteredMenu.map((item) => (
            <MenuButton
              key={item.id}
              icon={menuIcons[item.icon]}
              label={item.label}
            />
          ))}
        </View>

        {filteredMenu.length === 0 && (
          <Text style={styles.emptyText}>No categories found</Text>
        )}
      </ScrollView>

      {Platform.OS === "ios" && (
        <Stack.SearchBar
          placement="automatic"
          placeholder="Search categories"
          onChangeText={handleNativeSearchChange}
        />
      )}

    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
    backgroundColor: "#FAFAFA",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    height: 44,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#171717",
    paddingVertical: 0,
  },

  clearIcon: {
    marginLeft: 8,
  },

  scrollView: {
    flex: 1,
    minHeight: 0,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    columnGap: 12,
    rowGap: 18,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
    color: "#737373",
  },


});