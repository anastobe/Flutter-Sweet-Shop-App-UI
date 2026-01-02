import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { paymentHistry } from '../../../queries/accountQueries/accountQuery';

const LIMIT = 10;

export default function useTransactionHistoryViewModel(props: any) {
  const assetId = props?.route?.params?.assetId;
  const navigation = useNavigation();

  const cardDetailRef = useRef<any>(null);

  /** 🔹 States */
  const [transactions, setTransactions] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [search, setSearch] = useState('');

  /** 🔹 Filters */
  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    direction: [] as string[], // ['debit', 'credit']
  });

  const [filterUIState, setFilterUIState] = useState({
    from: '',
    to: '',
    checked: {
      all: false,
      debit: false,
      credit: false,
      refund: false,
      atm: false,
    },
  });

  /** 🔹 API */
  const { mutate: paymentHistryFunc, isPending } = paymentHistry({
    callback: (response: any) => {
      if (!response?.success) return;

      // console.log("new data aya==>",response?.results?.values);

      const newData = response?.results?.values || [];

      setTransactions(prev =>
        page === 1 ? newData : [...prev, ...newData]
      );

      if (newData.length < LIMIT) {
        setHasMore(false);
      }

      setIsLoadingMore(false);
    },
  });

  /** 🔹 Initial Load */
  useEffect(() => {
    if (assetId) {
      fetchTransactions(1);
    }
  }, [assetId]);

  /** 🔹 Fetch Transactions */
  const fetchTransactions = (
    pageNumber: number,
    overrideFilters?: typeof filters
  ) => {
    if (!assetId) return;

    if (pageNumber !== 1 && (!hasMore || isLoadingMore)) return;

    if (pageNumber === 1) {
      setHasMore(true);
      setTransactions([]);
    } else {
      setIsLoadingMore(true);
    }

    setPage(pageNumber);

    const activeFilters = overrideFilters ?? filters;

    const payloadWithParams = {
      assetId: assetId, 
      body: {
        page: pageNumber,
        limit: LIMIT,
        search,
        sort: {
          key: 'created_at',
          order: 'desc',
        },
        filters: {
          ...(activeFilters?.from_date && { from_date: activeFilters?.from_date }),
          ...(activeFilters?.to_date && { to_date: activeFilters?.to_date }),
          ...(activeFilters?.direction?.length > 0 && { direction: activeFilters?.direction }),
        },
      },
    };

    console.log("payload become==>",payloadWithParams?.body);

    paymentHistryFunc(payloadWithParams);
  };

  /** 🔹 Load More */
  const loadMoreTransactions = () => {
    if (!hasMore || isLoadingMore || isPending) return;
    fetchTransactions(page + 1);
  };

  /** 🔹 Apply Filters */

const applyFilters = (newFilters: any) => {
  setFilterUIState(newFilters); // ✅ persist UI state

  let direction: string | undefined;
  let atm: string | undefined; //when add then see
  let refund: string | undefined; //when add then see

  if (newFilters.checked.credit && !newFilters.checked.debit) {
    direction = 'credit';
  } else if (!newFilters.checked.credit && newFilters.checked.debit) {
    direction = 'debit';
  }

  console.log("apply filter=>",newFilters.checked);

  const formattedFilters = {
    from_date: newFilters.from,
    to_date: newFilters.to,
    ...(direction && { direction }),
  };

  setFilters(formattedFilters);
  fetchTransactions(1, formattedFilters);
  cardDetailRef.current?.close?.();
};


  const resetFilters = () => {
  const clearedUI = {
    from: '',
    to: '',
    checked: {
      all: false,
      debit: false,
      credit: false,
      refund: false,
      atm: false,
    },
  };

  setFilterUIState(clearedUI);
  setFilters({ from_date: '', to_date: '', direction: [] });
  fetchTransactions(1, clearedUI);
  cardDetailRef.current?.close?.();
};

  /** 🔹 Navigation */
  const pressBackArrow = () => navigation.goBack();

  const handleNavigateTransactionHistory = (item: any) => {
    if (item) {
      navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL,{ DETAIL: item });
    }
  };

  return {
    transactions,
    search,
    setSearch,
    cardDetailRef,
    pressBackArrow,
    loadMoreTransactions,
    applyFilters,
    resetFilters,
    handleNavigateTransactionHistory,
    isLoadingMore,
    isPending,
    filterUIState,
    setFilterUIState
  };
}
