import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { MainContainer } from '../../../components';
import { THEME } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNotificationViewModel } from '../../../viewModels/homeViewModel/home/useNotificationViewModel';
import StatusBarManager from '../../../components/statusBarManager';
import { handleSize } from '../../../config/responsiveTheme';
import { CommonUtils } from '../../../utils';
import { TouchableOpacity } from 'react-native';
import { LoaderOnly } from '../../../components/activityIndicator';
import { useNotificationModal } from '../../../components/notificationModalContext';

const Notification = () => {
  const {openModal} = useNotificationModal();
  const { notifications, pressBackArrow, getNotificationIconAndColor, getNotifications_Data,isFetchedNotification } = useNotificationViewModel();

  function onPressItem(item: any) {
      openModal({
        transaction_amount: "1234",
        transaction_currency_code: "1234",
        transaction_channel: "1234",
      });
  }

  const renderItem = ({ item }: { item: any }) => {
    const { icon, color } = getNotificationIconAndColor(item?.type);


    return (
      <TouchableOpacity onPress={()=>{ onPressItem(item) }} style={styles.notificationBox}>
        <Icon name={icon} size={handleSize.f(24)} color={color} style={{ marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.message}>{item?.title}</Text>
          <Text style={styles.time}>{CommonUtils.timeHumanize(item?.created_at)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainContainer
      showBackArrow
      pressBackArrow={pressBackArrow}
      isFlatList
      barStyle="dark-content"
      mainContainerStyle={styles.container}>
      <StatusBarManager
        backgroundColor={THEME.darkSecondary} 
        barStyle="light-content" 
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ marginHorizontal: 20 }}>
          {/* {isFetchedNotification ? (
            <LoaderOnly />
          ) : ( */}
          <FlatList
            data={getNotifications_Data}
            keyExtractor={(item) => item?.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          {/* )} */}
        </View>
      </ScrollView>
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
    fontSize: 14,
    color: THEME.white,
    fontWeight: '500',
  },
  time: {
    fontSize: 12,
    color: THEME.white,
    marginTop: 4,
  },
  separator: { height: 10 },
});
