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
import { Play } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import audioData from "../../constants/audio.json";
import HomeBannerAd from "../components/ads/HomeBannerAd";
import SearchBar from "../components/common/searchBar";

interface AudioItem {
  id?: number;
  name?: string;
  malayalam?: string;
  music?: string;
  url?: string;
}

export default function Audio() {
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAudios();
  }, []);

  const loadAudios = () => {
    try {
      setLoading(true);
      setError(null);
      setAudios(audioData?.data);
    } catch (err) {
      console.error("Audio loading error:", err);
      setError("Failed to load audio");
    } finally {
      setLoading(false);
    }
  };

  const filteredAudios = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return audios;

    return audios.filter(
      (item) =>
        item?.id?.toString().includes(query) ||
        item?.name?.toLowerCase().includes(query) ||
        item?.malayalam?.toLowerCase().includes(query) ||
        (item?.music && item?.music?.toLowerCase().includes(query)),
    );
  }, [search, audios]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading Audio...</Text>
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
            {filteredAudios.length} Audio
            {filteredAudios.length !== 1 ? "s" : ""} found
          </Text>
        )}

        <FlatList
          data={filteredAudios}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            filteredAudios.length === 0 ? styles.emptyList : undefined
          }
          renderItem={({ item }) => (
            <View style={styles.audioCard}>
              <View style={styles.audioRow}>
                {/* Left: number + names */}
                <View style={styles.leftSection}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>{item.id}</Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.audioName} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.malayalamName} numberOfLines={1}>
                      {item.malayalam}
                    </Text>
                    {item.music ? (
                      <Text style={styles.musicInfo} numberOfLines={1}>
                        {item.music}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* Right: Play button */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.actionBtn, styles.playBtn]}
                    onPress={() =>
                      router.push({
                        pathname: "../../components/screen/audio/page/[id]",
                        params: { id: item?.id?.toString() },
                      })
                    }
                  >
                    <Play color="#ffffff" size={18} />
                    <Text style={styles.playText}>Play</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Audio found</Text>
              <Text style={styles.emptyText}>
                Try searching another name or number.
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

  audioCard: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  audioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
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

  nameContainer: {
    flex: 1,
    marginLeft: 12,
  },
  audioName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  malayalamName: {
    fontSize: 14,
    color: "#374151",
    marginTop: 2,
  },
  musicInfo: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },

  playBtn: {
    borderColor: "#000000",
    backgroundColor: "#000000",
  },

  playText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
  },

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
