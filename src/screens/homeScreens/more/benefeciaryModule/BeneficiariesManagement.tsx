import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { useBeneficiariesManagementViewModel } from '../../../../viewModels/homeViewModel/more/useBeneficiariesManagementModel';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../../../components/customButton';
import { ActivityIndicator } from 'react-native';
import { LoaderOnly } from '../../../../components/activityIndicator';
import BluryModal from '../../../../components/Modal/bluryModal';
import { Images } from '../../../../config';
import { SHOW_CLIENT } from '../../../../APICall/constants';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';

const BeneficiariesManagement = () => {
  const { data, pressBackArrow, pressRightArrow, onBeneficiaryPress, open, setOpen,open2, setOpen2,onPressDelete,onPressDeleteBtn ,onPressView,
    getBeneficiaryDetail_Data,
    isFetchingBeneficiary,
    isPendingDeleteBeneficiary,
    onRefresh,
    refreshing,
    setrefreshing
   } =
    useBeneficiariesManagementViewModel();

    console.log("ASDasdas==>",isFetchingBeneficiary);
    

  function renderItem({ item }: any) {
    const initials = `${item?.first_name + " " + item?.last_name}`
      .split(' ')
      .map((n: any) => n[0])
      .join('');

      console.log("ASdass==>",`${item?.first_name + " " + item?.last_name}`);
      

    return (
      <View>
        <LinearGradient
          colors={['#433c71ff', '#2c2d5e', '#272d5a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.item}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item?.first_name +" "+ item?.last_name}</Text>
            <Text style={styles.currency}>{item?.currency?.iso_code || "GBP(DUMMY)"}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.butnCont]} onPress={()=>onPressDelete(item)} >
              <Icon name="trash-outline" size={handleSize.f(20)} color={THEME.white} />
            </TouchableOpacity>
          <View style={{ transform: [{ rotate: '-45deg' }], marginLeft: 0 }}>
            <TouchableOpacity style={styles.butnCont}  onPress={onPressView}>
              <Icon name="arrow-forward-outline" size={ handleSize.f(20)} color={THEME.primary} />
              </TouchableOpacity>
          </View>
          </View>
        
        </LinearGradient>
      </View>
    );
  }

    function renderPopup(icon,title,btnTxt) {
    return (
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setOpen(false)}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <View style={styles.iconCircle}>
          <Icon name={icon} size={ handleSize.f(25)} color={THEME.textPrimary} />
        </View>

        <Text style={styles.titles}>{title}</Text>
        {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

        <CustomButton
          btnContSty={styles.forgetTxtpop}
          title={btnTxt}
          loading={isPendingDeleteBeneficiary}
          onPress={onPressDeleteBtn}
        />
      </View>
    );
  }

  function renderModalDelete() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={
          // renderPopup("warning","Are you sure you want to delete this beneficiary","Continue")

          <BluryModal
            style={{ flex: 1, paddingHorizontal:  handleSize.w(20) }}
            onClose={() => setOpen(false)}
            btnLoader={isPendingDeleteBeneficiary}
            marginTopTitle={20}
            iconNameBottom={-20}
            onConfirm={onPressDeleteBtn}
            body={"Are you sure you want to delete this beneficiary"}
            iconName={"warning-outline"}
            confirmText={'Delete'}
          />
        } 
        onClose={function () {
          setOpen(false);
        }}
      />
    );
  }
  
  return (
    <MainContainer
      pressRightArrow={pressRightArrow}
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      // refreshingeffect={true}
      // onRefresh={onRefresh}
      // refreshing={isFetchingBeneficiary}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />
      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Beneficiaries</Text>
        <Text style={styles.subtitle}>
          Manage your saved recipients for faster and easier payments.
        </Text>

          {isFetchingBeneficiary && !getBeneficiaryDetail_Data?.results?.length ? (
            <LoaderOnly />
          ) : (
          <FlatList
              data={getBeneficiaryDetail_Data?.results}
              renderItem={renderItem}
              // scrollEnabled
              // nestedScrollEnabled
              onEndReachedThreshold={0.1}
              onEndReached={() => {
                console.log("User reached the bottom!");
              }}
              keyExtractor={(item) => item?.id}
              ListEmptyComponent={()=>{
              return(
                <Text  style={styles.txtEmptyTxt} >No Beneficiary Found</Text>
              )
            }}
            />
        )}
      </View>

      {renderModalDelete()}
      {/* {renderModalView()} */}
    </MainContainer>
  );
};

export default BeneficiariesManagement;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },
  txtEmptyTxt: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: handleSize.h(20),
    marginBottom: handleSize.h(30),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.textPrimary,
    borderRadius: handleSize.f(12),
    padding: handleSize.h(12),
    marginBottom: handleSize.h(10),
  },
  avatar: {
    width: handleSize.w(40),
    height: handleSize.h(40),
    borderRadius: handleSize.f(14),
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: handleSize.w(12),
    marginLeft: handleSize.w(5),
  },
  avatarText: {
    color: THEME.textPrimary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
  },
  name: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  currency: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  forgetTxtpop: {
    backgroundColor: THEME.primary,
    width: '100%',
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },
  butnCont: {
    width: handleSize.w(35),
    height: handleSize.h(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.98)',
    borderRadius: handleSize.f(16),
    padding: handleSize.h(24),
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: handleSize.h(10), right: handleSize.w(15) },
  closeText: { fontSize: handleSize.f(FONT_SIZES.foureight), color: THEME.white },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(100),
    width: handleSize.w(56),
    height: handleSize.h(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    color: THEME.white,
    textAlign: 'center',
    lineHeight: handleSize.h(30),
    marginTop: handleSize.h(20),
  },
  description: {
    marginTop: handleSize.h(10),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    textAlign: 'center',
  },
});