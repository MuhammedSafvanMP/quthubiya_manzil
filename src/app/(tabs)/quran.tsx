import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { BookOpen, Play } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import quranData from "../../constants/quran.json";
import HomeBannerAd from "../components/ads/HomeBannerAd";
import SearchBar from "../components/common/searchBar";

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

export default function Quran() {
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
    } catch (err) {
      console.error("Quran loading error:", err);
      setError("Failed to load Surahs");
    } finally {
      setLoading(false);
    }
  };

  const filteredSurahs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return surahs;

    return surahs.filter(
      (surah) =>
        surah.number.toString().includes(query) ||
        surah.name.toLowerCase().includes(query) ||
        surah.englishName.toLowerCase().includes(query) ||
        surah.englishNameTranslation.toLowerCase().includes(query),
    );
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
      <View style={styles.container}>
        <SearchBar search={search} setSearch={setSearch} />

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
            <View style={styles.surah}>
              <View style={styles.surahRow}>
                {/* Left: number + Arabic name */}
                <View style={styles.leftSection}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>{item.number}</Text>
                  </View>
                  <Text style={styles.arabicName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>

                {/* Right: Read + Play buttons */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.actionBtn, styles.readBtn]}
                    onPress={() =>
                      router.push(
                        `../../components/screen/quran/surah/page/${item.number}`,
                      )
                    }
                  >
                    <BookOpen color="#ffffff" size={18} />
                    <Text style={[styles.actionText, styles.readText]}>
                      Read
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.actionBtn, styles.playBtn]}
                    onPress={() =>
                      router.push(
                        `../../components/screen/quran/audio/page/${item.number}`,
                      )
                    }
                  >
                    <Play color="#ffffff" size={18} />
                    <Text style={[styles.actionText, styles.playText]}>
                      Play
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
      <HomeBannerAd />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFA" },
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { marginTop: 10, fontSize: 14, color: "#666" },

  resultText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    marginLeft: 4,
  },

  surah: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  surahRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // ✅ take remaining space
    marginRight: 16, // ✅ prevent overlap with buttons
  },
  number: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: { fontSize: 14, fontWeight: "600", color: "#fff" },
  arabicName: {
    flex: 1,
    fontSize: 20,
    color: "#111827",
    marginLeft: 12,
    textAlign: "right",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // ✅ pill shape
    borderWidth: 1.5, // ✅ visible border
  },

  // Read button — blue
  readBtn: {
    borderColor: "#000000",
    backgroundColor: "#000000", // light blue fill
  },

  readText: {
    color: "#ffffff",
  },

  // Play button — green
  playBtn: {
    borderColor: "#000000",
    backgroundColor: "#000000", // light green fill
  },

  playText: {
    color: "#ffffff",
  },

  actionText: {
    fontSize: 13,
    fontWeight: "600",
  },

  // actions: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 16,
  // },
  // actionBtn: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 4, // ✅ small space between icon and label
  // },
  // actionText: {
  //   fontSize: 13,
  //   color: "#111827",
  //   fontWeight: "500",
  // },

  emptyList: { flexGrow: 1 },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  emptyTitle: { fontSize: 17, fontWeight: "600", color: "#111827" },
  emptyText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },
});
