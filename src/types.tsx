import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Profile: { personName: string };
  Home: undefined;
  Settings: undefined;
};

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile"
>;
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type SettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Settings"
>;

export type Gullkorn = {
  author: string;
  gullkorn: string;
  date: string;
  id: number;
};

export type Quote = {
  text: string;
  date: Date;
};

export type PersonQuotes = {
  name: string;
  quotes: Quote[];
};

export type State = {
  id: string;
  personQuotes: PersonQuotes[];
};
