
import React, { useCallback, useEffect, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../common/AppBar";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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

const API = "https://api.aladhan.com/v1";

function apiDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}-${month}-${date.getFullYear()}`;
}

function timeToMinutes(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})/);
  if (!match) return 0;
  return Number(match[1]) * 60 + Number(match[2]);
}

function cleanTime(value?: string) {
  return value?.match(/\d{1,2}:\d{2}/)?.[0] ?? "--:--";
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
  city: string
): Promise<PrayerApiResponse> {
  const url =
    `${API}/timingsByCity/${apiDate(date)}` +
    `?city=${encodeURIComponent(city)}` +
    `&country=India&method=3&school=0`;

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

  const fetchPrayerTimes = useCallback(async () => {
    try {
      const result = await getPrayerData(new Date(), selectedCity);
      setTimings(result.data.timings);
      setReadableDate(result.data.date.readable);
      setHijriDate(
        `${result.data.date.hijri.date} ${result.data.date.hijri.month.en} ${result.data.date.hijri.year}`
      );
      setTimezone(result.data.meta?.timezone ?? "Local device time");
    } catch (error) {
      Alert.alert(
        "Prayer times unavailable",
        error instanceof Error ? error.message : "Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCity]);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

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

  async function requestNotificationPermission() {
    const existing = await Notifications.getPermissionsAsync();
    let status = existing.status;

    if (status !== "granted") {
      const requested = await Notifications.requestPermissionsAsync();
      status = requested.status;
    }

    if (status !== "granted") {
      Alert.alert(
        "Notifications disabled",
        "Allow notifications in your device settings to receive prayer reminders."
      );
      return false;
    }

    return true;
  }

  async function schedulePrayerReminders() {
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
      setAdhanEnabled(false);
      return;
    }

    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("prayer-times", {
          name: "Prayer time reminders",
          importance: Notifications.AndroidImportance.MAX,
          sound: "vank.mp3",
          vibrationPattern: [0, 250, 250, 250],
        });
      }

      // Remove previously scheduled prayer reminders before rebuilding them.
      await Notifications.cancelAllScheduledNotificationsAsync();

      let count = 0;
      const today = new Date();
      const prayerKeys: PrayerKey[] = [
        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha",
      ];

      // Schedule the next seven days for the currently selected city.
      for (let offset = 0; offset < 7; offset++) {
        const date = new Date(today);
        date.setDate(today.getDate() + offset);

        let dayData: PrayerApiResponse;

        if (offset === 0 && timings) {
          dayData = await getPrayerData(date, selectedCity);
        } else {
          dayData = await getPrayerData(date, selectedCity);
        }

        for (const key of prayerKeys) {
          const when = prayerDateTime(date, dayData.data.timings[key]);

          // Do not schedule a prayer time that has already passed.
          if (when.getTime() <= Date.now() + 5000) continue;

          await Notifications.scheduleNotificationAsync({
            content: {
              title: `${key} prayer time`,
              body: `It is time for ${key} prayer in ${selectedCity}.`,
              sound: "vank.mp3",
              ...(Platform.OS === "android"
                ? { channelId: "prayer-times" }
                : {}),
              data: { prayer: key, city: selectedCity },
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: when,
            },
          });

          count++;
        }
      }

      setScheduledCount(count);
      setAdhanEnabled(true);

      Alert.alert(
        "Prayer reminders enabled",
        `${count} prayer reminders scheduled for ${selectedCity} over the next seven days.`
      );
    } catch (error) {
      setAdhanEnabled(false);
      Alert.alert(
        "Could not schedule reminders",
        error instanceof Error ? error.message : "Please try again."
      );
    }
  }

  async function disablePrayerReminders() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    setAdhanEnabled(false);
    setScheduledCount(0);
    Alert.alert("Reminders disabled", "Scheduled reminders were cancelled.");
  }

  function selectState(state: string) {
    setSelectedState(state);
    setSelectedCity(LOCATIONS[state][0]);
  }

  function selectCity(city: string) {
    setSelectedCity(city);
    setPickerOpen(false);
  }

  if (loading && !timings) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#087F5B" />
        <Text style={styles.loadingText}>Loading prayer times...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView    style={styles.screen}>
        <AppBar title="Vank" />
    <ScrollView
   
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchPrayerTimes();
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
        <Pressable onPress={fetchPrayerTimes} hitSlop={12}>
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
                style={[
                  styles.prayerIcon,
                  isNext && styles.prayerIconActive,
                ]}
              >
                <Icon size={20} color={isNext ? "#FFFFFF" : "#087F5B"} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.prayerName}>{prayer.label}</Text>
                <Text style={styles.prayerArabic}>{prayer.arabic}</Text>
              </View>
              <Text style={[styles.prayerTime, isNext && styles.activeTime]}>
                {cleanTime(prayerTime)}
              </Text>
              {isNext && <View style={styles.activeDot} />}
            </View>
          );
        })}

        <View style={styles.sunriseRow}>
          <Sun size={19} color="#C18A28" />
          <Text style={styles.sunriseLabel}>Sunrise</Text>
          <Text style={styles.sunriseTime}>
            {cleanTime(timings?.Sunrise)}
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
          onValueChange={(enabled) => {
            if (enabled) {
              schedulePrayerReminders();
            } else {
              disablePrayerReminders();
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
    fontSize: 27,
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
