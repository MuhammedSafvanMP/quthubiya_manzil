import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const AudioPlayerCard = () => (
  <View style={styles.playerCard}>
    <View style={styles.playerHeader}>
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1597935258735-e15318b1a124?q=80&w=200&auto=format&fit=crop' }} 
        style={styles.albumArt}
      />
      <View>
        <Text style={styles.playerTitle}>Surah Yaseen</Text>
        <Text style={styles.playerSubtitle}>Reciter: Mishary</Text>
      </View>
    </View>

    {/* Progress Bar */}
    <View style={styles.progressContainer}>
      <View style={styles.progressLabels}>
        <Text style={styles.progressText}>0:36</Text>
        <Text style={styles.progressText}>-3:01</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>
    </View>

    {/* Controls */}
    <View style={styles.controlsContainer}>
      <TouchableOpacity>
        <Ionicons name="play-skip-back" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.pauseButton}>
        <Ionicons name="pause" size={28} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="play-skip-forward" size={28} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);




const styles =  StyleSheet.create({

    // Audio Player
  playerCard: {
    backgroundColor: '#000000',
    borderRadius: 24,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  albumArt: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 16,
  },
  playerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 999,
    width: '100%',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    width: '33%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32, // Note: gap works in newer RN versions. Use margins if on older versions.
  },
  pauseButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 999,
  },


});