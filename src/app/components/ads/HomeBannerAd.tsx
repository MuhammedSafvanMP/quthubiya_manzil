// import { useRef } from "react";
// import { Platform, StyleSheet, View } from "react-native";
// import {
//     BannerAd,
//     BannerAdSize,
//     TestIds,
//     useForeground,
// } from "react-native-google-mobile-ads";

// const IOS_BANNER_AD_UNIT_ID = "ca-app-pub-3906185097412947/9162938401";

// // Use Google's test ad during development.
// const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : IOS_BANNER_AD_UNIT_ID;

// export default function HomeBannerAd() {
//   const bannerRef = useRef<BannerAd>(null);

//   // Reload the banner when the iOS app returns to the foreground.
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
//         size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
//         onAdFailedToLoad={(error) => {
//           console.warn("Home banner failed to load:", error);
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
  ? TestIds.ADAPTIVE_BANNER
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
        size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => {
          console.log("Banner ad loaded successfully");
        }}
        onAdFailedToLoad={(error) => {
          console.warn("Banner ad failed to load:", error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
