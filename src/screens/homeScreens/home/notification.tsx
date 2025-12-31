import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { MainContainer } from '../../../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNotificationViewModel } from '../../../viewModels/homeViewModel/home/useNotificationViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import { CommonUtils, Toast } from '../../../utils';
import { TouchableOpacity } from 'react-native';
import { LoaderOnly } from '../../../components/activityIndicator';
import { useNotificationModal } from '../../../components/notificationModalContext';
import { useDispatch } from 'react-redux';
// import { setPendingTransaction } from '../../../Redux/Action/Notification/notificationActions';
import commonUtils from '../../../utils/common.utils';
import { enqueueTransaction } from '../../../Redux/Action/Notification/notificationActions';

const Notification = () => {
  
  const dispatch = useDispatch()
  const { openModal } = useNotificationModal();
  const {  
    pressBackArrow, 
    getNotificationIconAndColor,    
    notification,
    isPending,
    hasMore,
    onLoadMore,

 } = useNotificationViewModel();

 console.log("useNotificationViewModel==>",notification);
 

  function onPressItem(item: any) {
    if (item?.data?.is_modal === 'yes') {

    let backendTime = item?.data?.challenge_expiry_datetime
    const isValid = commonUtils.isTimeRemaining(backendTime);

      if (isValid) {
        dispatch(enqueueTransaction(item?.data))
        // openModal({
        //   transaction_amount: item.data.transaction_amount,
        //   transaction_currency_code: item.data.transaction_currency_code,
        //   transaction_pan: item.data.transaction_pan,
        //   card_acceptor_name: item.data.card_acceptor_name,
        //   sp_transaction_id: item.data.sp_transaction_id,
        //   challenge_expiry_datetime: item?.data?.challenge_expiry_datetime
        // });
      }
      else{
        Toast.showToast("Request Time out", '', 'error');
      }

    }
  }

  const renderItem = ({ item }: { item: any }) => {
    const { icon, color } = getNotificationIconAndColor(item?.type);


    return (
      <TouchableOpacity onPress={()=>{ onPressItem(item) }} style={styles.notificationBox}>
        <View style={{ width: handleSize.w(38), height: handleSize.h(38), backgroundColor: THEME.primary, justifyContent: "center", alignItems: "center", borderRadius: handleSize.w(8), marginRight: handleSize.w(14) }} >
          <Icon name={icon} size={handleSize.f(24)} color={color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.message}>{item?.title}</Text>
          <Text style={styles.message2}>{item?.body}</Text>
          <Text style={styles.time}>{CommonUtils.timeHumanize(item?.created_at)}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  console.log("!isPending && !notification?.length==>",isPending , !notification?.length );
  

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      // isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}>
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />
        <View style={{ marginHorizontal: 20 }}>
            <FlatList
              data={notification}
              contentContainerStyle={{ paddingBottom: handleSize.h(20) }}
              showsVerticalScrollIndicator={false}
              // keyExtractor={(item) => item?.id?.toString()}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}

              onEndReached={onLoadMore}              // ✅ pagination trigger
              onEndReachedThreshold={0.1}            // ✅ scroll threshold
              ListEmptyComponent={() =>{
                if (!isPending && !notification?.length) {
                  return(
                    <Text style={styles.messageEmpty}>No notifications</Text>
                  )
                }
              }}
              ListFooterComponent={() =>
                isPending && hasMore ? (
                  <View style={{ marginVertical: handleSize.h(10) }} >
                    <LoaderOnly />
                  </View>
                ) : null
              }
              />
        </View>
    </MainContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: THEME.whitergba,
    borderRadius: 10,
  },
  message: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
  },
  message2:{
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  messageEmpty:{
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
    textAlign: "center",
    marginTop: handleSize.h(20)
  },
  time: {
    fontSize: FONT_SIZES.onefour,
    fontFamily: FONTFAMILY.Medium,
    color: THEME.white,
  },
  separator: { height: 10 },
});
