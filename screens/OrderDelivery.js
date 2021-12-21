import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";

export default function OrderDelivery() {
  const renderMap = () => {
    return (
      <View>
        <Text>Maps here</Text>
      </View>
    );
  };
  return <View style={{ flex: 1 }}>{renderMap()}</View>;
}

const styles = StyleSheet.create({});
