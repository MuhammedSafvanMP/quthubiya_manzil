import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Dimensions,
  Pressable
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MenuButton } from '../components/common/menuButton';
import { ReminderCard } from '../components/common/remainderCard';
import { AudioPlayerCard } from '../components/common/audioPlayerCard';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';


export default function Index() {

  const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 32 - 12) / 2;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Assalamu Alaikum ✨</Text>
          <Text style={styles.appTitle}>Quthubiya Manzil</Text>
        </View>

   

        {/* Main Player */}
        {/* <AudioPlayerCard /> */}

        {/* Friday Reminder Section */}
        <Text style={styles.sectionTitle}>Friday Reminder</Text>
        
   <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.remindersRow}
  snapToInterval={CARD_WIDTH + 12}
  decelerationRate="fast"
>
  <ReminderCard
    width={CARD_WIDTH}
    title="Surah Yaseen"
    surahNum="36"
    arabicText="يس"
    reciter="Mishary"
    verses="83"
    colors={["#4b5563", "#1f2937"]}
  />

  <ReminderCard
    width={CARD_WIDTH}
    title="Surah Ar-Rahman"
    surahNum="55"
    arabicText="الرحمن"
    reciter="Sudais"
    verses="78"
    colors={["#4c3b18", "#1a1a1a"]}
  />

  <ReminderCard
    width={CARD_WIDTH}
    title="Surah Al-Mulk"
    surahNum="67"
    arabicText="الملك"
    reciter="Mishary"
    verses="30"
    colors={["#374151", "#111827"]}
  />

  <ReminderCard
    width={CARD_WIDTH}
    title="Surah Al-Kahf"
    surahNum="18"
    arabicText="الكهف"
    reciter="Sudais"
    verses="110"
    colors={["#3f3f46", "#18181b"]}
  />
</ScrollView>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 8 }}>

  <View>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categories</Text>
  
</View>

<Pressable style={{ flexDirection: 'row', alignItems: 'center' }}
onPress={() => {
   router.push('/(tabs)/search');
}}
>
  <Text>See More</Text>
  <ChevronRight width={20} />
</Pressable>


</View>



        {/* Grid Menu */}
        <View style={styles.gridContainer}>
          <MenuButton   icon={require("../../../assets/images/icons/allah.png")} label="Asmaul Husna" /> 
          <MenuButton icon={require("../../../assets/images/icons/quran.png")} label="Quran" />
          <MenuButton icon={require("../../../assets/images/icons/book-text.png")} label="Adkar" />
          
          <MenuButton icon={require("../../../assets/images/icons/masjid.png")} label="Mould" />
          <MenuButton icon={require("../../../assets/images/icons/hand-heart.png")} label="Swalath" />
          <MenuButton icon={require("../../../assets/images/icons/music-2.png")} label="Qaseeda" />
          <MenuButton icon={require("../../../assets/images/icons/dikr.png")}label="Dikr" />
        </View>

      </ScrollView>
      
    </SafeAreaView>
  );
}

// --- Stylesheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 20,
    marginTop: 20,
  },
  
  // Header
  header: {
    marginBottom: 16,
  },
  greeting: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  appTitle: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
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
    gap: 12,
  },
    gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

});