import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Metrics from '../styles/metrics';
import { METRICS } from '../styles';

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
    <View style={{ paddingHorizontal: 20, marginTop: marginTop, marginBottom: 10, zIndex: -9 }} > 
<LineChart
  areaChart
  curved
  data={data}
  hideDataPoints={false}
  startFillColor={"transparent"}
  endFillColor={'#0072FF'}
  startOpacity={0}
  endOpacity={0.05}
  width={Metrics.width} 
  height={150}
  color1={'#6A5AE0'}
  color2={'#FF00FF'}
  dataPointsColor={'#fff'}
  dataPointsRadius={7}
  xAxisLabelTextStyle={{color: '#B0B0B0'}}
  yAxisTextStyle={{color: '#B0B0B0'}}
  hideYAxisText
  hideRules // hides horizontal grid lines
  showVerticalLines
//   verticalLinesSpacing={Metrics.width/8}
  verticalLinesColor={'rgba(255,255,255,0.2)'}
//   verticalLinesWidth={1} // thickness of vertical line
//   verticalLinesDashLength={5} // makes vertical lines dashed
//   verticalLinesDashGap={3} // gap between dashes
  
  spacing={METRICS.width/8}
//   initialSpacing={20}
  animationDuration={1200}
  focusEnabled
//   focusColor={'#fff'}
//   focusCircleColor={'#fff'}
//   focusCircleRadius={8}
//   curvedCustomColor={({index}) => {
//     const gradientColors = ['#00C6FF', '#7B61FF', '#FF00FF'];
//     return gradientColors[index % gradientColors.length];
//   }} 
  
  // Remove bottom and left black axis lines
//   hideXAxisLine
//   hideYAxisLine
hideAxesAndRules
/>

    </View>
  );
};

export default GradientLineGraph;
