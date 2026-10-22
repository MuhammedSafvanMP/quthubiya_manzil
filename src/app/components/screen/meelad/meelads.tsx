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

import meeladData from "../../../../constants/meelad_nabi.json";
import AppBar from "../../common/AppBar";
import SearchBar from "../../common/searchBar";

export default function MeeladScreen() {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSurahs();
  }, []);

  const loadSurahs = () => {
    try {
      setLoading(true);
      setError(null);

      setSurahs(meeladData?.data?.meelad_nabi ?? []);
    } catch (err) {
      console.error("Meelad loading error:", err);
      setError("Failed to load Meelad Nabi");
    } finally {
      setLoading(false);
    }
  };

  const filteredSurahs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return surahs;

    return surahs.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.arabicName.includes(search.trim()) ||
        item.id.toString().includes(query),
    );
  }, [search, surahs]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#166534" />
        <Text style={styles.loadingText}>Loading Meelad Nabi...</Text>
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
      <AppBar title="Meelad Nabi" showBack={true} />

      <View style={styles.container}>
        <SearchBar search={search} setSearch={setSearch} />

        {search.trim().length > 0 && (
          <Text style={styles.resultText}>
            {filteredSurahs.length} result
            {filteredSurahs.length !== 1 ? "s" : ""} found
          </Text>
        )}

        <FlatList
          data={filteredSurahs}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            filteredSurahs.length === 0 ? styles.emptyList : styles.listContent
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.surah}
              onPress={() => router.push(`./page/${item.id}`)}
            >
              <View style={styles.surahRow}>
                {/* Number on the left */}
                <View style={styles.number}>
                  <Text style={styles.numberText}>{item.id}</Text>
                </View>

                {/* Arabic and English names on the right */}
                <View style={styles.nameContainer}>
                  <Text style={styles.arabicName}>{item.arabicName}</Text>

                  <Text style={styles.englishName}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Meelad found</Text>
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
