import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { BENEFICIARY_MANAGEMENT_DATA } from '../../../utils/data';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteBeneficiary, getBeneficiaryDetail, getFxQuote } from '../../../queries/moreQueries/moreQuery';
import QueryKey from '../../../queries/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { StatusBar } from 'react-native';
import { THEME } from '../../../styles';

export const useConversionHistoryViewModel = () => {

  const navigation = useNavigation();
  const searchTimeoutRef = useRef<any>(null);

  const [fxList, setfxList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  
  /* ---------------- API ---------------- */

  const { mutate: getFxQuoteFunc, isPending } = getFxQuote({
    callback: (res: any) => {
      const newData = res?.results?.values || [];

      setfxList(prev =>
        page === 1 ? newData : [...prev, ...newData]
      );

      setHasMore(newData.length === 10);
      setIsSearching(false); // 👈 stop loader
    },
  });

  function onSearch(text: string) {
    setSearch(text);
    setIsSearching(true);          // 👈 start loader
    setfxList([]);          // 👈 hide old list
    setPage(1);
    setHasMore(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchfxList(1, text);
    }, 500);
  }

  
  function fetchfxList(pageNumber: number, searchText = search) {
    if (!hasMore && pageNumber !== 1) return;

    const payload = {
      page: pageNumber,
      limit: 10,
      sort: {
        key: 'created_at',
        order: 'desc',
      },
      search: searchText,
      filters: {
        // "from_currency.iso_code": searchText
        // is_deleted: false,
      },
    };

    console.log("goint payload==>",payload);
    

    getFxQuoteFunc(payload);
  }

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {
    fetchfxList(1);
  }, []);

  /* ---------------- LOAD MORE ---------------- */

  function onLoadMore() {
    if (isPending || isSearching || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchfxList(nextPage);
  }

  function pressBackArrow() {
    navigation.goBack();
  }


  return {
    pressBackArrow,
    search,
    setSearch,

    fxList,
    isPending,
    onLoadMore,

    onSearch,
    isSearching, // 👈 expose to screen

};
};
