import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Metrics from '../styles/metrics';
import { METRICS, THEME } from '../styles';

const GradientLineGraph = ({marginTop}) => {
  const data = [
    {value: 10, label: 'Mon'},
    {value: 40, label: 'Tue'},
    {value: 20, label: 'Wed'},
    {value: 90, label: 'Thu'},
    {value: 75, label: 'Fri'},
    {value: 60, label: 'Sat'},
    {value: 100, label: 'Sun'},
  ];

  return (
<View
  style={{
    marginTop: marginTop,
    marginBottom: 10,
    zIndex: -9,
    width: '100%',
    // marginHorizontal: 20,
    // backgroundColor :"red",
    maxWidth: 400,   // <-- ⭐ LIMIT GRAPH SIZE ON TABLETS
    alignSelf: 'center',  // <-- ⭐ CENTER THE CHART
  }}
>
  <LineChart
    areaChart
    curved
    data={data}
    hideDataPoints={false}
    startFillColor={"transparent"}
    endFillColor={'#0072FF'}
    startOpacity={0}
    endOpacity={0.05}
    // spacing={Metrics.width/7}
    // width={null}       // <-- ⭐ REMOVE full width
    // adjustToWidth      // <-- auto spacing adjust
    // initialSpacing={0}
    height={150}
    color1={'#6A5AE0'}
    color2={'#FF00FF'}
    dataPointsColor={'#fff'}
    dataPointsRadius={7}
    xAxisLabelTextStyle={{color: THEME.white}}
    yAxisTextStyle={{color: THEME.white}}
    hideYAxisText
    hideRules
    showVerticalLines
    verticalLinesColor={'rgba(255,255,255,0.2)'}
    animationDuration={1200}
    hideAxesAndRules
  />
</View>

  );
};

export default GradientLineGraph;
