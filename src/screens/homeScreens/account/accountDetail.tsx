import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  ImageBackground,
} from 'react-native';
import { BottomSheet, MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, METRICS, THEME } from '../../../styles';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '../../../config/images';
import AccountCardzoom from '../../../components/accountCardzoom';
import CardDetailOptions from '../../../components/cardDetailOptions';
import AccountDetailsCard from '../../../components/bottomSheet/accountDetailsCard';
import { useAccountDetailViewModel } from '../../../viewModels/homeViewModel/account/useAccountDetailViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';

const AccountDetail = () => {
  const {
    manageRef,
    pressBackArrow,
    Sendoption,
    CARD_DETAIL,
    SPECIFIC_ACCOUNT_DETAIL,
    onPressCard,
    onPressShare,
    onPressCopy,
  } = useAccountDetailViewModel();

  const renderCardStyle = () => (
    <FlatList
      data={CARD_DETAIL}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <AccountCardzoom
          onPressCard={(data: any) => onPressCard(data)}
          item={item}
          index={index}
        />
      )}
    />
  );

  const renderCardFeature = () => (
    <CardDetailOptions features={Sendoption} iconColor={THEME.prinkishBlue} />
  );

  const TransactionList = () => (
    <SectionList
      sections={SPECIFIC_ACCOUNT_DETAIL}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.sectionLeft}>
            <View style={styles.iconCONT}>
              <Icon name="repeat-outline" size={handleSize.f(20)} color={THEME.white} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Text style={styles.amount}>{item.amount}</Text>
        </View>
      )}
      contentContainerStyle={{ marginHorizontal: 20, paddingBottom: 100 }}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );

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

      <Text style={styles.title}>Account details</Text>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={styles.subtitle}>Primary GBP Wallet</Text>
      </View>

      {renderCardStyle()}
      {renderCardFeature()}
      {TransactionList()}

      {/* Bottom Sheet */}
      <BottomSheet
        height={METRICS.height / 1.3}
        draggable={false}
        openTime={500}
        closeDuration={500}
        bottomSheetRef={manageRef}
      >
        <ImageBackground
          resizeMode="cover"
          source={Images.addCardGradient}
          style={styles.container}
        >
          <AccountDetailsCard
            onPressShare={onPressShare}
            onPressCopy={onPressCopy}
            details={[
              {
                label: 'Account name',
                value: 'Primary GBP Wallet',
                bold: true,
                copy: true,
                onCopy: () => console.log('Copied!'),
              },
              {
                label: 'IBAN',
                value: 'GB29 NWBK 6016 1331 9023 29',
                copy: true,
                onCopy: () => console.log('IBAN copied!'),
              },
              { label: 'SWIFT code', value: 'NWBKGB2L' },
              { label: 'Currency', value: 'GBP' },
              {
                label: 'Account type',
                value: 'Personal – Multi-Currency',
                bold: true,
              },
              { label: 'Created cards', value: '18 February 2024', bold: true },
              {
                label: 'Linked cards',
                value: 'Business Visa (**** 1234)',
                bold: true,
              },
            ]}
          />
        </ImageBackground>
      </BottomSheet>
    </MainContainer>
  );
};

export default AccountDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.threezero,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginTop: 10,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 20,
    backgroundColor: THEME.primary,
    borderRadius: 6,
    padding: 3,
  },
  item: {
    borderWidth: 1,
    borderColor: THEME.lightGrey,
    borderRadius: 10,
       height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sectionLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCONT: {
    width: 32,
    height: 32,
    backgroundColor: THEME.darkOffWhite,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginLeft: 10,
  },
  amount: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.primary,
  },
  header: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Light,
    color: THEME.primary,
    marginVertical: 5,
  },
});
