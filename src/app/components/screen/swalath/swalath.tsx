import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import swalathJson from "../../../../constants/swalath.json";
import AppBar from "../../common/AppBar";
import SearchBar from "../../common/searchBar";

/* ---------- helpers ---------- */

// Malayalam / English title shown under the Arabic
const getDisplayName = (item: any): string =>
  item?.title ?? item?.name ?? item?.desc?.title ?? "";

// Arabic title shown as the big RTL line (first arabic field found)
const getArabicTitle = (item: any): string => {
  const d = item?.desc ?? {};
  return (
    d.arabic_title ??
    d.title_arabic ??
    (typeof d.arabic_text === "string" ? d.arabic_text.split("\n")[0] : "") ??
    ""
  );
};

const getItemId = (item: any, index: number): string =>
  item?.id != null ? String(item.id) : String(index);

/* ---------- screen ---------- */

export default function NiskaramScreen() {
  // JSON is an object with { list_items: [...] }
  const [swalath, setSwalath] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      const raw: any = swalathJson;
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.list_items)
          ? raw.list_items
          : [];

      setSwalath(list);
    } catch (err) {
      console.error("Niskaram loading error:", err);
      setError("Failed to load Niskaram");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredNiskaram = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return swalath;

    return swalath.filter((item, index) => {
      const name = getDisplayName(item).toLowerCase();
      const arabic = getArabicTitle(item);
      const id = getItemId(item, index);

      return (
        name.includes(query) ||
        arabic.includes(search.trim()) ||
        id.includes(query)
      );
    });
  }, [search, swalath]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#166534" />
        <Text style={styles.loadingText}>Loading Niskaram...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title="Niskaram" showBack={true} />

      <View style={styles.container}>
        <SearchBar search={search} setSearch={setSearch} />

        {search.trim().length > 0 && (
          <Text style={styles.resultText}>
            {filteredNiskaram.length} result
            {filteredNiskaram.length !== 1 ? "s" : ""} found
          </Text>
        )}

        <FlatList
          data={filteredNiskaram}
          keyExtractor={(item, index) => getItemId(item, index)}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            filteredNiskaram.length === 0
              ? styles.emptyList
              : styles.listContent
          }
          renderItem={({ item, index }) => {
            const displayName = getDisplayName(item);
            const arabicName = getArabicTitle(item);
            const id = getItemId(item, index);

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.surah}
                onPress={() => router.push(`./page/${id}`)}
              >
                <View style={styles.surahRow}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                  </View>

                  <View style={styles.nameContainer}>
                    {arabicName ? (
                      <Text style={styles.arabicName} numberOfLines={1}>
                        {arabicName}
                      </Text>
                    ) : null}

                    {displayName ? (
                      <Text style={styles.englishName} numberOfLines={2}>
                        {displayName}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Niskaram found</Text>
              <Text style={styles.emptyText}>
                Try searching another name or number.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },

  errorText: {
    fontSize: 15,
    color: "#DC2626",
  },

  resultText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    marginLeft: 4,
  },

  listContent: {
    paddingBottom: 20,
  },

  surah: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  surahRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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

  numberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  nameContainer: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  arabicName: {
    width: "100%",
    fontSize: 22,
    color: "#111827",
    textAlign: "right",
    writingDirection: "rtl",
    lineHeight: 34,
  },

  englishName: {
    width: "100%",
    fontSize: 15,
    color: "#6B7280",
    textAlign: "right",
    marginTop: 3,
  },

  emptyList: {
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },

  emptyText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },
});
