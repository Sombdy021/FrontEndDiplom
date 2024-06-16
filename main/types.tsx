export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    ForgotPassword: undefined;
    Main: { username: string };
    Profile: { username: string };
    History: undefined;
    ArticleList: undefined;
    ArticleDetail: { articleTitle: string; articleContent: string };
  };

export type usertype = {
    Login: string;
    SetLogin: Function;
}

export type category = {
  name: string;
  subcategories: string[];
};

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
}

export interface BalanceComponentProps {
  balance: number;
  openModal: (selectedDay: any) => void; // Укажите точный тип для selectedDay, если он известен
  selectedDay: any; // Укажите точный тип для selectedDay, если он известен
}