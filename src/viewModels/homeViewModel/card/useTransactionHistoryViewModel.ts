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
    types: [] as string[], // ['debit', 'credit']
  });

  /** 🔹 API */
  const { mutate: paymentHistryFunc, isPending } = paymentHistry({
    callback: (response: any) => {
      if (!response?.success) return;

      console.log("new data aya==>",response?.results?.values);
      

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
  const fetchTransactions = (pageNumber: number) => {
    if (!assetId) return;

    if (pageNumber !== 1 && (!hasMore || isLoadingMore)) return;

    if (pageNumber === 1) {
      setHasMore(true);
      setTransactions([]);
    } else {
      setIsLoadingMore(true);
    }

    setPage(pageNumber);

      const payloadWithParams = {
      assetId: assetId,
      payload: {
        limit: LIMIT,
        search,
        sort: {
          key: 'created_at',
          order: 'desc',
        },
        filters: {
          ...(filters.from_date && { from_date: filters.from_date }),
          ...(filters.to_date && { to_date: filters.to_date }),
          ...(filters.types.length > 0 && { types: filters.types }),
        },
      }
    };

    console.log("going payload==>",payloadWithParams);
    

    paymentHistryFunc(payloadWithParams);
  };

  /** 🔹 Load More */
  const loadMoreTransactions = () => {
    if (!hasMore || isLoadingMore || isPending) return;
    fetchTransactions(page + 1);
  };

  /** 🔹 Apply Filters */
  const applyFilters = (newFilters: any) => {

    console.log("===>",newFilters);
    
    setFilters({
      from_date: newFilters?.from,
      to_date: newFilters?.to,
      types: [] as string[], // ['debit', 'credit']
    })

    // setFilters(newFilters);
    // cardDetailRef.current?.close?.();
    fetchTransactions(1); // 🔥 reset & refetch
  };

  /** 🔹 Reset Filters */
  const resetFilters = (newFilters: any) => {
    setFilters({
      from_date: '',
      to_date: '',
      types: [],
    });
    cardDetailRef.current?.close?.();
    fetchTransactions(1);
  };

  /** 🔹 Navigation */
  const pressBackArrow = () => navigation.goBack();

  const handleNavigateTransactionHistory = () => {
    navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL);
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
  };
}
