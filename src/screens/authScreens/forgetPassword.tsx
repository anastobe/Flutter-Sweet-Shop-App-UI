import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/customButton';
import Images from '../../config/images';
import { Auth_ROUTES } from '../../constants';
import { FONTFAMILY, FONT_SIZES, METRICS, THEME } from '../../styles';
import { MainContainer, Modal } from '../../components';
import InputField from '../../components/textInput';
import { scale } from 'react-native-size-matters';
import { useForgetPasswordViewModel } from '../../viewModels/authViewModel/useForgetPasswordViewModel';
import StatusBarManager from '../../components/statusBarManager';
import { handleSize } from '../../config/responsiveTheme';
import BluryModal from '../../components/Modal/bluryModal';

export const ForgetPassword: React.FC = () => {
  const navigation = useNavigation();
  const vm = useForgetPasswordViewModel(navigation);

  function renderPOPUP() {
    return (
      <BluryModal
        style={{ flex: 1, paddingHorizontal: 20 }}
        onClose={vm.closePopup}
        btnLoader={false}
        botmBtmLoader={false}
        body={`If an account exists for ${vm.email}, an email with password reset instructions has been sent. The link will be valid for 60 minutes.`}
        marginTopTitle={20}
        onConfirm={() => {
          vm.closePopup()
          setTimeout(() => {
            navigation.navigate(Auth_ROUTES.FORGET_PASS_RESET)
          }, 500);
        }}
        iconNameBottom={1}
        title={"Check Your Email"}
        iconName={'mail-outline'}
        confirmText={'Reset Password'}
        showCancelBtn={false}
        downConfirmText={'REJECT'}
      />

    );
  }

  function renderModal() {
    return (
      <Modal
        isVisible={vm.Open}
        isKeyboardAvoidingView={true}
        children={renderPOPUP()}
        onClose={() => console.log('close')}
      />
    );
  }

  return (
    <MainContainer
      isFlatList={true}
      barStyle="dark-content"
      customeStyle={{ paddingHorizontal: 20 }}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager 
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />
      <Image source={Images.logo} style={styles.logo} />

      <Text style={styles.title}>Forgot Your{`\n`}Password?</Text>
      <Text style={styles.titlesub}>
        No problem. Enter the email address associated with your Frontier Pay account, and we'll
        send you a link to reset your password.
      </Text>

      <InputField
        disabled={!vm.isPending_ResetPasswordLink}
        marginTp={20}
        autoCapital={'none'}
        blurOnSubmit={false}
        placeholder="Email address"
        value={vm.email}
        onChangeText={vm.setEmail}
        keyboardType={'email-address'}
        margBtm={0}
      />

      <CustomButton
        loading={vm.isPending_ResetPasswordLink}
        btnContSty={styles.forgetTxt}
        title="Send Reset Link"
        onPress={vm.handleSendResetLink}
      />

      <TouchableOpacity onPress={() => {
        if (vm.isPending_ResetPasswordLink) {
         return
        }
        else{
          navigation.goBack()
        }
      }}>
        <Text style={styles.forgotText}>Back to Login</Text>
      </TouchableOpacity>

      {renderModal()}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.white,
  },
  logo: {
    width: handleSize.w(METRICS.width),
    height: handleSize.h(56),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: handleSize.h(45),
  },
  forgetTxt: { marginTop: handleSize.h(20), marginBottom: handleSize.h(20), width: '100%' },
  title: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.threesix,
    marginBottom: scale(10),
    marginTop:  handleSize.h(90),
    textAlign: 'center',
    lineHeight: handleSize.h(35),
  },
  titlesub: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    marginBottom: handleSize.h(40),
    textAlign: 'center',
  },
  forgotText: {
    color: THEME.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onesix,
    textAlign: 'center',
    marginTop: handleSize.h(10),
    paddingBottom: handleSize.h(40),
  },
  modal: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: 24,
    color: '#888',
  },
  iconCircle: {
    backgroundColor: '#a1f0ff',
    borderRadius: 50,
    width: scale(48),
    height: scale(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
});

export default ForgetPassword;
