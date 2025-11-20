import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StatusBar,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";

import { BottomSheet, MainContainer } from "../../../components";
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from "../../../styles";
import { useAccountScreenViewModel } from "../../../viewModels/homeViewModel/account/useAccountScreenViewModel";
import OptionsHeader from "../../../components/topHeader";
import AccountCardBox from "../../../components/accountCardBox";
import AccountCardzoom from "../../../components/accountCardzoom";
import CardFeatureButtons from "../../../components/cardFeatureButtons";
import LineGraph from "../../../components/lineGraph";
import StatCard from "../../../components/stateCard";
import AccountDetailsCard from "../../../components/bottomSheet/accountDetailsCard";
import EditAccountPreferences from "../../../components/editAccountPreferences";
import EditAccountDetail from "../../../components/editAccountDetail";
import Images from "../../../config/images";
import { useNavigation } from "@react-navigation/native";
import { HOME_ROUTES } from "../../../constants";
import { SHOW_CLIENT } from "../../../APICall/constants";
import { ActivityIndicator } from "react-native";
import GradientLineGraph from "../../../components/gradientLineGraph";
import { DATA } from "../../../utils/data";
import Metrics from "../../../styles/metrics";

const AccountScreen = () => {
  const vm = useAccountScreenViewModel();
  const navigation = useNavigation()

  console.log("asdsa=>",vm.currentAccDetail); 
  
  const renderTransactionList = () => (
    <View style={{ zIndex: -9 }} >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTransactionTXT}>Activity  ({"DUMMY DATA-" + SHOW_CLIENT})</Text>
        <TouchableOpacity onPress={vm.handleNavigateTransactionHistory}>
          <Text style={styles.viewAllTxt}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={vm.handleNavigateTransaction} style={styles.item}>
            <View style={styles.sectionLeft}>
              <View style={styles.iconCONT}>
                <Icon name={item.id == 2 ?"arrow-back-outline" : "arrow-forward-outline"} size={16} color={THEME.textPrimary} />
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subname}>19 July</Text>
              </View>
            </View>
            <View>
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
      />
    </View>
  );

  function renderHeaderStuffs() {
    return(
            <ImageBackground
       imageStyle={styles.botmRadius}
       style={styles.headerContainer}
       source={Images.checking2}
       resizeMode="stretch"
       >
              <OptionsHeader
            // onPressNotification={() => vm.navigation.navigate(HOME_ROUTES.NOTIFICATION)}
            onPressNotification={() => Alert.alert("NEED",SHOW_CLIENT) }
            onPressAdd={() => vm.navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY)}
          />
          <FlatList
            ref={vm.flatListRef}
            data={vm.getAccounts_Data}
            ListEmptyComponent={()=>{
              return(
                <View style={styles.cardLoadingContainer} >
                  <ActivityIndicator size="small" color={THEME.primary} />
                </View>
              )
            }}
            keyExtractor={(item) => item.id}
            renderItem={( {item} ) => (
              <AccountCardBox
                showBalance={vm.showbalance}
                total={`${item?.currency?.iso_code} ${item?.available_balance}`}
                onHold={`${item?.currency?.iso_code} ${item?.pending_balance}`}
                available={`${item?.currency?.iso_code} ${item?.available_balance}`}
                onPress={() => vm.editRef?.current?.open()}
                onPresseye={()=>vm.setshowbalance(!vm.showbalance)}
              />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={vm.handleScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.pagination}>
            {vm.getAccounts_Data.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, vm.activeIndex === index && styles.activeDot]}
              />
            ))}
          </View>
       </ImageBackground>
    )
  }
  return (
    <ImageBackground source={Images.universalGradientBackground} style={styles.container}>
      <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={"#7c4fc3"} />
       {renderHeaderStuffs()}


         {/* BODY */}
         <ScrollView contentContainerStyle={{ paddingBottom: 100, marginTop: 10 }}>
           <CardFeatureButtons
             features={vm.features}
             onPressbtn={(item: any) => item.onPress()}
           />
          
           {/* <LineGraph
             labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
             data={[10, 40, 20, 90, 75, 60, 100]}
             lineColor={THEME.white}
              bgColor={THEME.secondary}
           /> */}
    
           <GradientLineGraph marginTop={60} />

           <View style={styles.statecontainer}>
             <StatCard
               title="Avg monthly spend (DUMMY)"
               amount="£820.0"
               percentage={11.9}
    //           // onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
              onPress={() => console.log("Avg monthly ")
              }
              isPositive
            />
            <StatCard
              title="Spent this month (DUMMY)"
              amount="£440.24"
              percentage={11.9}
              // onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
              onPress={() => console.log("Avg monthly ")}
              isPositive={false}
            />
          </View>

          {renderTransactionList()}

        </ScrollView>

    {/* Bottom Sheets */}
        <BottomSheet
          height={METRICS.height - scale(250)}
          draggable={false}
          bottomSheetRef={vm.manageRef}
        >
          <ImageBackground
            resizeMode="cover"
            source={Images.addCardGradient}
            style={styles.container}
          >
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
            <AccountDetailsCard
              onPressShare={vm.onPressShare}
              onPressCopy={vm.onPressCopy}
              onPressEdit={vm.onPressEdit}
              details={[
                { label: "Account Name", value: vm.currentAccDetail.name , bold: true },
                { label: "IBAN", value: vm.currentAccDetail.iban },
                { label: "SWIFT Code", value: "DUMMY" },
                { label: "Currency", value: vm.currentAccDetail.linkedAccount },
                { label: "Account Type", value: "DUMMY" },
                { label: "Created On", value: vm.currentAccDetail.created_at },
                { label: "Linked Cards", value: vm.currentAccDetail.iso_code },
              ]}
            />
          </ScrollView>
          </ImageBackground>
        </BottomSheet>

        <BottomSheet       draggable={false} height={400} bottomSheetRef={vm.editRef}>
            <EditAccountPreferences
            accountName="Primary GBP Wallet"
            onPressEdit={() => vm.editAccountRef?.current?.open()}
            onPressSave={vm.onPressSave}
            isPendingAccFreeze={vm.isPendingAccFreeze}
            isPendingAccDelete={vm.isPendingAccDelete}
            onPressFreeze={vm.onPressFreeze}
            onPressDelete={vm.onPressDelete}
          />
        </BottomSheet>

        <BottomSheet       draggable={false} height={scale(240)} bottomSheetRef={vm.editAccountRef}>
          <EditAccountDetail
            gbpWallet={vm.gbpWallet}
            setgbpWallet={vm.setGbpWallet}
            title="Edit Account Name"
            onPressSave={vm.onPressEditSave}
          />
        </BottomSheet>

    </SafeAreaView>
    </ImageBackground>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    height: Metrics.halfScreen - 40,
    width: Metrics.width,
    // backgroundColor: "red",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // position: 'absolute'
  },
  botmRadius:{
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  
  cardLoadingContainer:
  { height: 174, justifyContent: "center", alignItems: "center", width: METRICS.width},
  card: {
    width: METRICS.width - 40,
    height: 174,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: THEME.gray,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  content: { alignItems: "center", justifyContent: "center" },
  text: {
    marginTop: 4,
    fontSize: FONT_SIZES.onefour,
    color: THEME.prinkishBlue,
    fontFamily: FONTFAMILY.Medium,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 10,
    backgroundColor: THEME.SlateBlue,
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: THEME.white, width: 8, height: 8 },
  statecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardTransactionTXT: {
    fontSize: FONT_SIZES.oneone,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  viewAllTxt: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    backgroundColor: THEME.SlateBlue,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },
  item: {
    backgroundColor: THEME.SlateBlue,
    borderRadius: 10,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCONT: {
    width: 25,
    height: 25,
    backgroundColor: THEME.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginLeft: 10,
  },
  subname: {
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10,
  },
  amount: {
    fontSize: FONT_SIZES.oneeight,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
  },


});
