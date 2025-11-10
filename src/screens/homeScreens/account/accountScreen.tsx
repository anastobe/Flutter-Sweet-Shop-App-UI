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

const AccountScreen = () => {
  const vm = useAccountScreenViewModel();
  const navigation = useNavigation()

  console.log("asdsa=>",vm.currentAccDetail); 
  

  return (
    <LinearGradient
      colors={["#713d9f", "#2A1E60", "#0C1445"]}
      locations={[0.1, 0.3, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor={THEME.secondary} />
      <SafeAreaView style={styles.container}>
        {/* HEADER + CARDS */}
        <LinearGradient
          colors={["#6B3FA0", "#3A2670", "#0C1445"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
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
        </LinearGradient>

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
          <View style={styles.statecontainer}>
            <StatCard
              title="Avg monthly spend (DUMMY)"
              amount="£820.00"
              percentage={11.9}
              onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
              isPositive
            />
            <StatCard
              title="Spent this month (DUMMY)"
              amount="£440.24"
              percentage={11.9}
              onPress={() => navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT)}
              isPositive={false}
            />
          </View>
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
    </LinearGradient>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    height: 300,
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
});
