import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import Images from '../../../config/images';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Accounts, ACTIVE_ACCOUNT } from '../../../utils/data';
import AccountCard from '../../../components/accountCard';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AccountCardzoom from '../../../components/accountCardzoom';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Metrics from '../../../styles/metrics';
import OptionsHeader from '../../../components/topHeader';
import AccountCardBox from '../../../components/accountCardBox';
import { ImageBackground } from 'react-native';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import { LineChart } from 'react-native-chart-kit';
import LineGraph from '../../../components/lineGraph';
import StatCard from '../../../components/stateCard';
import AccountDetailsCard from '../../../components/bottomSheet/accountDetailsCard';
import { Alert } from 'react-native';
import CustomButton from '../../../components/customButton';
import EditAccountPreferences from '../../../components/editAccountPreferences';
import EditAccountDetail from '../../../components/editAccountDetail';
import { StatusBar } from 'react-native';

const AccountScreen = () => {

  const navigation = useNavigation()
    const manageRef = useRef(null)
    const editref = useRef(null)
    const ediAccount = useRef(null)
    
  const [gbpWallet, setgbpWallet] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

const data = [
  { id: "1", total: "€50,000.00", onHold: "€22.50", available: "€53,534.00" },
  { id: "2", total: "€10,000.00", onHold: "€150.00", available: "€9,850.00" },
  { id: "3", total: "€5,500.00", onHold: "€20.00", available: "€5,480.00" },
];
const features = [
  { icon: 'add-outline', text: `Add\nBeneficiary`, onPress:()=> navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY) },
  { icon: 'card-outline', text: "Transfer", onPress:()=>  navigation.navigate(HOME_ROUTES.MAKE_PAYMENT) },
  { icon: 'reader-outline' , text: "View Details", onPress:()=>  manageRef?.current?.open() },
  { icon: 'server-outline', text: "Convert", onPress:()=>  navigation.navigate(HOME_ROUTES.CURRENCY_EXCHANGE) },
]


  function onPressCard() {
    navigation.navigate(HOME_ROUTES.ACCOUNT_DETAIL)
  }

  type Props = {
    onPress: any
  }

  function Options() {
   return(
    <OptionsHeader
      onPressNotification={() => navigation.navigate(HOME_ROUTES.NOTIFICATION)}
      onPressAdd={() => navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY)}
    />
   ) 
  }

const NewAccountCard: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={['#C8FAFF', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <Icon name="add" size={20} color="#A855F7" />
          <Text style={styles.text}>New Account</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const renderCardStyle = () => {
  return (
      <FlatList
        data={ACTIVE_ACCOUNT}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        ListFooterComponent={NewAccountCard}
        contentContainerStyle={{ paddingBottom: 130, }}
        renderItem={({ item, index }) => <AccountCardzoom onPressCard={(item: any)=>{onPressCard(item)}} item={item} index={index} containerStyle={{ marginVertical: 10 }} />}
      />
  );
};

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / Metrics.width);
    setActiveIndex(index);
  };

function renderAccountCardBox() {
  return (
    <View style={{ position: "relative", bottom: 0 }} >
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AccountCardBox
            total={item.total}
            onHold={item.onHold}
            available={item.available}
            onPress={()=>{  editref?.current?.open() }}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
    </View>

    </View>
  );
}

function onPressfeature(item: any) {

  if (item.text == "Freeze Card") {
   console.log("1");   
  } else if(item.text == "Replace Card"){
     console.log("2");
  } else if(item.text == "Methods"){
   console.log("3");
  } else if(item.text == "Manage"){
   console.log("4");
  }
}

function renderCardFeature() {
  
  return(
    <CardFeatureButtons features={features} onPressbtn={(item: any)=> item.onPress() } />
  )
}

function renderGrap() {
  
  return(
     <LineGraph
        labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        data={[10, 40, 20, 90, 75, 60, 100]}
        lineColor={THEME.white}
        bgColor={THEME.secondary}
      />
        )
}

function renderSpending() {
  
  return(
     <View style={styles.statecontainer}>
      <StatCard
        title="Avg monthly spend"
        amount="£820.00"
        percentage={11.9}
        onPress={()=>{ navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT) }}
        isPositive={true}
      />
      <StatCard
        title="Spent this month"
        amount="£440.24"
        percentage={11.9}
        onPress={()=>{ navigation.navigate(HOME_ROUTES.ACCOUNT_STATEMENT) }}
        isPositive={false}
      />
    </View>
        )
}

  function onPressShare() {
    Alert.alert("share","share");
  }

  function onPressCopy() {
    Alert.alert("copy","copy");
  }

  function onPressEdit() {
 editref?.current?.open()
  }

    return(
    <LinearGradient
        colors={['#713d9f', '#2A1E60', '#0C1445']}
        locations={[0.1, 0.3, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container} // 👈 poori screen cover karega
      >
        <StatusBar
          translucent={true}
          backgroundColor={THEME.secondary}
        />

        <SafeAreaView     style={styles.container}>
        <LinearGradient
          colors={['#6B3FA0', '#3A2670', '#0C1445']}  // 👈 upar ka color dark kar diya
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{height: 300, borderBottomLeftRadius: 30, borderBottomRightRadius: 30}} // 👈 poori screen cover karega
        >
          {Options()}
          {renderAccountCardBox()} 
       
        </LinearGradient>     
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
         {renderCardFeature()}
         {renderGrap()}
         {renderSpending()}

         
        </ScrollView>


      <BottomSheet
        height={METRICS.height / 1.3}
        draggable={false}
        openTime={500}
        closeDuration={500}
        bottomSheetRef={manageRef}
        children={
        <ImageBackground resizeMode="cover" source={Images.addCardGradient} style={[styles.container]}>
          <AccountDetailsCard
          onPressShare={onPressShare}
          onPressCopy={onPressCopy}
          onPressEdit={onPressEdit}
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
          
        </ImageBackground>
        }
      />

      <BottomSheet
        height={METRICS.height / 1.5}
        draggable={false}
        openTime={500}
        closeDuration={500}
        bottomSheetRef={editref}
        children={
        <EditAccountPreferences
          accountName="Primary GBP Wallet"
          onPressEdit={()=>ediAccount?.current?.open()}
          onPressSave={() => Alert.alert("Save Changes")}
          onPressFreeze={() => Alert.alert("Freeze Account")}
          onPressDelete={() => Alert.alert("Delete Account")}
        />
        }
      />

      <BottomSheet
        height={METRICS.height / 1.8}
        draggable={false}
        openTime={500}
        closeDuration={500}
        bottomSheetRef={ediAccount}
        children={
        <EditAccountDetail
          gbpWallet={gbpWallet}
          setgbpWallet={setgbpWallet}
          title="Edit Account Name"
          onPressSave={() => ediAccount?.current?.close()}
        />
        }
      />
  
       </SafeAreaView>
      </LinearGradient>
    )


  }

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: THEME.white
  },
  forgetTxt1:
   { marginTop: 0, marginBottom: 20, backgroundColor: THEME.primary },
     forgetTxt2:
   { marginTop: 0, marginBottom: 20, backgroundColor: THEME.white },
     forgetTxt3:
   { marginTop: 0, marginBottom: 20, backgroundColor: THEME.white },
   statecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
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
  activeDot: {
    backgroundColor: THEME.white, // active purple
    width: 8,
    height: 8,
  },
 overlay: {
  marginTop: 30
    // flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
    // justifyContent: "center",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerText: {
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center"
  },
  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  accountLabel: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium
  },
  accountRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountValue: {
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    marginRight:10
  },
  saveBtn: {
    backgroundColor: "#0dbaf2",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  saveText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  freezeBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  freezeText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
  deleteBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  deleteText: {
    color: "red",
    fontSize: 14,
    fontWeight: "600",
  },


});