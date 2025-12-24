import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';
import {  getNotifications } from '../../../queries/homeQueries/homeQuery';
import { useDispatch } from 'react-redux';
import { getBeneficiaryDetail } from '../../../queries/moreQueries/moreQuery';

export const useNotificationViewModel = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const FOCUS = useIsFocused();
  const [notification, setnotification] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  //   const [notification] = useState([
  //   { id: '1', type: 'credit', message: 'You received £250.00 from John', time: '2 min ago' },
  //   { id: '2', type: 'debit', message: 'You sent £100.00 to Sarah', time: '10 min ago' },
  //   { id: '3', type: 'failed', message: 'Transaction of £50.00 failed', time: '1 hr ago' },
  //   { id: '4', type: 'credit', message: 'Salary credited £1,200.00', time: 'Yesterday' },
  //   { id: '5', type: 'credit', message: 'You received £250.00 from John', time: '2 min ago' },
  //   { id: '6', type: 'debit', message: 'You sent £100.00 to Sarah', time: '10 min ago' },
  //   { id: '7', type: 'failed', message: 'Transaction of £50.00 failed', time: '1 hr ago' },
  //   { id: '8', type: 'credit', message: 'Salary credited £1,200.00', time: 'Yesterday' },
  //   { id: '9', type: 'credit', message: 'You received £250.00 from John', time: '2 min ago' },
  //   { id: '10', type: 'debit', message: 'You sent £100.00 to Sarah', time: '10 min ago' },
  //   { id: '11', type: 'failed', message: 'Transaction of £50.00 failed', time: '1 hr ago' },
  //   { id: '12', type: 'credit', message: 'Salary credited £1,200.00', time: 'Yesterday' },
  // ]);
  

  /* ---------------- API ---------------- */
  const { mutate: getNotificationsFunc, isPending } = getNotifications({
    callback: (res: any) => {
      const newData = res?.results?.values || [];

      setnotification(prev =>
        page === 1 ? newData : [...prev, ...newData]
      );

      setHasMore(newData.length === 10);
    },
  });

  function fetchnotification(pageNumber: number) {
    if (!hasMore && pageNumber !== 1) return;

    const payload = {
      page: pageNumber,
      limit: 10,
      order_by: "created_at",
      order_direction: "desc",
      search: "",
      filters: {
        // is_enable: 1
        // search: "john.doe@example.com"
      }
    }

    getNotificationsFunc(payload);
  }

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {
    fetchnotification(1);
  }, []);

  /* ---------------- LOAD MORE ---------------- */

function onLoadMore() {
  // console.log("play");
  // return
  if (isPending || !hasMore) return;

  setPage(prevPage => {
    const nextPage = prevPage + 1;
    fetchnotification(nextPage);
    return nextPage;
  });
}

  const pressBackArrow = () => {
    navigation.goBack();
  };

    const getNotificationIconAndColor = (type: string) => {
    switch (type) {
      case 'sent':
        return { icon: 'card-outline', color: THEME.textPrimary };
      case 'sent':
        return { icon: 'card-outline',  color: THEME.textPrimary };
      case 'sent':
        return { icon: 'card-outline',  color: THEME.textPrimary };
      default:
        return { icon: 'card-outline',  color: THEME.textPrimary };
    }
  };

  return {
    notification,
    isPending,
    hasMore,
    pressBackArrow,
    getNotificationIconAndColor,
    onLoadMore, // ✅ IMPORTANT

    // getNotifications_Data,
    // isFetchedNotification
    
  };
};
