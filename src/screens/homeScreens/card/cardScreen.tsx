import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, SectionList } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit';
import Metrics from '../../../styles/metrics';
import { screenWidth } from '../../../utils/style.utils';
import { Accounts, DATA } from '../../../utils/data';
import AccountCard from '../../../components/accountCard';
import CardFeatureButtons from '../../../components/cardFeatureButtons';
import AddCardPopup from '../../../components/bottomSheet/addCardPopup';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Auth_ROUTES, HOME_ROUTES } from '../../../constants';
import CustomButton from '../../../components/customButton';
import FreezeCardModal from '../../../components/Modal/FreezeCardModal ';
import Toast from 'react-native-toast-message';
import { createCard,  freezUnFreezCard, getCards, unfreezCard } from '../../../queries/auth.query';
import { useDispatch } from 'react-redux';
import CardDetail from '../../../components/bottomSheet/cardDetail';
import Methods from '../../../components/bottomSheet/methods';
import ManageOption from '../../../components/bottomSheet/manageOption';
import { ActivityIndicator } from 'react-native';

const CardScreen = () => {

  
const features = [
  { icon: 'snow-outline', text: "Freeze Card" },
  { icon: 'copy-outline', text: "Replace Card" },
  { icon: 'options-outline' , text: "Methods" },
  { icon: 'menu-outline', text: "Manage" }
]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisibleUnfreez, setmodalVisibleUnfreez] = useState(false);
  const AddCardRef = useRef(null)
  const cardDetailRef = useRef(null)
  const methodsRef = useRef(null)
  const manageRef = useRef(null)
  const dispatch = useDispatch()
  const FOCUS = useIsFocused()
  const navigation = useNavigation()

  const {mutate: freezUnFreezCardFunc, isPending: isPendingfreezUnFreezCard} = freezUnFreezCard({
      callback: (response: any) => {
        refetchgetCardsData().then(()=>{
         setModalVisible(false)
         setmodalVisibleUnfreez(false)
        }).catch(()=>{
          console.log("Promise Error");          
        })
      },
    });
  
  // get me
  const {data: getCardsData, refetch: refetchgetCardsData, isPending} = getCards({
    enabled: false,
    dispatch,
  });

  let currentItem =  getCardsData?.results?.values[currentIndex]

  useEffect(()=>{
      refetchgetCardsData()
  },[])

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;


  const onRefresh = () => {
    setRefreshing(true);
    refetchgetCardsData()
    // Simulate a network request or any async task
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // replace this with your actual refresh logic
  };
  
 
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;


function openFreezCard() {
  if (currentItem?.card_status == "active") {
    setModalVisible(true) 
  } else if (currentItem?.card_status == "inactive") {
    setmodalVisibleUnfreez(true)
  }
}

  function onPressCard(item: any) {
    cardDetailRef?.current?.open()
  }

const SlidingCards = () => {
  return (
    <View>
      <FlatList
        data={getCardsData?.results?.values} 
        horizontal
        pagingEnabled
        ListEmptyComponent={()=>{
          return(
            <View style={styles.cardLoadingContainer} >
              <ActivityIndicator size="small" color={THEME.primary} />
            </View>
          )
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.card_id}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item, index }) => <AccountCard onPressCard={(item: any)=>{onPressCard(item)}} item={item} index={index} />}
        contentContainerStyle={{ marginTop: 10, 
          // marginHorizontal: 20 
        }}
      />
        {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {getCardsData?.results?.values?.map((item, index) => (          
          <View
            key={index}
            style={[
              styles.dot,
              index == currentIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>

  );
};

function onPressfeature(item: any) {

  if (item.text == "Freeze Card") {
    openFreezCard()
  } else if(item.text == "Replace Card"){
    navigation.navigate(HOME_ROUTES.REPLACE_CARD,{cardDetail: currentItem})
  } else if(item.text == "Methods"){
     methodsRef?.current?.open() 
  } else if(item.text == "Manage"){
    manageRef?.current?.open()
  }
}

function renderCardFeature() {
  
  return(
    <CardFeatureButtons features={features} onPressbtn={(item: any)=>{onPressfeature(item)}} />
  )
}

const TransactionList = () => {
  return (
    <View>
      <View style={styles.cardHeadr} >
        <Text style={styles.cardTransactinTXT} >Card Transactions</Text>
        <TouchableOpacity onPress={()=>{ navigation.navigate(HOME_ROUTES.TRANSACTIONHISTORY) }} >
          <Text style={styles.viewAllTxt} >View All</Text>
        </TouchableOpacity>
      </View>
    <SectionList
      sections={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.sectionLeft} >            
            <View style={styles.iconCONT} >
               <Icon name={"cart-outline"} size={25} color={THEME.white} />
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
    </View>
  );
};

  function Options() {
   return(
    <View style={styles.headerContainer}>
      <Text style={styles.screenTitle}>Manage Cards</Text>
      <TouchableOpacity onPress={()=>AddCardRef?.current?.open()} style={styles.addButton}>
        <Icon name="add-outline" size={25} color={THEME.white} />
      </TouchableOpacity>
    </View>
   ) 
  }

  function HandleOnPress(txt: any) {
    if (txt == 1) {
      AddCardRef?.current?.close()
      setTimeout(()=>{
        navigation.navigate(HOME_ROUTES.CREATE_VC)
      },500)
    }    
    else{
      AddCardRef?.current?.close()
      setTimeout(()=>{
        navigation.navigate(HOME_ROUTES.CREATE_PC)
      },500)
    }
  }

  function freezCardApi(status: any) {

    let payload = {
      card_id: currentItem?.card_id,
      status: `${status}`,
      note: `Card confirmed ${status}`
    }
    freezUnFreezCardFunc(payload)    
  }
      
  function renderPOPUP() {
    return(
        <FreezeCardModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          btnLoader={isPendingfreezUnFreezCard}
          onConfirm={() => {
            freezCardApi("inactive")
          }}
          showSubBody={true}
          title="Freeze This Card?"
          body="Freezing will temporarily disable all transactions from this card."
          subBody="The card can be unfrozen at any time. Existing subscriptions may still attempt charges."
          iconName="snow-outline"
          confirmText="Freeze Card"
        />
    )
  }
    

        
  function renderPOPUPUnFreez() {
    return(
        <FreezeCardModal
          visible={modalVisibleUnfreez}
          btnLoader={isPendingfreezUnFreezCard}
          onClose={() => setmodalVisibleUnfreez(false)}
          onConfirm={() => {
            freezCardApi("active")
          }}
          title="Card is Frozen"
          body="Your card is currently frozen for security reasons. Tap below to unfreeze it instantly and resume spending."
          showSubBody={false}
          confirmText="Unfreeze Card"
        />
    )
  }
    


  function renderModal() {
      return (
        <Modal
          isVisible={modalVisible}
          isKeyboardAvoidingView={true}
          children={renderPOPUP()}
          onClose={() => {
            console.log('close');
          }}
        />
      );
    }

      function renderModalUnFreez() {
      return (
        <Modal
          isVisible={modalVisibleUnfreez}
          isKeyboardAvoidingView={true}
          children={renderPOPUPUnFreez()}
          onClose={() => {
            console.log('close');
          }}
        />
      );
    }
  
    function switchOption(id: any) {
      if (id == 1) {
        console.log("1");        
      } else if (id == 2) {
        console.log("2");
      } else if (id == 3) {
        console.log("3");
      } else if (id == 4) {
        console.log("4");
      }      
    }

    function callFunction(id: any) {
      if (id == 1) {
        navigation.navigate(HOME_ROUTES.SET_LIMIT)
      } else if (id == 2) {
        navigation.navigate(HOME_ROUTES.PIN_SECURITY)    
      }      
    }
    
    function onPressOption(id: any) {
      manageRef?.current?.close()
      setTimeout(() => {
        callFunction(id)
      }, 1000);
    }


  return(
    <MainContainer onRefresh={onRefresh} refreshingeffect={true}  refreshing={refreshing} isFlatList={true} barStyle="dark-content"  mainContainerStyle={styles.container}>
       <Image source={Images.logo} style={styles.logo} />

       {Options()}
       {SlidingCards()}
       { currentItem?.is_enable ? renderCardFeature() : null}
       {TransactionList()}
       {renderModal()}
       {renderModalUnFreez()}

        <BottomSheet
         height={METRICS.halfScreen - 30}
         draggable={false}
         openTime={500}
         closeDuration={500}
         bottomSheetRef={AddCardRef}
         children={<AddCardPopup onPress1={()=>HandleOnPress('1')} onPress2={()=>HandleOnPress('2')} style={{ marginHorizontal: 20 }}  />}
        />

        <BottomSheet
         height={METRICS.halfScreen}
         draggable={false}
         openTime={500}
         closeDuration={500}
         bottomSheetRef={cardDetailRef}
         children={<CardDetail onPress1={()=>HandleOnPress('1')} onPress2={()=>HandleOnPress('2')} style={{ marginHorizontal: 20 }}  />}
        />

        <BottomSheet
         height={METRICS.height / 1.2}
         draggable={false}
         openTime={500}
         closeDuration={500}
         bottomSheetRef={methodsRef}
         children={<Methods onPress1={()=>{switchOption('1')}} onPress2={()=>{switchOption('2')}} onPress3={()=>{switchOption('3')}} onPress4={()=>{switchOption('4')}} style={{ marginHorizontal: 20 }}  />}
        />

        <BottomSheet
         height={METRICS.halfScreen}
         draggable={false}
         openTime={500}
         closeDuration={500}
         bottomSheetRef={manageRef}
         children={<ManageOption onPress1={()=>{onPressOption('1')}} onPress2={()=>{onPressOption('2')}} style={{ marginHorizontal: 20 }}  />}
        />


    </MainContainer>
    )
}

export default CardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: THEME.white, },
  logo: {
    width: METRICS.width,
    height: scale(25),
    resizeMode: 'contain',
    alignSelf: "center",
    marginTop: 20
  },
  cardLoadingContainer:
  { height: 174, justifyContent: "center", alignItems: "center", width: METRICS.width},
   screenTitle: {
    color: THEME.primary,
    fontSize: FONT_SIZES.threetwo,
    fontFamily: FONTFAMILY.Light
  },



    header: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginVertical: 5
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
  { width: 36, height: 36, backgroundColor: THEME.darkOffWhite, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  name: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10
  },
  amount: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary
  },

  //pagination dots
    dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  dotInactive: {
    backgroundColor: THEME.lightGrey,
  },
  dotActive: {
    backgroundColor: THEME.primary,
  },


  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: THEME.prinkishBlue,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardHeadr: 
  { flexDirection: 'row',justifyContent: "space-between", marginHorizontal: 20, marginVertical: 15 },
  cardTransactinTXT:
  { fontSize: FONT_SIZES.onetwo, fontFamily: FONTFAMILY.Medium, color: THEME.white },
  viewAllTxt:
  { fontSize: FONT_SIZES.onetwo, fontFamily: FONTFAMILY.Medium, color: THEME.prinkishBlue },

  ICONcONT:
  { width: scale(36), height: scale(36), backgroundColor: THEME.lightGrey, justifyContent: "center", alignItems: "center", borderRadius: 12 },


});
