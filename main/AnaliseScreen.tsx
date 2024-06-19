
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#000000',
  },
  dateSection: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  monthText: {
    fontSize: 16,
    fontWeight: '500',
  },
  periodText: {
    color: '#8E8E93',
  },
  incomeSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  incomeText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FF9500',
  },
  incomeLabel: {
    color: '#8E8E93',
    marginBottom: 20,
  },
  graphContainer: {
    width: width - 40,
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  graph: {
    width: '90%',
    height: 2,
    backgroundColor: '#FF9500',
  },
  graphLine: {
    width: '90%',
    height: 2,
    backgroundColor: '#FF9500',
  },
  graphDashedLine: {
    width: '90%',
    height: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  adviceSection: {
    padding: 20,
  },
  adviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  adviceText: {
    color: '#C7C7CC',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 20,
  },
});

const tabContent = {
  income: {
    amount: '0 ₽',
    label: 'Доход за месяц',
    graph: <View style={styles.graphLine} />,
  },
  expenses: {
    amount: '0 ₽',
    label: 'Расход за месяц',
    graph: (
      <View style={styles.graph}>
        <View style={styles.graphDashedLine} />
      </View>
    ),
  },
};

export const screenName = "Analise";

export default function AnalysisScreen() {
  const [activeTab, setActiveTab] = useState<'income' | 'expenses'>('income');

  const handleTabChange = (tab: 'income' | 'expenses') => {
    setActiveTab(tab);
  };

  const { amount, label, graph } = tabContent[activeTab];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Закрыть</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Анализ</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'income' && styles.activeTab,
            ]}
            onPress={() => handleTabChange('income')}
          >
            <Text style={[
              styles.tabText,
              activeTab !== 'income' && styles.inactiveTabText,
            ]}>Доходы</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'expenses' && styles.activeTab,
            ]}
            onPress={() => handleTabChange('expenses')}
          >
            <Text style={[
              styles.tabText,
              activeTab !== 'expenses' && styles.inactiveTabText,
            ]}>Расходы</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dateSection}>
        <Text style={styles.monthText}>Апрель 2024г</Text>
        <Text style={styles.periodText}>Период: месяц</Text>
      </View>
      <View style={styles.incomeSection}>
        <Text style={styles.incomeText}>{amount}</Text>
        <Text style={styles.incomeLabel}>{label}</Text>
        <View style={styles.graphContainer}>{graph}</View>
      </View>
      <View style={styles.adviceSection}>
        <Text style={styles.adviceTitle}>Советы по распределению бюджета</Text>
        <Text style={styles.adviceText}>Пусто</Text>
      </View>
    </View>
  );
}



