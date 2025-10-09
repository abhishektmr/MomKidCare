import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useAppTheme } from '../../../theme/AppTheme';

const ReportsScreen = () => {
  const { reports } = useSelector((state) => state.pregnancy);

  const reportTypes = [
    {
      title: 'Blood Test',
      subtitle: 'Upload blood test results',
      icon: 'water',
      color: '#FF6B6B',
      type: 'blood',
    },
    {
      title: 'Ultrasound',
      subtitle: 'Scan images and reports',
      icon: 'camera',
      color: '#4ECDC4',
      type: 'ultrasound',
    },
    {
      title: 'Urine Test',
      subtitle: 'Urine analysis results',
      icon: 'flask',
      color: '#45B7D1',
      type: 'urine',
    },
    {
      title: 'Other Reports',
      subtitle: 'Miscellaneous medical reports',
      icon: 'document-text',
      color: '#96CEB4',
      type: 'other',
    },
  ];

  const renderReportType = (reportType, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.reportCard, { borderLeftColor: reportType.color }]}
      onPress={() => {
        // Navigate to specific report upload screen
        console.log(`Upload ${reportType.type} report`);
      }}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: reportType.color }]}>
          <Ionicons name={reportType.icon} size={24} color="#fff" />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{reportType.title}</Text>
          <Text style={styles.cardSubtitle}>{reportType.subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
    </TouchableOpacity>
  );

  const renderRecentReport = (report, index) => (
    <View key={index} style={styles.recentReportCard}>
      <View style={styles.reportHeader}>
        <View style={styles.reportIcon}>
          <Ionicons name="document-text" size={20} color="#4A90E2" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{report.type}</Text>
          <Text style={styles.reportDate}>{report.date}</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
      {report.summary && (
        <Text style={styles.reportSummary}>{report.summary}</Text>
      )}
    </View>
  );

  const theme = useAppTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Medical Reports</Text>
          <Text style={styles.subtitle}>Upload and track your medical reports</Text>
        </View>

        {/* Upload Section */}
        <View style={styles.uploadContainer}>
          <Text style={styles.sectionTitle}>Upload New Report</Text>
          {reportTypes.map((reportType, index) => renderReportType(reportType, index))}
        </View>

        {/* Recent Reports */}
        <View style={styles.recentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reports</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {reports.length > 0 ? (
            reports.slice(0, 5).map((report, index) => renderRecentReport(report, index))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={50} color="#CCC" />
              <Text style={styles.emptyTitle}>No Reports Yet</Text>
              <Text style={styles.emptySubtitle}>
                Upload your first medical report to get started
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="camera" size={24} color="#4A90E2" />
              <Text style={styles.quickActionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="folder" size={24} color="#4A90E2" />
              <Text style={styles.quickActionText}>From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="share" size={24} color="#4A90E2" />
              <Text style={styles.quickActionText}>Share Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Analysis Section (Premium Feature) */}
        <View style={styles.aiContainer}>
          <View style={styles.aiCard}>
            <View style={styles.aiHeader}>
              <Ionicons name="sparkles" size={24} color="#FFD700" />
              <Text style={styles.aiTitle}>AI Report Analysis</Text>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            </View>
            <Text style={styles.aiSubtitle}>
              Get AI-powered insights from your medical reports
            </Text>
            <TouchableOpacity style={styles.aiButton}>
              <Text style={styles.aiButtonText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // background set from theme at usage site
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  uploadContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  recentContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  viewAllText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  recentReportCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reportIcon: {
    marginRight: 10,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
  },
  viewButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  reportSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyState: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  quickActionsContainer: {
    padding: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: '#4A90E2',
    marginTop: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  aiContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  aiCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  premiumText: {
    color: '#333',
    fontSize: 10,
    fontWeight: '600',
  },
  aiSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  aiButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  aiButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReportsScreen;
