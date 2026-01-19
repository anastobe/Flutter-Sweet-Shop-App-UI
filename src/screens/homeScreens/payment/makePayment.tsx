import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { MainContainer } from "../../../components";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../../styles";
import { useMakePaymentViewModel } from "../../../viewModels/homeViewModel/payment/useMakePaymentViewModel";
import { Images } from "../../../config";
import StatusBarManager from "../../../components/statusBarManager";
import { handleSize } from "../../../config/responsiveTheme";

const MakePayment = () => {
  const { PAYMENT_OPTION, pressBackArrow, handleNavigate } =
    useMakePaymentViewModel();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleNavigate(item.route, item.key)}
      style={styles.item}
      activeOpacity={0.8}
    >
      <View style={styles.avatar}>
        <Image
          source={item.icon}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.currency}>{item.detailTxt}</Text>
      </View>

      <Image style={styles.arrow} source={Images.arrow} />
    </TouchableOpacity>
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

      <View style={{ marginHorizontal: handleSize.w(20) }}>
        <Text style={styles.title}>Make payment</Text>

        <Text style={styles.subtitle}>
          Send money locally or internationally, or transfer between your own accounts.
        </Text>

        <FlatList
          data={PAYMENT_OPTION}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </MainContainer>
  );
};

export default MakePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white,
  },

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
    lineHeight: handleSize.h(20),
    marginBottom: handleSize.h(30),
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.whitergba,
    borderRadius: handleSize.f(12),
    padding: handleSize.h(12),
    marginBottom: handleSize.h(10),
  },

  avatar: {
    width: handleSize.w(40),
    height: handleSize.h(40),
    borderRadius: handleSize.f(14),
    justifyContent: "center",
    alignItems: "center",
    marginRight: handleSize.w(12),
  },

  icon: {
    width: handleSize.w(36),
    height: handleSize.h(36),
  },

  name: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },

  currency: {
    marginTop: handleSize.f(4),
    fontSize: handleSize.f(FONT_SIZES.onetwo),
    lineHeight: handleSize.h(15),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },

  arrow: {
    width: handleSize.w(24),
    height: handleSize.h(24),
  },
});
