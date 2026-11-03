import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { HCalendar } from "react-native-hijiri-calendar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../common/AppBar";

type SelectedDate = {
  hijri: string;
  gregorian: string;
  events: string[];
};

const HIJRI_MONTHS = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Ula",
  "Jumada al-Akhirah",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

// Commonly observed Islamic dates.
// Some observances differ between Muslim communities.
const ISLAMIC_EVENTS: Record<string, string[]> = {
  "1/1": ["Islamic New Year"],
  "10/1": ["Day of Ashura"],
  "12/3": ["Mawlid an-Nabi (commonly observed)"],
  "27/7": ["Isra and Mi'raj (commonly observed)"],
  "15/8": ["Mid-Sha'ban (where observed)"],
  "1/10": ["Eid al-Fitr"],
  "9/12": ["Day of Arafah"],
  "10/12": ["Eid al-Adha"],
};

function getIslamicEvents(day: number, month: number): string[] {
  const events = [...(ISLAMIC_EVENTS[`${day}/${month}`] ?? [])];

  if (month === 9) {
    if (day === 1) {
      events.push("Beginning of Ramadan");
    } else {
      events.push("Ramadan");
    }

    if (day === 27) {
      events.push("Laylat al-Qadr (commonly observed)");
    }
  }

  if (month === 10 && day >= 2 && day <= 7) {
    events.push("Six voluntary fasts of Shawwal");
  }

  return events;
}

/**
 * Finds the Gregorian date matching the selected Hijri date.
 * Uses the Umm al-Qura calendar supported by Intl.
 */
function getGregorianDate(
  hijriDay: number,
  hijriMonth: number,
  hijriYear: number,
): Date | null {
  try {
    const formatter = new Intl.DateTimeFormat(
      "en-u-ca-islamic-umalqura-nu-latn",
      {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        timeZone: "UTC",
      },
    );

    // Approximate Gregorian year corresponding to the Hijri year.
    const approximateYear = Math.floor(hijriYear * 0.970224 + 621.5774);

    // Search nearby Gregorian years to find the exact date.
    const start = Date.UTC(approximateYear - 1, 0, 1);
    const end = Date.UTC(approximateYear + 2, 0, 1);

    for (let timestamp = start; timestamp < end; timestamp += 86400000) {
      const date = new Date(timestamp);

      const parts = formatter.formatToParts(date);

      const values: Record<string, number> = {};

      for (const part of parts) {
        if (
          part.type === "day" ||
          part.type === "month" ||
          part.type === "year"
        ) {
          values[part.type] = Number(part.value);
        }
      }

      if (
        values.day === hijriDay &&
        values.month === hijriMonth &&
        values.year === hijriYear
      ) {
        return date;
      }
    }

    return null;
  } catch (error) {
    console.warn("Hijri date conversion failed:", error);
    return null;
  }
}

function formatGregorianDate(date: Date | null): string {
  if (!date) {
    return "Gregorian date unavailable on this device";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate | null>(null);

  const handleDaySelect = (day: string) => {
    // HCalendar returns Hijri dates in D/M/YYYY format.
    const [dayText, monthText, yearText] = day.split("/");

    const hijriDay = Number(dayText);
    const hijriMonth = Number(monthText);
    const hijriYear = Number(yearText);

    if (
      !Number.isInteger(hijriDay) ||
      !Number.isInteger(hijriMonth) ||
      !Number.isInteger(hijriYear) ||
      hijriDay < 1 ||
      hijriMonth < 1 ||
      hijriMonth > 12
    ) {
      console.warn("Unexpected Hijri date from calendar:", day);
      return;
    }

    const gregorianDate = getGregorianDate(hijriDay, hijriMonth, hijriYear);

    setSelectedDate({
      hijri: `${hijriDay} ${HIJRI_MONTHS[hijriMonth - 1]} ${hijriYear} AH`,
      gregorian: formatGregorianDate(gregorianDate),
      events: getIslamicEvents(hijriDay, hijriMonth),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Islamic Calendar" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={30}
            color="#176B52"
          />

          <View style={styles.headerText}>
            <Text style={styles.title}>Islamic Calendar</Text>
            <Text style={styles.subtitle}>Hijri dates and Islamic events</Text>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <HCalendar
            calendarType="hijiri"
            onDaySelect={(day) => {
              handleDaySelect(day);
            }}
            containerStyle={styles.calendar}
            selectedDates={
              selectedDate
                ? [
                    {
                      from: (() => {
                        const [day, month, year] =
                          selectedDate.hijri.replace(" AH", "").split(" ")
                            .length === 3
                            ? selectedDate.hijri.replace(" AH", "").split(" ")
                            : [];

                        const monthNumber = HIJRI_MONTHS.indexOf(month) + 1;

                        return `${year}/${monthNumber}/${day}`;
                      })(),
                      to: (() => {
                        const [day, month, year] = selectedDate.hijri
                          .replace(" AH", "")
                          .split(" ");

                        const monthNumber = HIJRI_MONTHS.indexOf(month) + 1;

                        return `${year}/${monthNumber}/${day}`;
                      })(),
                      style: {
                        borderColor: "#176B52",
                      },
                    },
                  ]
                : []
            }
          />
        </View>

        {selectedDate ? (
          <View style={styles.detailsCard}>
            <View style={styles.detailsHeader}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={24}
                color="#176B52"
              />

              <Text style={styles.detailsTitle}>Selected Date</Text>
            </View>

            <Text style={styles.hijriDate}>{selectedDate.hijri}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Gregorian Date</Text>
            <Text style={styles.gregorianDate}>{selectedDate.gregorian}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Islamic Events</Text>

            {selectedDate.events.length > 0 ? (
              selectedDate.events.map((event, index) => (
                <View key={`${event}-${index}`} style={styles.eventRow}>
                  <MaterialCommunityIcons
                    name="star-four-points"
                    size={18}
                    color="#176B52"
                  />

                  <Text style={styles.eventText}>{event}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noEvent}>
                No special Islamic event listed for this date.
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.hintCard}>
            <MaterialCommunityIcons
              name="gesture-tap"
              size={26}
              color="#176B52"
            />

            <Text style={styles.hintText}>
              Tap any Hijri date to see its Gregorian date and Islamic events.
            </Text>
          </View>
        )}

        <Text style={styles.note}>
          Islamic event dates are based on common Hijri calendar conventions.
          Some observances may differ between communities.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F6",
  },

  content: {
    padding: 16,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#183D30",
  },

  subtitle: {
    fontSize: 14,
    color: "#727A75",
    marginTop: 4,
  },

  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  calendar: {
    width: "100%",
  },

  detailsCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#183D30",
  },

  hijriDate: {
    fontSize: 22,
    fontWeight: "700",
    color: "#176B52",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8ECE9",
    marginVertical: 16,
  },

  label: {
    fontSize: 13,
    color: "#747C77",
    marginBottom: 6,
  },

  gregorianDate: {
    fontSize: 17,
    fontWeight: "600",
    color: "#252925",
  },

  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },

  eventText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#263B30",
  },

  noEvent: {
    fontSize: 14,
    lineHeight: 21,
    color: "#747C77",
  },

  hintCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#EAF3EE",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  hintText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: "#285640",
  },

  note: {
    marginTop: 16,
    fontSize: 12,
    lineHeight: 18,
    color: "#858B87",
    textAlign: "center",
  },
});
