import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../common/AppBar";

const API_BASE = "https://api.aladhan.com/v1";

const GREEN = "#14532D";
const DARK_GREEN = "#0B3824";
const LIGHT_GREEN = "#E8F3E9";
const GOLD = "#D4AF37";
const BACKGROUND = "#F7F8F2";
const TEXT = "#183326";
const MUTED = "#738176";

const GREGORIAN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type ApiDay = {
  gregorian?: {
    date?: string;
    day?: string;
    month?: { number?: number; en?: string };
    year?: string;
  };
  hijri?: {
    date?: string;
    day?: string;
    year?: string;
    month?: {
      number?: number;
      en?: string;
      ar?: string;
    };
  };
  // Some API responses may wrap the date information.
  date?: {
    gregorian?: {
      date?: string;
      day?: string;
      month?: { number?: number; en?: string };
      year?: string;
    };
    hijri?: {
      date?: string;
      day?: string;
      year?: string;
      month?: {
        number?: number;
        en?: string;
        ar?: string;
      };
    };
  };
};

type HijriDate = {
  day: number;
  month: number;
  year: number;
  monthName: string;
  arabicMonthName: string;
};

type CalendarDay = {
  date: Date;
  hijri: HijriDate | null;
  festivals: Festival[];
};

type Festival = {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  hijriMonth: number;
  hijriDay: number;
};

type YearFestival = {
  date: Date;
  hijri: HijriDate;
  festival: Festival;
};

const FESTIVALS: Festival[] = [
  {
    id: "islamic-new-year",
    name: "Islamic New Year",
    arabicName: "رأس السنة الهجرية",
    description: "Beginning of the new Hijri year.",
    hijriMonth: 1,
    hijriDay: 1,
  },
  {
    id: "ashura",
    name: "Day of Ashura",
    arabicName: "عاشوراء",
    description: "The tenth day of Muharram.",
    hijriMonth: 1,
    hijriDay: 10,
  },
  {
    id: "mawlid",
    name: "Mawlid an-Nabi",
    arabicName: "المولد النبوي",
    description: "The traditionally observed birthday of Prophet Muhammad ﷺ.",
    hijriMonth: 3,
    hijriDay: 12,
  },
  {
    id: "isra-miraj",
    name: "Isra and Mi'raj",
    arabicName: "الإسراء والمعراج",
    description: "Traditionally observed on the 27th of Rajab.",
    hijriMonth: 7,
    hijriDay: 27,
  },
  {
    id: "mid-shaban",
    name: "Mid-Sha'ban",
    arabicName: "ليلة النصف من شعبان",
    description: "The middle night of Sha'ban.",
    hijriMonth: 8,
    hijriDay: 15,
  },
  {
    id: "ramadan",
    name: "First Day of Ramadan",
    arabicName: "رمضان",
    description: "Expected beginning of the fasting month.",
    hijriMonth: 9,
    hijriDay: 1,
  },
  {
    id: "laylat-al-qadr",
    name: "27th Night of Ramadan",
    arabicName: "ليلة القدر",
    description:
      "The 27th night is widely observed as Laylat al-Qadr; its exact night is not universally fixed.",
    hijriMonth: 9,
    hijriDay: 27,
  },
  {
    id: "eid-fitr",
    name: "Eid al-Fitr",
    arabicName: "عيد الفطر",
    description: "Festival marking the end of Ramadan.",
    hijriMonth: 10,
    hijriDay: 1,
  },
  {
    id: "arafah",
    name: "Day of Arafah",
    arabicName: "يوم عرفة",
    description: "The ninth day of Dhul Hijjah.",
    hijriMonth: 12,
    hijriDay: 9,
  },
  {
    id: "eid-adha",
    name: "Eid al-Adha",
    arabicName: "عيد الأضحى",
    description: "The Festival of Sacrifice.",
    hijriMonth: 12,
    hijriDay: 10,
  },
];

function getHijriData(item: ApiDay) {
  return {
    gregorian: item.gregorian ?? item.date?.gregorian,
    hijri: item.hijri ?? item.date?.hijri,
  };
}

function parseGregorianDate(value?: string): Date | null {
  if (!value) return null;

  const parts = value.split("-").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return null;
  }

  // AlAdhan calendar dates are normally DD-MM-YYYY.
  const [day, month, year] = parts;

  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const result = new Date(year, month - 1, day);

  if (
    result.getFullYear() !== year ||
    result.getMonth() !== month - 1 ||
    result.getDate() !== day
  ) {
    return null;
  }

  result.setHours(0, 0, 0, 0);
  return result;
}

function parseHijri(item: ApiDay): HijriDate | null {
  const { hijri } = getHijriData(item);

  if (!hijri) return null;

  const day = Number(hijri.day ?? hijri.date?.split("-")[0]);
  const month = Number(hijri.month?.number);
  const year = Number(hijri.year);

  if (
    !Number.isFinite(day) ||
    !Number.isFinite(month) ||
    !Number.isFinite(year) ||
    day < 1 ||
    month < 1 ||
    month > 12 ||
    year < 1
  ) {
    return null;
  }

  return {
    day,
    month,
    year,
    monthName: hijri.month?.en ?? "Hijri month",
    arabicMonthName: hijri.month?.ar ?? "",
  };
}

function getFestivalsForHijri(hijri: HijriDate | null): Festival[] {
  if (!hijri) return [];

  return FESTIVALS.filter(
    (festival) =>
      festival.hijriMonth === hijri.month && festival.hijriDay === hijri.day,
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function fetchCalendarMonth(
  month: number,
  year: number,
): Promise<ApiDay[]> {
  const response = await fetch(`${API_BASE}/gToHCalendar/${month}/${year}`);

  if (!response.ok) {
    throw new Error(`Unable to load calendar for ${month}/${year}.`);
  }

  const json = await response.json();

  if (json.code !== 200 || !Array.isArray(json.data)) {
    throw new Error("The calendar service returned invalid data.");
  }

  return json.data as ApiDay[];
}

export default function CalendarScreen() {
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [yearFestivals, setYearFestivals] = useState<YearFestival[]>([]);
  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const [loadingFestivals, setLoadingFestivals] = useState(true);
  const [calendarError, setCalendarError] = useState("");
  const [festivalError, setFestivalError] = useState("");

  const selectedYear = visibleMonth.getFullYear();
  const selectedMonth = visibleMonth.getMonth();

  const loadCalendar = useCallback(async () => {
    setLoadingCalendar(true);
    setCalendarError("");

    try {
      const apiDays = await fetchCalendarMonth(selectedMonth + 1, selectedYear);

      const parsedDays: CalendarDay[] = apiDays
        .map((item) => {
          const { gregorian } = getHijriData(item);
          const date = parseGregorianDate(gregorian?.date);
          const hijri = parseHijri(item);

          if (!date) return null;

          return {
            date,
            hijri,
            festivals: getFestivalsForHijri(hijri),
          };
        })
        .filter((day): day is CalendarDay => day !== null);

      if (parsedDays.length === 0) {
        throw new Error("No calendar dates were returned.");
      }

      setCalendarDays(parsedDays);
    } catch (error) {
      setCalendarDays([]);
      setCalendarError(
        error instanceof Error
          ? error.message
          : "Could not load the calendar. Please try again.",
      );
    } finally {
      setLoadingCalendar(false);
    }
  }, [selectedMonth, selectedYear]);

  const loadYearFestivals = useCallback(async () => {
    setLoadingFestivals(true);
    setFestivalError("");

    try {
      // Fetch every Gregorian month in the selected year.
      const monthResults = await Promise.all(
        Array.from({ length: 12 }, (_, index) =>
          fetchCalendarMonth(index + 1, selectedYear),
        ),
      );

      const foundFestivals: YearFestival[] = [];

      monthResults.forEach((monthDays) => {
        monthDays.forEach((item) => {
          const { gregorian } = getHijriData(item);
          const date = parseGregorianDate(gregorian?.date);
          const hijri = parseHijri(item);

          if (!date || !hijri) return;
          if (date.getFullYear() !== selectedYear) return;

          const matchingFestivals = getFestivalsForHijri(hijri);

          matchingFestivals.forEach((festival) => {
            foundFestivals.push({
              date,
              hijri,
              festival,
            });
          });
        });
      });

      foundFestivals.sort((a, b) => a.date.getTime() - b.date.getTime());

      setYearFestivals(foundFestivals);
    } catch (error) {
      setYearFestivals([]);
      setFestivalError(
        error instanceof Error
          ? error.message
          : "Could not load the yearly festival list.",
      );
    } finally {
      setLoadingFestivals(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    loadCalendar();
  }, [loadCalendar]);

  useEffect(() => {
    loadYearFestivals();
  }, [loadYearFestivals]);

  const calendarGrid = useMemo(() => {
    const firstDayOfWeek = new Date(selectedYear, selectedMonth, 1).getDay();

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

    const grid: (CalendarDay | null)[] = Array(firstDayOfWeek).fill(null);

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
      const foundDay = calendarDays.find(
        (item) => item.date.getDate() === dayNumber,
      );

      grid.push(
        foundDay ?? {
          date: new Date(selectedYear, selectedMonth, dayNumber),
          hijri: null,
          festivals: [],
        },
      );
    }

    // Complete the final week for a consistent calendar layout.
    while (grid.length % 7 !== 0) {
      grid.push(null);
    }

    return grid;
  }, [calendarDays, selectedMonth, selectedYear]);

  const changeMonth = (amount: number) => {
    setVisibleMonth(new Date(selectedYear, selectedMonth + amount, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <AppBar title="Calendar" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Islamic Calendar</Text>
          <Text style={styles.headerSubtitle}>
            Your guide to Hijri dates and Islamic occasions
          </Text>
        </View>

        {/* Month selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity
            accessibilityLabel="Previous month"
            onPress={() => changeMonth(-1)}
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.monthTitleContainer}>
            <Text style={styles.monthTitle}>
              {GREGORIAN_MONTHS[selectedMonth]}
            </Text>
            <Text style={styles.monthYear}>{selectedYear}</Text>
          </View>

          <TouchableOpacity
            accessibilityLabel="Next month"
            onPress={() => changeMonth(1)}
            style={styles.arrowButton}
          >
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={goToToday} style={styles.todayButton}>
          <Text style={styles.todayButtonText}>Go to current month</Text>
        </TouchableOpacity>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.weekHeader}>
            {WEEKDAYS.map((weekday) => (
              <View key={weekday} style={styles.weekdayCell}>
                <Text style={styles.weekdayText}>{weekday}</Text>
              </View>
            ))}
          </View>

          {loadingCalendar ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={GREEN} />
              <Text style={styles.loadingText}>Loading Hijri calendar...</Text>
            </View>
          ) : calendarError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{calendarError}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={loadCalendar}
              >
                <Text style={styles.retryButtonText}>Try again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.calendarGrid}>
              {calendarGrid.map((day, index) => {
                if (!day) {
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                }

                const isToday = getDateKey(day.date) === getDateKey(new Date());

                const hasFestival = day.festivals.length > 0;

                return (
                  <View key={getDateKey(day.date)} style={styles.dayCell}>
                    <View
                      style={[
                        styles.dayCircle,
                        isToday && styles.todayCircle,
                        hasFestival && styles.festivalCircle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.gregorianDay,
                          isToday && styles.todayDayText,
                          hasFestival && styles.festivalDayText,
                        ]}
                      >
                        {day.date.getDate()}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.hijriDay,
                        hasFestival && styles.hijriFestivalText,
                      ]}
                    >
                      {day.hijri?.day ?? "—"}
                    </Text>

                    {hasFestival && <View style={styles.festivalDot} />}
                  </View>
                );
              })}
            </View>
          )}

          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={styles.todayLegendDot} />
              <Text style={styles.legendText}>Today</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={styles.festivalLegendDot} />
              <Text style={styles.legendText}>Islamic occasion</Text>
            </View>
          </View>
        </View>

        {/* Selected month Hijri information */}
        {!loadingCalendar && !calendarError && calendarDays.length > 0 && (
          <View style={styles.hijriSummary}>
            <Text style={styles.hijriSummaryTitle}>
              Hijri Calendar Information
            </Text>

            <Text style={styles.hijriSummaryText}>
              Dates are converted using the AlAdhan calendar service. Local moon
              sightings may cause differences of one day or more.
            </Text>
          </View>
        )}

        {/* Yearly festival list */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeadingGroup}>
            <Text style={styles.sectionTitle}>Islamic Festivals</Text>
            <Text style={styles.sectionSubtitle}>
              All listed occasions in {selectedYear}
            </Text>
          </View>

          <View style={styles.yearBadge}>
            <Text style={styles.yearBadgeText}>{selectedYear}</Text>
          </View>
        </View>

        {loadingFestivals ? (
          <View style={styles.festivalLoading}>
            <ActivityIndicator size="small" color={GREEN} />
            <Text style={styles.loadingText}>
              Loading festivals for {selectedYear}...
            </Text>
          </View>
        ) : festivalError ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{festivalError}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadYearFestivals}
            >
              <Text style={styles.retryButtonText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : yearFestivals.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No festival dates available</Text>
            <Text style={styles.emptyText}>
              The calendar service did not return festival dates for this year.
              Please try again later.
            </Text>
          </View>
        ) : (
          <View style={styles.festivalList}>
            {yearFestivals.map((item, index) => (
              <View
                key={`${item.festival.id}-${getDateKey(item.date)}`}
                style={styles.festivalCard}
              >
                <View style={styles.festivalDateBox}>
                  <Text style={styles.festivalDateDay}>
                    {item.date.getDate()}
                  </Text>
                  <Text style={styles.festivalDateMonth}>
                    {item.date.toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </Text>
                </View>

                <View style={styles.festivalDetails}>
                  <Text style={styles.festivalName}>{item.festival.name}</Text>

                  <Text style={styles.festivalArabic}>
                    {item.festival.arabicName}
                  </Text>

                  <Text style={styles.festivalDescription}>
                    {item.festival.description}
                  </Text>

                  <Text style={styles.festivalHijri}>
                    {item.hijri.day} {item.hijri.monthName} {item.hijri.year} AH
                  </Text>
                </View>

                <View style={styles.festivalNumber}>
                  <Text style={styles.festivalNumberText}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Please note</Text>
          <Text style={styles.disclaimerText}>
            Festival dates are calendar estimates. In Kerala, actual observance
            dates may differ according to local moon sighting and religious
            announcements. The 27th night of Ramadan is a commonly observed
            night for Laylat al-Qadr; its exact date is not certain.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Quthubiya Manzil</Text>
          <Text style={styles.footerSubtext}>
            May Allah bless your days with barakah
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 22,
  },
  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: GOLD,
  },
  headerIconText: {
    fontSize: 29,
    color: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: DARK_GREEN,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GREEN,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  arrowButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.13)",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 32,
    color: "#FFFFFF",
    lineHeight: 36,
  },
  monthTitleContainer: {
    alignItems: "center",
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  monthYear: {
    fontSize: 13,
    color: "#D8E7D9",
    marginTop: 3,
  },
  todayButton: {
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C5D9C6",
    backgroundColor: "#FFFFFF",
  },
  todayButtonText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: "700",
  },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingTop: 15,
    paddingBottom: 14,
    borderWidth: 1,
    borderColor: "#E8EDE4",
    elevation: 2,
    shadowColor: "#183326",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  weekHeader: {
    flexDirection: "row",
    marginBottom: 9,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  weekdayText: {
    color: MUTED,
    fontSize: 11,
    fontWeight: "700",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    minHeight: 64,
    alignItems: "center",
    paddingTop: 4,
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  gregorianDay: {
    fontSize: 14,
    color: TEXT,
    fontWeight: "600",
  },
  todayCircle: {
    backgroundColor: GREEN,
  },
  todayDayText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  festivalCircle: {
    borderWidth: 1.5,
    borderColor: GOLD,
  },
  festivalDayText: {
    color: DARK_GREEN,
    fontWeight: "800",
  },
  hijriDay: {
    marginTop: 2,
    fontSize: 10,
    color: MUTED,
  },
  hijriFestivalText: {
    color: GREEN,
    fontWeight: "800",
  },
  festivalDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: GOLD,
    marginTop: 2,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    paddingTop: 12,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#EDF0E9",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  todayLegendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GREEN,
  },
  festivalLegendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GOLD,
  },
  legendText: {
    fontSize: 11,
    color: MUTED,
  },
  loadingContainer: {
    minHeight: 250,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 12,
    color: MUTED,
    textAlign: "center",
  },
  errorContainer: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 12,
  },
  errorText: {
    fontSize: 13,
    color: "#A43E32",
    textAlign: "center",
    lineHeight: 19,
  },
  retryButton: {
    backgroundColor: GREEN,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: "center",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  hijriSummary: {
    backgroundColor: LIGHT_GREEN,
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
    borderLeftWidth: 3,
    borderLeftColor: GREEN,
  },
  hijriSummaryTitle: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 5,
  },
  hijriSummaryText: {
    color: "#506858",
    fontSize: 12,
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 27,
    marginBottom: 14,
  },
  sectionHeadingGroup: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: DARK_GREEN,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 4,
  },
  yearBadge: {
    backgroundColor: LIGHT_GREEN,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CFE0CD",
  },
  yearBadgeText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: "800",
  },
  festivalLoading: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 22,
    alignItems: "center",
    gap: 10,
  },
  festivalList: {
    gap: 11,
  },
  festivalCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E7EDE4",
    gap: 11,
  },
  festivalDateBox: {
    width: 54,
    minHeight: 59,
    borderRadius: 12,
    backgroundColor: LIGHT_GREEN,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D4E3D1",
  },
  festivalDateDay: {
    fontSize: 21,
    color: GREEN,
    fontWeight: "800",
  },
  festivalDateMonth: {
    fontSize: 11,
    color: GREEN,
    fontWeight: "700",
    marginTop: 1,
  },
  festivalDetails: {
    flex: 1,
    paddingTop: 2,
  },
  festivalName: {
    fontSize: 14,
    color: DARK_GREEN,
    fontWeight: "800",
    lineHeight: 20,
  },
  festivalArabic: {
    fontSize: 14,
    color: GREEN,
    marginTop: 3,
  },
  festivalDescription: {
    fontSize: 11,
    color: MUTED,
    lineHeight: 16,
    marginTop: 5,
  },
  festivalHijri: {
    fontSize: 10,
    color: GREEN,
    fontWeight: "700",
    marginTop: 7,
  },
  festivalNumber: {
    paddingTop: 4,
  },
  festivalNumberText: {
    color: "#B5C1B4",
    fontSize: 10,
    fontWeight: "800",
  },
  errorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: "#F0D7D3",
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E7EDE4",
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: DARK_GREEN,
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    color: MUTED,
    marginTop: 6,
  },
  disclaimer: {
    backgroundColor: "#FFF9E8",
    borderWidth: 1,
    borderColor: "#F0E2B5",
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
  },
  disclaimerTitle: {
    color: "#795E15",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },
  disclaimerText: {
    color: "#776B4C",
    fontSize: 11,
    lineHeight: 17,
  },
  footer: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 10,
  },
  footerText: {
    color: GREEN,
    fontSize: 13,
    fontWeight: "800",
  },
  footerSubtext: {
    color: MUTED,
    fontSize: 11,
    marginTop: 5,
  },
});
