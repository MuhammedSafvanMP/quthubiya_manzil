// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as Notifications from "expo-notifications";
// import {
//   Bell,
//   BellOff,
//   CalendarDays,
//   ChevronDown,
//   Clock,
//   MapPin,
//   Moon,
//   RefreshCw,
//   Sun,
// } from "lucide-react-native";
// import { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AppBar from "../../common/AppBar";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowBanner: true,
//     shouldShowList: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// const LOCATIONS: Record<string, string[]> = {
//   Kerala: [
//     "Malappuram",
//     "Kozhikode",
//     "Kochi",
//     "Thiruvananthapuram",
//     "Kannur",
//     "Thrissur",
//     "Palakkad",
//     "Kollam",
//     "Kottayam",
//     "Alappuzha",
//     "Manjeri",
//     "Tirur",
//   ],
//   Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
//   "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
//   Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
//   Delhi: ["New Delhi"],
//   "West Bengal": ["Kolkata", "Howrah"],
//   Telangana: ["Hyderabad", "Warangal"],
//   "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur"],
//   "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
//   Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
//   Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
//   Punjab: ["Amritsar", "Ludhiana", "Chandigarh"],
//   Haryana: ["Gurugram", "Faridabad", "Chandigarh"],
//   Bihar: ["Patna", "Gaya"],
//   Odisha: ["Bhubaneswar", "Cuttack"],
//   Assam: ["Guwahati", "Silchar"],
//   Jharkhand: ["Ranchi", "Jamshedpur"],
//   Chhattisgarh: ["Raipur", "Bilaspur"],
//   Goa: ["Panaji", "Margao"],
//   "Himachal Pradesh": ["Shimla", "Dharamshala"],
//   Uttarakhand: ["Dehradun", "Haridwar"],
//   "Jammu and Kashmir": ["Srinagar", "Jammu"],
//   "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
//   "Andaman and Nicobar Islands": ["Port Blair"],
//   "Arunachal Pradesh": ["Itanagar"],
//   Manipur: ["Imphal"],
//   Meghalaya: ["Shillong"],
//   Mizoram: ["Aizawl"],
//   Nagaland: ["Kohima", "Dimapur"],
//   Sikkim: ["Gangtok"],
//   Tripura: ["Agartala"],
// };

// const PRAYERS = [
//   { key: "Fajr", label: "Fajr", arabic: "الفجر", icon: Moon },
//   { key: "Dhuhr", label: "Dhuhr", arabic: "الظهر", icon: Sun },
//   { key: "Asr", label: "Asr", arabic: "العصر", icon: Sun },
//   { key: "Maghrib", label: "Maghrib", arabic: "المغرب", icon: Sun },
//   { key: "Isha", label: "Isha", arabic: "العشاء", icon: Moon },
// ] as const;

// type PrayerKey = (typeof PRAYERS)[number]["key"];

// type Timings = Record<string, string> & {
//   Fajr: string;
//   Dhuhr: string;
//   Asr: string;
//   Maghrib: string;
//   Isha: string;
//   Sunrise: string;
// };

// type PrayerApiResponse = {
//   code: number;
//   data: {
//     timings: Timings;
//     date: {
//       readable: string;
//       hijri: {
//         date: string;
//         month: { en: string };
//         year: string;
//       };
//     };
//     meta?: {
//       method?: { name?: string };
//       timezone?: string;
//     };
//   };
// };

// const API = "https://api.aladhan.com/v1";

// const PRAYER_REMINDER_KEY = "@quthubiya_prayer_reminders_enabled";

// async function cancelPrayerNotifications() {
//   const scheduled = await Notifications.getAllScheduledNotificationsAsync();

//   const prayerKeys = PRAYERS.map((prayer) => prayer.key);

//   for (const notification of scheduled) {
//     const data = notification.content.data;

//     // Cancel only notifications created for prayer reminders.
//     if (data?.prayer && prayerKeys.includes(data.prayer as PrayerKey)) {
//       await Notifications.cancelScheduledNotificationAsync(
//         notification.identifier,
//       );
//     }
//   }
// }

// function apiDate(date: Date) {
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   return `${day}-${month}-${date.getFullYear()}`;
// }

// function timeToMinutes(value: string) {
//   const match = value.match(/(\d{1,2}):(\d{2})/);
//   if (!match) return 0;
//   return Number(match[1]) * 60 + Number(match[2]);
// }

// // Keep this 24-hour helper for calculations and notification scheduling.
// function cleanTime(value?: string) {
//   return value?.match(/\d{1,2}:\d{2}/)?.[0] ?? "--:--";
// }

// // Use this helper only when displaying a time to the user.
// function formatPrayerTime(value?: string) {
//   const time = cleanTime(value);
//   if (time === "--:--") return time;

//   const [hours, minutes] = time.split(":").map(Number);
//   const period = hours >= 12 ? "PM" : "AM";
//   const hours12 = hours % 12 || 12;

//   return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
// }

// function formatCountdown(milliseconds: number) {
//   const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   return [
//     String(hours).padStart(2, "0"),
//     String(minutes).padStart(2, "0"),
//     String(seconds).padStart(2, "0"),
//   ].join(":");
// }

// function prayerDateTime(date: Date, time: string) {
//   const [hours, minutes] = cleanTime(time).split(":").map(Number);
//   const result = new Date(date);
//   result.setHours(hours, minutes, 0, 0);
//   return result;
// }

// async function getPrayerData(
//   date: Date,
//   city: string,
// ): Promise<PrayerApiResponse> {
//   const url =
//     `${API}/timingsByCity/${apiDate(date)}` +
//     `?city=${encodeURIComponent(city)}` +
//     `&country=India&method=3&school=0`;

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error("Could not load prayer times.");
//   }

//   const json = (await response.json()) as PrayerApiResponse;

//   if (json.code !== 200 || !json.data?.timings) {
//     throw new Error("The prayer time API returned invalid data.");
//   }

//   return json;
// }

// useEffect(() => {
//   let active = true;

//   async function restoreReminderPreference() {
//     try {
//       const saved = await AsyncStorage.getItem(PRAYER_REMINDER_KEY);

//       const scheduled = await Notifications.getAllScheduledNotificationsAsync();

//       const prayerKeys = PRAYERS.map((prayer) => prayer.key);

//       const prayerNotifications = scheduled.filter((notification) => {
//         const data = notification.content.data;

//         return data?.prayer && prayerKeys.includes(data.prayer as PrayerKey);
//       });

//       if (!active) return;

//       // Restore the enabled state only if it was saved and reminders
//       // are still scheduled on the device.
//       const enabled = saved === "true" && prayerNotifications.length > 0;

//       setAdhanEnabled(enabled);
//       setScheduledCount(enabled ? prayerNotifications.length : 0);

//       if (saved === "true" && !enabled) {
//         await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");
//       }
//     } catch (error) {
//       console.error("Could not restore prayer reminders:", error);
//     } finally {
//       if (active) {
//         setReminderPreferenceLoaded(true);
//       }
//     }
//   }

//   restoreReminderPreference();

//   return () => {
//     active = false;
//   };
// }, []);

// export default function PrayerScreen() {
//   const [selectedState, setSelectedState] = useState("Kerala");
//   const [selectedCity, setSelectedCity] = useState("Malappuram");
//   const [pickerOpen, setPickerOpen] = useState(false);

//   const [timings, setTimings] = useState<Timings | null>(null);
//   const [hijriDate, setHijriDate] = useState("");
//   const [readableDate, setReadableDate] = useState("");
//   const [timezone, setTimezone] = useState("");
//   const [now, setNow] = useState(new Date());

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [adhanEnabled, setAdhanEnabled] = useState(false);
//   const [scheduledCount, setScheduledCount] = useState(0);

//   const [reminderPreferenceLoaded, setReminderPreferenceLoaded] =
//     useState(false);
//   const [reminderBusy, setReminderBusy] = useState(false);

//   const fetchPrayerTimes = useCallback(async () => {
//     try {
//       const result = await getPrayerData(new Date(), selectedCity);
//       setTimings(result.data.timings);
//       setReadableDate(result.data.date.readable);
//       setHijriDate(
//         `${result.data.date.hijri.date} ${result.data.date.hijri.month.en} ${result.data.date.hijri.year}`,
//       );
//       setTimezone(result.data.meta?.timezone ?? "Local device time");
//     } catch (error) {
//       Alert.alert(
//         "Prayer times unavailable",
//         error instanceof Error ? error.message : "Please try again.",
//       );
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [selectedCity]);

//   useEffect(() => {
//     fetchPrayerTimes();
//   }, [fetchPrayerTimes]);

//   useEffect(() => {
//     const timer = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextPrayer = (() => {
//     if (!timings) return null;

//     for (const prayer of PRAYERS) {
//       const at = prayerDateTime(now, timings[prayer.key]);
//       if (at.getTime() > now.getTime()) {
//         return { ...prayer, at };
//       }
//     }

//     return null;
//   })();

//   const countdown = nextPrayer
//     ? formatCountdown(nextPrayer.at.getTime() - now.getTime())
//     : null;

//   async function requestNotificationPermission() {
//     const existing = await Notifications.getPermissionsAsync();
//     let status = existing.status;

//     if (status !== "granted") {
//       const requested = await Notifications.requestPermissionsAsync();
//       status = requested.status;
//     }

//     if (status !== "granted") {
//       Alert.alert(
//         "Notifications disabled",
//         "Allow notifications in your device settings to receive prayer reminders.",
//       );
//       return false;
//     }

//     return true;
//   }

//   // async function schedulePrayerReminders() {
//   //   const permissionGranted = await requestNotificationPermission();
//   //   if (!permissionGranted) {
//   //     setAdhanEnabled(false);
//   //     return;
//   //   }

//   //   try {
//   //     if (Platform.OS === "android") {
//   //       await Notifications.setNotificationChannelAsync("prayer-times-v2", {
//   //         name: "Prayer time reminders",
//   //         importance: Notifications.AndroidImportance.MAX,
//   //         sound: "vank_15sec.wav",
//   //         vibrationPattern: [0, 250, 250, 250],
//   //       });
//   //     }

//   //     // Remove previously scheduled prayer reminders before rebuilding them.
//   //     await Notifications.cancelAllScheduledNotificationsAsync();

//   //     let count = 0;
//   //     const today = new Date();
//   //     const prayerKeys: PrayerKey[] = [
//   //       "Fajr",
//   //       "Dhuhr",
//   //       "Asr",
//   //       "Maghrib",
//   //       "Isha",
//   //     ];

//   //     // Schedule the next seven days for the currently selected city.
//   //     for (let offset = 0; offset < 30; offset++) {
//   //       const date = new Date(today);
//   //       date.setDate(today.getDate() + offset);

//   //       let dayData: PrayerApiResponse;

//   //       if (offset === 0 && timings) {
//   //         dayData = await getPrayerData(date, selectedCity);
//   //       } else {
//   //         dayData = await getPrayerData(date, selectedCity);
//   //       }

//   //       for (const key of prayerKeys) {
//   //         const when = prayerDateTime(date, dayData.data.timings[key]);

//   //         // Do not schedule a prayer time that has already passed.
//   //         if (when.getTime() <= Date.now() + 5000) continue;

//   //         await Notifications.scheduleNotificationAsync({
//   //           content: {
//   //             title: `${key} prayer time`,
//   //             body: `It is time for ${key} prayer in ${selectedCity}.`,
//   //             sound: "vank_15sec.wav",

//   //             ...(Platform.OS === "android"
//   //               ? { channelId: "prayer-times" }
//   //               : {}),
//   //             data: { prayer: key, city: selectedCity },
//   //           },
//   //           trigger: {
//   //             type: Notifications.SchedulableTriggerInputTypes.DATE,
//   //             date: when,
//   //             channelId: "prayer-times-v2",
//   //           },
//   //         });

//   //         count++;
//   //       }
//   //     }

//   //     setScheduledCount(count);
//   //     setAdhanEnabled(true);

//   //     Alert.alert(
//   //       "Prayer reminders enabled",
//   //       `${count} prayer reminders scheduled for ${selectedCity} over the next seven days.`,
//   //     );
//   //   } catch (error) {
//   //     setAdhanEnabled(false);
//   //     Alert.alert(
//   //       "Could not schedule reminders",
//   //       error instanceof Error ? error.message : "Please try again.",
//   //     );
//   //   }
//   // }

//   async function schedulePrayerReminders() {
//     if (reminderBusy) return;

//     setReminderBusy(true);

//     try {
//       const permissionGranted = await requestNotificationPermission();

//       if (!permissionGranted) {
//         setAdhanEnabled(false);
//         await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");
//         return;
//       }

//       if (Platform.OS === "android") {
//         await Notifications.setNotificationChannelAsync("prayer-times-v2", {
//           name: "Prayer time reminders",
//           importance: Notifications.AndroidImportance.MAX,
//           sound: "vank_15sec.wav",
//           vibrationPattern: [0, 250, 250, 250],
//         });
//       }

//       // Remove old prayer reminders only, not unrelated notifications.
//       await cancelPrayerNotifications();

//       let count = 0;
//       const today = new Date();

//       const prayerKeys: PrayerKey[] = [
//         "Fajr",
//         "Dhuhr",
//         "Asr",
//         "Maghrib",
//         "Isha",
//       ];

//       // Schedule prayer reminders for the next 30 days.
//       for (let offset = 0; offset < 30; offset++) {
//         const date = new Date(today);
//         date.setDate(today.getDate() + offset);

//         const dayData = await getPrayerData(date, selectedCity);

//         for (const key of prayerKeys) {
//           const when = prayerDateTime(date, dayData.data.timings[key]);

//           if (when.getTime() <= Date.now() + 5000) continue;

//           await Notifications.scheduleNotificationAsync({
//             content: {
//               title: `${key} prayer time`,
//               body: `It is time for ${key} prayer in ${selectedCity}.`,
//               sound: "vank_15sec.wav",
//               data: {
//                 prayer: key,
//                 city: selectedCity,
//               },
//             },
//             trigger: {
//               type: Notifications.SchedulableTriggerInputTypes.DATE,
//               date: when,
//               ...(Platform.OS === "android"
//                 ? { channelId: "prayer-times-v2" }
//                 : {}),
//             },
//           });

//           count++;
//         }
//       }

//       await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "true");

//       setScheduledCount(count);
//       setAdhanEnabled(true);

//       Alert.alert(
//         "Prayer reminders enabled",
//         `${count} reminders scheduled for ${selectedCity} over the next 30 days.`,
//       );
//     } catch (error) {
//       console.error("Scheduling prayer reminders failed:", error);

//       setAdhanEnabled(false);
//       setScheduledCount(0);

//       await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");

//       Alert.alert(
//         "Could not schedule reminders",
//         error instanceof Error ? error.message : "Please try again.",
//       );
//     } finally {
//       setReminderBusy(false);
//     }
//   }

//   // async function disablePrayerReminders() {
//   //   await Notifications.cancelAllScheduledNotificationsAsync();
//   //   setAdhanEnabled(false);
//   //   setScheduledCount(0);
//   //   Alert.alert("Reminders disabled", "Scheduled reminders were cancelled.");
//   // }

//   async function disablePrayerReminders() {
//     if (reminderBusy) return;

//     setReminderBusy(true);

//     try {
//       await cancelPrayerNotifications();
//       await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");

//       setAdhanEnabled(false);
//       setScheduledCount(0);

//       Alert.alert(
//         "Reminders disabled",
//         "Your scheduled prayer reminders have been cancelled.",
//       );
//     } catch (error) {
//       console.error("Could not disable prayer reminders:", error);

//       Alert.alert("Could not disable reminders", "Please try again.");
//     } finally {
//       setReminderBusy(false);
//     }
//   }

//   function selectState(state: string) {
//     setSelectedState(state);
//     setSelectedCity(LOCATIONS[state][0]);
//   }

//   function selectCity(city: string) {
//     setSelectedCity(city);
//     setPickerOpen(false);
//   }

//   if (loading && !timings) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#087F5B" />
//         <Text style={styles.loadingText}>Loading prayer times...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.screen}>
//       <AppBar title="Vank" />
//       <ScrollView
//         contentContainerStyle={styles.content}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={() => {
//               setRefreshing(true);
//               fetchPrayerTimes();
//             }}
//             tintColor="#087F5B"
//           />
//         }
//       >
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.eyebrow}>QUTHUBIYA MANZIL</Text>
//             <Text style={styles.title}>Prayer Times</Text>
//           </View>
//           <View style={styles.headerIcon}>
//             <Moon size={24} color="#087F5B" />
//           </View>
//         </View>

//         <Pressable
//           style={styles.locationButton}
//           onPress={() => setPickerOpen(!pickerOpen)}
//         >
//           <MapPin size={19} color="#087F5B" />
//           <View style={styles.locationText}>
//             <Text style={styles.city}>{selectedCity}, India</Text>
//             <Text style={styles.state}>{selectedState}</Text>
//           </View>
//           <ChevronDown size={20} color="#52635D" />
//         </Pressable>

//         {pickerOpen && (
//           <View style={styles.picker}>
//             <Text style={styles.sectionTitle}>Select state</Text>

//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={styles.chips}
//             >
//               {Object.keys(LOCATIONS).map((state) => (
//                 <Pressable
//                   key={state}
//                   onPress={() => selectState(state)}
//                   style={[
//                     styles.chip,
//                     selectedState === state && styles.chipSelected,
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.chipText,
//                       selectedState === state && styles.chipTextSelected,
//                     ]}
//                   >
//                     {state}
//                   </Text>
//                 </Pressable>
//               ))}
//             </ScrollView>

//             <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
//               Select city
//             </Text>

//             <View style={styles.cityGrid}>
//               {LOCATIONS[selectedState].map((city) => (
//                 <Pressable
//                   key={city}
//                   onPress={() => selectCity(city)}
//                   style={[
//                     styles.cityChip,
//                     selectedCity === city && styles.cityChipSelected,
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.chipText,
//                       selectedCity === city && styles.chipTextSelected,
//                     ]}
//                   >
//                     {city}
//                   </Text>
//                 </Pressable>
//               ))}
//             </View>
//           </View>
//         )}

//         <View style={styles.dateCard}>
//           <View style={styles.dateIcon}>
//             <CalendarDays size={20} color="#087F5B" />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.dateText}>{readableDate || apiDate(now)}</Text>
//             <Text style={styles.hijriText}>{hijriDate || "Hijri date"}</Text>
//           </View>
//           <Pressable onPress={fetchPrayerTimes} hitSlop={12}>
//             <RefreshCw size={19} color="#087F5B" />
//           </Pressable>
//         </View>

//         <View style={styles.nextCard}>
//           <View style={styles.nextTop}>
//             <View>
//               <Text style={styles.nextLabel}>
//                 {nextPrayer ? "UP NEXT" : "DAILY PRAYERS"}
//               </Text>
//               <Text style={styles.nextName}>
//                 {nextPrayer?.label ?? "All prayers completed"}
//               </Text>
//               {nextPrayer && (
//                 <Text style={styles.arabic}>{nextPrayer.arabic}</Text>
//               )}
//             </View>
//             <View style={styles.nextIcon}>
//               <Clock size={27} color="#FFFFFF" />
//             </View>
//           </View>

//           {nextPrayer && countdown && (
//             <View style={styles.countdownBox}>
//               <Text style={styles.countdownLabel}>Time remaining</Text>
//               <Text style={styles.countdown}>{countdown}</Text>
//             </View>
//           )}

//           {!nextPrayer && (
//             <Text style={styles.nextHint}>
//               The next Fajr time is on the following day.
//             </Text>
//           )}
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Today's prayers</Text>
//           <Text style={styles.timezone}>{timezone}</Text>
//         </View>

//         <View style={styles.prayerList}>
//           {PRAYERS.map((prayer) => {
//             const Icon = prayer.icon;
//             const prayerTime = timings?.[prayer.key];
//             const isNext = nextPrayer?.key === prayer.key;

//             return (
//               <View
//                 key={prayer.key}
//                 style={[styles.prayerRow, isNext && styles.prayerRowActive]}
//               >
//                 <View
//                   style={[styles.prayerIcon, isNext && styles.prayerIconActive]}
//                 >
//                   <Icon size={20} color={isNext ? "#FFFFFF" : "#087F5B"} />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.prayerName}>{prayer.label}</Text>
//                   <Text style={styles.prayerArabic}>{prayer.arabic}</Text>
//                 </View>
//                 <Text style={[styles.prayerTime, isNext && styles.activeTime]}>
//                   {formatPrayerTime(prayerTime)}
//                 </Text>
//                 {isNext && <View style={styles.activeDot} />}
//               </View>
//             );
//           })}

//           <View style={styles.sunriseRow}>
//             <Sun size={19} color="#C18A28" />
//             <Text style={styles.sunriseLabel}>Sunrise</Text>
//             <Text style={styles.sunriseTime}>
//               {formatPrayerTime(timings?.Sunrise)}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.adhanCard}>
//           <View style={styles.adhanIcon}>
//             {adhanEnabled ? (
//               <Bell size={23} color="#087F5B" />
//             ) : (
//               <BellOff size={23} color="#087F5B" />
//             )}
//           </View>

//           <View style={{ flex: 1 }}>
//             <Text style={styles.adhanTitle}>Prayer reminders</Text>
//             <Text style={styles.adhanDescription}>
//               {adhanEnabled
//                 ? `${scheduledCount} reminders scheduled for ${selectedCity}`
//                 : "Get notified when each prayer time begins."}
//             </Text>
//           </View>

//           <Switch
//             value={adhanEnabled}
//             disabled={!reminderPreferenceLoaded || reminderBusy}
//             onValueChange={(enabled) => {
//               if (enabled) {
//                 void schedulePrayerReminders();
//               } else {
//                 void disablePrayerReminders();
//               }
//             }}
//             trackColor={{ false: "#D5DDD9", true: "#8ED5B7" }}
//             thumbColor={adhanEnabled ? "#087F5B" : "#F4F4F4"}
//           />
//         </View>

//         <Text style={styles.footer}>
//           Prayer times are calculated using AlAdhan (method 3). Local mosque
//           timetables may differ. Confirm the times with your local mosque.
//         </Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "#F5F8F6",
//   },
//   content: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 40,
//   },
//   loading: {
//     flex: 1,
//     backgroundColor: "#F5F8F6",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 12,
//   },
//   loadingText: {
//     color: "#53665D",
//     fontSize: 14,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 22,
//   },
//   eyebrow: {
//     fontSize: 10,
//     letterSpacing: 2,
//     color: "#087F5B",
//     fontWeight: "800",
//     marginBottom: 6,
//   },
//   title: {
//     fontSize: 29,
//     fontWeight: "800",
//     color: "#172C24",
//   },
//   headerIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: "#E0F2E9",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   locationButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFFFF",
//     padding: 15,
//     borderRadius: 17,
//     gap: 12,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#E7EEEA",
//   },
//   locationText: {
//     flex: 1,
//   },
//   city: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#1C3128",
//   },
//   state: {
//     fontSize: 12,
//     color: "#718078",
//     marginTop: 3,
//   },
//   picker: {
//     backgroundColor: "#FFFFFF",
//     padding: 15,
//     borderRadius: 17,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#E7EEEA",
//   },
//   chips: {
//     gap: 8,
//     paddingTop: 10,
//     paddingBottom: 2,
//   },
//   chip: {
//     borderRadius: 22,
//     paddingHorizontal: 13,
//     paddingVertical: 9,
//     backgroundColor: "#F0F4F1",
//   },
//   chipSelected: {
//     backgroundColor: "#087F5B",
//   },
//   chipText: {
//     color: "#53665D",
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   chipTextSelected: {
//     color: "#FFFFFF",
//   },
//   cityGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//     marginTop: 10,
//   },
//   cityChip: {
//     borderRadius: 22,
//     paddingHorizontal: 13,
//     paddingVertical: 10,
//     backgroundColor: "#F0F4F1",
//   },
//   cityChipSelected: {
//     backgroundColor: "#087F5B",
//   },
//   dateCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 17,
//     padding: 15,
//     marginBottom: 18,
//     borderWidth: 1,
//     borderColor: "#E7EEEA",
//   },
//   dateIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 13,
//     backgroundColor: "#E4F4EB",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dateText: {
//     color: "#20352B",
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   hijriText: {
//     color: "#74847B",
//     fontSize: 12,
//     marginTop: 5,
//   },
//   nextCard: {
//     backgroundColor: "#087F5B",
//     borderRadius: 23,
//     padding: 21,
//     marginBottom: 25,
//   },
//   nextTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   nextLabel: {
//     color: "#BDE7D4",
//     fontSize: 10,
//     letterSpacing: 1.8,
//     fontWeight: "800",
//   },
//   nextName: {
//     color: "#FFFFFF",
//     fontSize: 20,
//     fontWeight: "800",
//     marginTop: 7,
//   },
//   arabic: {
//     color: "#D5F2E3",
//     fontSize: 18,
//     marginTop: 5,
//   },
//   nextIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 17,
//     backgroundColor: "#23966F",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   countdownBox: {
//     borderTopWidth: 1,
//     borderTopColor: "#3BA17E",
//     marginTop: 20,
//     paddingTop: 16,
//   },
//   countdownLabel: {
//     color: "#C8E9DA",
//     fontSize: 12,
//   },
//   countdown: {
//     color: "#FFFFFF",
//     fontSize: 34,
//     fontWeight: "800",
//     letterSpacing: 2,
//     marginTop: 5,
//     fontVariant: ["tabular-nums"],
//   },
//   nextHint: {
//     color: "#E2F3EA",
//     fontSize: 13,
//     marginTop: 16,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     color: "#21362C",
//     fontSize: 16,
//     fontWeight: "800",
//   },
//   timezone: {
//     color: "#84928A",
//     fontSize: 10,
//     maxWidth: "48%",
//   },
//   prayerList: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     paddingHorizontal: 14,
//     borderWidth: 1,
//     borderColor: "#E7EEEA",
//   },
//   prayerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F0F3F1",
//     gap: 12,
//   },
//   prayerRowActive: {
//     backgroundColor: "#F0FAF5",
//     marginHorizontal: -14,
//     paddingHorizontal: 14,
//     borderRadius: 13,
//   },
//   prayerIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 14,
//     backgroundColor: "#E7F5ED",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   prayerIconActive: {
//     backgroundColor: "#087F5B",
//   },
//   prayerName: {
//     color: "#20352B",
//     fontSize: 15,
//     fontWeight: "700",
//   },
//   prayerArabic: {
//     color: "#84928A",
//     fontSize: 12,
//     marginTop: 3,
//   },
//   prayerTime: {
//     color: "#20352B",
//     fontSize: 17,
//     fontWeight: "800",
//     fontVariant: ["tabular-nums"],
//   },
//   activeTime: {
//     color: "#087F5B",
//   },
//   activeDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: "#087F5B",
//     marginLeft: 1,
//   },
//   sunriseRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 17,
//     gap: 12,
//   },
//   sunriseLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: "#53665D",
//     fontWeight: "600",
//   },
//   sunriseTime: {
//     fontSize: 16,
//     color: "#A8751B",
//     fontWeight: "800",
//   },
//   adhanCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     padding: 16,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     marginTop: 20,
//     borderWidth: 1,
//     borderColor: "#DCEBE2",
//   },
//   adhanIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     backgroundColor: "#E4F4EB",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   adhanTitle: {
//     fontSize: 14,
//     fontWeight: "800",
//     color: "#20352B",
//   },
//   adhanDescription: {
//     fontSize: 11,
//     color: "#74847B",
//     lineHeight: 16,
//     marginTop: 4,
//   },
//   footer: {
//     fontSize: 11,
//     lineHeight: 17,
//     color: "#84928A",
//     textAlign: "center",
//     marginTop: 18,
//   },
// });

// // import * as Notifications from "expo-notifications";
// // import { useState } from "react";
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   Platform,
// //   Pressable,
// //   StyleSheet,
// //   Text,
// //   View,
// // } from "react-native";

// // const SOUND = "vank_15sec.wav";
// // const CHANNEL_ID = "vank-sound-repeat-v9";
// // const REPEAT_DELAY_SEC = 20;

// // export default function TestNotificationButton() {
// //   const [busy, setBusy] = useState(false);

// //   async function ensurePermission(): Promise<boolean> {
// //     const current = await Notifications.getPermissionsAsync();

// //     if (current.granted) return true;

// //     const requested = await Notifications.requestPermissionsAsync();

// //     if (requested.granted) return true;

// //     Alert.alert(
// //       "Permission denied",
// //       "Enable notifications in your device settings and try again.",
// //     );

// //     return false;
// //   }

// //   async function ensureChannel(): Promise<void> {
// //     if (Platform.OS !== "android") return;

// //     await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
// //       name: "Vank Sound Repeat Test",
// //       importance: Notifications.AndroidImportance.MAX,
// //       sound: SOUND,
// //       vibrationPattern: [0, 250, 250, 250],
// //       enableVibrate: true,
// //     });
// //   }

// //   async function scheduleVankNotification(
// //     title: string,
// //     body: string,
// //     seconds: number,
// //     index: number,
// //   ): Promise<void> {
// //     await Notifications.scheduleNotificationAsync({
// //       content: {
// //         title,
// //         body,
// //         sound: SOUND,
// //         data: {
// //           test: true,
// //           sound: SOUND,
// //           index,
// //         },
// //       },
// //       trigger:
// //         Platform.OS === "android"
// //           ? {
// //               type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
// //               seconds,
// //               channelId: CHANNEL_ID,
// //             }
// //           : {
// //               type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
// //               seconds,
// //             },
// //     });
// //   }

// //   async function runSingleTest(): Promise<void> {
// //     if (busy) return;

// //     setBusy(true);

// //     try {
// //       if (!(await ensurePermission())) return;

// //       await ensureChannel();

// //       await scheduleVankNotification(
// //         "Vank sound test",
// //         "Testing your Vank recording.",
// //         15,
// //         1,
// //       );

// //       Alert.alert(
// //         "Scheduled",
// //         "The Vank notification should arrive in 5 seconds.",
// //       );
// //     } catch (error) {
// //       Alert.alert(
// //         "Notification failed",
// //         error instanceof Error ? error.message : String(error),
// //       );
// //     } finally {
// //       setBusy(false);
// //     }
// //   }

// //   async function runRepeatTest(): Promise<void> {
// //     if (busy) return;

// //     setBusy(true);

// //     try {
// //       if (!(await ensurePermission())) return;

// //       await ensureChannel();

// //       // Remove previous test notifications.
// //       await Notifications.cancelAllScheduledNotificationsAsync();

// //       // First Vank notification: after 5 seconds.
// //       await scheduleVankNotification(
// //         "Prayer Reminder — First Alert",
// //         "First Vank sound playback.",
// //         15,
// //         1,
// //       );

// //       // Second Vank notification: 20 seconds after the first.
// //       await scheduleVankNotification(
// //         "Prayer Reminder — Second Alert",
// //         "Second Vank sound playback.",
// //         15 + REPEAT_DELAY_SEC,
// //         2,
// //       );

// //       Alert.alert(
// //         "Two alerts scheduled",
// //         "The first alert arrives in 5 seconds. The second arrives 20 seconds later. Background the app to test.",
// //       );
// //     } catch (error) {
// //       Alert.alert(
// //         "Scheduling failed",
// //         error instanceof Error ? error.message : String(error),
// //       );
// //     } finally {
// //       setBusy(false);
// //     }
// //   }

// //   async function cancelAll(): Promise<void> {
// //     try {
// //       await Notifications.cancelAllScheduledNotificationsAsync();
// //       Alert.alert("Cancelled", "All scheduled notifications were cancelled.");
// //     } catch (error) {
// //       Alert.alert(
// //         "Cancel failed",
// //         error instanceof Error ? error.message : String(error),
// //       );
// //     }
// //   }

// //   return (
// //     <View style={styles.wrap}>
// //       <Text style={styles.title}>Vank Notification Sound Tester</Text>

// //       <Pressable
// //         style={[styles.btn, styles.primary, busy && styles.disabled]}
// //         onPress={runSingleTest}
// //         disabled={busy}
// //       >
// //         {busy ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.btnText}>Test One Vank Alert</Text>
// //         )}
// //       </Pressable>

// //       <Pressable
// //         style={[styles.btn, styles.secondary, busy && styles.disabled]}
// //         onPress={runRepeatTest}
// //         disabled={busy}
// //       >
// //         <Text style={styles.btnText}>Play Vank Alert Twice</Text>
// //       </Pressable>

// //       <Pressable style={[styles.btn, styles.ghost]} onPress={cancelAll}>
// //         <Text style={styles.ghostText}>Cancel All</Text>
// //       </Pressable>

// //       <Text style={styles.hint}>
// //         Background the app before testing. These are two separate notifications,
// //         not a guaranteed continuous audio loop. Check notification volume,
// //         silent mode, and notification sound settings.
// //       </Text>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   wrap: {
// //     padding: 16,
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: 18,
// //     borderWidth: 1,
// //     borderColor: "#E7EEEA",
// //     gap: 10,
// //     marginTop: 16,
// //   },
// //   title: {
// //     fontSize: 15,
// //     fontWeight: "800",
// //     color: "#20352B",
// //     marginBottom: 4,
// //   },
// //   btn: {
// //     paddingVertical: 14,
// //     borderRadius: 14,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   primary: {
// //     backgroundColor: "#087F5B",
// //   },
// //   secondary: {
// //     backgroundColor: "#0A9A6E",
// //   },
// //   ghost: {
// //     backgroundColor: "transparent",
// //     borderWidth: 1,
// //     borderColor: "#087F5B",
// //   },
// //   disabled: {
// //     opacity: 0.6,
// //   },
// //   btnText: {
// //     color: "#FFFFFF",
// //     fontWeight: "700",
// //     fontSize: 14,
// //   },
// //   ghostText: {
// //     color: "#087F5B",
// //     fontWeight: "700",
// //     fontSize: 14,
// //   },
// //   hint: {
// //     fontSize: 11,
// //     color: "#84928A",
// //     lineHeight: 16,
// //     marginTop: 4,
// //   },
// // });

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import * as Notifications from "expo-notifications";
import {
  Bell,
  BellOff,
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Moon,
  RefreshCw,
  Sun,
} from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBannerAd from "../../ads/HomeBannerAd";
import AppBar from "../../common/AppBar";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const API = "https://api.aladhan.com/v1";
const PRAYER_REMINDER_KEY = "@quthubiya_prayer_reminders_enabled";
const PRAYER_NOTIFICATION_SOURCE = "quthubiya-prayer-reminder";
const PRAYER_CHANNEL_ID = "prayer-times-v2";
const PRAYER_SOUND = "vank_15sec.wav";

const LOCATIONS: Record<string, string[]> = {
  Kerala: [
    "Malappuram",
    "Kozhikode",
    "Kochi",
    "Thiruvananthapuram",
    "Kannur",
    "Thrissur",
    "Palakkad",
    "Kollam",
    "Kottayam",
    "Alappuzha",
    "Manjeri",
    "Tirur",
  ],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Delhi: ["New Delhi"],
  "West Bengal": ["Kolkata", "Howrah"],
  Telangana: ["Hyderabad", "Warangal"],
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Punjab: ["Amritsar", "Ludhiana", "Chandigarh"],
  Haryana: ["Gurugram", "Faridabad", "Chandigarh"],
  Bihar: ["Patna", "Gaya"],
  Odisha: ["Bhubaneswar", "Cuttack"],
  Assam: ["Guwahati", "Silchar"],
  Jharkhand: ["Ranchi", "Jamshedpur"],
  Chhattisgarh: ["Raipur", "Bilaspur"],
  Goa: ["Panaji", "Margao"],
  "Himachal Pradesh": ["Shimla", "Dharamshala"],
  Uttarakhand: ["Dehradun", "Haridwar"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Arunachal Pradesh": ["Itanagar"],
  Manipur: ["Imphal"],
  Meghalaya: ["Shillong"],
  Mizoram: ["Aizawl"],
  Nagaland: ["Kohima", "Dimapur"],
  Sikkim: ["Gangtok"],
  Tripura: ["Agartala"],
};

const PRAYERS = [
  { key: "Fajr", label: "Fajr", arabic: "الفجر", icon: Moon },
  { key: "Dhuhr", label: "Dhuhr", arabic: "الظهر", icon: Sun },
  { key: "Asr", label: "Asr", arabic: "العصر", icon: Sun },
  { key: "Maghrib", label: "Maghrib", arabic: "المغرب", icon: Sun },
  { key: "Isha", label: "Isha", arabic: "العشاء", icon: Moon },
] as const;

type PrayerKey = (typeof PRAYERS)[number]["key"];

type Timings = Record<string, string> & {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
};

type PrayerApiResponse = {
  code: number;
  data: {
    timings: Timings;
    date: {
      readable: string;
      hijri: {
        date: string;
        month: { en: string };
        year: string;
      };
    };
    meta?: {
      method?: { name?: string };
      timezone?: string;
    };
  };
};

function apiDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

function cleanTime(value?: string) {
  return value?.match(/\d{1,2}:\d{2}/)?.[0] ?? "--:--";
}

function formatPrayerTime(value?: string) {
  const time = cleanTime(value);
  if (time === "--:--") return time;

  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;

  return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
}

function formatCountdown(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");
}

function prayerDateTime(date: Date, time: string) {
  const [hours, minutes] = cleanTime(time).split(":").map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

async function getPrayerData(
  date: Date,
  city: string,
): Promise<PrayerApiResponse> {
  const url =
    `${API}/timingsByCity/${apiDate(date)}` +
    `?city=${encodeURIComponent(city)}` +
    "&country=India&method=3&school=0";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load prayer times.");
  }

  const json = (await response.json()) as PrayerApiResponse;

  if (json.code !== 200 || !json.data?.timings) {
    throw new Error("The prayer time API returned invalid data.");
  }

  return json;
}

// Cancel only notifications belonging to this prayer reminder feature.
// The second condition also cleans up reminders created by the earlier version.
async function cancelPrayerNotifications() {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const prayerKeys: string[] = PRAYERS.map((prayer) => prayer.key);

  for (const notification of scheduled) {
    const data: any = notification.content.data;

    const isOurNotification =
      data?.source === PRAYER_NOTIFICATION_SOURCE ||
      (Boolean(data?.prayer) && prayerKeys.includes(String(data.prayer)));

    if (isOurNotification) {
      await Notifications.cancelScheduledNotificationAsync(
        notification.identifier,
      );
    }
  }
}

export default function PrayerScreen() {
  const [selectedState, setSelectedState] = useState("Kerala");
  const [selectedCity, setSelectedCity] = useState("Malappuram");
  const [pickerOpen, setPickerOpen] = useState(false);

  const [timings, setTimings] = useState<Timings | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [readableDate, setReadableDate] = useState("");
  const [timezone, setTimezone] = useState("");
  const [now, setNow] = useState(new Date());

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [adhanEnabled, setAdhanEnabled] = useState(false);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [reminderPreferenceLoaded, setReminderPreferenceLoaded] =
    useState(false);
  const [reminderBusy, setReminderBusy] = useState(false);

  const adhanPlayer = useAudioPlayer(
    require("../../../../../assets/audio/bank_mp.wav"),
  );

  const playedPrayers = useRef<Set<string>>(new Set());

  const fetchPrayerTimes = useCallback(async () => {
    try {
      const result = await getPrayerData(new Date(), selectedCity);

      setTimings(result.data.timings);
      setReadableDate(result.data.date.readable);
      setHijriDate(
        `${result.data.date.hijri.date} ${result.data.date.hijri.month.en} ${result.data.date.hijri.year}`,
      );
      setTimezone(result.data.meta?.timezone ?? "Local device time");
    } catch (error) {
      Alert.alert(
        "Prayer times unavailable",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    void fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  // Restore saved reminder preference when this screen mounts.
  useEffect(() => {
    let active = true;

    async function restoreReminderPreference() {
      try {
        const saved = await AsyncStorage.getItem(PRAYER_REMINDER_KEY);
        const scheduled =
          await Notifications.getAllScheduledNotificationsAsync();

        const prayerKeys: string[] = PRAYERS.map((prayer) => prayer.key);

        const prayerNotifications = scheduled.filter((notification) => {
          const data: any = notification.content.data;

          return (
            data?.source === PRAYER_NOTIFICATION_SOURCE ||
            (Boolean(data?.prayer) && prayerKeys.includes(String(data.prayer)))
          );
        });

        if (!active) return;

        const enabled = saved === "true" && prayerNotifications.length > 0;

        setAdhanEnabled(enabled);
        setScheduledCount(enabled ? prayerNotifications.length : 0);

        // If Android/iOS no longer has scheduled reminders, don't show
        // the toggle as enabled when it cannot deliver the reminders.
        if (saved === "true" && !enabled) {
          await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");
        }
      } catch (error) {
        console.error("Could not restore prayer reminders:", error);
      } finally {
        if (active) {
          setReminderPreferenceLoaded(true);
        }
      }
    }

    void restoreReminderPreference();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const nextPrayer = (() => {
    if (!timings) return null;

    for (const prayer of PRAYERS) {
      const at = prayerDateTime(now, timings[prayer.key]);

      if (at.getTime() > now.getTime()) {
        return { ...prayer, at };
      }
    }

    return null;
  })();

  const countdown = nextPrayer
    ? formatCountdown(nextPrayer.at.getTime() - now.getTime())
    : null;

  async function requestNotificationPermission(): Promise<boolean> {
    const existing = await Notifications.getPermissionsAsync();
    let status = existing.status;

    if (status !== "granted") {
      const requested = await Notifications.requestPermissionsAsync();
      status = requested.status;
    }

    if (status !== "granted") {
      Alert.alert(
        "Notifications disabled",
        "Allow notifications in your device settings to receive prayer reminders.",
      );
      return false;
    }

    return true;
  }

  async function schedulePrayerReminders() {
    if (reminderBusy) return;

    setReminderBusy(true);

    try {
      const permissionGranted = await requestNotificationPermission();

      if (!permissionGranted) {
        setAdhanEnabled(false);
        setScheduledCount(0);
        await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");
        return;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync(PRAYER_CHANNEL_ID, {
          name: "Prayer time reminders",
          importance: Notifications.AndroidImportance.MAX,
          sound: PRAYER_SOUND,
          vibrationPattern: [0, 250, 250, 250],
        });
      }

      await cancelPrayerNotifications();

      let count = 0;
      const today = new Date();

      // Schedule the next 30 days of prayer reminders.
      for (let offset = 0; offset < 30; offset++) {
        const date = new Date(today);
        date.setDate(today.getDate() + offset);

        const dayData = await getPrayerData(date, selectedCity);

        for (const prayer of PRAYERS) {
          const key = prayer.key;
          const when = prayerDateTime(date, dayData.data.timings[key]);

          if (when.getTime() <= Date.now() + 5000) continue;

          await Notifications.scheduleNotificationAsync({
            content: {
              title: `${key} prayer time`,
              body: `It is time for ${key} prayer in ${selectedCity}.`,
              sound: PRAYER_SOUND,
              data: {
                source: PRAYER_NOTIFICATION_SOURCE,
                prayer: key,
                city: selectedCity,
              },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: when,
              ...(Platform.OS === "android"
                ? { channelId: PRAYER_CHANNEL_ID }
                : {}),
            },
          });

          count++;
        }
      }

      if (count === 0) {
        throw new Error("No future prayer reminders could be scheduled.");
      }

      // Persist the preference only after scheduling succeeds.
      await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "true");

      setScheduledCount(count);
      setAdhanEnabled(true);

      Alert.alert(
        "Prayer reminders enabled",
        `${count} reminders scheduled for ${selectedCity} over the next 30 days.`,
      );
    } catch (error) {
      console.error("Scheduling prayer reminders failed:", error);

      setAdhanEnabled(false);
      setScheduledCount(0);

      await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");

      Alert.alert(
        "Could not schedule reminders",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setReminderBusy(false);
    }
  }

  async function disablePrayerReminders() {
    if (reminderBusy) return;

    setReminderBusy(true);

    try {
      await cancelPrayerNotifications();
      await AsyncStorage.setItem(PRAYER_REMINDER_KEY, "false");

      setAdhanEnabled(false);
      setScheduledCount(0);

      Alert.alert(
        "Reminders disabled",
        "Your scheduled prayer reminders have been cancelled.",
      );
    } catch (error) {
      console.error("Could not disable prayer reminders:", error);

      Alert.alert("Could not disable reminders", "Please try again.");
    } finally {
      setReminderBusy(false);
    }
  }

  function selectState(state: string) {
    setSelectedState(state);
    setSelectedCity(LOCATIONS[state][0]);
  }

  function selectCity(city: string) {
    setSelectedCity(city);
    setPickerOpen(false);
  }

  useEffect(() => {
    if (!timings || !adhanEnabled) return;

    const checkPrayerTime = () => {
      const current = new Date();
      const currentTime =
        `${String(current.getHours()).padStart(2, "0")}:` +
        `${String(current.getMinutes()).padStart(2, "0")}`;

      const dateKey =
        `${current.getFullYear()}-` +
        `${current.getMonth() + 1}-` +
        `${current.getDate()}`;

      for (const prayer of PRAYERS) {
        const prayerTime = cleanTime(timings[prayer.key]);
        const playbackKey = `${dateKey}-${prayer.key}`;

        if (
          currentTime === prayerTime &&
          !playedPrayers.current.has(playbackKey)
        ) {
          playedPrayers.current.add(playbackKey);

          void (async () => {
            try {
              await adhanPlayer.seekTo(0);
              adhanPlayer.play();
            } catch (error) {
              console.error("Could not play Adhan:", error);
            }
          })();

          break;
        }
      }
    };

    checkPrayerTime();

    const timer = setInterval(checkPrayerTime, 1000);

    return () => clearInterval(timer);
  }, [timings, adhanEnabled, adhanPlayer]);

  if (loading && !timings) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#087F5B" />
        <Text style={styles.loadingText}>Loading prayer times...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <AppBar title="Prayer" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              void fetchPrayerTimes();
            }}
            tintColor="#087F5B"
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>QUTHUBIYA MANZIL</Text>
            <Text style={styles.title}>Prayer Times</Text>
          </View>
          <View style={styles.headerIcon}>
            <Moon size={24} color="#087F5B" />
          </View>
        </View>

        <Pressable
          style={styles.locationButton}
          onPress={() => setPickerOpen(!pickerOpen)}
        >
          <MapPin size={19} color="#087F5B" />
          <View style={styles.locationText}>
            <Text style={styles.city}>{selectedCity}, India</Text>
            <Text style={styles.state}>{selectedState}</Text>
          </View>
          <ChevronDown size={20} color="#52635D" />
        </Pressable>

        {pickerOpen && (
          <View style={styles.picker}>
            <Text style={styles.sectionTitle}>Select state</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chips}
              showsVerticalScrollIndicator={false}
            >
              {Object.keys(LOCATIONS).map((state) => (
                <Pressable
                  key={state}
                  onPress={() => selectState(state)}
                  style={[
                    styles.chip,
                    selectedState === state && styles.chipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedState === state && styles.chipTextSelected,
                    ]}
                  >
                    {state}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
              Select city
            </Text>

            <View style={styles.cityGrid}>
              {LOCATIONS[selectedState].map((city) => (
                <Pressable
                  key={city}
                  onPress={() => selectCity(city)}
                  style={[
                    styles.cityChip,
                    selectedCity === city && styles.cityChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedCity === city && styles.chipTextSelected,
                    ]}
                  >
                    {city}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View style={styles.dateCard}>
          <View style={styles.dateIcon}>
            <CalendarDays size={20} color="#087F5B" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dateText}>{readableDate || apiDate(now)}</Text>
            <Text style={styles.hijriText}>{hijriDate || "Hijri date"}</Text>
          </View>
          <Pressable onPress={() => void fetchPrayerTimes()} hitSlop={12}>
            <RefreshCw size={19} color="#087F5B" />
          </Pressable>
        </View>

        <View style={styles.nextCard}>
          <View style={styles.nextTop}>
            <View>
              <Text style={styles.nextLabel}>
                {nextPrayer ? "UP NEXT" : "DAILY PRAYERS"}
              </Text>
              <Text style={styles.nextName}>
                {nextPrayer?.label ?? "All prayers completed"}
              </Text>
              {nextPrayer && (
                <Text style={styles.arabic}>{nextPrayer.arabic}</Text>
              )}
            </View>
            <View style={styles.nextIcon}>
              <Clock size={27} color="#FFFFFF" />
            </View>
          </View>

          {nextPrayer && countdown && (
            <View style={styles.countdownBox}>
              <Text style={styles.countdownLabel}>Time remaining</Text>
              <Text style={styles.countdown}>{countdown}</Text>
            </View>
          )}

          {!nextPrayer && (
            <Text style={styles.nextHint}>
              The next Fajr time is on the following day.
            </Text>
          )}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's prayers</Text>
          <Text style={styles.timezone}>{timezone}</Text>
        </View>

        <View style={styles.prayerList}>
          {PRAYERS.map((prayer) => {
            const Icon = prayer.icon;
            const prayerTime = timings?.[prayer.key];
            const isNext = nextPrayer?.key === prayer.key;

            return (
              <View
                key={prayer.key}
                style={[styles.prayerRow, isNext && styles.prayerRowActive]}
              >
                <View
                  style={[styles.prayerIcon, isNext && styles.prayerIconActive]}
                >
                  <Icon size={20} color={isNext ? "#FFFFFF" : "#087F5B"} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.prayerName}>{prayer.label}</Text>
                  <Text style={styles.prayerArabic}>{prayer.arabic}</Text>
                </View>

                <Text style={[styles.prayerTime, isNext && styles.activeTime]}>
                  {formatPrayerTime(prayerTime)}
                </Text>

                {isNext && <View style={styles.activeDot} />}
              </View>
            );
          })}

          <View style={styles.sunriseRow}>
            <Sun size={19} color="#C18A28" />
            <Text style={styles.sunriseLabel}>Sunrise</Text>
            <Text style={styles.sunriseTime}>
              {formatPrayerTime(timings?.Sunrise)}
            </Text>
          </View>
        </View>

        <View style={styles.adhanCard}>
          <View style={styles.adhanIcon}>
            {adhanEnabled ? (
              <Bell size={23} color="#087F5B" />
            ) : (
              <BellOff size={23} color="#087F5B" />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.adhanTitle}>Prayer reminders</Text>
            <Text style={styles.adhanDescription}>
              {adhanEnabled
                ? `${scheduledCount} reminders scheduled for ${selectedCity}`
                : "Get notified when each prayer time begins."}
            </Text>
          </View>

          <Switch
            value={adhanEnabled}
            disabled={!reminderPreferenceLoaded || reminderBusy}
            onValueChange={(enabled) => {
              if (enabled) {
                void schedulePrayerReminders();
              } else {
                void disablePrayerReminders();
              }
            }}
            trackColor={{ false: "#D5DDD9", true: "#8ED5B7" }}
            thumbColor={adhanEnabled ? "#087F5B" : "#F4F4F4"}
          />
        </View>

        <Text style={styles.footer}>
          Prayer times are calculated using AlAdhan (method 3). Local mosque
          timetables may differ. Confirm the times with your local mosque.
        </Text>
      </ScrollView>
      <HomeBannerAd />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F8F6",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  loading: {
    flex: 1,
    backgroundColor: "#F5F8F6",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    color: "#53665D",
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#087F5B",
    fontWeight: "800",
    marginBottom: 6,
  },
  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#172C24",
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#E0F2E9",
    alignItems: "center",
    justifyContent: "center",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 17,
    gap: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E7EEEA",
  },
  locationText: {
    flex: 1,
  },
  city: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1C3128",
  },
  state: {
    fontSize: 12,
    color: "#718078",
    marginTop: 3,
  },
  picker: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E7EEEA",
  },
  chips: {
    gap: 8,
    paddingTop: 10,
    paddingBottom: 2,
  },
  chip: {
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: "#F0F4F1",
  },
  chipSelected: {
    backgroundColor: "#087F5B",
  },
  chipText: {
    color: "#53665D",
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
  cityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  cityChip: {
    borderRadius: 22,
    paddingHorizontal: 13,
    paddingVertical: 10,
    backgroundColor: "#F0F4F1",
  },
  cityChipSelected: {
    backgroundColor: "#087F5B",
  },
  dateCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E7EEEA",
  },
  dateIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#E4F4EB",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: "#20352B",
    fontSize: 14,
    fontWeight: "700",
  },
  hijriText: {
    color: "#74847B",
    fontSize: 12,
    marginTop: 5,
  },
  nextCard: {
    backgroundColor: "#087F5B",
    borderRadius: 23,
    padding: 21,
    marginBottom: 25,
  },
  nextTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nextLabel: {
    color: "#BDE7D4",
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: "800",
  },
  nextName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 7,
  },
  arabic: {
    color: "#D5F2E3",
    fontSize: 18,
    marginTop: 5,
  },
  nextIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#23966F",
    alignItems: "center",
    justifyContent: "center",
  },
  countdownBox: {
    borderTopWidth: 1,
    borderTopColor: "#3BA17E",
    marginTop: 20,
    paddingTop: 16,
  },
  countdownLabel: {
    color: "#C8E9DA",
    fontSize: 12,
  },
  countdown: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 5,
    fontVariant: ["tabular-nums"],
  },
  nextHint: {
    color: "#E2F3EA",
    fontSize: 13,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#21362C",
    fontSize: 16,
    fontWeight: "800",
  },
  timezone: {
    color: "#84928A",
    fontSize: 10,
    maxWidth: "48%",
  },
  prayerList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E7EEEA",
  },
  prayerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F3F1",
    gap: 12,
  },
  prayerRowActive: {
    backgroundColor: "#F0FAF5",
    marginHorizontal: -14,
    paddingHorizontal: 14,
    borderRadius: 13,
  },
  prayerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E7F5ED",
    alignItems: "center",
    justifyContent: "center",
  },
  prayerIconActive: {
    backgroundColor: "#087F5B",
  },
  prayerName: {
    color: "#20352B",
    fontSize: 15,
    fontWeight: "700",
  },
  prayerArabic: {
    color: "#84928A",
    fontSize: 12,
    marginTop: 3,
  },
  prayerTime: {
    color: "#20352B",
    fontSize: 17,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  activeTime: {
    color: "#087F5B",
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#087F5B",
    marginLeft: 1,
  },
  sunriseRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    gap: 12,
  },
  sunriseLabel: {
    flex: 1,
    fontSize: 14,
    color: "#53665D",
    fontWeight: "600",
  },
  sunriseTime: {
    fontSize: 16,
    color: "#A8751B",
    fontWeight: "800",
  },
  adhanCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#DCEBE2",
  },
  adhanIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#E4F4EB",
    alignItems: "center",
    justifyContent: "center",
  },
  adhanTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#20352B",
  },
  adhanDescription: {
    fontSize: 11,
    color: "#74847B",
    lineHeight: 16,
    marginTop: 4,
  },
  footer: {
    fontSize: 11,
    lineHeight: 17,
    color: "#84928A",
    textAlign: "center",
    marginTop: 18,
  },
});
