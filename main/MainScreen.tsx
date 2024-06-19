import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  Switch
} from "react-native";

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { styles, colors } from '../styles/GlobalStyles';
import ProfilesScreen, { screenName as ProfileName } from './Profile';
import HistoryScreen, { screenName as HistoryName } from "./HistoryScreen";
import ArticleListScreen, { screenName as ArticleListName } from "./ArticleListScreen";
import AnalysisScreen, { screenName as AnaliseName } from "./AnaliseScreen";
import { RootStackParamList, Transaction } from "./types";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserContext } from "./usercontext";
import { TransactionsContext } from "./TransactionsContext";
import ProgressChart from "react-native-chart-kit/dist/ProgressChart";

export const screenName = 'Main';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;

const { width } = Dimensions.get("window");
const chartWidth = width * 0.9;
const chartHeight = 200;

const screenWidth = Dimensions.get('window').width;

export default function Main() {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { Login: username, SetLogin: setUsername } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedDay, setSelectedDay] = useState(6);
  const [weekData, setWeekData] = useState([
    { income: 0, expense: 0 },
    { income: 0, expense: 0 },
    { income: 0, expense: 0 },
    { income: 0, expense: 0 },
    { income: 0, expense: 0 },
    { income: 0, expense: 0 },
    { income: 0, expense: 0 },
  ]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [budget, setBudget] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [savingsTitleGoal, setSavingsTitleGoal] = useState("");
  const [balance, setBalance] = useState(0);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [budgetInput, setBudgetInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [goalTitleInput, setGoalTitleInput] = useState("");
  const [isIncome, setIsIncome] = useState(true);
  const [selectedDate, setSelectedDate] = useState("19.06.2024");
  const [noteEnabled, setNoteEnabled] = useState(false);
  const [note, setNote] = useState("");
  const [categoryVisible, setCategoryVisible] = useState(false);
  // const navigation = useNavigation();

  // const transactionsContext = useContext(TransactionsContext);
  // if (!transactionsContext) {
  //   throw new Error("TransactionsContext is not provided");
  // }
  // const { addTransaction } = transactionsContext;

  // const handleAddTransaction = () => {
  //   if (amount) {
  //     const transaction: Transaction = {
  //       id: uuidv4(),
  //       type: isIncome ? "income" : "expense",
  //       amount: parseFloat(amount),
  //       date: new Date().toISOString(),
  //     };
  //     addTransaction(transaction);
  //     setAmount("");
  //   }
  // };

  const openModal = (day: React.SetStateAction<number>) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAmount("");
  };

  const addAmount = () => {
    const parsedAmount = parseFloat(amount) * (isIncome ? 1 : -1);
    if (!isNaN(parsedAmount)) {
      const updatedWeekData = [...weekData];
      if (parsedAmount >= 0) {
        updatedWeekData[selectedDay].income = parsedAmount;
        setMonthlyIncome(monthlyIncome + parsedAmount);
        setBalance(balance + parsedAmount);
      } else {
        updatedWeekData[selectedDay].expense = Math.abs(parsedAmount);
        setMonthlyExpense(monthlyExpense + Math.abs(parsedAmount));
        setBalance(balance - Math.abs(parsedAmount));
      }
      setWeekData(updatedWeekData);
      closeModal();
    }
  };

  const data = {
    labels: ["Progress"], // Можете изменить лейбл, если нужно
    data: [savingsGoal > 0 ? 0.3 : 0] // Пример данных для прогресса (0.5 = 50%)
  };

  const getMaxAmount = () => {
    const maxIncome = Math.max(...weekData.map((day) => day.income));
    const maxExpense = Math.max(...weekData.map((day) => day.expense));
    return Math.max(maxIncome, maxExpense);
  };

  const renderBar = (amount: number, maxAmount: number, color: string) => {
    const percentage = (amount / maxAmount) * 100;
    return (
      <View
        style={{
          width: 11,
          height: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            width: 8,
            height: `${percentage}%`,
            backgroundColor: color,
            borderRadius: 5,
          }}
        />
      </View>
    );
  };

  const maxAmount = getMaxAmount();

  const updateBudget = () => {
    const parsedBudget = parseFloat(budgetInput);
    if (!isNaN(parsedBudget)) {
      setBudget(parsedBudget);
      setBudgetModalVisible(false);
      setBudgetInput("");
    }
  };

  const updateSavingsGoal = () => {
    const parsedGoal = parseFloat(goalInput);
    if (!isNaN(parsedGoal)) {
      setSavingsGoal(parsedGoal);
      setSavingsTitleGoal(goalTitleInput);
      setGoalModalVisible(false);
      setGoalInput("");
      setGoalTitleInput("");
    }
  };

  const handleProfile = () => {
    if (navigation) {
      navigation.navigate(ProfileName as never);
    }
  };
  const handleArticle = () => {
    if (navigation) {
      navigation.navigate(ArticleListName as never);
    }
  };
  const handleHistory = () => {
    if (navigation) {
      navigation.navigate(HistoryName as never);
    }
  };
  const handleAnalise = () => {
    if (navigation) {
      navigation.navigate(AnaliseName as never);
    }
  }

  const selectCategory = () => {
    setCategoryVisible(!categoryVisible);
    // Реализация выбора категории
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#E4E4E7" }}
      overScrollMode="never"
    >
      <View style={{ padding: 20 }}>
        <View
          style={{
            ...styles.container,
            width: 352,
            height: 52,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              ...styles.container,
              width: "60%",
              height: 52,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ ...styles.textLabel }}>{username}</Text>
            <Text style={styles.textTitle}>Финансы</Text>
          </View>
          <View>
            <Pressable onPress={handleProfile}>
              <Image
                source={require("../assets/mainscreenprofile.png")}
                style={{ ...styles.imageProfile }}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 10,
              shadowColor: "000000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 2,
              width: "48%",
              height: 69,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginBottom: 5, color: "#333" }}>
                {monthlyIncome} ₽
              </Text>
              <Text style={{ color: "#777" }}>Доход за месяц</Text>
            </View>
          </View>

          <View style={{ width: 13 }} />

          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 10,
              shadowColor: "000000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 2,
              width: "48%",
              height: 69,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginBottom: 5, color: "#333" }}>
                {monthlyExpense} ₽
              </Text>
              <Text style={{ color: "#777" }}>Расход за месяц</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 13 }} />

        <View
          style={{
            width: "100%",
            height: 90,
            backgroundColor: "#FFF",
            borderRadius: 10,
            padding: 15,
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "85%",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {weekData.map((day, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openModal(index)}
                style={{
                  // alignSelf: "center",
                  width: "14.28%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  {renderBar(day.income, maxAmount, "#EAB308")}
                  {renderBar(day.expense, maxAmount, "#D4D4D8")}
                </View>
                <Text style={{ fontSize: 12, color: "#777", marginTop: 5 }}>
                  {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][index]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              padding: 6,
              borderRadius: 10,
              flex: 1,
              marginRight: 10,
              height: 30,
            }}
            onPress={handleAnalise}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 12,
                fontFamily: "SF-Medium",
                textAlign: "center",
              }}
            >
              Анализ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              padding: 6,
              borderRadius: 10,
              flex: 1,
              height: 30,
            }} onPress={handleHistory}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 12,
                fontFamily: "SF-Medium",
                textAlign: "center",
              }}
            >
              История
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "SF-Bold",
            marginBottom: 5,
            color: "#333",
          }}
        >
          Бюджет
        </Text>
        {budget === 0 && (
          <Text
            style={{
              ...styles.textLabel,
              fontFamily: "SF-Regular",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            Ваш план по расходам
          </Text>
        )}
        <View
          style={{
            marginBottom: 30,
            backgroundColor: "#FFF",
            borderRadius: 10,
            padding: 10,
            shadowColor: "000000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 2,
            height: "auto",
          }}
        >
          {budget > 0 ? (
            // TODO: сделать вместо скучного текста что-то приятненькое
            <View>
              <Text style={{ color: "#777", fontFamily: 'SF-Regular', marginBottom: 10 }}>
                Ваш план по расходам: {budget} ₽
              </Text>
              <TouchableOpacity onPress={handleArticle}>
                <Text style={{ fontFamily: 'SF-Regular', marginBottom: 5, color: "#777" }}>Посмотрите советы, которые помогут вам!</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {budget === 0 && (
            <>
              <TouchableOpacity
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#EAB308",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
                onPress={() => setBudgetModalVisible(true)}
              >
                <Text style={{ color: "#FFF", fontSize: 24 }}>+</Text>
              </TouchableOpacity>

              <Text
                style={{
                  color: "#777",
                  marginTop: 5,
                  textAlign: "center",
                  fontFamily: "SF-Regular",
                  fontSize: 12,
                }}
              >
                Добавить бюджет
              </Text>
            </>
          )}
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "SF-Bold",
            marginBottom: 5,
            color: "#333",
          }}
        >
          Денежная цель
        </Text>
        {savingsGoal === 0 && (
          <Text
            style={{
              ...styles.textLabel,
              fontFamily: "SF-Regular",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            Накопите или отложите средства
          </Text>
        )}
        <View
          style={{
            marginBottom: 30,
            backgroundColor: "#FFF",
            borderRadius: 10,
            padding: 10,
            shadowColor: "000000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 2,
            height: "auto",
          }}
        >
          {savingsGoal > 0 ? (
            // TODO: сделать вместо скучного текста что-то приятненькое
            <>
              <Text style={{
                color: "#737373",
                marginBottom: 10,
                fontFamily: 'SF-Regular',
              }}>
                Накопите или отложите: {savingsGoal} ₽
              </Text>
              <Text style={{
                color: "#737373",
                marginBottom: 10,
                fontFamily: 'SF-Regular',
              }}>
                На вашу цель: {savingsTitleGoal}
              </Text>
              <TouchableOpacity onPress={handleArticle}>
                <Text style={{ fontFamily: 'SF-Regular', marginBottom: 5, color: "#777" }}>Советы по конролю бюджета для вас!</Text>
              </TouchableOpacity>
            </>
          ) : null}
          {savingsGoal === 0 && (
            <>
              <TouchableOpacity
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: "#EAB308",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
                onPress={() => setGoalModalVisible(true)}
              >
                <Text style={{ color: "#FFF", fontSize: 24 }}>+</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: "#777",
                  marginTop: 5,
                  textAlign: "center",
                  fontFamily: "SF-Regular",
                  fontSize: 12,
                }}
              >
                Добавить цель
              </Text>
            </>
          )}
        </View>
      </View>
      <View
        style={{
          shadowColor: "000000",
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
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ alignItems: "flex-start" }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "SF-Bold",
              marginBottom: 10,
              color: "#333",
            }}
          >
            Текущий баланс
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "SF-Bold",
              color: "#333",
              lineHeight: 28,
            }}
          >
            {balance} ₽
          </Text>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              borderRadius: 28,
              backgroundColor: "#EAB308",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => openModal(selectedDay)}
          >
            <Text style={{ color: "#FFF", fontSize: 24 }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#E4E4E7",
              borderRadius: 10,
              padding: 20,
              width: "100%",
              height: "98%",
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 20, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={closeModal}>
                <Text
                  style={{
                    color: "#60A5FA",
                    fontSize: 12,
                    fontFamily: "SF-Regular",
                  }}
                >
                  Закрыть
                </Text>
              </TouchableOpacity>
              <Text style={{
                fontSize: 16,
                fontFamily: "SF-Medium",
              }}>
                Добавить доходы
              </Text>
              <Text style={{
                fontSize: 12,
                fontFamily: "SF-Regular",
                color: '#F4F4F5'
              }}>
                Закрыть
              </Text>
            </View>

            <Text style={{ fontSize: 16, fontFamily: 'SF-Bold', marginBottom: 10 }}>Сумма</Text>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  borderColor: "#CCC",
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  marginRight: 10,
                  backgroundColor: '#FAFAFA',
                  shadowColor: '000000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 2,
                }}
                keyboardType="numeric"
                placeholder="Введите значение..."
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
              <TouchableOpacity
                onPress={() => setAmount("")}
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#CCC",
                  backgroundColor: "#FAFAFA",
                  borderRadius: 10,
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 2,
                }}
              >
                <Text>✖️</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 20, backgroundColor: '#71717A', borderRadius: 10, padding: 2 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: isIncome ? "#F4F4F5" : "#71717A",
                  padding: 6,
                  borderRadius: 10,
                  alignItems: "center",
                  marginRight: 5,
                }}
                onPress={() => setIsIncome(true)}
              >
                <Text style={{ color: isIncome ? "#171717" : "#F5F5F5" }}>
                  Доходы
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: isIncome ? "#71717A" : "#F4F4F5",
                  padding: 6,
                  borderRadius: 10,
                  alignItems: "center",
                  marginLeft: 5,
                }}
                onPress={() => setIsIncome(false)}
              >
                <Text style={{ color: isIncome ? "#F5F5F5" : "#171717" }}>
                  Расходы
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 16, marginBottom: 10, fontFamily: 'SF-Bold' }}>
              Выберите категорию
            </Text>
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: '#FAFAFA',
                borderColor: "#CCC",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                justifyContent: "center",
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 2,
              }}
              onPress={selectCategory}
            >
              <Text style={{ color: "#171717", fontFamily: 'SF-Medium', fontSize: 14 }}>Нажмите чтобы выбрать</Text>
            </TouchableOpacity>

            {categoryVisible && (
              <View style={{ backgroundColor: '#71717A', marginBottom: 20, borderRadius: 10, padding: 10 }}>
                <TouchableOpacity style={{ padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, marginBottom: 5 }} onPress={() => { /* handle category selection */ }}>
                  <Text style={{ color: '#171717' }}>Работа</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, marginBottom: 5 }} onPress={() => { /* handle category selection */ }}>
                  <Text style={{ color: '#171717' }}>Кешбэк</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, marginBottom: 5 }} onPress={() => { /* handle category selection */ }}>
                  <Text style={{ color: '#171717' }}>Подарки</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, marginBottom: 5 }} onPress={() => { /* handle category selection */ }}>
                  <Text style={{ color: '#171717' }}>Акции</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10, backgroundColor: '#FAFAFA', borderRadius: 10, marginBottom: 5 }} onPress={() => { /* handle category selection */ }}>
                  <Text style={{ color: '#171717' }}>Фриланс</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={{ fontSize: 16, marginBottom: 10, fontFamily: 'SF-Bold', marginTop: 10 }}>
              Дополнительные данные
            </Text>
            <View style={{
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              padding: 10,
              marginBottom: 20,
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 2,
            }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontFamily: 'SF-Regular' }}>Дата</Text>
              <Text style={{ fontSize: 16 }}>{selectedDate}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: "#CCC", marginVertical: 10 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontFamily: 'SF-Regular' }}>Заметка</Text>
              <Switch
                value={noteEnabled}
                onValueChange={(value) => setNoteEnabled(value)}
              />
            </View>
          </View>

          {noteEnabled && (
            <TextInput
              style={{
                height: 80,
                borderColor: "#CCC",
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                textAlignVertical: "top",
              }}
              multiline
              placeholder="Введите текст..."
              value={note}
              onChangeText={(text) => setNote(text)}
            />
          )}

            <TouchableOpacity
              style={{
                backgroundColor: "#262626",
                padding: 15,
                borderRadius: 10,
                alignItems: "center",
                position: "absolute",
                bottom: 15,
                left: "5%",
                right: "5%",
              }}
              onPress={addAmount}
            >
              <Text style={{ color: "#FFF", fontSize: 14 }}>Добавить +</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={budgetModalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 20,
              width: "80%",
            }}
          >
            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center", fontFamily: 'SF-Medium' }}
            >
              Укажите ваш бюджет:
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "#CCC",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
              keyboardType="numeric"
              placeholder="Бюджет"
              value={budgetInput}
              onChangeText={(text) => setBudgetInput(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#EAB308",
                width: '100%',
                height: 40,
                padding: 5,
                borderRadius: 10,
                alignSelf: "center",
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={updateBudget}
            >
              <Text style={{ color: "#FFF", fontSize: 16, fontFamily: 'SF-Medium' }}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={goalModalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              borderRadius: 10,
              padding: 20,
              width: "80%",
            }}
          >
            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
            >
              Укажите вашу денежную цель:
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "#CCC",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 20,
              }}
              keyboardType="numeric"
              placeholder="Денежная цель"
              value={goalInput}
              onChangeText={(text) => setGoalInput(text)}
            />
            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
            >
              На что вы копите?
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "#CCC",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
              keyboardType="numeric"
              placeholder="Машина..."
              value={goalTitleInput}
              onChangeText={(text) => setGoalTitleInput(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#EAB308",
                width: '100%',
                height: 40,
                padding: 5,
                borderRadius: 10,
                alignSelf: "center",
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={updateSavingsGoal}
            >
              <Text style={{ color: "#FFF", fontSize: 16 }}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
