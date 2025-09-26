import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import Images from '../../../config/images';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Accounts, ACTIVE_ACCOUNT, CARD_DETAIL, DATA, SPECIFIC_ACCOUNT_DETAIL } from '../../../utils/data';
import AccountCard from '../../../components/accountCard';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCardzoom from '../../../components/accountCardzoom';
import { useNavigation } from '@react-navigation/native';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import { HOME_ROUTES } from '../../../constants';
import CardDetailOptions from '../../../components/cardDetailOptions';
import { SectionList } from 'react-native';
import CardDetail from '../../../components/bottomSheet/cardDetail';
import AccountDetailsCard from '../../../components/bottomSheet/accountDetailsCard';

const AccountDetail = () => {

  const navigation = useNavigation()
  const manageRef = useRef(null)

  function pressBackArrow() {
      navigation.goBack()
  }
  
  const Sendoption = [
    { icon: 'repeat-outline', onPress: () => console.log("Withdraw"), text: "Withdraw" },
    { icon: 'cash-outline', onPress: () => console.log("Add Funds"), text: "Add Funds" },
    { icon: 'wallet-outline', onPress: () =>console.log("Transfer") , text: "Transfer" },
    { icon: 'card-outline', onPress: () => console.log("Exchange"), text: "Exchange" },
    { icon: 'arrow-forward-outline', onPress: () => manageRef?.current?.open() , text: "View Details" },
    { icon: 'settings-outline', onPress: () =>console.log("Settings") , text: "Settings" },
  ]

    function onPressCard(item: any) {
      console.log("sa==>",item);
    }

const renderCardStyle = () => {
  return (
      <FlatList
        data={CARD_DETAIL}
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <AccountCardzoom onPressCard={(item: any)=>{onPressCard(item)}} item={item} index={index}  />}
      />
  );
};

function renderCardFeature() {
  
  return(
    <CardDetailOptions features={Sendoption} iconColor={THEME.prinkishBlue} />
  )
}

const TransactionList = () => {
  return (
    <SectionList
      sections={SPECIFIC_ACCOUNT_DETAIL}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.sectionLeft} >            
            <View style={styles.iconCONT} >
               <Icon name={"repeat-outline"} size={20} color={THEME.white} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
}

  function onPressShare() {
    Alert.alert("share","share");
  }

  function onPressCopy() {
    Alert.alert("copy","copy");
  }


  return(
    <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
        <Text style={styles.title}>Account Details</Text>
      <View style={{ alignItems: "flex-start" }} >
        <Text style={styles.subtitle}>Primary GBP Wallet</Text>
      </View>
      {renderCardStyle()}
      {renderCardFeature()}
      {TransactionList()}

      <BottomSheet
        height={METRICS.height / 1.3}
        draggable={false}
        openTime={500}
        closeDuration={500}
        bottomSheetRef={manageRef}
        children={
          <AccountDetailsCard
          onPressShare={onPressShare}
          onPressCopy={onPressCopy}
            details={[
              { label: "Account Name", value: "Primary GBP Wallet", bold: true, copy: true, onCopy: () => console.log("Copied!") },
              { label: "IBAN", value: "GB29 NWBK 6016 1331 9023 29", copy: true, onCopy: () => console.log("IBAN copied!") },
              { label: "SWIFT Code", value: "NWBKGB2L" },
              { label: "Currency", value: "GBP" },
              { label: "Account Type", value: "Personal – Multi-Currency", bold: true },
              { label: "Created On", value: "18 February 2024", bold: true },
              { label: "Linked Cards", value: "Business Visa (**** 1234)", bold: true },
            ]}
          />
        }
      />


    </MainContainer>
    )
  }

export default AccountDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  logo: {
    width: METRICS.width,
    height: scale(25),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 20
  },
  title:
  {
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginTop:10,
    marginLeft: 20
  },
  subtitle:
  {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginTop:5,
    marginBottom: 20,
    marginLeft: 20,
    backgroundColor: THEME.primary,
    borderRadius: 6,
    padding: 3
  },

  card: {
    width: METRICS.width - 40,
    height: 174,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: THEME.gray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center"
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 4,
    fontSize: FONT_SIZES.onefour,
    color: THEME.prinkishBlue,
    fontFamily: FONTFAMILY.Medium
  },

  


  item: {
    borderWidth: 1,
    borderColor: THEME.lightGrey,
    borderRadius: 10,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 10
  },
  sectionLeft:
  { flexDirection: "row", alignItems: "center" },
  iconCONT:
  { width: 32, height: 32, backgroundColor: THEME.darkOffWhite, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  name: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10
  },
  amount: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary
  },
    header: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginVertical: 5
  },

});

