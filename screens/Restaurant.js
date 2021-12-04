import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { COLORS, icons, images, FONTS, SIZES } from "../constants";

export default function Restaurant({ route, navigation }) {
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  React.useEffect(() => {
    let { item, currentLocation } = route.params;

    setRestaurant(item);
    setCurrentLocation(currentLocation);
  });

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        {/* RESTAURANT NAME SECTION */}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              height: 50,
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {restaurant?.name}
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
            source={icons.list}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
      >
        {restaurant?.menu.map((item, index) => (
          <>
            <View key={`menu-${index}`} style={{ alignItems: "center" }}>
              <View style={{ height: SIZES.height * 0.35 }}>
                <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{ width: SIZES.width, height: "100%" }}
                />

                {/* QUANTITY SECTION */}
                <View
                  style={{
                    position: "absolute",
                    bottom: -20,
                    width: SIZES.width,
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                    }}
                  >
                    {/* COUNTER MINUS BUTTON */}
                    <Text style={{ ...FONTS.body1 }}>-</Text>
                  </TouchableOpacity>
                  {/* QTY DISPLAY */}
                  <View
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ ...FONTS.h2 }}>5</Text>
                  </View>

                  {/* COUNTER PLUS BUTTON */}
                  <TouchableOpacity
                    style={{
                      width: 50,
                      backgroundColor: COLORS.white,
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopRightRadius: 25,
                      borderBottomRightRadius: 25,
                    }}
                  >
                    {/* COUNTER */}
                    <Text style={{ ...FONTS.body1 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* NAME AND DESCRIPTION */}
            </View>
          </>
        ))}
      </Animated.ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touch: {
    width: 50,
    paddingLeft: SIZES.padding * 2,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    height: 50,
    paddingTop: 3,
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
