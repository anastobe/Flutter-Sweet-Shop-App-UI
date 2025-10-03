import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { THEME } from "../styles";

const screenWidth = Dimensions.get("window").width;

const LineGraph = ({
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  data = [20, 45, 28, 80, 99, 43, 60],
  lineColor = THEME.white,
  bgColor = THEME.secondary,
}) => {
  return (
    <View  >
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              color: (opacity = 1) => THEME.white, // line color
              strokeWidth: 3,
            },
          ],
        }}
        width={screenWidth - 40}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: bgColor,
          backgroundGradientFrom: bgColor,
          backgroundGradientTo: bgColor,
          decimalPlaces: 0,
          color: (opacity = 1) => bgColor,
          labelColor: (opacity = 1) => THEME.primary,
          propsForDots: {
            r: "6",
            strokeWidth: "3",
            stroke: THEME.textPrimary,
          },
        }}
        bezier
        style={{
          // marginVertical: 8,
          borderRadius: 16,
          marginTop: 10,
          alignItems: "center"
        }}
      />
    </View>
  );
};

export default LineGraph;
