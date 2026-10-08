import { ENDPOINTS } from "../constants/api";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
}

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Ayah[];
}

interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

/**
 * Get all 114 Surahs
 */
export const getSurahList = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(ENDPOINTS.surahList);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const json: ApiResponse<Surah[]> = await response.json();

    if (json.code !== 200) {
      throw new Error("Failed to fetch Surah list");
    }

    return json.data;
  } catch (error) {
    console.error("getSurahList error:", error);
    throw error;
  }
};

/**
 * Get a specific Surah
 * Includes:
 * - Quran Uthmani
 * - English translation
 */
export const getSurah = async (
  surahNo: number
): Promise<SurahDetail[]> => {
  try {
    const response = await fetch(ENDPOINTS.surah(surahNo));

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const json: ApiResponse<SurahDetail[]> = await response.json();

    if (json.code !== 200) {
      throw new Error("Failed to fetch Surah");
    }

    return json.data;
  } catch (error) {
    console.error("getSurah error:", error);
    throw error;
  }
};