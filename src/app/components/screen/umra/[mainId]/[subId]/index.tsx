import { router, useLocalSearchParams } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../../../common/AppBar";
import { getSubItem } from "../../utils/umrahData";

export default function NestedListScreen() {
  const { mainId, subId } = useLocalSearchParams<{
    mainId: string;
    subId: string;
  }>();
  const sub = getSubItem(mainId!, subId!);

  if (!sub?.sub_list?.length) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppBar title={sub?.title ?? "Not Found"} showBack={true} />
        <Text style={{ padding: 20 }}>No items</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title={sub.title} showBack={true} />
      <View style={styles.container}>
        <FlatList
          data={sub.sub_list}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.row}

              onPress={() =>
                router.push({
                  pathname:
                    "/components/screen/umra/[mainId]/[subId]/[nestedId]",
                  params: {
                    mainId: String(mainId),
                    subId: String(subId),
                    nestedId: String(item.id),
                  },
                })
              }
            >

                  <View style={styles.number}>
                                              <Text style={styles.numberText}>{index + 1}</Text>
                                            </View>

              <Text style={styles.title}>{item.title}</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    gap: 12,
  },
  title: { flex: 1, fontSize: 15, fontWeight: "600", color: "#111827" },
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
