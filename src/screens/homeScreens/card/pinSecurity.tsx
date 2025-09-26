import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { Picker } from '@react-native-picker/picker';
import { Auth_ROUTES } from '../../../constants';


const PinSecurity = () => {

    const navigation = useNavigation()
    const [newPin, setnewPin] = useState(false);
    const [confirmPin, setconfirmPin] = useState(false);

    function pressBackArrow() {
        navigation.goBack()
    }

    function renderField() {
        return (
            <View>
                <InputField
                    marginTp={20}
                    autoCapital={'none'}
                    blurOnSubmit={false}
                    placeholder="New PIN"
                    value={newPin}
                    onChangeText={setnewPin}
                    keyboardType={'numeric'}
                    margBtm={20}
                />

                <InputField
                    marginTp={20}
                    autoCapital={'none'}
                    blurOnSubmit={false}
                    placeholder="Confirm New PIN"
                    value={confirmPin}
                    onChangeText={setconfirmPin}
                    keyboardType={'numeric'}
                    margBtm={20}
                />
            </View>
        )
    }

    function renderBtn() {
        return(
        <CustomButton
        btnContSty={styles.forgetTxt}
        title="Update PIN"
        onPress={() => {
          console.log("Login pressed");
        }}
      />

        )
    }

    return (
        <MainContainer showBackArrow={true} pressBackArrow={pressBackArrow} isFlatList={true} barStyle="dark-content" mainContainerStyle={styles.container}>
            <View style={{ marginHorizontal: 20 }} >

                <Text style={styles.title}>PIN & Security</Text>
                <Text style={styles.subtitle}>Manage your card's PIN and extra security options..</Text>

                {renderField()}
                {renderBtn()}

            </View>
        </MainContainer>
    )
}

export default PinSecurity;

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
    subtitle:
    {
        fontSize: FONT_SIZES.onesix,
        fontFamily: FONTFAMILY.Light,
        color: THEME.white,
        marginBottom: 20,
    },
      forgetTxt:
  { marginTop: 20, marginBottom: 20 },



});
