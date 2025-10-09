import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MainContainer } from "../../../components";
import { FONT_SIZES, FONTFAMILY, THEME } from "../../../styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useMakePaymentViewModel } from "../../../viewModels/homeViewModel/payment/useMakePaymentViewModel";

const MakePayment = () => {
  const { PAYMENT_OPTION, pressBackArrow, handleNavigate } = useMakePaymentViewModel();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleNavigate(item.route)} style={styles.item}>
      <View style={styles.avatar}>
        <Icon name={item.icon} size={30} color={THEME.white} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.currency}>{item.detailTxt}</Text>
      </View>
      <View style={{ transform: [{ rotate: "-45deg" }] }}>
        <Icon name="arrow-forward-outline" size={20} color={THEME.white} />
      </View>
    </TouchableOpacity>
  );

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Make a Payment</Text>
        <Text style={styles.subtitle}>
          Send money locally or internationally, or transfer between your own accounts.
        </Text>

        <FlatList
          data={PAYMENT_OPTION}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </MainContainer>
  );
};

export default MakePayment;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME.whitergba,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  name: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  currency: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
});
