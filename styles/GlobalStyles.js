import { StyleSheet } from "react-native";

export const colors = {
  gray50: '#FAFAFA',
  gray200: '#E4E4E7',
  gray500: '71717A',
  gray800: '#27272A',
  text500: '#737373',
  text900: '#171717',
  muted900: '#171717',
  dark600: '#D4D4D8',
  yellow500: '#EAB308',
};

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  toggleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginVertical: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleButtonActive: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  toggleButtonText: {
    color: "#000",
    fontSize: 16,
  },
  toggleButtonTextActive: {
    color: "#fff",
    fontSize: 16,
  },
  categoryButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
    elevation: 1,
  },
  categoryText: {
    fontSize: 18,
  },
  showSubcategoriesText: {
    fontSize: 14,
    color: "gray",
  },
  subcategoriesContainer: {
    padding: 10,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 10,
    marginVertical: 5,
  },
  subcategoryButton: {
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    marginVertical: 5,
  },
  subcategoryText: {
    color: "#fff",
    textAlign: "center",
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#000",
    alignItems: "center",
    borderRadius: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorTextReg: {
    color: "red",
    marginBottom: 10,
  },
  buttonReg: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  registrationLink: {
    color: colors.primary,
    fontWeight: "bold",
  },
  containerCategories: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
  },
  containerReg: {
    width: '100%',
    padding: 20,
    flex: 1,
    backgroundColor: 'gray200',
    alignItems: 'center',
    paddingTop: 46,
  },
  titleReg: {
    fontSize: 30,
    fontFamily: 'SF-Bold',
    marginBottom: 150,
    color: '#171717',
  },
  inputReg: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonReg: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 10,
  },
  errorTextReg: {
    color: 'red',
    marginBottom: 15,
  },
  registrationLink: {
    color: '#A16207',
    fontFamily: 'SF-Regular',
    fontSize: 16,
  },
  textLabel: {
    textAlign: 'left',
    fontSize: 12,
    fontFamily: 'SF-Regular',
  },
  textUnderTitle: {
    fontSize: 16,
    fontFamily: 'SF-Bold',
  },
  textTitle: {
    fontSize: 36,
    fontFamily: 'SF-Bold',
  },
  imageProfile: {
    resizeMode: 'contain',
    width: 52,
    height: 52,
  },
  shadow2: {
    shadowColor: '000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  rectangle: {
    backgroundColor: 'FAFAFA',
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileScreenContainer: {
    flex: 1,
    backgroundColor: '#E4E4E7',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 42,
    height: 42,
    marginRight: 15,
  },
  profileText: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  profileBalance: {
    fontSize: 14,
    color: '#777',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#333',
  },
  addAccountButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addAccountButtonText: {
    fontSize: 16,
    color: '#737373',
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingButtonText: {
    fontSize: 14,
    color: '#333',
  },
  backButton: {
    bottom: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});


export const darkTheme = StyleSheet.create({


});

export const lightTheme = StyleSheet.create({


});