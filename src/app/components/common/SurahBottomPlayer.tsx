// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   StyleSheet,
// } from "react-native";
// import {
//   useAudioPlayer,
//   useAudioPlayerStatus,
// } from "expo-audio";

// type Props = {
//   surahName: string;
//   audioUrl: string;
//   onNext?: () => void;
//   onPrevious?: () => void;
// };

// function formatTime(seconds: number) {
//   if (!Number.isFinite(seconds) || seconds < 0) {
//     return "0:00";
//   }

//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);

//   return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
// }

// export default function SurahBottomPlayer({
//   surahName,
//   audioUrl,
//   onNext,
//   onPrevious,
// }: Props) {

//     console.log(audioUrl, "hiiii");
    
//   const player = useAudioPlayer(audioUrl);
//   const status = useAudioPlayerStatus(player);

//   const [isSeeking, setIsSeeking] = useState(false);
//   const [seekValue, setSeekValue] = useState(0);

//   useEffect(() => {
//     player.play();
//   }, [audioUrl]);

//   const duration = status.duration || 0;
//   const currentTime = status.currentTime || 0;

//   const progress = duration > 0
//     ? Math.min(currentTime / duration, 1)
//     : 0;

//   const seekTo = (seconds: number) => {
//     const target = Math.max(
//       0,
//       Math.min(seconds, duration || seconds)
//     );

//     player.seekTo(target);
//     setSeekValue(target);
//     setIsSeeking(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.topRow}>
//         <View style={styles.cover}>
//           <Text style={styles.coverIcon}>۞</Text>
//         </View>

//         <View style={styles.trackInfo}>
//           <Text style={styles.trackTitle} numberOfLines={1}>
//             {surahName}
//           </Text>
//           <Text style={styles.trackSubtitle}>
//             Quran Recitation
//           </Text>
//         </View>

//         <Text style={styles.musicIcon}>♫</Text>
//       </View>

//       <View style={styles.progressContainer}>
//         <View style={styles.progressBackground}>
//           <View
//             style={[
//               styles.progressFill,
//               { width: `${progress * 100}%` },
//             ]}
//           />
//         </View>

//         <View style={styles.timeRow}>
//           <Text style={styles.timeText}>
//             {formatTime(isSeeking ? seekValue : currentTime)}
//           </Text>

//           <Text style={styles.timeText}>
//             {formatTime(duration)}
//           </Text>
//         </View>

//         {/* Simple seeking controls */}
//         <View style={styles.seekRow}>
//           <Pressable
//             onPress={() => seekTo(currentTime - 10)}
//             style={styles.seekButton}
//           >
//             <Text style={styles.seekText}>−10</Text>
//           </Pressable>

//           <Pressable
//             onPress={() => seekTo(currentTime + 10)}
//             style={styles.seekButton}
//           >
//             <Text style={styles.seekText}>+10</Text>
//           </Pressable>
//         </View>
//       </View>

//       <View style={styles.controls}>
//         <Pressable onPress={onPrevious}>
//           <Text style={styles.skipIcon}>|◀</Text>
//         </Pressable>

//         <Pressable
//           onPress={() => {
//             if (status.playing) {
//               player.pause();
//             } else {
//               player.play();
//             }
//           }}
//           style={styles.playButton}
//         >
//           <Text style={styles.playIcon}>
//             {status.playing ? "Ⅱ" : "▶"}
//           </Text>
//         </Pressable>

//         <Pressable onPress={onNext}>
//           <Text style={styles.skipIcon}>▶|</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFCF5",
//     borderTopWidth: 1,
//     borderColor: "#EADCC8",
//     paddingHorizontal: 18,
//     paddingTop: 14,
//     paddingBottom: 22,
//   },
//   topRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   cover: {
//     width: 48,
//     height: 48,
//     borderRadius: 12,
//     backgroundColor: "#F1E2CF",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   coverIcon: {
//     fontSize: 30,
//     color: "#A96738",
//   },
//   trackInfo: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   trackTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#30251C",
//   },
//   trackSubtitle: {
//     marginTop: 4,
//     fontSize: 12,
//     color: "#967B63",
//   },
//   musicIcon: {
//     fontSize: 25,
//     color: "#A96738",
//   },
//   progressContainer: {
//     marginTop: 16,
//   },
//   progressBackground: {
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: "#EADCC8",
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: 4,
//     backgroundColor: "#A96738",
//   },
//   timeRow: {
//     marginTop: 7,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   timeText: {
//     color: "#967B63",
//     fontSize: 11,
//   },
//   seekRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     gap: 30,
//     marginTop: 10,
//   },
//   seekButton: {
//     padding: 6,
//   },
//   seekText: {
//     fontSize: 13,
//     color: "#A96738",
//     fontWeight: "600",
//   },
//   controls: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 42,
//     marginTop: 8,
//   },
//   playButton: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: "#A96738",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   playIcon: {
//     color: "#FFFFFF",
//     fontSize: 22,
//     fontWeight: "700",
//   },
//   skipIcon: {
//     color: "#A96738",
//     fontSize: 21,
//     fontWeight: "600",
//   },
// });


import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

type Props = {
  surahName: string;
  audioUrls: string[];
  reciterName: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(
    2,
    "0"
  )}`;
}

function toArabicNumber(number: number) {
  const numbers = [
    "٠",
    "١",
    "٢",
    "٣",
    "٤",
    "٥",
    "٦",
    "٧",
    "٨",
    "٩",
  ];

  return String(number)
    .split("")
    .map((digit) => numbers[Number(digit)])
    .join("");
}

export default function SurahBottomPlayer({
  surahName,
  audioUrls,
  reciterName,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isChangingTrack, setIsChangingTrack] =
    useState(false);

  /**
   * Current ayah MP3
   *
   * Example:
   *
   * 0 -> 1.mp3
   * 1 -> 2.mp3
   * 2 -> 3.mp3
   */
  const currentAudioUrl =
    audioUrls[currentIndex];

  const player = useAudioPlayer(
    currentAudioUrl || null
  );

  const status = useAudioPlayerStatus(player);

  /**
   * When a completely new Surah / reciter is loaded,
   * start from Ayah 1.
   */
  useEffect(() => {
    setCurrentIndex(0);
  }, [audioUrls]);

  /**
   * Automatically play the current Ayah
   * whenever the audio URL changes.
   */
//   useEffect(() => {
//     if (!currentAudioUrl) {
//       return;
//     }

//     setIsChangingTrack(true);

//     const timer = setTimeout(() => {
//       try {
//         player.play();
//       } catch (error) {
//         console.error(
//           "Failed to play audio:",
//           error
//         );
//       }

//       setIsChangingTrack(false);
//     }, 150);

//     return () => clearTimeout(timer);
//   }, [currentAudioUrl]);

  /**
   * Automatically go to the next Ayah
   * when the current Ayah finishes.
   */
  useEffect(() => {
    if (!status.duration) {
      return;
    }

    if (!status.currentTime) {
      return;
    }

    const remaining =
      status.duration - status.currentTime;

    /**
     * We consider the ayah finished when
     * less than 0.3 second remains.
     */
    if (remaining <= 0.3) {
      if (
        currentIndex <
        audioUrls.length - 1
      ) {
        setCurrentIndex(
          (previous) => previous + 1
        );
      } else {
        /**
         * Last Ayah finished.
         */
        try {
          player.pause();
        } catch {}
      }
    }
  }, [
    status.currentTime,
    status.duration,
    currentIndex,
    audioUrls.length,
  ]);

  /**
   * Loading state
   */
  if (!currentAudioUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="small"
          color="#A96738"
        />

        <Text style={styles.loadingText}>
          Loading recitation...
        </Text>
      </View>
    );
  }

  const duration = status.duration || 0;

  const currentTime =
    status.currentTime || 0;

  const progress =
    duration > 0
      ? Math.min(
          currentTime / duration,
          1
        )
      : 0;

  /**
   * Go to next Ayah
   */
  const nextAyah = () => {
    if (
      currentIndex <
      audioUrls.length - 1
    ) {
      setCurrentIndex(
        (previous) => previous + 1
      );
    }
  };

  /**
   * Go to previous Ayah
   */
  const previousAyah = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (previous) => previous - 1
      );
    } else {
      /**
       * If already on Ayah 1,
       * restart it.
       */
      try {
        player.seekTo(0);
      } catch {}
    }
  };

  /**
   * Seek
   */
  const seekTo = (seconds: number) => {
    const target = Math.max(
      0,
      Math.min(
        seconds,
        duration || seconds
      )
    );

    try {
      player.seekTo(target);
    } catch (error) {
      console.error(
        "Seek failed:",
        error
      );
    }
  };

  /**
   * Toggle play / pause
   */
  const togglePlay = () => {
    try {
      if (status.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.error(
        "Play/pause failed:",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* TOP TRACK INFORMATION */}

      <View style={styles.topRow}>
        <View style={styles.cover}>
          <Text style={styles.coverIcon}>
            ۞
          </Text>
        </View>

        <View style={styles.trackInfo}>
          <Text
            style={styles.trackTitle}
            numberOfLines={1}
          >
            {surahName}
          </Text>

          <Text
            style={styles.trackSubtitle}
            numberOfLines={1}
          >
            {reciterName}
          </Text>
        </View>

        <View style={styles.ayahBadge}>
          <Text style={styles.ayahBadgeNumber}>
            {toArabicNumber(
              currentIndex + 1
            )}
          </Text>

          <Text style={styles.ayahBadgeSlash}>
            /
          </Text>

          <Text style={styles.ayahBadgeTotal}>
            {toArabicNumber(
              audioUrls.length
            )}
          </Text>
        </View>
      </View>

      {/* CURRENT AYAH */}

      <View style={styles.currentAyahRow}>
        <Text style={styles.currentAyahLabel}>
          AYAH
        </Text>

        <Text style={styles.currentAyahNumber}>
          {currentIndex + 1} /{" "}
          {audioUrls.length}
        </Text>
      </View>

      {/* PROGRESS */}

      <View style={styles.progressContainer}>
        <View
          style={
            styles.progressBackground
          }
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  progress * 100
                }%`,
              },
            ]}
          />
        </View>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>
            {formatTime(currentTime)}
          </Text>

          <Text style={styles.timeText}>
            {formatTime(duration)}
          </Text>
        </View>
      </View>

      {/* SEEK */}

      <View style={styles.seekRow}>
        <Pressable
          onPress={() =>
            seekTo(currentTime - 10)
          }
          style={styles.seekButton}
        >
          <Text style={styles.seekText}>
            −10
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            seekTo(currentTime + 10)
          }
          style={styles.seekButton}
        >
          <Text style={styles.seekText}>
            +10
          </Text>
        </Pressable>
      </View>

      {/* MAIN CONTROLS */}

      <View style={styles.controls}>
        {/* PREVIOUS */}

        <Pressable
          onPress={previousAyah}
          style={styles.controlButton}
        >
          <Text style={styles.skipIcon}>
            |◀
          </Text>
        </Pressable>

        {/* PLAY */}

        <Pressable
          onPress={togglePlay}
          style={styles.playButton}
        >
          {isChangingTrack ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <Text style={styles.playIcon}>
              {status.playing
                ? "Ⅱ"
                : "▶"}
            </Text>
          )}
        </Pressable>

        {/* NEXT */}

        <Pressable
          onPress={nextAyah}
          style={styles.controlButton}
        >
          <Text style={styles.skipIcon}>
            ▶|
          </Text>
        </Pressable>
      </View>
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

  loadingContainer: {
    minHeight: 75,
    backgroundColor: "#FFFCF5",
    borderTopWidth: 1,
    borderTopColor: "#EADCC8",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  loadingText: {
    marginLeft: 10,
    color: "#8A6748",
    fontSize: 12,
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
    marginRight: 10,
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

  ayahBadge: {
    minWidth: 58,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F7EDDF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  ayahBadgeNumber: {
    fontSize: 15,
    color: "#A96738",
    fontWeight: "800",
  },

  ayahBadgeSlash: {
    marginHorizontal: 3,
    color: "#C5A98D",
    fontSize: 13,
  },

  ayahBadgeTotal: {
    fontSize: 13,
    color: "#967B63",
    fontWeight: "600",
  },

  currentAyahRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  currentAyahLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#A96738",
    fontWeight: "800",
  },

  currentAyahNumber: {
    fontSize: 11,
    color: "#967B63",
    fontWeight: "600",
  },

  progressContainer: {
    marginTop: 7,
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
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  timeText: {
    color: "#967B63",
    fontSize: 10,
  },

  seekRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 35,
    marginTop: 6,
  },

  seekButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  seekText: {
    fontSize: 12,
    color: "#A96738",
    fontWeight: "700",
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 42,
    marginTop: 2,
  },

  controlButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
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

  skipIcon: {
    color: "#A96738",
    fontSize: 20,
    fontWeight: "700",
  },
});