import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ENDPOINTS from "../../../constants/api";
import { useDrawer } from "../../../lib/context/global";

type Props = {
  surahName: string;
  surahNo: number | string;
  reciterName: string;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

function getReciterId(name: string): string {
  const normalized = name.toLowerCase();

  if (normalized.includes("maher")) return "maher";
  if (normalized.includes("fares")) return "fares";
  if (normalized.includes("sudais")) return "sudais";
  if (normalized.includes("bader")) return "bader";
  if (normalized.includes("yasser")) return "yasser";

  return "yasser";
}

export default function SurahBottomPlayer({
  surahName,
  surahNo,
  reciterName,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { selectedReciter } = useDrawer();

  const recitername = selectedReciter.id;

  const reciterId = useMemo(() => getReciterId(recitername), [recitername]);

  const audioUrl = useMemo(
    () => ENDPOINTS.getChapterAudioUrl(Number(surahNo), reciterId),
    [surahNo, reciterId],
  );

  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  // Load the Surah only. Do NOT start playback here.

  useEffect(() => {
    let cancelled = false;

    setHasError(false);
    setIsReady(false);
    setIsLoading(true);

    try {
      player.replace({ uri: audioUrl });
    } catch (error) {
      console.error("Audio source error:", error);

      if (!cancelled) {
        setHasError(true);
        setIsLoading(false);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [audioUrl, player]);

  // Wait until the audio is ready, but never autoplay.

  useEffect(() => {
    if (status.isLoaded) {
      setIsReady(true);
      setIsLoading(false);
    }
  }, [status.isLoaded]);

  const duration = status.duration || 0;
  const currentTime = status.currentTime || 0;

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  const seekTo = (seconds: number) => {
    if (!isReady || duration <= 0 || hasError) return;

    void player.seekTo(Math.max(0, Math.min(seconds, duration)));
  };

  // Playback starts ONLY after pressing the play button.
  // const togglePlay = async () => {
  //   if (!isReady || isLoading || hasError) return;

  //   try {
  //     if (status.playing) {
  //       player.pause();
  //       return;
  //     }

  //     // Restart from the beginning after the Surah finishes.
  //     if (duration > 0 && currentTime >= duration - 0.5) {
  //       await player.seekTo(0);
  //     }

  //     await player.play();
  //   } catch (error) {
  //     console.error("Play/pause error:", error);
  //     setHasError(true);
  //   }
  // };

  const togglePlay = async () => {
    if (!isReady || isLoading || hasError) return;

    try {
      if (status.playing) {
        player.pause();
        return;
      }

      if (duration > 0 && currentTime >= duration - 0.5) {
        await player.seekTo(0);
      }

      player.setActiveForLockScreen(true, {
        title: surahName,
        artist: reciterName,
        albumTitle: "QuthubiyaManzil Quran",
      });

      await player.play();
    } catch (error) {
      console.error("Play/pause error:", error);
      setHasError(true);
    }
  };

  // const retryPlayback = () => {
  //   setHasError(false);
  //   setIsLoading(true);
  //   setIsReady(false);

  //   try {
  //     player.pause();
  //     player.replace({ uri: audioUrl });
  //     // Intentionally do not call player.play().
  //   } catch (error) {
  //     console.error("Retry failed:", error);
  //     setHasError(true);
  //     setIsLoading(false);
  //   }
  // };

  const retryPlayback = () => {
    setHasError(false);
    setIsLoading(true);
    setIsReady(false);

    try {
      player.replace({ uri: audioUrl });
    } catch (error) {
      console.error("Retry failed:", error);
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: "doNotMix",
    }).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.cover}>
          <Text style={styles.coverIcon}>۞</Text>
        </View>

        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            {surahName}
          </Text>

          <Text style={styles.trackSubtitle} numberOfLines={1}>
            {reciterName} · Full Surah
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Surah {surahNo}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>

          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {hasError && (
        <Pressable onPress={retryPlayback} style={styles.retryButton}>
          <Text style={styles.errorText}>Audio failed. Tap here to retry.</Text>
        </Pressable>
      )}

      <View style={styles.controls}>
        <Pressable
          onPress={() => seekTo(currentTime - 10)}
          style={styles.seekButton}
          disabled={!isReady || isLoading || hasError}
        >
          <Text style={styles.seekText}>−10</Text>
        </Pressable>

        <Pressable
          onPress={togglePlay}
          style={styles.playButton}
          disabled={!isReady || isLoading || hasError}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.playIcon}>{status.playing ? "Ⅱ" : "▶"}</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => seekTo(currentTime + 10)}
          style={styles.seekButton}
          disabled={!isReady || isLoading || hasError}
        >
          <Text style={styles.seekText}>+10</Text>
        </Pressable>
      </View>

      {isLoading && (
        <Text style={styles.loadingText}>Loading recitation...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFCF5",
    borderTopWidth: 1,
    borderTopColor: "#EADCC8",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#F1E2CF",
    alignItems: "center",
    justifyContent: "center",
  },
  coverIcon: {
    fontSize: 29,
    color: "#A96738",
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#30251C",
  },
  trackSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#967B63",
  },
  badge: {
    backgroundColor: "#F7EDDF",
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A96738",
  },
  progressContainer: {
    marginTop: 17,
  },
  progressBackground: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#EADCC8",
    overflow: "hidden",
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#A96738",
  },
  timeRow: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#967B63",
    fontSize: 11,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 38,
    marginTop: 12,
  },
  seekButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  seekText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#A96738",
  },
  playButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#A96738",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },
  loadingText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 11,
    color: "#967B63",
  },
  retryButton: {
    paddingVertical: 8,
  },
  errorText: {
    color: "#B42318",
    textAlign: "center",
    fontSize: 12,
  },
});
