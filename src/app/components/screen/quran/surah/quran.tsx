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

import quranData from "../../../../../constants/quran.json";
import AppBar from "../../../common/AppBar";
import SearchBar from "../../../common/searchBar";

type Ayah = {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
};

type Surah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  ayahs: Ayah[];
};

export default function QuranScreen() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
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

      setSurahs(quranData.data.surahs);
    } catch (error) {
      console.error("Quran loading error:", error);
      setError("Failed to load Surahs");
    } finally {
      setLoading(false);
    }
  };

  // Search/filter Surahs
  const filteredSurahs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return surahs;
    }

    return surahs.filter((surah) => {
      return (
        surah.number.toString().includes(query) ||
        surah.name.toLowerCase().includes(query) ||
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query)
      );
    });
  }, [search, surahs]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>Loading Quran...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title="Quran" showBack={true} />

      <View style={styles.container}>
        <SearchBar search={search} setSearch={setSearch} />

        {/* Result count */}
        {search.length > 0 && (
          <Text style={styles.resultText}>
            {filteredSurahs.length} Surah
            {filteredSurahs.length !== 1 ? "s" : ""} found
          </Text>
        )}

        <FlatList
          data={filteredSurahs}
          keyExtractor={(item) => item.number.toString()}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            filteredSurahs.length === 0 ? styles.emptyList : undefined
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.surah}
              onPress={() => router.push(`./page/${item.number}`)}
            >
              <View style={styles.surahRow}>
                {/* Number */}
                <View style={styles.number}>
                  <Text style={styles.numberText}>{item.number}</Text>
                </View>

                {/* Arabic Name */}
                <Text style={styles.arabicName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Surah found</Text>

              <Text style={styles.emptyText}>
                Try searching another Surah name or number.
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

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },

  // Search

  resultText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    marginLeft: 4,
  },

  // Surah
  surah: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  surahRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  number: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffff",
  },

  arabicName: {
    flex: 1,
    fontSize: 20,
    color: "#111827",
    marginLeft: 12,
    textAlign: "right",
  },

  // Empty
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
