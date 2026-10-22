// export const API_BASE_URL = 'https://api.alquran.cloud/v1';

// export const ENDPOINTS = {
//     surahList: `${API_BASE_URL}/surah`,
//     surah: (surahNo: number) => `${API_BASE_URL}/surah/${surahNo}/editions/quran-uthmani,en.asad`,
//     reciters: ``,
//     audioVerse: (surahNo: number, ayahNo: number) => ``,
//     audioChapter: (surahNo: number) => ``,
// };

// export const API_BASE_URL = "https://api.alquran.cloud/v1";

// export const ENDPOINTS = {
//   surahList: `${API_BASE_URL}/surah`,

//   // Arabic Quran + English translation
//   surah: (surahNo: number) =>
//     `${API_BASE_URL}/surah/${surahNo}/editions/quran-uthmani,en.asad`,

//   // List of available reciters
//   reciters: `${API_BASE_URL}/edition?format=audio&type=verse`,

//   // Audio for an individual ayah
//   audioVerse: (surahNo: number, ayahNo: number) =>
//     `${API_BASE_URL}/ayah/${surahNo}:${ayahNo}/ar.alafasy`,

//    // Direct individual ayah audio API
//   audioChapter: (surahNo: number, ayahNo: number, reciter = "ar.alafasy") =>
//     `${API_BASE_URL}/ayah/${surahNo}:${ayahNo}/${reciter}`,
// };

export const API_BASE_URL = "https://api.alquran.cloud/v1";

const ENDPOINTS = {
  surahList: `${API_BASE_URL}/surah`,

  surah: (surahNo: number) =>
    `${API_BASE_URL}/surah/${surahNo}/editions/quran-uthmani,en.asad`,

  // Returns Surah audio metadata + MP3 URL for every ayah
  surahAudio: (surahNo: number, reciter: string = "ar.alafasy") =>
    `${API_BASE_URL}/surah/${surahNo}/${reciter}`,

  //   let reciterUrlPath = 'Alafasy_128kbps';
  //                         // Special exceptions for Sudais/Bader if available on Everyayah
  //                         if (selectedReciter === 'yasser') reciterUrlPath = 'Yasser_Ad-Dussary_128kbps';
  //                         if (selectedReciter === 'fares') reciterUrlPath = 'Fares_Abbad_64kbps';
  //                         if (selectedReciter === 'sudais') reciterUrlPath = 'Abdurrahmaan_As-Sudais_192kbps';
  //                         // if bader, EveryAyah doesn't seem to have him, fallback Alafasy
  //                         if (selectedReciter === 'bader') reciterUrlPath = 'Alafasy_128kbps';

  // Individual ayah audio

  getChapterAudioUrl: function (
    surahNo: number | string,
    reciterId: string,
  ): string {
    const pS = surahNo.toString().padStart(3, "0");
    switch (reciterId) {
      case "maher":
        return `https://server12.mp3quran.net/maher/${pS}.mp3`;
      case "fares":
        return `https://server8.mp3quran.net/frs_a/${pS}.mp3`;
      case "sudais":
        return `https://server11.mp3quran.net/sds/${pS}.mp3`;
      case "bader":
        return `https://server10.mp3quran.net/bader/Rewayat-Hafs-A-n-Assem/${pS}.mp3`;
      case "yasser":
      default:
        return `https://server11.mp3quran.net/yasser/${pS}.mp3`;
    }
  },
};

export default ENDPOINTS;
