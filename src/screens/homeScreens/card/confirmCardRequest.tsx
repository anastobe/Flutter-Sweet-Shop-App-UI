import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { BottomSheet, MainContainer, Modal } from '../../../components';
import { Images } from '../../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../../components/textInput';
import CustomButton from '../../../components/customButton';
import { scale } from 'react-native-size-matters';
import { HOME_ROUTES } from '../../../constants';
import { createCard } from '../../../queries/auth.query';

// InfoRow Component
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={icon} size={18} color={THEME.white} style={{ marginRight: 8 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueBox}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

function ConfirmCardRequest(props) {
  const navigation = useNavigation();
  const cardDetailRef = useRef(null);
  const [tick, setTick] = useState(false);
  const [open, setOpen] = useState(false);
  const payload = props?.route?.params?.data;

  const { mutate: createCardFunc, isPending } = createCard({
    callback: function (response) {
      if (response.success) {
        setOpen(true);
      }
    },
  });

  function pressBackArrow() {
    navigation.goBack();
  }

  function renderCardDetails() {
    return (
      <View style={styles.summaryBox}>
        <InfoRow icon="card-outline" label="Card Type" value="Visa" />
        <InfoRow icon="person-outline" label="Cardholder Name" value="John Doe" />
        <InfoRow icon="home-outline" label="Delivery Address" value="221B Baker Street" />
        <InfoRow icon="time-outline" label="Estimated Delivery" value="3–5 Business Days" />
        <InfoRow icon="pricetag-outline" label="Card Issuance Fee" value="£4.95 GBP" />
        <InfoRow icon="flash-outline" label="Delivery Fee" value="Free" />
      </View>
    );
  }

  function renderTotalAmount() {
    return (
      <>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalAmount}>£4.95 GBP</Text>
      </>
    );
  }

  function chooseFundingAcc() {
    return (
      <View style={styles.accountBox}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHEAjQMBEQACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAAAQIDBAUG/8QARBAAAQQBAgMEBgcEBgsAAAAAAQACAwQRBRIGITETQVGBFCJhcZGxByMyQlKh0RayweEVU2JygsIkMzRDY3SSk9Lw8f/EABsBAQACAwEBAAAAAAAAAAAAAAABBAIDBQYH/8QAPxEAAgEDAAQKCAQFBAMAAAAAAAECAwQRBRIhMSIyQVFhgZGxwdEGExQjM3Gh4RVSYvBCU3KC8RaSsuIkQ6L/2gAMAwEAAhEDEQA/AIgL2Z5YkAgHhCBoCqSV0cjWiN78gc2tyM7gDk93Ik+SpXNevTq0406esm9r5i1Ro0p05ynLDW5c5bhXUVQQAgBACASAEAFAJABQESEJEQgIFqAvCggkBlSAwgHgIC6LtG1bJa4hhDGuA7/WyPkq1aOatPrN9N4pz6u8pwrJoDCAMBAG1ALCAMIBIAQAgDCARCAWEJI4QFwCEDUAaAEBfWaHgRvPqvlYCAcEjn+qqXMmpLG/D8CzQSaed2V4nCq603sI5L8JgDyWiVvrMyOo8R1WcLlSk4veZztJJZjtOrE+OZgfC9sjD0c05BW9NPcVGmt6HhSYhhCchhALCkBhQAwgFhALBQCwpAFARwoJLkIGgBAGFIyaKbcyRuI/30Y+ap1fiY/S/AsUuJ/cjxLIYYYfTbcYnqPlkhdEybbIDg4PlnI9xWlty4ENj2HRSxtZMvv1rUd21K4FkMT+wd9W6zH4MIGCcePX2la1J01ijt8DKUFP4hv07iSGzKW2Wejxvc7spHnrg9D7fgrNO6XFe1lKrZ8sTs154bUfaVpWSs8WnKtqSe4pSi47GizapIEpIFhQAwgBCcghAsISIhBkipBcoAYQBhAx4Qg0VHkPhYB1mDh5Y/VU6nxZf0lqn8NL9XkeHirxMgNu0K9hhmkj9GMhDxyOHHHQczg+z4YZlJai2btpfeE8kKzHRDsdRbY9JkhY6ltw9rsu7x4HnjHf3LBTW6OMcvmZavOF2jDqEkl++2Jn1+yWKsRHK046hnhkfHKxlTi1qR342MlTa2sznWNTgLzqUz4WT7GRSNhDO2Y3kCDjqOWff3rVTxTlqveuXwMppTWTsVL+psdUijZYty2HEsikY074+4sLeZPiDlbZ3VWkpNYeOQwpWVCtUjGb1U+XmOvV1GCy7szmGUdY5BgrO10nRuHq8WXMzLSPo/d2UfWLhw/NHxXJ3dJrIwuicIMIBIAQAgEgEQpJLFABSGGFBAwgNFTc2euNuGumPrf9v9FSntqz6EvEtw2Qj0vyPF0nRU5BfL6lh3bva6pL6xxg+sR4c/kp2z93tW7aW9keERv0/RYYLrxusOgE1R8EmTE7cCNw7unQ+Kxk1U2x/h355USuDv5S6KxXkdHfvn0u6+aQW6swc3z3jvzk8vAeaMZTWrT2LkZLkovbtM97TXSU4xqUssbWV3T0Bs3tcSc4HgCR+vVYThGplQWeR+ZlGTjvMnBsszdYZC+4ynM0ONd73OADvDIzjkfhlc+9VV0/VrY+86ui6ttSr+srx1o4xj5/M9txBpWq2q4s3dPbalA5XaRDg/8Avtb88D9OJUjUXHjnpR6uzubNS/8AFq4/TLZ2N7vllnnKOtS1pDC8OeAdojlO1wPsJ+XNW7XStejweMuneU9JaAsbp67XqpPlxsfVu61jpOkNYd0fC1p9sisvT9T+Wu1+RVp+hFvNZVZtdCXmyA1kl+OxYR4iT+SmPpBPO2mu37E1PQWmovVrPPTFHTgsRTjMbgTjm3vC7tte0blZpvq5ew8Xf6Ku7CeLiGFz8j69xZhWsnOFhMgCgLMKSQUEBhAPCA1RPaX02DmY3Eu83D+AVDPDqvoXcXFxaXz8TwVKwyh6PqUEsMtmR8kclSWLcGsLcZOeueaznB1HqNPGzaW1LCyaSK9N3ZyejXnW67eydFKW9i8nvH4h0IPtTWlPbnVxv6URhR6cmN7rfDupWYXBxnlL45mODZW4c3q3rz/l568RliS4r2/JmeXue81tFVrZYWSG3K4M9GdWecNcT6zXAjOfYB1W1TcuHuXLkxaxs3sru17dzUYbYkL9RdP2ZgZFtky1vI4Ax3Y7lUuuBQlGmtmMpl2w9XK5g6zWM7eTYdGpxFxHopLZKs4A6tmrOAK877XVjxkeunoezuPgvD6Hld7Og3j/AE67E6vxDw7G9jurowCT5HHzUO4hPjRNS0Pc27xCo180zFFDRhnN3g7UuxJ+1Q1AYa72Nfnl7iR71jGpFPg/Uzq2N1q+8jlc8H4b/odan9IFes99biPh98ErDhzmxh372PmVtdWP8UTnRs6sn7mr9X9z0MOo8H6tEHxmgB/xIxGR54CRlRbytj7DJ0NKwTXCkuh6yfVt7jPqnDta5GP6J1CSE/dAdva//F188q3OtXnDEaj7SlbzoUKnvreL/tw/L6HIGm2tLY2C5L2juZBznl4A9+PErsaMlOVHE5ZaOHpn1DuZSpQxF7v8CK6Rxy3CkkMKMkBhSB4TIyXaU5h1Ct2jQG9q3c53TAkcD+QXNm/jS5vIvwi26UFvbXedNrODJw+OQaOARjO1gx4LkK9/X9T0H4Pe420ZdhFvDfButQFkTagsN6Graxz9wOD8FtV9PPHyitOwrQWZ02upoyWvo1o367nUdRswOxgteBKGux5FWPb5Naskn9Cv6lZyjjN4I1pkNmhBLQknDmyB5BjkeG9C0kYHXng8ityu6TkpzT711mDpyxiJlqaHr2lX4L17SZZnQSOklcZRIH9eZxk9/Xmtd1eQjQl6t55luLWj7RXF1CnUeqnnbs5nznYi46dHJ9Zp7gwfd9I3492Wrg+353xPVy9F3Hi1e1fc3N1/hvVo9mp0T63fNC135t5hPaKMuNE1z0NpKgvdTz8m13+BzL/COjSsdZ0Ow1zAfXZDYJczyJJWyNC3q8VlZ6Q0nZPFZPrXisFlPSJ3VsBzr8cH2q7wBIG9+x3TP9kjB9nVSqU6HFeVzMwq3lC9fvY6k/zLd1rm6d5mo6No2oG1HpUsotwSEuYxoB2kDBLCQfYQO8LV6qlW2xeP3zF2npK70elCtDWj+9zCpw1rkU7ZaNljGl3KQPLCD35ae/yK1ez1oS4LOhU01o64p++j1NZfU/ui51c1nvifYNl4cd8x++e88167R1B0bdRe/lPmumLyN3dynTWIrCS5kvvkirxzC5ACAEAIDZUgE9ypBG/bvgI37fsk73dO/mVyqnCo1ultHUoTVO5oSazjD7NoouAHiR5ZqbSSB1rkf5l532LZxj3i9KU38L/6/wCpn/YC6LT3xXa7j3tLCM+fNYys5rlNsfSahnbTa60/Ixv4X4l06521SRzTn1uwtYDvksVbVluN8tMaLrcddsc+Zdev8V0nwvm9JD2nMb3Vw8f9QHxGUdS4p7GRGx0NdxbptJ9DafY/Ivb9IGobAZaNft28pGkubk+5T7XNbMGH+maE9sZv6M10rvCusxPsX6tOraGC9kzg0nPgeWeh59VnCVCptkkmU7i30vaS9XSlKUeTG36bcd3MaHaFwpehdHBLAx5+yYLOSD7skH4LOVChJcFlanpTStCXvE2v1R8cJo8/qvA+oVWh9CWOwx3LdvLHNHn+q0OzmuKdej6Q2lWOpWi4vtX76iqrqGr8JBkl6SGSKTH+jz2N0r2+LcAkD3nClVK1LjbuYrztrC/yreLT/Mlhde5PqWeU5Z1KfVNaOvR12U5W8onxA/W46gnv68z5KaetVnrtYNd1KlZ0PZYvWb3t8i8DfY1Wxb12zLY1PtaPLs4WvLezOAQ0jPM9cjnzVu2cFcJ1Hlc373nLuPWqx1aMEpP+LZ38menBvaWyMD2ODge8L1kZKSzHceHnCVOWrJYY8LIxLFADCAMIBgISQpPm7OxJSL3WWQuMQibuId2PLHiclcSu5+y1XHnfedzR8acr+jGrxdmc7sFAv8WRObu/pQcuZ9Fcf8q89r3C5+w+iezaFl+T/d9yDNc4thkEjvTw05GXUuX7ietuOns+xj+H6Flucf8Af9zbFxbrwru9NptftGRI+u6P8+iyjdVo70aKmgdHVXilUw+iSf3LdM+kYiR1PUtOLARlr4pc/kR/FbFet7WinP0ZltjCpt6V458DpDjLh6wwwalXe0/ddNXDgfhlZO5oy3r6FdaD0jRfAa6pY8jLqM/CuqVjXZPFUfncyZkG0tPt5DI9ixqO3nHGcdRZs6WmbSr6xwclypyz4s83+yrJLDTW17TJ8/d3YJ8iVpjRg/4kdKrpS4p8KdvNd3cegs6fxNU0XazVjJ2OHR4rl3qjqN+QTy8QVdpUqi2a/wC+081dXlpVnrRo6r5dvhg8RfhjtXn3dVnMz3YHrv2tAHd/JbJWsM61SRNK+raip28MJc20pu6k+Ko5lCJ5jjGQ4tw2P3A9VVqVqceDBl6ho24re9qxaW/pYuC9LsvsSatKdjIhy7Qn6wnx9nX/ANwtttCUJKe5lPSNxCcPUR3Pf5Hr4LENuITV3F0bievUHvB9xXqreqqtNTR4i4oSoVHBomt5pJqCQQAgGOXPwQZNNOzFpNmW06IuZBC1xYw8yeyYOXmuJVqali5vn8TuWltK60hGhF4bXgaX/SFWDQ0abOSR3SNXEV4uY9f/AKWq/wA1djMrvpGrxtzJp7hz/r28/wAk9uWcYEvRaaWXVXZ9zVp/0iadYkLX1ZdmOZZI1+PJS7uL3xNT9Gq2+nUi+37luofspqm2zFFQc8/aa8dk/wDgtkPZqm/BXqR0xafmwv7l4kJuFNDs1Wy1jIB3tjmL/hnJ8kdpSb2d4j6QX9N8PD+a8sHMdwfTjjzVu2Wbv6yIHHlyWDsI/mLVP0pqrfSXVleZldwlYJ2tvwHPQvhLQfPJwtfsEuSRcj6VQe+k+p/ZE4+G9ailEdO8yKTvYLL4s+7lg+RWDtKsdzNsdPaOqr3tN5/pTKv2K1H0jddsQxRnnu3Okd8O/wCKKzqSfCZnP0is6ccUYNvmwkvH6I1j9mdBDjNNBJO3nusygu9+zu8hlWI0qFLe9pxbjSGk77Yk4xfNsXW3vPMarqT+IZ46Oh13V9Pa7MkrW7TIe857h3Y/+LJOrcz1Ka/x0inaW9jS9fcy2Lv5lzv6Led6lVZSqR14/ssGM+J8V6q2oqhSjTjyHhry7nd15Vp739OZdRaVvKpZhQAwgHhARmO2vK78LCfyUSeEZLeIvEzHNeMtnc6Mg94bn/xXMo06dW2jTqLKfmzpe01rW6dai8SXL9OUqGn1Ac+jxkjpuGfmt0NHWsXlQXebKvpBpOpHVdeXVs7sMt9Hh27exjx4bQrPs9LGNVY+SKPt10pa3rZZ/qfmZpNJ0+QgupxNP4mDaR5hV5aPtZf+tFuGm9IwaarS63nvyVS6LVkjMe6VrT/bzj45VSehLZrg5XX5nVoemGkaeyeJfNY7sGSLQrVcOZBqJDM8sM2kfA/oqj0HJPg1Pp9zoR9M4zjitQz1p98TTWoarX+xxBdZ7Gudj4F2Fuhoaa31X++spVvSahPZG0j148Io3Rv1doxLr12UeBaz+IK2/hL/AJj+hS/G6XLbR7X9iThNJHsmu2pAPGUgj3Ywt0dGUlxm31+WDRPTdZvNOEI/25/5aw/W7HsXTWJI/wAEk73D8yt6sLfGNXPzy+8rfit3raylh9CS7kihtKozmyrCD7GBZRsbaO1U12IyqaY0hUWJ15Nf1MvGAMNAA8ArKSW45zbk8tiUkCKAtAUAaAEBXabvqzMHIuY4D4LVVeINmdNZmkKCEsZtkO57JZOf+J36rRaRXqYm65k3VkWq2VgUgEAIAQCQBhALCASACpAkAICKAuCgDWIBASY3dJG38UjG/FwC0XDxSl8mbqHxY/Mgw7m7vxEn4nKm3WKUV0EVnmpL5jW41DQkSAEIwCDAKcgEyBFAGFIEQgEQgIlAIqQWhYsDUEoYQMsg/wBpr/8AMRfvhV7n4Uvkbrb4sfmUV/8AUM/urZS4i+Rrq8d/MmthiCACgEgBACEAgAqQJABQESpBFAIoD//Z" }} style={styles.flag} />
          <View>
            <Text style={styles.accountText}>Choose Funding Account</Text>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: THEME.secondary_hover,
                  borderRadius: 6,
                  padding: 2,
                  marginTop: 2,
                }}
              >
                <Text style={styles.badgeText}>GBP</Text>
              </View>
              <Text style={styles.accountTextbelow}>Clearbank Account</Text>
            </View>
          </View>
        </View>

        <View style={{ marginRight: 10 }}>
          <Icon name="caret-down" size={20} color={THEME.white} />
        </View>
      </View>
    );
  }

  function renderConfirmation() {
    return (
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setTick(!tick)} style={styles.checkbox}>
          {tick ? <Icon name="checkmark-outline" size={18} color={THEME.white} /> : null}
        </TouchableOpacity>
        <Text style={styles.confirmText}>
          I confirm that <Text style={styles.boldText}>£4.95</Text> will be deducted from my
          account to issue my physical card.
        </Text>
      </View>
    );
  }

  function renderButton() {
    return (
      <View>
        <CustomButton
          btnContSty={styles.forgetTxt}
          loading={isPending}
          title="Pay"
          onPress={function () {
            setOpen(true);
            createCardFunc(payload);
          }}
        />
      </View>
    );
  }

  function renderPopup() {
    return (
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setOpen(false)}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <View style={styles.iconCircle}>
          <Icon name="checkmark" size={25} color={THEME.textPrimary} />
        </View>

        <Text style={styles.titles}>Card Created Successfully.</Text>
        <Text style={styles.description}>Virtual card created and ready to use.</Text>

        <CustomButton
          btnContSty={styles.forgetTxtpop}
          title="Manage Card"
          onPress={function () {
            navigation.navigate(HOME_ROUTES.TABSTACK);
          }}
        />
      </View>
    );
  }

  function renderModal() {
    return (
      <Modal
        isVisible={open}
        isKeyboardAvoidingView={true}
        children={renderPopup()}
        onClose={function () {
          setOpen(false);
        }}
      />
    );
  }

  return (
    <MainContainer
      showBackArrow={true}
      pressBackArrow={pressBackArrow}
      isFlatList={true}
      barStyle="dark-content"
      mainContainerStyle={styles.container}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.title}>Confirm Card Request</Text>
        <Text style={styles.subtitle}>
          A small fee will be deducted from your account to issue and ship your card.
        </Text>

        {renderCardDetails()}
        {renderTotalAmount()}
        {chooseFundingAcc()}
        {renderConfirmation()}
        {renderButton()}
        {renderModal()}
      </View>
    </MainContainer>
  );
}

export default ConfirmCardRequest;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  title: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.primary,
    marginBottom: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: FONT_SIZES.onesix,
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: 10,
  },
  forgetTxt: { marginTop: 30, marginBottom: 50 }, forgetTxtpop:{ backgroundColor: THEME.primary, width: '100%', marginTop: 20, marginBottom: 20 },
  summaryBox: { borderRadius: 1, padding: 10, marginBottom: 10 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  valueBox: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  value: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onefour,
    color: THEME.white,
  },
  totalLabel: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.white,
  },
  totalAmount: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.threetwo,
    color: THEME.primary,
    marginBottom: 30,
  },
  accountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: THEME.white,
    borderRadius: 16,
    height: 60,
    marginBottom: 10,
  },
  flag: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 16,
    marginLeft: 10,
  },
  accountText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: FONT_SIZES.onetwo,
    color: THEME.white,
  },
  accountTextbelow: {
    fontFamily: FONTFAMILY.Light,
    fontSize: FONT_SIZES.onesix,
    color: THEME.primary,
    marginLeft: 5,
  },
  badgeText: {
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16,    marginBottom: 20 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: THEME.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  confirmText: {
    flex: 1,
    color: THEME.primary,
    fontSize: FONT_SIZES.onetwo,
    fontFamily: FONTFAMILY.Medium,
 
  },
  boldText: { fontWeight: 'bold' },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.95)',
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
    color: THEME.primary,
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    fontFamily: FONTFAMILY.Regular,
    fontSize: FONT_SIZES.onefour,
    color: THEME.primary,
    textAlign: 'center',
  },
});
