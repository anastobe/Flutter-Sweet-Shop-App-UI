import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { useEffect, useRef, useState } from 'react';
import { DeleteBeneficiary, getBeneficiaryDetail, getPendingRequest } from '../../../queries/moreQueries/moreQuery';

export const useRequestBeneficiaryViewModal = () => {
  const navigation = useNavigation();
  const FOCUS = useIsFocused();
  const [open, setOpen] = useState(false);
  const [request, setrequest] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchTimeoutRef = useRef<any>(null);
  const clickableBeneficiaryObject = useRef<any>(null);

  /* ---------------- NAV ---------------- */

  function pressBackArrow() {
    navigation.goBack();
  }

  const onRefresh = async () => {
    try {
        setRefreshing(true);
        fetchrequest(1);
    } catch (e) {
        console.log('Refresh error', e);
        setRefreshing(false);
    } finally {
        console.log('Refresh finally');
        setRefreshing(false);
    }
  };


  /* ---------------- SEARCH ---------------- */

  function onSearch(text: string) {
    setSearch(text);
    setIsSearching(true);          // 👈 start loader
    setrequest([]);          // 👈 hide old list
    setPage(1);
    setHasMore(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchrequest(1, text);
    }, 500);
  }

  /* ---------------- DELETE ---------------- */

  function onPressDelete(item: any) {
    clickableBeneficiaryObject.current = item;
    setOpen(true);
  }

  function onPressPayment(item: any) {
    navigation.navigate(HOME_ROUTES.MAKE_PAYMENT);
  }

  /* ---------------- API ---------------- */

  const { mutate: getPendingRequestFunc, isPending } = getPendingRequest({
    callback: (res: any) => {
      const newData = res?.results?.values || [];

      setrequest(prev =>
        page === 1 ? newData : [...prev, ...newData]
      );

      setHasMore(newData.length === 10);
      setIsSearching(false); // 👈 stop loader
    },
  });

  function fetchrequest(pageNumber: number, searchText = search) {
    if (!hasMore && pageNumber !== 1) return;

    const payload = {
        page: pageNumber,
        limit: 10,
        order_by: "created_at",
        order_direction: "desc",
        search: searchText,
        filters: {
        status: "Pending"
      }
    }
    getPendingRequestFunc(payload);
  }

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {
    if (FOCUS) {
      fetchrequest(1);
    }
    return ()=>{
      setrequest([])
    }
  }, [FOCUS]);

  /* ---------------- LOAD MORE ---------------- */

  function onLoadMore() {
    if (isPending || isSearching || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchrequest(nextPage);
  }

  return {
    pressBackArrow,

    open,
    setOpen,
    onPressDelete,
    onPressPayment,

    request,
    isPending,
    onLoadMore,
    onRefresh,

    search,
    onSearch,
    isSearching, // 👈 expose to screen
    navigation,

    refreshing, 
    setRefreshing

  };
};
