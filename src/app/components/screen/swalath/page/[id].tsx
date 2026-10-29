import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import swalathJson from "../../../../../constants/swalath.json";
import AppBar from "../../../common/AppBar";

/* ---------------- data helpers ---------------- */

const getList = (): any[] => {
  const raw: any = swalathJson;
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.list_items)) return raw.list_items;
  return [];
};

/**
 * Recursively walk any object and pull out every meaningful string,
 * tagging whether it is Arabic (has Arabic unicode range) or text.
 * This handles every shape present in your JSON:
 *   - desc.arabic_text (string)
 *   - desc.arabic_text_blocks[]  (array of { arabic_text })
 *   - desc.content.items[]       (malayalam explanation) + desc.content.arabic_text
 *   - desc.content_blocks[]      (array of { arabic_text })
 *   - desc.sections[]            (array of { arabic_text, malayalam_instruction })
 *   - desc.items[]               (array of { instruction, arabic_text })
 */
type Block =
  | { type: "arabic"; text: string }
  | { type: "malayalam"; text: string }
  | { type: "heading"; text: string };

const ARABIC_RE = /[\u0600-\u06FF]/;

const collectFromValue = (val: any, out: Block[], depth = 0) => {
  if (depth > 6 || val == null) return;

  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return;

    // A string may contain Arabic lines + malayalam lines
    const lines = trimmed
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    for (const line of lines) {
      if (ARABIC_RE.test(line)) out.push({ type: "arabic", text: line });
      else out.push({ type: "malayalam", text: line });
    }
    return;
  }

  if (Array.isArray(val)) {
    val.forEach((v) => collectFromValue(v, out, depth + 1));
    return;
  }

  if (typeof val === "object") {
    // Known descriptive keys → render as text
    const headingKeys = [
      "title",
      "arabic_title",
      "section_header",
      "document_info",
    ];
    // Known instruction / note keys → text
    const textKeys = [
      "malayalam_instruction",
      "instruction",
      "malayalam_text",
      "malayalam_subtitle",
      "malayalam_intro",
      "red_note",
      "footer_note",
      "yellow_not",
      "reference",
      "additional_notes",
    ];
    // Known arabic keys → arabic
    const arabicKeys = ["arabic_text", "arabic_text_last", "text"];

    for (const key of Object.keys(val)) {
      const child = (val as any)[key];
      if (child == null) continue;

      if (arabicKeys.includes(key) && typeof child === "string") {
        collectFromValue(child, out, depth + 1);
      } else if (textKeys.includes(key)) {
        collectFromValue(child, out, depth + 1);
      } else if (headingKeys.includes(key)) {
        if (typeof child === "string" && child.trim()) {
          out.push({ type: "heading", text: child.trim() });
        } else if (typeof child === "object") {
          collectFromValue(child, out, depth + 1);
        }
      } else if (
        key === "items" ||
        key === "sections" ||
        key === "content_blocks" ||
        key === "arabic_text_blocks"
      ) {
        collectFromValue(child, out, depth + 1);
      } else if (key === "content") {
        // content.items[] malayalam, content.arabic_text arabic
        collectFromValue(child, out, depth + 1);
      } else if (key === "desc") {
        collectFromValue(child, out, depth + 1);
      } else {
        // unknown key: recurse but don't render number fields etc.
        if (typeof child === "string") {
          // skip pure numbers / ids
          if (/^\d+$/.test(child.trim())) continue;
          collectFromValue(child, out, depth + 1);
        } else {
          collectFromValue(child, out, depth + 1);
        }
      }
    }
  }
};

const buildBlocks = (desc: any): Block[] => {
  const out: Block[] = [];
  // Flatten top-level title first
  if (desc?.title && typeof desc.title === "string") {
    out.push({ type: "heading", text: desc.title });
  }
  collectFromValue(desc, out, 0);
  // de-dupe consecutive identical blocks
  const dedup: Block[] = [];
  for (const b of out) {
    const last = dedup[dedup.length - 1];
    if (last && last.type === b.type && last.text === b.text) continue;
    dedup.push(b);
  }
  return dedup;
};

/* ---------------- screen ---------------- */

export default function NiskaramDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<any | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const list = getList();
      const found = list.find((it) => String(it?.id) === String(id)) ?? null;
      setItem(found);
      setBlocks(found ? buildBlocks(found.desc) : []);
    } catch (e) {
      console.error("detail load", e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#166534" />
      </View>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppBar title="Niskaram" showBack={true} />
        <View style={styles.center}>
          <Text style={styles.error}>Niskaram not found</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Text style={styles.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar title={item.title ?? "Niskaram"} showBack={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header card */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>{item.title}</Text>
        </View>

        {/* Blocks */}
        {blocks.map((b, i) => {
          if (b.type === "heading") {
            return (
              <Text key={i} style={styles.sectionHeading}>
                {b.text}
              </Text>
            );
          }
          if (b.type === "arabic") {
            return (
              <View key={i} style={styles.arabicCard}>
                <Text style={styles.arabicText}>{b.text}</Text>
              </View>
            );
          }
          // malayalam
          return (
            <Text key={i} style={styles.malayalamText}>
              {b.text}
            </Text>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFA" },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  headerCard: {
    backgroundColor: "#166534",
    borderRadius: 16,
    padding: 18,
    marginVertical: 12,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  sectionHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#166534",
    marginTop: 18,
    marginBottom: 6,
    textAlign: "center",
  },

  arabicCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  arabicText: {
    fontSize: 22,
    lineHeight: 40,
    color: "#111827",
    textAlign: "right",
    writingDirection: "rtl",
  },

  malayalamText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#374151",
    marginVertical: 6,
    textAlign: "left",
  },

  error: { fontSize: 15, color: "#DC2626", marginBottom: 12 },

  backBtn: {
    backgroundColor: "#166534",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  backBtnText: { color: "#FFFFFF", fontWeight: "600" },
});
