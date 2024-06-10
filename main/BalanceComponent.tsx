import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BalanceComponentProps } from './types';

const BalanceComponent: React.FC<BalanceComponentProps> = ({ balance, openModal, selectedDay }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Ваш основной контент */}
      </View>
      <View style={styles.fixedFooter}>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={styles.headerText}>Текущий баланс</Text>
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceText}>{balance} ₽</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => openModal(selectedDay)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Важный момент для фиксации элемента внизу
  },
  content: {
    flex: 1,
    // Стили для вашего основного контента
  },
  fixedFooter: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: "#FFF",
    padding: 20,
    width: "100%",
    flexDirection: "column",
    borderTopWidth: 0.4,
    borderColor: "#A1A1AA",
    position: 'absolute',
    bottom: 0,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "SF-Bold",
    marginBottom: 10,
    color: "#333",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  balanceText: {
    fontSize: 20,
    fontFamily: "SF-Bold",
    color: "#333",
    lineHeight: 28,
  },
  addButton: {
    width: 35,
    height: 35,
    borderRadius: 28,
    backgroundColor: "#EAB308",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 24,
  },
});

export default BalanceComponent;
