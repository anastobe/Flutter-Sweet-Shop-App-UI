import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useBeneficiariesManagementViewModel } from '../../../viewModels/homeViewModel/more/useBeneficiariesManagementModel';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../../components/customButton';
import { ActivityIndicator } from 'react-native';
import { LoaderOnly } from '../../../components/activityIndicator';
import { useConversionHistoryViewModel } from '../../../viewModels/homeViewModel/more/useConversionHistoryViewModel';
import InputField from '../../../components/textInput';
import { SectionList } from 'react-native';
import { Images } from '../../../config';

const ConversionHistory = () => {
  const {  
    pressBackArrow, 
    search,
    setSearch
   } = useConversionHistoryViewModel();

   
     function renderFilter() {
       return (
           <InputField
             imageLeft={'search-outline'}
             imagetintColorLeft={THEME.white}
            //  image={'search-outline'}
            //  removeTitle
             autoCapital={'none'}
             blurOnSubmit={false}
             placeholder="Search"
             value={search}
             onChangeText={setSearch}
             keyboardType={'default'}
             imagetintColor={THEME.white}
             customInpStyle={styles.innerinput}
           />
       );
     }

     const DATA = [
  {
    title: "May 21",
    data: [
      {
        id: "1",
        name: "Freelance Payment",
        pair: "EUR → USD",
        amount: "1,000.00",
        status: "Completed",
        statusColor: THEME.white,
        icon: "checkmark-circle-outline",
      },
    ],
  },
  {
    title: "May 19",
    data: [
      {
        id: "2",
        name: "Personal travel conversion",
        pair: "GBP → EUR",
        amount: "500.00",
        status: "Pending",
        statusColor: THEME.white,
        icon: "hourglass-outline",
      },
    ],
  },
];

const HistoryList = () => {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionTitle}>{title}</Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.pair}>{item.pair}</Text>

            <View style={styles.statusRow}>
              <Icon name={item.icon} size={18} color={item.statusColor} />
              <Text style={[styles.status, { color: item.statusColor }]}>
                {item.status}
              </Text>
            </View>
          </View>

          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      )}
    />
  );
};

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      // refreshingeffect={true}
      // onRefresh={onRefresh}
      // refreshing={isFetchingBeneficiary}
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Currency History</Text>
        <Text style={styles.subtitle}>
          Track all your quick exchange and transfer orders here.
        </Text> 
        {renderFilter()}
        {HistoryList()}


      </View>

    </MainContainer>
  );
};

export default ConversionHistory;

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 15,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 30,
    lineHeight: 20
  },
  container: { flex: 1, backgroundColor: THEME.white },
    innerinput: 
    {  
      height: 56,
      paddingLeft: 40   //calculated value  
    },












    sectionTitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
    marginBottom: 8,
    marginTop: 10,
  },
  card: {
    backgroundColor: THEME.whitergba,
    padding: 16,
    justifyContent: "space-between",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    // elevation: 1,
  },
  name: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
  },
  pair: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginTop: 3,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  status: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  amount: {
    fontSize: FONT_SIZES.oneeight,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },

});
