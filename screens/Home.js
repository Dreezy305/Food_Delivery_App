import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { COLORS, icons, images, FONTS } from "../constants";

export default function Home() {
  const renderHeader = () => {
    return <View style={styles.header}></View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home View here</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    height: 50,
  },
});
