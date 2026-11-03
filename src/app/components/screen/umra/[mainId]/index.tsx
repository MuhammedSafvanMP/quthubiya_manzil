import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../../common/AppBar";
import { getMainItem } from "../utils/umrahData";

export default function UmraSubListScreen() {
  const { mainId } = useLocalSearchParams<{ mainId: string }>();
  const main = getMainItem(mainId!);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const list = main?.sub_list ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((i) => i.title.toLowerCase().includes(q));
  }, [main, search]);

  if (!main) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppBar title="Not Found" showBack={true} />
        <Text style={{ padding: 20 }}>Item not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title={main.title} showBack={true} />
      <View style={styles.container}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => {
            const hasNested = (item.sub_list?.length ?? 0) > 0;
            const hasDesc = !!item.desc;

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.row}

                onPress={() => {
                  if (hasNested) {
                    router.push({
                      pathname: "/components/screen/umra/[mainId]/[subId]",
                      params: {
                        mainId: String(mainId),
                        subId: String(item.id),
                      },
                    });
                  } else if (hasDesc) {
                    router.push({
                      pathname:
                        "/components/screen/umra/[mainId]/[subId]/[nestedId]",
                      params: {
                        mainId: String(mainId),
                        subId: String(item.id),
                        nestedId: "content",
                      },
                    });
                  }
                }}
              >
                    <View style={styles.number}>
                                <Text style={styles.numberText}>{index + 1}</Text>
                              </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  {hasNested && (
                    <Text style={styles.sub}>
                      {item.sub_list?.length} ഉപശീർഷകങ്ങൾ
                    </Text>
                  )}
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFA" },
  container: { flex: 1, paddingHorizontal: 20 },
  listContent: { paddingBottom: 24 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 12,
  },

  title: { fontSize: 15, fontWeight: "600", color: "#111827" },
  sub: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  chevron: { fontSize: 26, color: "#9CA3AF" },
    number: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
