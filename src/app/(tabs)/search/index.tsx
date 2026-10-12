// import { useState } from "react";
// import { ScrollView, StyleSheet, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { Stack } from "expo-router";
// import { MenuButton } from "../../components/common/menuButton";
// import { menu, menuIcons } from "../../constants/menu";

// export default function SearchIndex() {
//   const [search, setSearch] = useState("");

//   const filteredMenu = menu.filter((item) =>
//     item.label.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <SafeAreaView style={styles.container} edges={["top"]}>
//       <Stack.Title style={{}}>Categories</Stack.Title>

//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.gridContainer}>
//           {filteredMenu.map((item) => (
//             <MenuButton
//               key={item.id}
//               icon={menuIcons[item.icon]}
//               label={item.label}
//             />
//           ))}
//         </View>
//       </ScrollView>
//       <Stack.SearchBar
//         placement="automatic"
//         placeholder="Search"
//         onChangeText={() => setSearch}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//   },
//   searchContainer: {
//     marginHorizontal: 16,
//     marginTop: 12,
//     marginBottom: 18,
//     height: 48,
//     backgroundColor: "#F0F0F0",
//     borderRadius: 14,
//     justifyContent: "center",
//     paddingHorizontal: 16,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 15,
//     color: "#171717",
//     paddingVertical: 0,
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 24,
//   },
//   gridContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     rowGap: 18,
//   },
// });

import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChevronLeft } from "lucide-react-native";
import { MenuButton } from "../../components/common/menuButton";
import { menu, menuIcons } from "../../constants/menu";

export default function SearchIndex() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredMenu = menu.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <Stack.Title>Categoris</Stack.Title>

      {/* Top heading and back icon */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#171717" strokeWidth={2} />
        </Pressable>

        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      {/* Category grid */}
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

      {/* Native search bar */}
      <Stack.SearchBar
        placement="automatic"
        placeholder="Search categories"
        onChangeText={(event) => setSearch(event.nativeEvent.text)}
        // onCancel={() => setSearch("")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#171717",
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 70,
  },
  scrollView: {
    flex: 1,
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
