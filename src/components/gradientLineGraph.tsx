import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { handleSize } from '../config/responsiveTheme';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import Metrics from '../styles/metrics';

const GradientLineGraph = ({
  marginTop,
  loading,
  data,
}: {
  marginTop?: number;
  loading?: Boolean;
  data?: [];
}) => {
  // const data = [
  //   { value: 10, label: 'Mon' },
  //   { value: 40, label: 'Tue' },
  //   { value: 20, label: 'Wed' },
  //   { value: 90, label: 'Thu' },
  //   { value: 75, label: 'Fri' },
  //   { value: 60, label: 'Sat' },
  //   { value: 100, label: 'Sun' },
  // ];

  return (
    <View
      style={{
        marginTop: marginTop ? handleSize.h(marginTop) : handleSize.h(10),
        marginBottom: handleSize.h(10),
        zIndex: -9,
        width: '100%',
        maxWidth: handleSize.w(400), // responsive max width
        alignSelf: 'center',
      }}
      >
      {data?.length &&
      <LineChart
        areaChart
        curved
        data={data}
        scrollAnimation={false} 
        hideDataPoints={false}
        startFillColor="transparent"
        endFillColor="#0072FF"
        startOpacity={0}
        endOpacity={0.05}
        height={handleSize.h(100)} // responsive height
        color1="#6A5AE0"
        color2="#FF00FF"
        dataPointsColor="#fff"
        dataPointsRadius={handleSize.f(7)} // responsive radius
        xAxisLabelTextStyle={{
          color: THEME.white,
          fontSize: handleSize.f(FONT_SIZES.onetwo),
        }}
        yAxisTextStyle={{
          color: THEME.white,
          fontSize: handleSize.f(FONT_SIZES.onetwo),
        }}
        hideYAxisText
        hideRules
        showVerticalLines
        verticalLinesColor="rgba(255,255,255,0.2)"
        animationDuration={1200}
        hideAxesAndRules
      />
      }
    </View>
  );
};


const styles = StyleSheet.create({
  noCards: {
    color: THEME.white,
    fontSize: handleSize.f(FONT_SIZES.twozero),
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center"
  }

});

export default GradientLineGraph;
