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
import { COLORS, icons, images, FONTS, SIZES } from "../constants";

export default function Home() {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.touch}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{ width: 50, height: 30 }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text
              style={{ ...FONTS.h3, paddingVertical: 10, fontWeight: "bold" }}
            >
              Location
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{ width: 50, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return <SafeAreaView style={styles.container}>{renderHeader()}</SafeAreaView>;
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
    paddingTop: 3,
  },
  touch: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: "center",
  },
});
