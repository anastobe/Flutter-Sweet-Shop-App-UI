import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { MainContainer, Modal } from '../../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../../styles';
import { useBeneficiariesManagementViewModel } from '../../../../viewModels/homeViewModel/more/useBeneficiariesManagementModel';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../../../components/customButton';

const BeneficiariesManagement = () => {
  const { data, pressBackArrow, pressRightArrow, onBeneficiaryPress, open, setOpen,open2, setOpen2,onPressDelete ,onPressView } =
    useBeneficiariesManagementViewModel();


  function renderItem({ item }: any) {
    const initials = item.name
      .split(' ')
      .map((n: any) => n[0])
      .join('');

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
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.currency}>{item.currency}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.butnCont]} onPress={onPressDelete} >
              <Icon name="trash-outline" size={20} color={THEME.primary} />
            </TouchableOpacity>
          <View style={{ transform: [{ rotate: '-45deg' }], marginLeft: 15 }}>
            <TouchableOpacity style={styles.butnCont}  onPress={onPressView}>
              <Icon name="arrow-forward-outline" size={20} color={THEME.primary} />
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
          <Icon name={icon} size={25} color={THEME.textPrimary} />
        </View>

        <Text style={styles.titles}>{title}</Text>
        {/* <Text style={styles.description}>Virtual card created and ready to use.</Text> */}

        <CustomButton
          btnContSty={styles.forgetTxtpop}
          title={btnTxt}
          onPress={onPressDelete}
        />
      </View>
    );
  }

  function renderModalDelete() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={renderPopup("warning","Are you sure you want to delete this Beneficiary","Continue")} 
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
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Beneficiaries</Text>
        <Text style={styles.subtitle}>
          Manage your saved recipients for faster and easier payments.
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      {renderModalDelete()}
      {/* {renderModalView()} */}
    </MainContainer>
  );
};

export default BeneficiariesManagement;

const styles = StyleSheet.create({
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
    marginBottom: 50,
  },
  container: { flex: 1, backgroundColor: THEME.white },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.textPrimary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: THEME.textPrimary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
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
  forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: 20, marginBottom: 20 },
  butnCont:
  { width: 37, height:40, justifyContent: "center", alignItems: "center" },

  
    modal: {
      backgroundColor: 'rgba(64, 64, 65, 0.98)',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
    },
    closeBtn: { position: 'absolute', top: 10, right: 15 },
    closeText: { fontSize: FONT_SIZES.foureight, color: THEME.white },
    iconCircle: {
      backgroundColor: THEME.primary,
      borderRadius: 100,
      width: scale(55),
      height: scale(55),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    titles: {
      fontFamily: FONTFAMILY.SemiBold,
      fontSize: FONT_SIZES.twosix,
      color: THEME.white,
      textAlign: 'center',
      lineHeight: 30,
      marginTop: 20
    },
    description: {
      marginTop: 10,
      fontFamily: FONTFAMILY.Regular,
      fontSize: FONT_SIZES.onefour,
      color: THEME.white,
      textAlign: 'center',
    },


});
