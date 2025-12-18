import React, { useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { useBeneficiariesManagementViewModel } from '../../../../viewModels/homeViewModel/more/useBeneficiariesManagementModel';
import CustomButton from '../../../../components/customButton';
import { LoaderOnly } from '../../../../components/activityIndicator';
import BluryModal from '../../../../components/Modal/bluryModal';
import StatusBarManager from '../../../../components/statusBarManager';
import { handleSize } from '../../../../config/responsiveTheme';

const BeneficiariesManagement = () => {
  const {
    pressBackArrow,
    pressRightArrow,
    open,
    setOpen,
    onPressDelete,
    onPressDeleteBtn,
    beneficiaries,
    onLoadMore,
    isPending,
    isPendingDeleteBeneficiary,
    onRefresh,
    refreshing,
  } = useBeneficiariesManagementViewModel();

  /** 🔒 prevent multiple onEndReached calls */
  const onEndReachedCalledDuringMomentum = useRef(false);

  function renderItem({ item }: any) {
    const initials = `${item?.first_name} ${item?.last_name}`
      .split(' ')
      .map((n: any) => n[0])
      .join('');

    return (
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
          <Text style={styles.name}>
            {item?.first_name} {item?.last_name}
          </Text>
          <Text style={styles.currency}>
            {item?.currency?.iso_code || 'GBP'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.butnCont}
          onPress={() => onPressDelete(item)}
        >
          <Icon name="trash-outline" size={20} color={THEME.white} />
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  function renderModalDelete() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView
        onClose={() => setOpen(false)}
      >
        <BluryModal
          style={{ flex: 1, paddingHorizontal: handleSize.w(20) }}
          onClose={() => setOpen(false)}
          btnLoader={isPendingDeleteBeneficiary}
          onConfirm={onPressDeleteBtn}
          body="Are you sure you want to delete this beneficiary?"
          iconName="warning-outline"
          confirmText="Delete"
        />
      </Modal>
    );
  }

  console.log("isPending==>", isPending ,"&&", beneficiaries.length );
  

  return (
    <MainContainer
      pressRightArrow={pressRightArrow}
      showBackArrow
      isFlatList={false}
      pressBackArrow={pressBackArrow}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary}
        barStyle="light-content"
      />

      <View style={{ paddingHorizontal: handleSize.w(20), flex: 1 }}>
        <Text style={styles.title}>Beneficiaries</Text>
        <Text style={styles.subtitle}>
          Manage your saved recipients for faster payments.
        </Text>

      <FlatList
        data={beneficiaries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // refreshing={refreshing}
        // onRefresh={onRefresh}
        nestedScrollEnabled
        onEndReachedThreshold={0.3}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum.current) {
            onLoadMore();
            onEndReachedCalledDuringMomentum.current = true;
          }
        }}
        ListFooterComponent={() => {
          // Show loader at the bottom only if list has items
          if (isPending && beneficiaries.length > 0) {
            return <LoaderOnly />;
          }
          return null;
        }}
        ListEmptyComponent={() => {
          // Show loader in the middle if list is empty and loading
          if (isPending) return <LoaderOnly />;

          // Show empty text if not loading and list is empty
          return <Text style={styles.txtEmptyTxt}>No Beneficiary Found</Text>;
        }}
      />

      </View>

      {renderModalDelete()}
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
    // height: 100,
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
  closeBtn: {
    position: 'absolute',
    top: handleSize.h(10),
    right: handleSize.w(15),
  },
  closeText: {
    fontSize: handleSize.f(FONT_SIZES.foureight),
    color: THEME.white,
  },
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
