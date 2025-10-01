import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { Auth_ROUTES } from '../../../constants';
import { SectionList } from 'react-native';
import { DATA } from '../../../utils/data';
import CardDetail from '../../../components/bottomSheet/cardDetail';
import TransactionFilter from '../../../components/bottomSheet/transactionFilter';
import Metrics from '../../../styles/metrics';


const TransactionHistory = () => {

    const navigation = useNavigation();
    const cardDetailRef = useRef(null)
    const [cardName, setcardName] = useState('');

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderFilter() {
        return(
            <View style={styles.filtersearchContainer} >
                <InputField
                    imageLeft={'search-outline'}
                    autoCapital={'none'}
                    blurOnSubmit={false} 
                    placeholder="Search"
                    value={cardName}
                    onChangeText={setcardName}
                    keyboardType={'default'}
                    imagetintColorLeft={THEME.white}
                    customInpStyle={styles.innerinput}
                />
            </View>
        )
    }

    function renderTransactions() {
        return(
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.sectionLeft} >            
            <View style={styles.iconCONT} >
               <Icon name={"arrow-forward-outline"} size={16} color={THEME.textPrimary} />
            </View>
            <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subname}>19 july</Text>
          </View>
          </View>
          <View>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={{  paddingBottom: 100 }}
    />
        )
    }

    return (
        <MainContainer refreshingeffect={false} showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content" mainContainerStyle={styles.container}>
            <View style={{ marginHorizontal: 20 }} >

                <Text style={styles.title}>Transactions History</Text>
                {renderFilter()}
                {renderTransactions()}


                <BottomSheet
                    height={METRICS.height - 100}
                    draggable={false}
                    openTime={500}
                    closeDuration={500}
                    bottomSheetRef={cardDetailRef}
                    children={<TransactionFilter style={{ marginHorizontal: 20 }} onPress={()=>{ cardDetailRef?.current?.close() }} />}
                />
            </View>
        </MainContainer>
    )
}

export default TransactionHistory;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.white },
    title:
    {
        fontSize: FONT_SIZES.threetwo,
        fontFamily: FONTFAMILY.Light,
        color: THEME.primary,
        marginBottom: 10,
        marginTop: 10
    },
    filtersearchContainer:
    { flexDirection: "row", alignItems: "center", marginVertical: 10, },
    subtitle:
    {
        fontSize: FONT_SIZES.onesix,
        fontFamily: FONTFAMILY.Light,
        color: THEME.white,
        marginBottom: 20,
    },
      forgetTxt:
  { marginTop: 20, marginBottom: 20 },
  rightIconCont:
  {  backgroundColor: THEME.primary, width: 50, height: 45, alignItems: "center", justifyContent: 'center', marginLeft: 10, borderRadius: 20},

    header: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginVertical: 5
  },
  innerinput:
  { paddingLeft: 50, height: 45, width: Metrics.width-40 },
  item: {
    // borderWidth: 1,
    backgroundColor: THEME.SlateBlue,
    borderRadius: 10,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10
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
    subname: {
    fontSize: FONT_SIZES.oneZero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10
  },
  amount: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary
  },

});
