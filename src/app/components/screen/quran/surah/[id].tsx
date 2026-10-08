// // import React, { useEffect, useState } from "react";
// // import {
// //   ActivityIndicator,
// //   SafeAreaView,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   View,
// // } from "react-native";
// // import { useLocalSearchParams } from "expo-router";

// // import { getSurah, SurahDetail } from "../../../../services/quranApi";

// // export default function SurahDetails() {
// //   const { id } = useLocalSearchParams<{ id: string }>();

// //   const [surah, setSurah] = useState<SurahDetail | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadSurah();
// //   }, [id]);

// //   const loadSurah = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getSurah(Number(id));
// //       setSurah(data[0]);
// //     } catch (error) {
// //       console.error("Failed to load Surah:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.center}>
// //         <ActivityIndicator size="large" color="#A96738" />
// //         <Text style={styles.loadingText}>Loading Surah...</Text>
// //       </View>
// //     );
// //   }

// //   if (!surah) {
// //     return (
// //       <View style={styles.center}>
// //         <Text>Surah not found</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={styles.safeArea}>
// //       <View style={styles.container}>
// //         {/* ========================================= */}
// //         {/* SURAH HEADER */}
// //         {/* ========================================= */}
// //         <View style={styles.surahHeader}>
// //           <View style={styles.topLineContainer}>
// //             <View style={styles.topSmallLine} />
// //             <View style={styles.topMainLine} />
// //             <View style={styles.topSmallLine} />
// //           </View>

// //           <View style={styles.titleContainer}>
// //             <View style={styles.decoration}>
// //               <View style={styles.decorationCircle} />
// //               <View style={styles.decorationLine} />
// //               <View style={styles.decorationDot} />
// //             </View>

// //             <Text style={styles.surahName}>{surah.name}</Text>

// //             <View style={[styles.decoration, styles.rightDecoration]}>
// //               <View style={styles.decorationCircle} />
// //               <View style={styles.decorationLine} />
// //               <View style={styles.decorationDot} />
// //             </View>
// //           </View>

// //           <View style={styles.bottomLineContainer}>
// //             <View style={styles.bottomSmallLine} />
// //             <View style={styles.bottomMainLine} />
// //             <View style={styles.bottomSmallLine} />
// //           </View>
// //         </View>

// //         <ScrollView
// //           showsVerticalScrollIndicator={false}
// //           contentContainerStyle={styles.scrollContent}
// //         >
// //           {/* ========================================= */}
// //           {/* QURAN TEXT - Continuous flowing Mushaf style */}
// //           {/* ========================================= */}
// //           <View style={styles.quranContainer}>
// //             <Text style={styles.quranText}>
// //               {surah.ayahs.map((ayah) => (
// //                 <Text key={ayah.number}>
// //                   {/* 1. Arabic text of the ayah (inline) */}
// //                   <Text style={styles.quranText}>{ayah.text}</Text>

// //                   {/* 2. Ayah number marker INLINE at the end using ﴿ ﴾ */}
// //                   <Text style={styles.ayahNumber}>
// //                     {" "}
// //                     ﴿{toArabicNumber(ayah.numberInSurah)}﴾{" "}
// //                   </Text>
// //                 </Text>
// //               ))}
// //             </Text>
// //           </View>
// //         </ScrollView>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // /**
// //  * Convert 1 -> ١, 2 -> ٢, etc.
// //  */
// // function toArabicNumber(number: number) {
// //   const numbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
// //   return number
// //     .toString()
// //     .split("")
// //     .map((digit) => numbers[Number(digit)])
// //     .join("");
// // }

// // const styles = StyleSheet.create({
// //   safeArea: {
// //     flex: 1,
// //     backgroundColor: "#FFF8E6",
// //   },

// //   container: {
// //     flex: 1,
// //     backgroundColor: "#FFF8E6",
// //   },

// //   scrollContent: {
// //     paddingTop: 20,
// //     paddingBottom: 100,
// //   },

// //   center: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "#FFF8E6",
// //   },

// //   loadingText: {
// //     marginTop: 10,
// //     color: "#8A6748",
// //     fontSize: 14,
// //   },

// //   // =========================================
// //   // SURAH HEADER STYLES
// //   // =========================================
// //   surahHeader: {
// //     width: "100%",
// //     paddingHorizontal: 35,
// //     marginBottom: 30,
// //   },
// //   topLineContainer: {
// //     width: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   topMainLine: {
// //     width: "72%",
// //     height: 2,
// //     backgroundColor: "#B86B2E",
// //     marginVertical: 4,
// //   },
// //   topSmallLine: {
// //     width: "45%",
// //     height: 1,
// //     backgroundColor: "#D9A56F",
// //   },
// //   titleContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     minHeight: 75,
// //   },
// //   surahName: {
// //     fontSize: 34,
// //     color: "#111111",
// //     textAlign: "center",
// //     marginHorizontal: 12,
// //     writingDirection: "rtl",
// //   },
// //   decoration: {
// //     width: 50,
// //     height: 65,
// //     position: "relative",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   rightDecoration: {
// //     transform: [{ scaleX: -1 }],
// //   },
// //   decorationCircle: {
// //     width: 22,
// //     height: 22,
// //     borderRadius: 11,
// //     borderWidth: 2,
// //     borderColor: "#B86B2E",
// //     position: "absolute",
// //     left: 4,
// //     top: 21,
// //   },
// //   decorationLine: {
// //     width: 38,
// //     height: 2,
// //     backgroundColor: "#B86B2E",
// //     position: "absolute",
// //     left: 5,
// //     top: 32,
// //   },
// //   decorationDot: {
// //     width: 11,
// //     height: 11,
// //     borderRadius: 6,
// //     borderWidth: 2,
// //     borderColor: "#D9A56F",
// //     position: "absolute",
// //     left: 1,
// //     top: 8,
// //   },
// //   bottomLineContainer: {
// //     width: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   bottomMainLine: {
// //     width: "72%",
// //     height: 2,
// //     backgroundColor: "#B86B2E",
// //     marginVertical: 4,
// //   },
// //   bottomSmallLine: {
// //     width: "45%",
// //     height: 1,
// //     backgroundColor: "#D9A56F",
// //   },

// //   // =========================================
// //   // QURAN TEXT STYLES (CONTINUOUS MUSHAF)
// //   // =========================================
// //   quranContainer: {
// //     paddingHorizontal: 20,
// //   },

// //   quranText: {
// //     fontSize: 28,
// //     lineHeight: 60,
// //     color: "#111111",
// //     textAlign: "right",
// //     writingDirection: "rtl",
// //     fontWeight: "400",
// //     // fontFamily: "YourArabicFont",
// //   },

// //   // Ayah number rendered INLINE using ornate Arabic parentheses ﴿ ﴾
// //   ayahNumber: {
// //     fontSize: 20,
// //     lineHeight: 60,
// //     color: "#B86B2E",
// //     writingDirection: "rtl",
// //     fontWeight: "600",
// //   },
// // });


// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";

// import { getSurah, SurahDetail } from "../../../../services/quranApi";

// export default function SurahDetails() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();

//   const [surah, setSurah] = useState<SurahDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadSurah();
//   }, [id]);

//   const loadSurah = async () => {
//     try {
//       setLoading(true);
//       const data = await getSurah(Number(id));
//       setSurah(data[0]);
//     } catch (error) {
//       console.error("Failed to load Surah:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     router.back();
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#A96738" />
//         <Text style={styles.loadingText}>Loading Surah...</Text>
//       </View>
//     );
//   }

//   if (!surah) {
//     return (
//       <View style={styles.center}>
//         <Text>Surah not found</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* ========================================= */}
//         {/* SURAH HEADER */}
//         {/* ========================================= */}
//         <View style={styles.surahHeader}>
//           {/* Close Button - Top Right */}
//           <Pressable
//             onPress={handleClose}
//             style={styles.closeButton}
//             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//           >
//             <Text style={styles.closeIcon}>✕</Text>
//           </Pressable>

//           <View style={styles.topLineContainer}>
//             <View style={styles.topSmallLine} />
//             <View style={styles.topMainLine} />
//             <View style={styles.topSmallLine} />
//           </View>

//           <View style={styles.titleContainer}>
//             <View style={styles.decoration}>
//               <View style={styles.decorationCircle} />
//               <View style={styles.decorationLine} />
//               <View style={styles.decorationDot} />
//             </View>

//             <Text style={styles.surahName}>{surah.name}</Text>

//             <View style={[styles.decoration, styles.rightDecoration]}>
//               <View style={styles.decorationCircle} />
//               <View style={styles.decorationLine} />
//               <View style={styles.decorationDot} />
//             </View>
//           </View>

//           <View style={styles.bottomLineContainer}>
//             <View style={styles.bottomSmallLine} />
//             <View style={styles.bottomMainLine} />
//             <View style={styles.bottomSmallLine} />
//           </View>
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* ========================================= */}
//           {/* QURAN TEXT - Continuous flowing Mushaf style */}
//           {/* ========================================= */}
//           <View style={styles.quranContainer}>
//             <Text style={styles.quranText}>
//               {surah.ayahs.map((ayah) => (
//                 <Text key={ayah.number}>
//                   {/* 1. Arabic text of the ayah (inline) */}
//                   <Text style={styles.quranText}>{ayah.text}</Text>

//                   {/* 2. Ayah number marker INLINE at the end using ﴿ ﴾ */}
//                   <Text style={styles.ayahNumber}>
//                     {" "}
//                     ﴿{toArabicNumber(ayah.numberInSurah)}﴾{" "}
//                   </Text>
//                 </Text>
//               ))}
//             </Text>
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

// /**
//  * Convert 1 -> ١, 2 -> ٢, etc.
//  */
// function toArabicNumber(number: number) {
//   const numbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
//   return number
//     .toString()
//     .split("")
//     .map((digit) => numbers[Number(digit)])
//     .join("");
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FFF8E6",
//   },

//   container: {
//     flex: 1,
//     backgroundColor: "#FFF8E6",
//   },

//   scrollContent: {
//     paddingTop: 20,
//     paddingBottom: 100,
//   },

//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFF8E6",
//   },

//   loadingText: {
//     marginTop: 10,
//     color: "#8A6748",
//     fontSize: 14,
//   },

//   // =========================================
//   // CLOSE BUTTON STYLES
//   // =========================================
//   closeButton: {
//     position: "absolute",
//     top: 10,
//     right: 20,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(184, 107, 46, 0.08)",
//     zIndex: 10,
//   },

//   closeIcon: {
//     fontSize: 18,
//     color: "#B86B2E",
//     fontWeight: "600",
//     lineHeight: 20,
//   },

//   // =========================================
//   // SURAH HEADER STYLES
//   // =========================================
//   surahHeader: {
//     width: "100%",
//     paddingHorizontal: 35,
//     marginBottom: 30,
//   },
//   topLineContainer: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   topMainLine: {
//     width: "72%",
//     height: 2,
//     backgroundColor: "#B86B2E",
//     marginVertical: 4,
//   },
//   topSmallLine: {
//     width: "45%",
//     height: 1,
//     backgroundColor: "#D9A56F",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: 75,
//   },
//   surahName: {
//     fontSize: 34,
//     color: "#111111",
//     textAlign: "center",
//     marginHorizontal: 12,
//     writingDirection: "rtl",
//   },
//   decoration: {
//     width: 50,
//     height: 65,
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   rightDecoration: {
//     transform: [{ scaleX: -1 }],
//   },
//   decorationCircle: {
//     width: 22,
//     height: 22,
//     borderRadius: 11,
//     borderWidth: 2,
//     borderColor: "#B86B2E",
//     position: "absolute",
//     left: 4,
//     top: 21,
//   },
//   decorationLine: {
//     width: 38,
//     height: 2,
//     backgroundColor: "#B86B2E",
//     position: "absolute",
//     left: 5,
//     top: 32,
//   },
//   decorationDot: {
//     width: 11,
//     height: 11,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: "#D9A56F",
//     position: "absolute",
//     left: 1,
//     top: 8,
//   },
//   bottomLineContainer: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bottomMainLine: {
//     width: "72%",
//     height: 2,
//     backgroundColor: "#B86B2E",
//     marginVertical: 4,
//   },
//   bottomSmallLine: {
//     width: "45%",
//     height: 1,
//     backgroundColor: "#D9A56F",
//   },

//   // =========================================
//   // QURAN TEXT STYLES (CONTINUOUS MUSHAF)
//   // =========================================
//   quranContainer: {
//     paddingHorizontal: 20,
//   },

//   quranText: {
//     fontSize: 28,
//     lineHeight: 60,
//     color: "#111111",
//     textAlign: "right",
//     writingDirection: "rtl",
//     fontWeight: "400",
//     // fontFamily: "YourArabicFont",
//   },

//   // Ayah number rendered INLINE using ornate Arabic parentheses ﴿ ﴾
//   ayahNumber: {
//     fontSize: 20,
//     lineHeight: 60,
//     color: "#B86B2E",
//     writingDirection: "rtl",
//     fontWeight: "600",
//   },
// });


import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import quranData from "../../../../constants/quran.json";

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
  text?: string;
  ayahs: Ayah[];
};

export default function SurahDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurah();
  }, [id]);

  const loadSurah = () => {
    try {
      setLoading(true);

      const surahId = Number(id);

      const foundSurah = quranData.data.surahs.find(
        (item) => item.number === surahId
      );

      if (foundSurah) {
        setSurah(foundSurah);
      } else {
        setSurah(null);
      }
    } catch (error) {
      console.error("Failed to load Surah:", error);
      setSurah(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A96738" />
        <Text style={styles.loadingText}>
          Loading Surah...
        </Text>
      </View>
    );
  }

  if (!surah) {
    return (
      <View style={styles.center}>
        <Text>Surah not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ========================================= */}
        {/* SURAH HEADER */}
        {/* ========================================= */}

        <View style={styles.surahHeader}>

          {/* Close Button */}
          <Pressable
            onPress={handleClose}
            style={styles.closeButton}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>

          {/* Top Lines */}
          <View style={styles.topLineContainer}>
            <View style={styles.topSmallLine} />
            <View style={styles.topMainLine} />
            <View style={styles.topSmallLine} />
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>

            {/* Left Decoration */}
            <View style={styles.decoration}>
              <View style={styles.decorationCircle} />
              <View style={styles.decorationLine} />
              <View style={styles.decorationDot} />
            </View>

            <Text style={styles.surahName}>
              {surah.name}
            </Text>

            {/* Right Decoration */}
            <View
              style={[
                styles.decoration,
                styles.rightDecoration,
              ]}
            >
              <View style={styles.decorationCircle} />
              <View style={styles.decorationLine} />
              <View style={styles.decorationDot} />
            </View>

          </View>

          {/* Bottom Lines */}
          <View style={styles.bottomLineContainer}>
            <View style={styles.bottomSmallLine} />
            <View style={styles.bottomMainLine} />
            <View style={styles.bottomSmallLine} />
          </View>

        </View>

    

        {/* ========================================= */}
        {/* QURAN */}
        {/* ========================================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.quranContainer}>

                {

          surah.name !== "Al-Fatiha" && (
            <Text style={styles.bismiName}>
              {surah?.text}
            </Text>
          )

        }

            <Text style={styles.quranText}>

              {surah.ayahs.map((ayah) => (
                <Text key={ayah.number}>

                  {/* Ayah text */}
                  <Text style={styles.quranText}>
                    {ayah.text}
                  </Text>

                  {/* Ayah number */}
                  <Text style={styles.ayahNumber}>
                    {" "}
                    ﴿{toArabicNumber(ayah.numberInSurah)}﴾{" "}
                  </Text>

                </Text>
              ))}

            </Text>

          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

/**
 * Convert:
 *
 * 1  -> ١
 * 2  -> ٢
 * 10 -> ١٠
 * 25 -> ٢٥
 */
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

  return number
    .toString()
    .split("")
    .map((digit) => numbers[Number(digit)])
    .join("");
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8E6",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFF8E6",
  },

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E6",
  },

  loadingText: {
    marginTop: 10,
    color: "#8A6748",
    fontSize: 14,
  },

  // =========================================
  // CLOSE BUTTON
  // =========================================

  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(184, 107, 46, 0.08)",
    zIndex: 10,
  },

  closeIcon: {
    fontSize: 18,
    color: "#B86B2E",
    fontWeight: "600",
    lineHeight: 20,
  },

  // =========================================
  // SURAH HEADER
  // =========================================

  surahHeader: {
    width: "100%",
    paddingHorizontal: 35,
    marginBottom: 30,
    marginTop: 10,
  },

  topLineContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  topMainLine: {
    width: "72%",
    height: 2,
    backgroundColor: "#B86B2E",
    marginVertical: 4,
  },

  topSmallLine: {
    width: "45%",
    height: 1,
    backgroundColor: "#D9A56F",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 75,
  },

  surahName: {
    fontSize: 34,
    color: "#111111",
    textAlign: "center",
    marginHorizontal: 12,
    writingDirection: "rtl",
  },

    bismiName: {
    fontSize: 28,
    color: "#111111",
    textAlign: "center",
    marginHorizontal: 12,
    writingDirection: "rtl",
    marginBottom: 20,
  },

  decoration: {
    width: 50,
    height: 65,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  rightDecoration: {
    transform: [{ scaleX: -1 }],
  },

  decorationCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#B86B2E",
    position: "absolute",
    left: 4,
    top: 21,
  },

  decorationLine: {
    width: 38,
    height: 2,
    backgroundColor: "#B86B2E",
    position: "absolute",
    left: 5,
    top: 32,
  },

  decorationDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D9A56F",
    position: "absolute",
    left: 1,
    top: 8,
  },

  bottomLineContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomMainLine: {
    width: "72%",
    height: 2,
    backgroundColor: "#B86B2E",
    marginVertical: 4,
  },

  bottomSmallLine: {
    width: "45%",
    height: 1,
    backgroundColor: "#D9A56F",
  },

  // =========================================
  // QURAN TEXT
  // =========================================

  quranContainer: {
    paddingHorizontal: 10,
  },

  quranText: {
    fontSize: 28,
    lineHeight: 60,
    color: "#111111",
    textAlign: "right",
    writingDirection: "rtl",
    fontWeight: "400",
  },

  ayahNumber: {
    fontSize: 20,
    lineHeight: 60,
    color: "#B86B2E",
    writingDirection: "rtl",
    fontWeight: "600",
  },
});