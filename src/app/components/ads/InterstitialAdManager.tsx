// import {
//     AdEventType,
//     InterstitialAd,
//     TestIds,
// } from "react-native-google-mobile-ads";

// const IOS_INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3906185097412947/8908621682";

// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : IOS_INTERSTITIAL_AD_UNIT_ID;

// let interstitial: InterstitialAd | null = null;
// let isLoaded = false;
// let isLoading = false;

// export function preloadInterstitial() {
//   if (isLoaded || isLoading) return;

//   isLoading = true;

//   interstitial = InterstitialAd.createForAdRequest(adUnitId);

//   interstitial.addAdEventListener(AdEventType.LOADED, () => {
//     isLoaded = true;
//     isLoading = false;
//   });

//   interstitial.addAdEventListener(AdEventType.CLOSED, () => {
//     isLoaded = false;
//     isLoading = false;
//     interstitial = null;

//     // Prepare the next ad for a future natural transition.
//     preloadInterstitial();
//   });

//   interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
//     console.warn("Interstitial ad error:", error);
//     isLoaded = false;
//     isLoading = false;
//     interstitial = null;
//   });

//   interstitial.load();
// }

// export function showInterstitial() {
//   if (interstitial && isLoaded) {
//     interstitial.show();
//     isLoaded = false;
//   } else {
//     console.log("Interstitial ad is not ready yet.");
//     preloadInterstitial();
//   }
// }

// import {
//     AdEventType,
//     InterstitialAd,
//     TestIds,
// } from "react-native-google-mobile-ads";

// const IOS_INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3906185097412947/8908621682";

// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : IOS_INTERSTITIAL_AD_UNIT_ID;

// let interstitial: InterstitialAd | null = null;
// let isLoaded = false;
// let isLoading = false;
// let showWhenLoaded = false;

// export function preloadInterstitial() {
//   if (isLoaded || isLoading) return;

//   isLoading = true;

//   interstitial = InterstitialAd.createForAdRequest(adUnitId);

//   interstitial.addAdEventListener(AdEventType.LOADED, () => {
//     isLoaded = true;
//     isLoading = false;

//     // Display the ad if a screen requested it while loading.
//     if (showWhenLoaded && interstitial) {
//       showWhenLoaded = false;

//       interstitial.show().catch((error) => {
//         console.warn("Failed to show interstitial:", error);
//       });

//       isLoaded = false;
//     }
//   });

//   interstitial.addAdEventListener(AdEventType.CLOSED, () => {
//     isLoaded = false;
//     isLoading = false;
//     interstitial = null;
//     showWhenLoaded = false;

//     // Preload the next ad for a future screen visit.
//     preloadInterstitial();
//   });

//   interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
//     console.warn("Interstitial ad error:", error);

//     isLoaded = false;
//     isLoading = false;
//     interstitial = null;
//     showWhenLoaded = false;
//   });

//   interstitial.load();
// }

// export function showInterstitial() {
//   if (interstitial && isLoaded) {
//     isLoaded = false;

//     interstitial.show().catch((error) => {
//       console.warn("Failed to show interstitial:", error);
//       preloadInterstitial();
//     });

//     return;
//   }

//   // Remember the request so the ad displays when loading finishes.
//   showWhenLoaded = true;
//   preloadInterstitial();
// }

import { Platform } from "react-native";
import {
    AdEventType,
    InterstitialAd,
    TestIds,
} from "react-native-google-mobile-ads";

const IOS_INTERSTITIAL_AD_UNIT_ID = "ca-app-pub-3906185097412947/8908621682";

const ANDROID_INTERSTITIAL_AD_UNIT_ID =
  "ca-app-pub-3906185097412947/4818379619";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === "ios"
    ? IOS_INTERSTITIAL_AD_UNIT_ID
    : ANDROID_INTERSTITIAL_AD_UNIT_ID;

let interstitial: InterstitialAd | null = null;
let isLoaded = false;
let isLoading = false;
let showWhenLoaded = false;

export function preloadInterstitial() {
  if (isLoaded || isLoading) return;

  isLoading = true;

  const ad = InterstitialAd.createForAdRequest(adUnitId);
  interstitial = ad;

  ad.addAdEventListener(AdEventType.LOADED, () => {
    if (interstitial !== ad) return;

    isLoaded = true;
    isLoading = false;

    if (showWhenLoaded) {
      showWhenLoaded = false;
      isLoaded = false;

      ad.show().catch((error) => {
        console.warn("Failed to show interstitial:", error);
        if (interstitial === ad) {
          interstitial = null;
          preloadInterstitial();
        }
      });
    }
  });

  ad.addAdEventListener(AdEventType.CLOSED, () => {
    if (interstitial !== ad) return;

    interstitial = null;
    isLoaded = false;
    isLoading = false;
    showWhenLoaded = false;

    preloadInterstitial();
  });

  ad.addAdEventListener(AdEventType.ERROR, (error) => {
    console.warn("Interstitial ad error:", error);

    if (interstitial !== ad) return;

    interstitial = null;
    isLoaded = false;
    isLoading = false;
    showWhenLoaded = false;
  });

  ad.load();
}

export function showInterstitial() {
  if (interstitial && isLoaded) {
    const ad = interstitial;

    isLoaded = false;
    showWhenLoaded = false;

    ad.show().catch((error) => {
      console.warn("Failed to show interstitial:", error);

      if (interstitial === ad) {
        interstitial = null;
        isLoading = false;
        preloadInterstitial();
      }
    });

    return;
  }

  showWhenLoaded = true;
  preloadInterstitial();
}
