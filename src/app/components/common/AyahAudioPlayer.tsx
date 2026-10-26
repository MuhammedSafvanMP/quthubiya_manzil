import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { Pause, Play } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  audioUrl: string;
  ayahNumber: number;
};

export default function AyahAudioPlayer({ audioUrl, ayahNumber }: Props) {
  const player = useAudioPlayer(audioUrl);
  const status = useAudioPlayerStatus(player);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (status.isLoaded) {
      setIsLoading(false);
    }
  }, [status.isLoaded]);

  useEffect(() => {
    if (status.playing) {
      setIsLoading(false);
    }
  }, [status.playing]);

  const togglePlayback = async () => {
    if (!status.isLoaded || hasError) return;

    try {
      // Pause the current ayah.
      if (status.playing) {
        player.pause();
        return;
      }

      setHasError(false);

      // IMPORTANT: Restart from the beginning after finishing.
      const finished =
        status.didJustFinish ||
        (status.duration > 0 && status.currentTime >= status.duration - 0.3);

      if (finished) {
        await player.seekTo(0);
      }

      setIsLoading(true);
      await player.play();
    } catch (error) {
      console.error(`Ayah ${ayahNumber} playback failed:`, error);
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={togglePlayback}
        style={styles.playButton}
        disabled={!status.isLoaded}
        accessibilityRole="button"
        accessibilityLabel={
          status.playing
            ? `Pause ayah ${ayahNumber}`
            : `Play ayah ${ayahNumber}`
        }
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : status.playing ? (
          <Pause color="#FFFFFF" size={24} />
        ) : (
          <Play color="#FFFFFF" size={24} />
        )}
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.title}>Ayah {ayahNumber}</Text>

        <Text style={styles.subtitle}>
          {hasError
            ? "Playback failed"
            : status.playing
              ? "Now playing"
              : "Tap to listen"}
        </Text>
      </View>

      <View style={styles.audioIcon}>
        <Text style={styles.audioIconText}>♫</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EADCC8",
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#A96738",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: "#30251C",
    fontSize: 15,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 4,
    color: "#9A8069",
    fontSize: 12,
  },
  audioIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8EFE4",
    alignItems: "center",
    justifyContent: "center",
  },
  audioIconText: {
    color: "#A96738",
    fontSize: 20,
  },
});
