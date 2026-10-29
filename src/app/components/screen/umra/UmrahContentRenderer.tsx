// // components/UmrahContentRenderer.tsx
// import { StyleSheet, Text, View } from "react-native";

// const ARABIC_STYLE = {
//   fontSize: 22,
//   lineHeight: 36,
//   textAlign: "right" as const,
//   writingDirection: "rtl" as const,
//   color: "#111827",
// };

// function Arabic({ text }: { text?: string | null }) {
//   if (!text) return null;
//   return (
//     <View style={styles.arabicCard}>
//       <Text style={ARABIC_STYLE}>{text}</Text>
//     </View>
//   );
// }

// function Malayalam({ text }: { text?: string | null }) {
//   if (!text) return null;
//   return <Text style={styles.body}>{text}</Text>;
// }

// function Heading({ text }: { text?: string | null }) {
//   if (!text) return null;
//   return <Text style={styles.heading}>{text}</Text>;
// }

// function SubHeading({ text }: { text?: string | null }) {
//   if (!text) return null;
//   return <Text style={styles.subHeading}>{text}</Text>;
// }

// // Renders any string | string[] | object subtree safely
// function renderValue(value: any, keyPrefix = ""): React.ReactNode {
//   if (value == null) return null;

//   // String
//   if (typeof value === "string") {
//     return <Malayalam key={keyPrefix} text={value} />;
//   }

//   // Array
//   if (Array.isArray(value)) {
//     return (
//       <View key={keyPrefix}>
//         {value.map((v, i) => (
//           <View key={i}>{renderValue(v, `${keyPrefix}-${i}`)}</View>
//         ))}
//       </View>
//     );
//   }

//   // Object
//   if (typeof value === "object") {
//     return (
//       <View key={keyPrefix}>
//         {value.title && <Heading text={value.title} />}
//         {value.heading && <SubHeading text={value.heading} />}
//         {value.section_title && <SubHeading text={value.section_title} />}
//         {value.main_header && <Heading text={value.main_header} />}
//         {value.sub_header && <SubHeading text={value.sub_header} />}
//         {value.question && <SubHeading text={value.question} />}
//         {value.note && <Malayalam text={value.note} />}
//         {value.description && <Malayalam text={value.description} />}
//         {value.translation && <Malayalam text={value.translation} />}
//         {value.content && renderValue(value.content, `${keyPrefix}-content`)}
//         {value.arabic_text && <Arabic text={value.arabic_text} />}
//         {value.transliteration && <Malayalam text={value.transliteration} />}
//         {value.reference && (
//           <Text style={styles.reference}>{value.reference}</Text>
//         )}
//         {value.items && renderValue(value.items, `${keyPrefix}-items`)}
//         {value.sections && renderValue(value.sections, `${keyPrefix}-sections`)}
//         {value.subsections &&
//           renderValue(value.subsections, `${keyPrefix}-subs`)}
//         {value.duas && renderValue(value.duas, `${keyPrefix}-duas`)}
//         {value.methods && renderValue(value.methods, `${keyPrefix}-methods`)}
//         {value.list && renderValue(value.list, `${keyPrefix}-list`)}
//         {/* skip already-rendered keys */}
//       </View>
//     );
//   }
//   return null;
// }

// export default function UmrahContentRenderer({ desc }: { desc: any }) {
//   if (!desc) {
//     return <Text style={styles.body}>No content available.</Text>;
//   }

//   // Cover common top-level shapes first
//   return (
//     <View style={{ gap: 12 }}>
//       {/* Simple content with arabic_text (id 2, 3, etc.) */}
//       {desc.content?.arabic_text && <Arabic text={desc.content.arabic_text} />}
//       {desc.content?.instruction && (
//         <Malayalam text={desc.content.instruction} />
//       )}

//       {/* Sections at top level (id 1) */}
//       {desc.sections && renderValue(desc.sections, "sections")}

//       {/* Malayalam summary etc. */}
//       {desc.summary && <Malayalam text={desc.summary} />}

//       {/* Niyyah examples, talbiyah, etc. */}
//       {desc.niyyah_examples && renderValue(desc.niyyah_examples, "niyyah")}
//       {desc.talbiyah && renderValue(desc.talbiyah, "talbiyah")}

//       {/* Generic deep render (covers all sub-lists) */}
//       {renderValue(
//         Object.fromEntries(
//           Object.entries(desc).filter(
//             ([k]) =>
//               ![
//                 "content",
//                 "sections",
//                 "summary",
//                 "niyyah_examples",
//                 "talbiyah",
//                 "title",
//                 "meta",
//                 "header",
//               ].includes(k),
//           ),
//         ),
//         "deep",
//       )}

//       {/* Header wrapper shape used by many items */}
//       {desc.header && renderValue(desc.header, "header")}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   heading: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#166534",
//     marginTop: 8,
//     marginBottom: 4,
//   },
//   subHeading: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//     marginTop: 8,
//     marginBottom: 4,
//   },
//   body: {
//     fontSize: 15,
//     lineHeight: 24,
//     color: "#374151",
//   },
//   arabicCard: {
//     backgroundColor: "#F0FDF4",
//     borderRadius: 12,
//     padding: 14,
//     marginVertical: 8,
//   },
//   reference: {
//     fontSize: 13,
//     color: "#6B7280",
//     fontStyle: "italic",
//     marginTop: 4,
//   },
// });

// // components/UmrahContentRenderer.tsx
// import { Image, StyleSheet, Text, View } from "react-native";

// /* ---------- static image map (RN needs literal require paths) ---------- */
// const IMAGES: Record<string, any> = {
//   "rukn-yamani.jpg": require("../../../../../assets/umra/rukn-yamani.jpg"),
//   "maqam-ibrahim.jpg": require("../../../../../assets/umra/maqam-ibrahim.jpg"),
//   "zam-zam.jpg": require("../../../../../assets/umra/zam-zam.jpg"),
//   "multazam.jpg": require("../../../../../assets/umra/multazam.jpg"),
//   "safa-sign.jpg": require("../../../../../assets/umra/safa-sign.jpg"),
//   "safa-mountain.jpg": require("../../../../../assets/umra/safa-mountain.jpg"),
//   "sai-green-lights.jpg": require("../../../../../assets/umra/sai-green-lights.jpg"),
//   "end-of-saee.jpg": require("../../../../../assets/umra/end-of-saee.jpg"),
// };

// const ARABIC_STYLE = {
//   fontSize: 22,
//   lineHeight: 36,
//   textAlign: "right" as const,
//   writingDirection: "rtl" as const,
//   color: "#111827",
// };

// /* ---------- leaf components ---------- */

// function Arabic({ text }: { text?: string | null }) {
//   if (!text || typeof text !== "string") return null;
//   return (
//     <View style={styles.arabicCard}>
//       <Text style={ARABIC_STYLE}>{text}</Text>
//     </View>
//   );
// }

// function Malayalam({
//   text,
//   italic,
// }: {
//   text?: string | null;
//   italic?: boolean;
// }) {
//   if (!text || typeof text !== "string") return null;
//   return <Text style={[styles.body, italic && styles.italic]}>{text}</Text>;
// }

// function Heading({ text }: { text?: string | null }) {
//   if (!text || typeof text !== "string") return null;
//   return <Text style={styles.heading}>{text}</Text>;
// }

// function SubHeading({ text }: { text?: string | null }) {
//   if (!text || typeof text !== "string") return null;
//   return <Text style={styles.subHeading}>{text}</Text>;
// }

// function Note({ text }: { text?: string | null }) {
//   if (!text || typeof text !== "string") return null;
//   return (
//     <View style={styles.noteBox}>
//       <Text style={styles.noteText}>{text}</Text>
//     </View>
//   );
// }

// function Reference({ text }: { text?: string | null }) {
//   if (!text || typeof text !== "string") return null;
//   return <Text style={styles.reference}>{text}</Text>;
// }

// function Bullets({ items }: { items?: any }) {
//   if (!Array.isArray(items) || items.length === 0) return null;
//   return (
//     <View style={{ gap: 6, marginVertical: 6 }}>
//       {items.map((it, i) => {
//         if (typeof it === "string") {
//           return (
//             <View key={i} style={styles.bulletRow}>
//               <Text style={styles.bullet}>•</Text>
//               <Text style={styles.body}>{it}</Text>
//             </View>
//           );
//         }
//         return <View key={i}>{renderValue(it, `bullet-${i}`)}</View>;
//       })}
//     </View>
//   );
// }

// function ImageBlock({
//   src,
//   caption,
// }: {
//   src?: string | null;
//   caption?: string | null;
// }) {
//   if (!src || typeof src !== "string") return null;
//   const filename = src.split("/").pop() ?? "";
//   const source = IMAGES[filename];
//   if (!source) {
//     return <Text style={styles.imageMissing}>[image missing: {filename}]</Text>;
//   }
//   return (
//     <View style={{ marginVertical: 10 }}>
//       <Image source={source} style={styles.image} resizeMode="cover" />
//       {caption ? <Text style={styles.imageCaption}>{caption}</Text> : null}
//     </View>
//   );
// }

// /* ---------- universal recursive renderer ---------- */

// function renderValue(value: any, key = ""): React.ReactNode {
//   if (value == null) return null;

//   if (typeof value === "string") {
//     return <Malayalam key={key} text={value} />;
//   }

//   if (Array.isArray(value)) {
//     return (
//       <View key={key} style={{ gap: 4 }}>
//         {value.map((v, i) => (
//           <View key={`${key}-${i}`}>{renderValue(v, `${key}-${i}`)}</View>
//         ))}
//       </View>
//     );
//   }

//   if (typeof value === "object") {
//     if (typeof value.url === "string") {
//       return (
//         <ImageBlock
//           key={key}
//           src={value.url}
//           caption={value.down || value.heading}
//         />
//       );
//     }

//     return (
//       <View key={key} style={{ gap: 6 }}>
//         {/* headings */}
//         {(value.title || value.main_header || value.heading) && (
//           <Heading text={value.title || value.main_header || value.heading} />
//         )}
//         {value.sub_header && <SubHeading text={value.sub_header} />}
//         {value.section_title && <SubHeading text={value.section_title} />}
//         {value.question && <SubHeading text={value.question} />}
//         {value.context && <SubHeading text={value.context} />}
//         {value.type && <SubHeading text={value.type} />}

//         {/* main_article */}
//         {value.main_article && <Malayalam text={value.main_article} italic />}

//         {/* arabic + transliteration + malayalam trio */}
//         {(value.arabic || value.arabic_text) && (
//           <Arabic text={value.arabic || value.arabic_text} />
//         )}
//         {value.transliteration && (
//           <Malayalam text={value.transliteration} italic />
//         )}
//         {value.malayalam && <Malayalam text={value.malayalam} />}
//         {value.niyyah_malayalam && <Malayalam text={value.niyyah_malayalam} />}
//         {value.niyyah_arabic && <Arabic text={value.niyyah_arabic} />}
//         {value.niyyah_transliteration && (
//           <Malayalam text={value.niyyah_transliteration} italic />
//         )}
//         {value.niyyah_malayalam_full && (
//           <Malayalam text={value.niyyah_malayalam_full} />
//         )}
//         {value.niyyah_note && <Note text={value.niyyah_note} />}
//         {value.niyyah_conclusion && <Note text={value.niyyah_conclusion} />}

//         {/* body blocks */}
//         {value.summary && <Malayalam text={value.summary} />}
//         {value.content &&
//           (typeof value.content === "string" ? (
//             <Malayalam text={value.content} />
//           ) : (
//             renderValue(value.content, `${key}-content`)
//           ))}
//         {value.description && <Malayalam text={value.description} />}
//         {value.translation && <Malayalam text={value.translation} />}
//         {value.additional && <Malayalam text={value.additional} />}
//         {value.instruction && <Malayalam text={value.instruction} />}
//         {value.safety_note && <Note text={value.safety_note} />}
//         {value.etiquette && <Malayalam text={value.etiquette} />}
//         {value.hadith && <Note text={value.hadith} />}
//         {value.intention_guidance && (
//           <Malayalam text={value.intention_guidance} />
//         )}
//         {value.conclusion && <Malayalam text={value.conclusion} />}
//         {value.personal_dua && <Malayalam text={value.personal_dua} />}
//         {value.alternative && <Malayalam text={value.alternative} />}
//         {value.women_note && <Note text={value.women_note} />}
//         {value.barber_info && <Malayalam text={value.barber_info} />}
//         {value.self_cut_note && <Note text={value.self_cut_note} />}
//         {value.idhtiba_note && <Note text={value.idhtiba_note} />}
//         {value.salah_instructions && (
//           <Malayalam text={value.salah_instructions} />
//         )}
//         {value.next_heading && <Heading text={value.next_heading} />}
//         {value.next_heading2 && <Heading text={value.next_heading2} />}
//         {value.next_heading3 && <Heading text={value.next_heading3} />}

//         {/* lists */}
//         {Array.isArray(value.items) && <Bullets items={value.items} />}
//         {Array.isArray(value.list) && <Bullets items={value.list} />}
//         {Array.isArray(value.prohibitions) && (
//           <>
//             <SubHeading text="നിഷിദ്ധം" />
//             <Bullets items={value.prohibitions} />
//           </>
//         )}
//         {Array.isArray(value.notes) && <Bullets items={value.notes} />}
//         {Array.isArray(value.contents) && <Bullets items={value.contents} />}

//         {/* note / reference */}
//         {value.note && <Note text={value.note} />}
//         {value.reference && <Reference text={value.reference} />}

//         {/* recursive containers */}
//         {value.sections && renderValue(value.sections, `${key}-sections`)}
//         {value.sections2 && renderValue(value.sections2, `${key}-sections2`)}
//         {value.sections3 && renderValue(value.sections3, `${key}-sections3`)}
//         {value.subsections &&
//           renderValue(value.subsections, `${key}-subsections`)}
//         {value.conditions && renderValue(value.conditions, `${key}-conditions`)}
//         {value.methods && renderValue(value.methods, `${key}-methods`)}
//         {value.duas && renderValue(value.duas, `${key}-duas`)}
//         {value.dua && renderValue(value.dua, `${key}-dua`)}
//         {value.dhikr && renderValue(value.dhikr, `${key}-dhikr`)}
//         {value.recitations &&
//           renderValue(value.recitations, `${key}-recitations`)}
//         {value.recitation_while_moving && (
//           <>
//             <SubHeading text={value.recitation_while_moving.context} />
//             <Arabic text={value.recitation_while_moving.arabic} />
//             <Malayalam
//               text={value.recitation_while_moving.transliteration}
//               italic
//             />
//             <Malayalam text={value.recitation_while_moving.malayalam} />
//             {value.recitation_while_moving.reference && (
//               <Reference text={value.recitation_while_moving.reference} />
//             )}
//           </>
//         )}
//         {value.dua_and_salah && (
//           <>
//             <SubHeading text={value.dua_and_salah.heading} />
//             <Malayalam text={value.dua_and_salah.content} />
//           </>
//         )}
//         {value.talbiyah && renderValue(value.talbiyah, `${key}-talbiyah`)}
//         {value.niyyah_examples &&
//           renderValue(value.niyyah_examples, `${key}-niyyah`)}
//         {value.hajar_aswad_istilam &&
//           renderValue(value.hajar_aswad_istilam, `${key}-istilam`)}
//         {value.rukn_al_yamani &&
//           renderValue(value.rukn_al_yamani, `${key}-rukn`)}
//         {value.maqam_ibrahim &&
//           renderValue(value.maqam_ibrahim, `${key}-maqam`)}
//         {value.zamzam && renderValue(value.zamzam, `${key}-zamzam`)}
//         {value.multazam && renderValue(value.multazam, `${key}-multazam`)}
//         {value.sai && renderValue(value.sai, `${key}-sai`)}
//         {value.safa && renderValue(value.safa, `${key}-safa`)}
//         {value.safa_dua && renderValue(value.safa_dua, `${key}-safaDua`)}
//         {value.marwa_dua && renderValue(value.marwa_dua, `${key}-marwaDua`)}
//         {value.sai_dhikr && renderValue(value.sai_dhikr, `${key}-saiDhikr`)}
//         {value.sai_completion &&
//           renderValue(value.sai_completion, `${key}-saiComp`)}
//         {value.sai_completion_sign && (
//           <>{renderValue(value.sai_completion_sign, `${key}-saiCompSign`)}</>
//         )}
//         {value.leaving_haram &&
//           renderValue(value.leaving_haram, `${key}-leaving`)}
//         {value.halq_or_taqsir && (
//           <>{renderValue(value.halq_or_taqsir, `${key}-halq`)}</>
//         )}
//         {value.umrah_complete && (
//           <>{renderValue(value.umrah_complete, `${key}-complete`)}</>
//         )}
//         {value.completing_circuits && (
//           <>{renderValue(value.completing_circuits, `${key}-circuits`)}</>
//         )}
//         {value.completing_tawaf && (
//           <>{renderValue(value.completing_tawaf, `${key}-compTawaf`)}</>
//         )}
//         {value.during_tawaf && (
//           <>{renderValue(value.during_tawaf, `${key}-duringTawaf`)}</>
//         )}
//         {value.going_to_marwa && (
//           <>{renderValue(value.going_to_marwa, `${key}-goMarwa`)}</>
//         )}
//         {value.header && renderValue(value.header, `${key}-header`)}
//       </View>
//     );
//   }

//   return null;
// }

// /* ---------- public component ---------- */

// export default function UmrahContentRenderer({ desc }: { desc: any }) {
//   if (!desc) {
//     return <Text style={styles.body}>No content available.</Text>;
//   }

//   const HANDLED = new Set([
//     "summary",
//     "contents",
//     "sections",
//     "sections2",
//     "sections3",
//     "niyyah_examples",
//     "talbiyah",
//     "image_1",
//     "image_2",
//     "image_3",
//     "image_4",
//     "image_5",
//     "image_6",
//     "image_7",
//     "image_8",
//     "title",
//     "meta",
//     "header",
//   ]);

//   const imageKeys = [
//     "image_1",
//     "image_2",
//     "image_3",
//     "image_4",
//     "image_5",
//     "image_6",
//     "image_7",
//     "image_8",
//   ];

//   return (
//     <View style={{ gap: 10 }}>
//       {desc.summary && <Malayalam text={desc.summary} />}

//       {Array.isArray(desc.contents) && <Bullets items={desc.contents} />}

//       {desc.sections && renderValue(desc.sections, "sections")}
//       {desc.sections2 && renderValue(desc.sections2, "sections2")}
//       {desc.sections3 && renderValue(desc.sections3, "sections3")}

//       {desc.niyyah_examples && renderValue(desc.niyyah_examples, "niyyah")}
//       {desc.talbiyah && renderValue(desc.talbiyah, "talbiyah")}

//       {imageKeys.map((k) =>
//         desc[k] ? (
//           <ImageBlock
//             key={k}
//             src={desc[k].url}
//             caption={desc[k].down || desc[k].heading}
//           />
//         ) : null,
//       )}

//       {desc.header && renderValue(desc.header, "header")}

//       {Object.entries(desc)
//         .filter(([k]) => !HANDLED.has(k) && !k.startsWith("image_"))
//         .map(([k, v]) => (
//           <View key={k}>{renderValue(v, k)}</View>
//         ))}
//     </View>
//   );
// }

// /* ---------- styles ---------- */

// const styles = StyleSheet.create({
//   heading: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#166534",
//     marginTop: 10,
//     marginBottom: 4,
//   },
//   subHeading: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#111827",
//     marginTop: 8,
//     marginBottom: 4,
//   },
//   body: {
//     fontSize: 15,
//     lineHeight: 24,
//     color: "#374151",
//   },
//   italic: { fontStyle: "italic", color: "#4B5563" },
//   arabicCard: {
//     backgroundColor: "#F0FDF4",
//     borderRadius: 12,
//     padding: 14,
//     marginVertical: 8,
//   },
//   reference: {
//     fontSize: 13,
//     color: "#6B7280",
//     fontStyle: "italic",
//     marginTop: 2,
//   },
//   noteBox: {
//     backgroundColor: "#FEF9C3",
//     borderLeftWidth: 4,
//     borderLeftColor: "#EAB308",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginVertical: 6,
//   },
//   noteText: { fontSize: 14, color: "#4B3A00", lineHeight: 22 },
//   bulletRow: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
//   bullet: { fontSize: 16, color: "#166534", lineHeight: 24 },
//   image: {
//     width: "100%",
//     height: 220,
//     borderRadius: 12,
//     backgroundColor: "#E5E7EB",
//   },
//   imageCaption: {
//     fontSize: 12,
//     color: "#6B7280",
//     textAlign: "center",
//     marginTop: 6,
//   },
//   imageMissing: {
//     fontSize: 12,
//     color: "#DC2626",
//     fontStyle: "italic",
//     marginVertical: 8,
//   },
// });

// components/UmrahContentRenderer.tsx
import { Image, StyleSheet, Text, View } from "react-native";

/* ---------- static image map (RN needs literal require paths) ---------- */
const IMAGES: Record<string, any> = {
  "rukn-yamani.jpg": require("../../../../../assets/umra/rukn-yamani.jpg"),
  "maqam-ibrahim.jpg": require("../../../../../assets/umra/maqam-ibrahim.jpg"),
  "zam-zam.jpg": require("../../../../../assets/umra/zam-zam.jpg"),
  "multazam.jpg": require("../../../../../assets/umra/multazam.jpg"),
  "safa-sign.jpg": require("../../../../../assets/umra/safa-sign.jpg"),
  "safa-mountain.jpg": require("../../../../../assets/umra/safa-mountain.jpg"),
  "sai-green-lights.jpg": require("../../../../../assets/umra/sai-green-lights.jpg"),
  "end-of-saee.jpg": require("../../../../../assets/umra/end-of-saee.jpg"),
};

const ARABIC_STYLE = {
  fontSize: 22,
  lineHeight: 36,
  textAlign: "right" as const,
  writingDirection: "rtl" as const,
  color: "#111827",
};

/* ---------- leaf components ---------- */

function Arabic({ text }: { text?: string | null }) {
  if (!text || typeof text !== "string") return null;
  return (
    <View style={styles.arabicCard}>
      <Text style={ARABIC_STYLE}>{text}</Text>
    </View>
  );
}

function Malayalam({
  text,
  italic,
}: {
  text?: string | null;
  italic?: boolean;
}) {
  if (!text || typeof text !== "string") return null;
  return <Text style={[styles.body, italic && styles.italic]}>{text}</Text>;
}

function Heading({ text }: { text?: string | null }) {
  if (!text || typeof text !== "string") return null;
  return <Text style={styles.heading}>{text}</Text>;
}

function SubHeading({ text }: { text?: string | null }) {
  if (!text || typeof text !== "string") return null;
  return <Text style={styles.subHeading}>{text}</Text>;
}

function Note({ text }: { text?: string | null }) {
  if (!text || typeof text !== "string") return null;
  return (
    <View style={styles.noteBox}>
      <Text style={styles.noteText}>{text}</Text>
    </View>
  );
}

function Reference({ text }: { text?: string | null }) {
  if (!text || typeof text !== "string") return null;
  return <Text style={styles.reference}>{text}</Text>;
}

function Bullets({ items }: { items?: any }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <View style={{ gap: 6, marginVertical: 6 }}>
      {items.map((it, i) => {
        if (typeof it === "string") {
          return (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.body}>{it}</Text>
            </View>
          );
        }
        return <View key={i}>{renderValue(it, `bullet-${i}`)}</View>;
      })}
    </View>
  );
}

function ImageBlock({
  src,
  caption,
}: {
  src?: string | null;
  caption?: string | null;
}) {
  if (!src || typeof src !== "string") return null;
  const filename = src.split("/").pop() ?? "";
  const source = IMAGES[filename];
  if (!source) {
    return <Text style={styles.imageMissing}>[image missing: {filename}]</Text>;
  }
  return (
    <View style={{ marginVertical: 10 }}>
      <Image source={source} style={styles.image} resizeMode="cover" />
      {caption ? <Text style={styles.imageCaption}>{caption}</Text> : null}
    </View>
  );
}

/* ---------- universal recursive renderer ---------- */

function renderValue(value: any, key = ""): React.ReactNode {
  if (value == null) return null;

  if (typeof value === "string") {
    return <Malayalam key={key} text={value} />;
  }

  if (Array.isArray(value)) {
    return (
      <View key={key} style={{ gap: 4 }}>
        {value.map((v, i) => (
          <View key={`${key}-${i}`}>{renderValue(v, `${key}-${i}`)}</View>
        ))}
      </View>
    );
  }

  if (typeof value === "object") {
    // Image node: { url, down?, heading? }
    if (typeof value.url === "string") {
      return (
        <ImageBlock
          key={key}
          src={value.url}
          caption={value.down || value.heading}
        />
      );
    }

    return (
      <View key={key} style={{ gap: 6 }}>
        {/* headings */}
        {(value.title || value.main_header || value.heading) && (
          <Heading text={value.title || value.main_header || value.heading} />
        )}
        {value.sub_header && <SubHeading text={value.sub_header} />}
        {value.section_title && <SubHeading text={value.section_title} />}
        {value.question && <SubHeading text={value.question} />}
        {value.context && <SubHeading text={value.context} />}
        {value.type && <SubHeading text={value.type} />}

        {/* main_article */}
        {value.main_article && <Malayalam text={value.main_article} italic />}

        {/* arabic + transliteration + malayalam trio */}
        {(value.arabic || value.arabic_text) && (
          <Arabic text={value.arabic || value.arabic_text} />
        )}
        {value.transliteration && (
          <Malayalam text={value.transliteration} italic />
        )}
        {value.malayalam && <Malayalam text={value.malayalam} />}
        {value.niyyah_malayalam && <Malayalam text={value.niyyah_malayalam} />}
        {value.niyyah_arabic && <Arabic text={value.niyyah_arabic} />}
        {value.niyyah_transliteration && (
          <Malayalam text={value.niyyah_transliteration} italic />
        )}
        {value.niyyah_malayalam_full && (
          <Malayalam text={value.niyyah_malayalam_full} />
        )}
        {value.niyyah_note && <Note text={value.niyyah_note} />}
        {value.niyyah_conclusion && <Note text={value.niyyah_conclusion} />}

        {/* body blocks */}
        {value.summary && <Malayalam text={value.summary} />}
        {value.content &&
          (typeof value.content === "string" ? (
            <Malayalam text={value.content} />
          ) : (
            renderValue(value.content, `${key}-content`)
          ))}
        {value.description && <Malayalam text={value.description} />}
        {value.translation && <Malayalam text={value.translation} />}
        {value.additional && <Malayalam text={value.additional} />}
        {value.instruction && <Malayalam text={value.instruction} />}
        {value.safety_note && <Note text={value.safety_note} />}
        {value.etiquette && <Malayalam text={value.etiquette} />}
        {value.hadith && <Note text={value.hadith} />}
        {value.intention_guidance && (
          <Malayalam text={value.intention_guidance} />
        )}
        {value.conclusion && <Malayalam text={value.conclusion} />}
        {value.personal_dua && <Malayalam text={value.personal_dua} />}
        {value.alternative && <Malayalam text={value.alternative} />}
        {value.women_note && <Note text={value.women_note} />}
        {value.barber_info && <Malayalam text={value.barber_info} />}
        {value.self_cut_note && <Note text={value.self_cut_note} />}
        {value.idhtiba_note && <Note text={value.idhtiba_note} />}
        {value.salah_instructions && (
          <Malayalam text={value.salah_instructions} />
        )}
        {value.next_heading && <Heading text={value.next_heading} />}
        {value.next_heading2 && <Heading text={value.next_heading2} />}
        {value.next_heading3 && <Heading text={value.next_heading3} />}

        {/* lists */}
        {Array.isArray(value.items) && <Bullets items={value.items} />}
        {Array.isArray(value.list) && <Bullets items={value.list} />}
        {Array.isArray(value.prohibitions) && (
          <>
            <SubHeading text="നിഷിദ്ധം" />
            <Bullets items={value.prohibitions} />
          </>
        )}
        {Array.isArray(value.notes) && <Bullets items={value.notes} />}
        {Array.isArray(value.contents) && <Bullets items={value.contents} />}

        {/* note / reference */}
        {value.note && <Note text={value.note} />}
        {value.reference && <Reference text={value.reference} />}

        {/* recursive containers */}
        {value.sections && renderValue(value.sections, `${key}-sections`)}
        {value.sections2 && renderValue(value.sections2, `${key}-sections2`)}
        {value.sections3 && renderValue(value.sections3, `${key}-sections3`)}
        {value.subsections &&
          renderValue(value.subsections, `${key}-subsections`)}
        {value.conditions && renderValue(value.conditions, `${key}-conditions`)}
        {value.methods && renderValue(value.methods, `${key}-methods`)}
        {value.duas && renderValue(value.duas, `${key}-duas`)}
        {value.dua && renderValue(value.dua, `${key}-dua`)}
        {value.dhikr && renderValue(value.dhikr, `${key}-dhikr`)}
        {value.recitations &&
          renderValue(value.recitations, `${key}-recitations`)}
        {value.recitation_while_moving && (
          <>
            <SubHeading text={value.recitation_while_moving.context} />
            <Arabic text={value.recitation_while_moving.arabic} />
            <Malayalam
              text={value.recitation_while_moving.transliteration}
              italic
            />
            <Malayalam text={value.recitation_while_moving.malayalam} />
            {value.recitation_while_moving.reference && (
              <Reference text={value.recitation_while_moving.reference} />
            )}
          </>
        )}
        {value.dua_and_salah && (
          <>
            <SubHeading text={value.dua_and_salah.heading} />
            <Malayalam text={value.dua_and_salah.content} />
          </>
        )}
        {value.talbiyah && renderValue(value.talbiyah, `${key}-talbiyah`)}
        {value.niyyah_examples &&
          renderValue(value.niyyah_examples, `${key}-niyyah`)}
        {value.hajar_aswad_istilam &&
          renderValue(value.hajar_aswad_istilam, `${key}-istilam`)}
        {value.rukn_al_yamani &&
          renderValue(value.rukn_al_yamani, `${key}-rukn`)}
        {value.maqam_ibrahim &&
          renderValue(value.maqam_ibrahim, `${key}-maqam`)}
        {value.zamzam && renderValue(value.zamzam, `${key}-zamzam`)}
        {value.multazam && renderValue(value.multazam, `${key}-multazam`)}
        {value.sai && renderValue(value.sai, `${key}-sai`)}
        {value.safa && renderValue(value.safa, `${key}-safa`)}
        {value.safa_dua && renderValue(value.safa_dua, `${key}-safaDua`)}
        {value.marwa_dua && renderValue(value.marwa_dua, `${key}-marwaDua`)}
        {value.sai_dhikr && renderValue(value.sai_dhikr, `${key}-saiDhikr`)}
        {value.sai_completion &&
          renderValue(value.sai_completion, `${key}-saiComp`)}
        {value.sai_completion_sign && (
          <>{renderValue(value.sai_completion_sign, `${key}-saiCompSign`)}</>
        )}
        {value.leaving_haram &&
          renderValue(value.leaving_haram, `${key}-leaving`)}
        {value.halq_or_taqsir && (
          <>{renderValue(value.halq_or_taqsir, `${key}-halq`)}</>
        )}
        {value.umrah_complete && (
          <>{renderValue(value.umrah_complete, `${key}-complete`)}</>
        )}
        {value.completing_circuits && (
          <>{renderValue(value.completing_circuits, `${key}-circuits`)}</>
        )}
        {value.completing_tawaf && (
          <>{renderValue(value.completing_tawaf, `${key}-compTawaf`)}</>
        )}
        {value.during_tawaf && (
          <>{renderValue(value.during_tawaf, `${key}-duringTawaf`)}</>
        )}
        {value.going_to_marwa && (
          <>{renderValue(value.going_to_marwa, `${key}-goMarwa`)}</>
        )}
        {value.header && renderValue(value.header, `${key}-header`)}
      </View>
    );
  }

  return null;
}

/* ---------- public component ---------- */

export default function UmrahContentRenderer({ desc }: { desc: any }) {
  if (!desc) {
    return <Text style={styles.body}>No content available.</Text>;
  }

  // Keys we never want to render as text
  const SKIP = new Set(["title", "meta"]);

  // Preserve JSON insertion order → images render in-place, not bunched up
  return (
    <View style={{ gap: 10 }}>
      {Object.entries(desc).map(([k, v]) => {
        if (SKIP.has(k)) return null;

        // Image node: { url, down?, heading? }
        if (
          k.startsWith("image_") &&
          v &&
          typeof v === "object" &&
          typeof (v as any).url === "string"
        ) {
          return (
            <ImageBlock
              key={k}
              src={(v as any).url}
              caption={(v as any).down || (v as any).heading}
            />
          );
        }

        // Everything else → recursive render
        return <View key={k}>{renderValue(v, k)}</View>;
      })}
    </View>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#166534",
    marginTop: 10,
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 8,
    marginBottom: 4,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: "#374151",
  },
  italic: { fontStyle: "italic", color: "#4B5563" },
  arabicCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
  },
  reference: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    marginTop: 2,
  },
  noteBox: {
    backgroundColor: "#FEF9C3",
    borderLeftWidth: 4,
    borderLeftColor: "#EAB308",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginVertical: 6,
  },
  noteText: { fontSize: 14, color: "#4B3A00", lineHeight: 22 },
  bulletRow: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  bullet: { fontSize: 16, color: "#166534", lineHeight: 24 },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  imageCaption: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
  },
  imageMissing: {
    fontSize: 12,
    color: "#DC2626",
    fontStyle: "italic",
    marginVertical: 8,
  },
});
