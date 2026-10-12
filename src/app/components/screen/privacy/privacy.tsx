import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBar from '../../common/AppBar';

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <AppBar title='Privacy Policy' />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Privacy Policy</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.highlight}>
            🔒 Your privacy matters. Quthubiy Manzil does NOT collect, store,
            or share any personal data from our users.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to Quthubiy Manzil ("we", "our", or "us"). This Privacy
            Policy explains how we handle your information when you use our
            mobile application. We are committed to protecting your privacy
            and being transparent about our practices.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Information We Do NOT Collect</Text>
          <Text style={styles.paragraph}>
            Quthubiy Manzil is designed with privacy as a core principle. We
            do NOT collect any of the following:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Personal identification information (name, email, phone)</Text>
            <Text style={styles.bullet}>• Location data</Text>
            <Text style={styles.bullet}>• Device identifiers</Text>
            <Text style={styles.bullet}>• Usage analytics or behavior tracking</Text>
            <Text style={styles.bullet}>• Cookies or similar tracking technologies</Text>
            <Text style={styles.bullet}>• Contacts, photos, or media files</Text>
            <Text style={styles.bullet}>• Financial or payment information</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. How Your Data is Stored</Text>
          <Text style={styles.paragraph}>
            Any data you create or save within the app is stored locally on
            your device only. We do not have access to this data, and it is
            never transmitted to our servers or any third parties. If you
            uninstall the app, this data will be deleted from your device.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>4. Third-Party Services</Text>
          <Text style={styles.paragraph}>
            Quthubiy Manzil does not integrate with any third-party
            analytics, advertising, or tracking services. We do not share
            any information with third parties because we do not collect any
            information in the first place.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>5. Permissions</Text>
          <Text style={styles.paragraph}>
            Our app may request certain permissions only when necessary for
            core functionality. These permissions are used solely on your
            device and do not involve data collection or transmission.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
          <Text style={styles.paragraph}>
            Our app is safe for users of all ages, including children under
            13. Since we do not collect any personal information from anyone,
            we comply with all applicable children's privacy protection laws,
            including COPPA and GDPR-K.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>7. Data Security</Text>
          <Text style={styles.paragraph}>
            Since we don't collect or store any personal data on our servers,
            there is no risk of your personal information being compromised
            through our systems. Your data remains entirely under your
            control on your own device.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>8. Your Rights</Text>
          <Text style={styles.paragraph}>
            You have complete control over your data. Since all data stays on
            your device, you can delete it at any time by clearing the app's
            data or uninstalling the app. No requests to us are needed.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>9. Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected in the app with an updated "Last Updated" date.
            We encourage you to review this policy periodically.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>10. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions or concerns about this Privacy Policy
            or our practices, please contact us at:
          </Text>
          <Text style={styles.email}>support@quthubiymanzil.com</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using Quthubiy Manzil, you agree to this Privacy Policy.
          </Text>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()}  Quthubiy Manzil. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  lastUpdated: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
  },
  highlight: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1C1C1E',
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21,
    color: '#3A3A3C',
  },
  bulletList: {
    marginTop: 8,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    color: '#3A3A3C',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default PrivacyPolicyScreen;