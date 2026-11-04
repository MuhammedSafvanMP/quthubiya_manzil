// // import { useRef } from "react";
// // import { Platform, StyleSheet, View } from "react-native";
// // import {
// //     BannerAd,
// //     BannerAdSize,
// //     TestIds,
// //     useForeground,
// // } from "react-native-google-mobile-ads";

// // const IOS_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/9162938401";

// // const ANDROID_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/5009951304";

// // const adUnitId = __DEV__
// //   ? TestIds.ADAPTIVE_BANNER
// //   : Platform.OS === "ios"
// //     ? IOS_BANNER_AD_UNIT_ID
// //     : ANDROID_BANNER_AD_UNIT_ID;

// // export default function HomeBannerAd() {
// //   const bannerRef = useRef<BannerAd>(null);

// //   useForeground(() => {
// //     if (Platform.OS === "ios") {
// //       bannerRef.current?.load();
// //     }
// //   });

// //   return (
// //     <View style={styles.container}>
// //       <BannerAd
// //         ref={bannerRef}
// //         unitId={adUnitId}
// //         size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
// //         onAdLoaded={() => {
// //           console.log("Banner ad loaded successfully");
// //         }}
// //         onAdFailedToLoad={(error) => {
// //           console.warn("Banner ad failed to load:", error);
// //         }}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     width: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "#FFFFFF",
// //   },
// // });

// // import { useRef } from "react";
// // import { Platform, StyleSheet, View } from "react-native";
// // import {
// //   BannerAd,
// //   BannerAdSize,
// //   TestIds,
// //   useForeground,
// // } from "react-native-google-mobile-ads";

// // const IOS_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/9162938401";

// // const ANDROID_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/5009951304";

// // const adUnitId = __DEV__
// //   ? TestIds.ADAPTIVE_BANNER
// //   : Platform.OS === "ios"
// //     ? IOS_BANNER_AD_UNIT_ID
// //     : ANDROID_BANNER_AD_UNIT_ID;

// // export default function HomeBannerAd() {
// //   const bannerRef = useRef<BannerAd>(null);

// //   useForeground(() => {
// //     if (Platform.OS === "ios") {
// //       bannerRef.current?.load();
// //     }
// //   });

// //   return (
// //     <View style={styles.container}>
// //       <BannerAd
// //         ref={bannerRef}
// //         unitId={adUnitId}
// //         size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
// //         onAdLoaded={() => {
// //           console.log("Banner ad loaded:", Platform.OS);
// //         }}
// //         onAdFailedToLoad={(error) => {
// //           console.warn("Banner ad failed:", {
// //             platform: Platform.OS,
// //             code: error.code,
// //             message: error.message,
// //           });
// //         }}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     width: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "#FFFFFF",
// //   },
// // });

// // import { useRef } from "react";
// // import { Platform, StyleSheet, View } from "react-native";
// // import {
// //   BannerAd,
// //   BannerAdSize,
// //   TestIds,
// //   useForeground,
// // } from "react-native-google-mobile-ads";

// // const IOS_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/9162938401";

// // const ANDROID_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/5009951304";

// // const adUnitId = __DEV__
// //   ? TestIds.ADAPTIVE_BANNER
// //   : Platform.OS === "ios"
// //     ? IOS_BANNER_AD_UNIT_ID
// //     : ANDROID_BANNER_AD_UNIT_ID;

// // export default function HomeBannerAd() {
// //   const bannerRef = useRef<BannerAd>(null);

// //   useForeground(() => {
// //     if (Platform.OS === "ios") {
// //       bannerRef.current?.load();
// //     }
// //   });

// //   return (
// //     <View style={styles.container}>
// //       <BannerAd
// //         ref={bannerRef}
// //         unitId={adUnitId}
// //         size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
// //         onAdLoaded={() => {
// //           console.log("✅ Banner loaded:", Platform.OS);
// //         }}
// //         onAdFailedToLoad={(error) => {
// //           console.warn("❌ Banner failed:", {
// //             platform: Platform.OS,
// //             code: error.code,
// //             message: error.message,
// //           });
// //         }}
// //         onAdImpression={() => {
// //           console.log("📊 Banner impression:", Platform.OS);
// //         }}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     width: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "#FFFFFF",
// //   },
// // });

// import { useRef } from "react";
// import { Platform, StyleSheet, View } from "react-native";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
//   useForeground,
// } from "react-native-google-mobile-ads";

// const IOS_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/9162938401";

// const ANDROID_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/5009951304";

// const adUnitId = __DEV__
//   ? TestIds.ADAPTIVE_BANNER
//   : Platform.OS === "ios"
//     ? IOS_BANNER_AD_UNIT_ID
//     : ANDROID_BANNER_AD_UNIT_ID;

// export default function HomeBannerAd() {
//   const bannerRef = useRef<BannerAd>(null);

//   useForeground(() => {
//     if (Platform.OS === "ios") {
//       bannerRef.current?.load();
//     }
//   });

//   return (
//     <View style={styles.container}>
//       <BannerAd
//         ref={bannerRef}
//         unitId={adUnitId}
//         size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
//         onAdLoaded={() => {
//           console.log("✅ Banner loaded:", Platform.OS);
//         }}
//         onAdFailedToLoad={(error) => {
//           console.warn("❌ Banner failed:", {
//             platform: Platform.OS,
//             code: error.code,
//             message: error.message,
//           });
//         }}
//         onAdImpression={() => {
//           console.log("📊 Banner impression:", Platform.OS);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#FFFFFF",
//   },
// });


import { useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";

const IOS_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/9162938401";
const ANDROID_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/5009951304";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === "ios"
    ? IOS_BANNER_AD_UNIT_ID
    : ANDROID_BANNER_AD_UNIT_ID;

export default function HomeBannerAd() {
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    if (Platform.OS === "ios") {
      bannerRef.current?.load();
    }
  });

  return (
    <View style={styles.container}>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        onAdLoaded={() => {
          console.log("✅ Compact banner loaded:", Platform.OS);
        }}
        onAdFailedToLoad={(error) => {
          console.warn("❌ Banner failed:", error.code, error.message);
        }}
        onAdImpression={() => {
          console.log("📊 Banner impression:", Platform.OS);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
});