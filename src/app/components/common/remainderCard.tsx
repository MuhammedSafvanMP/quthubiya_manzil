import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ReminderCard = ({  width, title, reciter, verses, surahNum, colors, arabicText }: { width: number; title: string; reciter: string; verses: string; surahNum: string; colors: any; arabicText: string }) => (
  <LinearGradient
    colors={colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.reminderCard, { width }]}
  >
    <View style={styles.arabicOverlay}>
       <Text style={styles.arabicOverlayText}>{arabicText}</Text>
    </View>

    <View>
      <View style={styles.surahBadge}>
        <Text style={styles.surahBadgeText}>SURAH {surahNum}</Text>
      </View>
      <Text style={styles.arabicText}>{arabicText}</Text>
      
      <Text style={styles.reminderTitle}>{title}</Text>
      <Text style={styles.reminderMeta}>Reciter: {reciter}</Text>
      <Text style={styles.reminderMeta}>{verses} Verses</Text>
    </View>

    <TouchableOpacity style={styles.playButtonSmall}>
      <Ionicons name="play" size={20} color="black" style={{ marginLeft: 2 }} />
    </TouchableOpacity>
  </LinearGradient>
);


const styles =  StyleSheet.create({

    // Reminders Section
  sectionTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  remindersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  reminderCard: {
    width: '48%',
    borderRadius: 24,
    padding: 16,
    height: 208,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  arabicOverlay: {
    position: 'absolute',
    right: -16,
    bottom: 0,
    opacity: 0.1,
  },
  arabicOverlayText: {
    color: '#FFFFFF',
    fontSize: 60,
    fontWeight: 'bold',
  },
  surahBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  surahBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  arabicText: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
    fontSize: 24,
    marginTop: -32,
    marginBottom: 16,
  },
  reminderTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  reminderMeta: {
    color: '#D1D5DB',
    fontSize: 12,
    marginTop: 4,
  },
  playButtonSmall: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
    borderRadius: 999,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

})