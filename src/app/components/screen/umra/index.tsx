import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../common/AppBar";
import { umrahData } from "./utils/umrahData";

export default function Umra() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return umrahData.list_items;
    return umrahData.list_items.filter(
      (i) => i.title.toLowerCase().includes(q) || String(i.id).includes(q),
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title="ഉംറ & ഹജ്ജ്" showBack={true} />
      <View style={styles.container}>
        {/* <SearchBar search={search} setSearch={setSearch} /> */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.card}

              onPress={() =>
                router.push({
                  pathname: "/components/screen/umra/[mainId]",
                  params: { mainId: String(item.id) },
                })
              }
            >
              <View style={styles.number}>
                <Text style={styles.numberText}>{index + 1}</Text>
              </View>
              <View style={styles.textCol}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>
                  {item.sub_list?.length ?? 0} ഇനങ്ങൾ
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFA" },
  container: { flex: 1, paddingHorizontal: 20 },
  listContent: { paddingBottom: 24 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 14,
  },
  number: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  textCol: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#111827" },
  subtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  chevron: { fontSize: 26, color: "#9CA3AF" },
});
