import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Slider from "@react-native-community/slider";
import {
    setAudioModeAsync,
    useAudioPlayer,
    useAudioPlayerStatus,
} from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import {
    ChevronLeft,
    Music,
    Pause,
    Play,
    RotateCcw,
    RotateCw,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeBannerAd from "@/app/components/ads/HomeBannerAd";
import audioData from "../../../../../constants/audio.json";
import { audioMap } from "../../../../../constants/audioMap";
import {
    preloadInterstitial,
    showInterstitial,
} from "../../../../components/ads/InterstitialAdManager";

const { width } = Dimensions.get("window");

interface AudioItem {
  id: number;
  name: string;
  malayalam: string;
  music?: string;
  url: string;
}

export default function AudioPlayer() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [audio, setAudio] = useState<AudioItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Create the player with a null source initially.
  const player = useAudioPlayer(null, { updateInterval: 250 });
  const status = useAudioPlayerStatus(player);

  // 1. Find the selected audio by id
  useEffect(() => {
    const found = (audioData.data as AudioItem[]).find(
      (item) => item.id.toString() === id,
    );

    setAudio(found ?? null);
    setIsLoading(Boolean(found));
    setLoadError(found ? null : "Audio not found");
  }, [id]);

  // 2. Configure audio mode + load the selected asset
  useEffect(() => {
    if (!audio) return;
    let cancelled = false;

    const loadAudio = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          interruptionMode: "duckOthers",
        });

        if (cancelled) return;

        const fileName = audio.url.split("/").pop();
        if (!fileName) throw new Error("Invalid audio filename");

        const source = audioMap[fileName];
        if (!source) {
          throw new Error(`Audio file not found in audioMap: ${fileName}`);
        }

        player.replace(source);
      } catch (error: any) {
        console.warn("Audio load error:", error);
        if (!cancelled) {
          setLoadError(error?.message ?? "Failed to load audio");
          setIsLoading(false);
        }
      }
    };

    loadAudio();

    return () => {
      cancelled = true;
    };
  }, [audio, player]);

  // 3. Clear loading once the player is ready
  useEffect(() => {
    if (status.isLoaded) setIsLoading(false);
  }, [status.isLoaded]);

  // Playback values (seconds)
  const isPlaying = status.playing;
  const position = status.currentTime || 0;
  const duration = status.duration || 0;

  const playPause = () => {
    if (isLoading || loadError) return;
    if (isPlaying) player.pause();
    else player.play();
  };

  const seekBy = async (seconds: number) => {
    if (!status.isLoaded || duration <= 0) return;
    const newPosition = Math.max(0, Math.min(position + seconds, duration));
    try {
      await player.seekTo(newPosition);
    } catch (e) {
      console.warn("Seek error:", e);
    }
  };

  const onSliderChange = async (value: number) => {
    if (!status.isLoaded) return;
    try {
      await player.seekTo(value);
    } catch (e) {
      console.warn("Slider seek error:", e);
    }
  };

  const formatTime = (seconds: number) => {
    const total = Math.floor(seconds);
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const hasShownAd = useRef(false);

  useEffect(() => {
    // Preload the next interstitial ad.
    preloadInterstitial();

    // Show the ad once when this screen opens, if it's ready.
    if (!hasShownAd.current) {
      hasShownAd.current = true;
      showInterstitial();
    }

    return () => {
      hasShownAd.current = false;
    };
  }, []);

  // ---- Not-found state ----
  if (!audio) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Audio not found</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBack}
            onPress={() => router.back()}
          >
            <ChevronLeft color="#111827" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Now Playing</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Album art */}
        <View style={styles.artWrapper}>
          <View style={styles.artContainer}>
            <Music color="#ffffff" size={80} />
          </View>
        </View>

        {/* Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.audioName} numberOfLines={2}>
            {audio.name}
          </Text>
          <Text style={styles.malayalamName} numberOfLines={2}>
            {audio.malayalam}
          </Text>
          {audio.music ? (
            <Text style={styles.musicInfo} numberOfLines={2}>
              {audio.music}
            </Text>
          ) : null}
        </View>

        {/* Progress */}
        <View style={styles.progressWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration > 0 ? duration : 1}
            value={Math.min(position, duration || 1)}
            onSlidingComplete={onSliderChange}
            disabled={!status.isLoaded || duration <= 0}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#D1D5DB"
            thumbTintColor="#1DB954"
          />
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.sideBtn}
            onPress={() => seekBy(-10)}
            disabled={!status.isLoaded || duration <= 0}
          >
            <RotateCcw color="#111827" size={28} />
            <Text style={styles.sideBtnText}>10s</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playBtn}
            onPress={playPause}
            disabled={Boolean(loadError)}
          >
            {isLoading ? (
              <ActivityIndicator color="#000" />
            ) : isPlaying ? (
              <Pause color="#000" size={34} fill="#000" />
            ) : (
              <Play color="#000" size={34} fill="#000" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sideBtn}
            onPress={() => seekBy(10)}
            disabled={!status.isLoaded || duration <= 0}
          >
            <RotateCw color="#111827" size={28} />
            <Text style={styles.sideBtnText}>10s</Text>
          </TouchableOpacity>
        </View>

        {loadError ? <Text style={styles.errorText}>{loadError}</Text> : null}
      </View>
      <HomeBannerAd />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFA" },
  container: { flex: 1, paddingHorizontal: 24 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    marginTop: 16,
    textAlign: "center",
  },
  backBtn: {
    backgroundColor: "#111827",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  backBtnText: { color: "#fff", fontWeight: "600" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  headerBack: { padding: 4 },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  artWrapper: { alignItems: "center", marginTop: 24 },
  artContainer: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: 24,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  titleWrapper: { alignItems: "center", marginTop: 32, paddingHorizontal: 10 },
  audioName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  malayalamName: {
    fontSize: 16,
    color: "#374151",
    marginTop: 6,
    textAlign: "center",
  },
  musicInfo: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 6,
    textAlign: "center",
  },
  progressWrapper: { marginTop: 28 },
  slider: { width: "100%", height: 40 },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -8,
  },
  timeText: { fontSize: 12, color: "#6B7280" },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 32,
  },
  sideBtn: { alignItems: "center" },
  sideBtnText: { fontSize: 11, color: "#6B7280", marginTop: 2 },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1DB954",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
});
