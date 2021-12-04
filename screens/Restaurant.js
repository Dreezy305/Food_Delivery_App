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
  const scrollX = new Animated.Value(0);
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
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
              <View
                style={{
                  width: SIZES.width,
                  alignItems: "center",
                  marginTop: 15,
                  paddingHorizontal: SIZES.padding * 2,
                }}
              >
                {/* NAME */}
                <Text
                  style={{
                    marginVertical: 10,
                    textAlign: "center",
                    ...FONTS.h2,
                  }}
                >
                  {item.name} - {item.price.toFixed(2)}
                </Text>
                {/* DESCRIPTION */}
                <Text
                  style={{
                    textAlign: "center",
                    ...FONTS.body3,
                  }}
                >
                  {item.description}
                </Text>
                {/* CALORIES */}
                <View style={{ marginTop: 10, flexDirection: "row" }}>
                  <Image
                    source={icons.fire}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                  />
                  <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                    {item.calories.toFixed(2)} cal
                  </Text>
                </View>
              </View>
            </View>
          </>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotsPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: SIZES.padding,
          }}
        >
          {restaurant?.menu.map((item, index) => {
            const opacity = dotsPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotsPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotsPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp",
            });
            return (
              <>
                <Animated.View
                  key={`dot-${index}`}
                  opacity={opacity}
                  style={{
                    borderRadius: SIZES.radius,
                    marginHorizontal: 6,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: dotColor,
                  }}
                />
              </>
            );
          })}
        </View>
      </View>
    );
  };

  const renderOrder = () => {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding * 3,
              paddingVertical: SIZES.padding * 2,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ ...FONTS.h3 }}> items in the cart</Text>
            <Text style={{ ...FONTS.h3 }}>$45</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding * 3,
              paddingVertical: SIZES.padding * 2,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.pin}
                style={{ width: 20, height: 20, tintColor: COLORS.darkgray }}
                resizeMode="contain"
              />

              <Text style={{ marginLeft: SIZES.padding, ...FONTS }}>
                location
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}></View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
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
