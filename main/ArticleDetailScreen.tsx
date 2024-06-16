import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../main/types';

type ArticleDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ArticleDetail'
>;

type ArticleDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ArticleDetail'
>;

type Props = {
  navigation: ArticleDetailScreenNavigationProp;
  route: ArticleDetailScreenRouteProp;
};

const ArticleDetailScreen: React.FC<Props> = ({ route }) => {
  const { articleTitle, articleContent } = route.params;
  const navigation = useNavigation<ArticleDetailScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>{articleTitle}</Text>
        <Text style={styles.subheading}>И тут идет статья (Заголовок)</Text>
        <Text style={styles.content}>{articleContent}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Вернуться</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArticleDetailScreen;
