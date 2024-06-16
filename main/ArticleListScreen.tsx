import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../main/types';

type ArticleListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ArticleList'
>;

const articles = [
  { id: 1, title: 'Азбука личных финансов: Базовые...', content: 'Содержание статьи 1...' },
  { id: 2, title: 'От копейки к рублю: Основы эффе...', content: 'Содержание статьи 2...' },
  { id: 3, title: 'Бюджет - ключ к финансовому бла...', content: 'Содержание статьи 3...' },
  { id: 4, title: 'Как увеличить свой доход: Прове...', content: 'Содержание статьи 4...' },
  { id: 5, title: 'Пассивный доход: Мечта или реал...', content: 'Содержание статьи 5...' },
  { id: 6, title: 'Инвестиции для начинающих: Перв...', content: 'Содержание статьи 6...' },
  { id: 7, title: 'Расходы под контролем: Как сэко...', content: 'Содержание статьи 7...' },
  { id: 8, title: 'Ловушки потребления: Как распоз...', content: 'Содержание статьи 8...' },
  { id: 9, title: 'Кредиты и займы: Правила безопа...', content: 'Содержание статьи 9...' },
  { id: 10, title: 'Финансовые цели: Как определить...', content: 'Содержание статьи 10...' },
  { id: 11, title: 'Финансовый план: Путь к финансо...', content: 'Содержание статьи 11...' },
  { id: 12, title: 'Финансовые приоритеты: Как расс...', content: 'Содержание статьи 12...' },
  { id: 13, title: 'Кредитная история: Что это и к ...', content: 'Содержание статьи 13...' },
];
 
export const screenName = "ArticleList";

export default function ArticleListScreen() {
  const navigation = useNavigation<ArticleListScreenNavigationProp>();

  const handleArticlePress = (article: { title: string, content: string }) => {
    navigation.navigate('ArticleDetail', { articleTitle: article.title, articleContent: article.content });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Статьи</Text>
      <ScrollView style={styles.articleList}>
        {articles.map(article => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleButton}
            onPress={() => handleArticlePress(article)}
          >
            <Text style={styles.articleButtonText}>{article.title}</Text>
            <Image source={require('../assets/arrow.png')} style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Вернуться</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E7',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 36,
    fontFamily: 'SF-Bold',
  },
  articleList: {
    flex: 1,
  },
  articleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  articleButtonText: {
    fontSize: 14,
    fontFamily: 'SF-Medium',
  },
  arrow: {
    width: 16,
    height: 16,
  },
  backButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Bold'
  },
});
