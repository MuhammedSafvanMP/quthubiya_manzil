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

import nombuData from "../../../../constants/nombu.json";
import AppBar from "../../common/AppBar";
import SearchBar from "../../common/searchBar";

// Helper: safely get a display name from any item shape
const getMalyalamName = (item: any): string => {
  return (
    item?.name ??
    item?.title ??
    item?.heading_malayalam ??
    item?.title_arabic ??
    ""
  );
};

// Helper: safely get an Arabic display name from any item shape
const getArabicName = (item: any): string => {
  return (
    item?.heading_arabic ??
    item?.heading_malayalam ??
    item?.title_arabic ??
    item?.title_arabic ??
    ""
  );
};

// Helper: safely get an id (fallback to index-based id)
const getItemId = (item: any, index: number): string => {
  return item?.id != null ? String(item.id) : String(index);
};

export default function NombScreen() {
  const [nombu, setNombu] = useState<any[]>([]);
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

      // Ensure we always have an array
      setNombu(Array.isArray(nombuData) ? nombuData : []);
    } catch (err) {
      console.error("Nombu loading error:", err);
      setError("Failed to load Niskaram");
    } finally {
      setLoading(false);
    }
  };

  const filteredNiskaram = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return nombu;

    return nombu.filter((item, index) => {
      const malayalam = getMalyalamName(item).toLowerCase();
      const arabic = getArabicName(item);
      const id = getItemId(item, index);

      return (
        malayalam.includes(query) ||
        arabic.includes(search.trim()) ||
        id.includes(query)
      );
    });
  }, [search, nombu]);

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
            const malayalamName = getMalyalamName(item);
            const arabicName = getArabicName(item);
            const id = getItemId(item, index);

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.surah}
                onPress={() => router.push(`./page/${id}`)}
              >
                <View style={styles.surahRow}>
                  {/* Number on the left */}
                  <View style={styles.number}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                  </View>

                  {/* Arabic and English names on the right */}
                  <View style={styles.nameContainer}>
                    {arabicName ? (
                      <Text style={styles.arabicName}>{arabicName}</Text>
                    ) : null}

                    {malayalamName ? (
                      <Text style={styles.englishName}>{malayalamName}</Text>
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
