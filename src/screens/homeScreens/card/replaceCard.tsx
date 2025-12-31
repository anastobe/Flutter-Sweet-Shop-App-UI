// ReplaceCardView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MainContainer, Modal } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { THEME, FONTFAMILY, FONT_SIZES } from '../../../styles';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import useReplaceCardViewModel from '../../../viewModels/homeViewModel/card/useReplaceCardViewModel';
import { REASON_OPTION } from '../../../utils/data';
import BluryModal from '../../../components/Modal/bluryModal';
import StatusBarManager from '../../../components/statusBarManager';
import Icon from 'react-native-vector-icons/Ionicons';
import { handleSize } from '../../../config/responsiveTheme';

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export default function ReplaceCard(props) {
  const navigation = useNavigation();
  const {
    reason,
    setReason,
    firstName,
    setFirstName,
    isPending,
    isPendingFreezUnFreezCard,
    pressBackArrow,
    reqReplacement,
    toggleDropdown,
    openDropdown,
    loginUserData,
    modalVisible, 
    setModalVisible,
    openConfirmationModal,
  } = useReplaceCardViewModel(navigation, props);

  function renderField() {
    return (
      <View>
        <InputField
          disabled={false} 
          placeholder="Reason for replacement" 
          value={reason} 
          enableDropdown={true}
          dropdownData={REASON_OPTION}
          margBtm={handleSize.h(15)}
          isOpen={openDropdown === 'currency'} 
          onToggleDropdown={() => toggleDropdown('currency')}
          onDropdownSelect={(item:any )=> setReason(item.label)}
        />
        <InputField
          marginTp={handleSize.h(20)}
          autoCapital={'none'}
          blurOnSubmit={false}
          placeholder="Full name"
          value={firstName}
          onChangeText={setFirstName}
          keyboardType={'default'}
          margBtm={handleSize.h(20)}
        />
      </View>
    );
  }

  function renderCardDetails() {
    return (
      <View style={styles.summaryBox}>
        <Text style={styles.labelHead}>Cards will be sent to your default address:</Text>
        <InfoRow 
          label="Address" 
          value={`${loginUserData.address_line1 || ""} ${loginUserData.address_line2 || ""} ${loginUserData.address_line3 || ""}`} 
        />
        <InfoRow label="City" value="DUMMY" />
        <InfoRow label="Postal Code" value={loginUserData.postcode || ""} />
        <InfoRow label="Country" value={loginUserData.county || ""} />
        <View style={styles.botmLine}></View>
        <Text style={styles.valueChangeTxt}>Change Address</Text>
      </View>
    );
  }

  function renderWarning() {
    return (
      <View style={styles.containerAlert}>
        <View style={styles.iconCont}>
          <Icon name={'alert-circle-outline'} size={handleSize.f(25)} color={THEME.primary} />
        </View>
        <Text style={styles.descriptionbelow}>
          Your existing card will be disabled when the new one is activated.
          If this card is lost or stolen, freeze it immediately.
        </Text>
      </View>
    );
  }

  function renderBtn() {
    return (
      <CustomButton
        btnContSty={styles.forgetTxt}
        loading={false}
        title="Request replacement"
        onPress={reqReplacement}
      />
    );
  }

  function renderPOPUP() {
    return(
      <BluryModal
        style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
        onClose={() => setModalVisible(false)}
        btnLoader={isPending || isPendingFreezUnFreezCard}
        marginTopTitle={handleSize.h(50)}
        onConfirm={openConfirmationModal}
        title={"Replace Card"}
        body={`Sure, You want to replace this card?`}
        iconName={""}
        confirmText={'Yes'}
      />
    )
  }

  function renderModal() {
    return (
      <Modal
        isVisible={modalVisible}
        isKeyboardAvoidingView={true}
        children={renderPOPUP()}
        onClose={() => {}}
      />
    );
  }

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />
      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Replace Card</Text>
        <Text style={styles.subtitle}>
          Request a new card to replace your current one. Your old card will be deactivated once the new card is activated.
        </Text>
        {renderField()}
        {renderCardDetails()}
        {renderWarning()}
        {renderBtn()}
      </View>
      {renderModal()}
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },
  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(30),
    lineHeight: handleSize.h(20),
  },
  forgetTxt: { marginTop: handleSize.h(20), marginBottom: handleSize.h(20) },
  infoRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  labelHead: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    marginVertical: handleSize.h(5),
  },
  botmLine: { height: handleSize.h(1), backgroundColor: THEME.lightGray },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  valueBox: {
    paddingHorizontal: handleSize.w(10),
    paddingVertical: handleSize.h(4),
    borderRadius: handleSize.f(8),
  },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
  },
  valueChangeTxt: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    color: THEME.primary,
    textAlign: "center",
    marginTop: handleSize.h(15),
    marginBottom: handleSize.h(5),
  },
  summaryBox: {
    borderRadius: handleSize.f(10),
    padding: handleSize.h(10),
    marginBottom: handleSize.h(10),
  },
  containerAlert: {
    flexDirection: 'row',
    paddingVertical: handleSize.h(15),
    paddingHorizontal: handleSize.w(10),
    borderRadius: handleSize.f(10),
    marginTop: handleSize.h(10),
    borderWidth: 0.4,
    borderColor: THEME.white,
  },
  descriptionbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    marginLeft: handleSize.w(5),
    lineHeight: handleSize.h(18),
    flex: 1,
  },
  iconCont: {
    width: handleSize.w(36),
    height: handleSize.w(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize.f(12),
  },
});
