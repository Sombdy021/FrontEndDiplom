import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles, colors } from "../styles/GlobalStyles";
export const screenName = "CategoriesScreen";

// Define the Category type
type Category = {
  name: string;
  subcategories: string[];
};

// Expense categories
const expenseCategories: Category[] = [
  { name: "Продукты", subcategories: [] },
  { name: "Рестораны", subcategories: ["Фаст-фуд", "Кафе", "Рестораны"] },
  { name: "Транспорт", subcategories: ["Такси", "Общественный транспорт"] },
  { name: "Развлечения", subcategories: ["Кино", "Клубы", "Концерты"] },
  { name: "Здоровье", subcategories: ["Аптеки", "Больницы"] },
  { name: "Дом", subcategories: ["Мебель", "Ремонт"] },
  { name: "Спорт", subcategories: ["Тренажерный зал", "Экипировка"] },
  { name: "Образование", subcategories: ["Курсы", "Школы"] },
  { name: "Техника", subcategories: ["Бытовая техника", "Компьютеры"] },
  { name: "Одежда", subcategories: ["Магазины", "Бутики"] },
  { name: "Красота", subcategories: ["Салоны красоты", "Косметика", "Процедуры"] },
];

// Income categories
const incomeCategories: Category[] = [
  { name: "Работа", subcategories: [] },
  { name: "Кэшбэк", subcategories: [] },
  { name: "Подарки", subcategories: [] },
  { name: "Акции", subcategories: [] },
  { name: "Фриланс", subcategories: [] },
];

export default function CategoriesScreen() {
  const [activeTab, setActiveTab] = useState("Расходы");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const navigation = useNavigation();

  const toggleSubcategories = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  const goBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  const categories = activeTab === "Доходы" ? incomeCategories : expenseCategories;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.containerCategories}>
        <Text style={styles.title}>Категории</Text>
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={activeTab === "Доходы" ? styles.toggleButtonActive : styles.toggleButton}
            onPress={() => setActiveTab("Доходы")}
          >
            <Text style={activeTab === "Доходы" ? styles.toggleButtonTextActive : styles.toggleButtonText}>
              Доходы
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === "Расходы" ? styles.toggleButtonActive : styles.toggleButton}
            onPress={() => setActiveTab("Расходы")}
          >
            <Text style={activeTab === "Расходы" ? styles.toggleButtonTextActive : styles.toggleButtonText}>
              Расходы
            </Text>
          </TouchableOpacity>
        </View>
        {categories.map((category, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => toggleSubcategories(category.name)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
              <Text style={styles.showSubcategoriesText}>
                {expandedCategory === category.name ? "Скрыть подкатегории" : "Показать подкатегории"}
              </Text>
            </TouchableOpacity>
            {expandedCategory === category.name && category.subcategories.length > 0 && (
              <View style={styles.subcategoriesContainer}>
                {category.subcategories.map((subcategory, subIndex) => (
                  <TouchableOpacity key={subIndex} style={styles.subcategoryButton}>
                    <Text style={styles.subcategoryText}>{subcategory}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Вернуться</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
