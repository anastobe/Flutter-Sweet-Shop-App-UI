// import { useState, useRef, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { HOME_ROUTES } from '../../../constants';
// import { paymentHistry } from '../../../queries/accountQueries/accountQuery';

// const LIMIT = 10;

// export default function useTransactionHistoryViewModel(props: any) {
//   const assetId = props?.route?.params?.assetId;
//   const navigation = useNavigation();

//   const cardDetailRef = useRef<any>(null);

//   /** 🔹 States */
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const [search, setSearch] = useState('');

//   /** 🔹 Filters */
//   // const [filters, setFilters] = useState({
//   //   from_date: '',
//   //   to_date: '',
//   //   direction: [] as string[], // ['debit', 'credit']
//   // });

//   // const [filterUIState, setFilterUIState] = useState({
//   //   from: '',
//   //   to: '',
//   //   checked: {
//   //     all: false,
//   //     debit: false,
//   //     credit: false,
//   //     refund: false,
//   //     atm: false,
//   //   },
//   // });

//   const [filters, setFilters] = useState({
//     from_date: '',
//     to_date: '',
//     direction: [],
//     min_amount: '',
//     max_amount: '',
//     status: [] as string[],
//   });


//   const [filterUIState, setFilterUIState] = useState({
//   from: '',
//   to: '',
//   amount: {
//     min: '',
//     max: '',
//   },
//   status: {
//     all: false,
//     completed: false,
//     pending: false,
//     failed: false,
//   },
//   checked: {
//     all: false,
//     debit: false,
//     credit: false,
//     refund: false,
//     atm: false,
//   },
// });


//   /** 🔹 API */
//   const { mutate: paymentHistryFunc, isPending } = paymentHistry({
//     callback: (response: any) => {
//       if (!response?.success) return;

//       // console.log("new data aya==>",response?.results?.values);

//       const newData = response?.results?.values || [];

//       setTransactions(prev =>
//         page === 1 ? newData : [...prev, ...newData]
//       );

//       if (newData.length < LIMIT) {
//         setHasMore(false);
//       }

//       setIsLoadingMore(false);
//     },
//   });

//   /** 🔹 Initial Load */
//   useEffect(() => {
//     if (assetId) {
//       fetchTransactions(1);
//     }
//   }, [assetId]);

//   /** 🔹 Fetch Transactions */
//   const fetchTransactions = (
//     pageNumber: number,
//     overrideFilters?: typeof filters
//   ) => {
//     if (!assetId) return;

//     if (pageNumber !== 1 && (!hasMore || isLoadingMore)) return;

//     if (pageNumber === 1) {
//       setHasMore(true);
//       setTransactions([]);
//     } else {
//       setIsLoadingMore(true);
//     }

//     setPage(pageNumber);

//     const activeFilters = overrideFilters ?? filters;

//     const payloadWithParams = {
//       assetId: assetId, 
//       body: {
//         page: pageNumber,
//         limit: LIMIT,
//         search,
//         sort: {
//           key: 'created_at',
//           order: 'desc',
//         },
//         // filters: {
//         //   ...(activeFilters?.from_date && { from_date: activeFilters?.from_date }),
//         //   ...(activeFilters?.to_date && { to_date: activeFilters?.to_date }),
//         //   ...(activeFilters?.direction?.length > 0 && { direction: activeFilters?.direction }),
//         // },
        
//         filters: {
//           ...(activeFilters?.from_date && { from_date: activeFilters.from_date }),
//           ...(activeFilters?.to_date && { to_date: activeFilters.to_date }),
//           ...(activeFilters?.direction && { direction: activeFilters.direction }),
//           ...(activeFilters?.min_amount && { min_amount: activeFilters.min_amount }),
//           ...(activeFilters?.max_amount && { max_amount: activeFilters.max_amount }),
//           ...(activeFilters?.status?.length > 0 && { status: activeFilters.status }),
//         },

//       },
//     };

//     console.log("payload become==>",payloadWithParams?.body);

//     paymentHistryFunc(payloadWithParams);
//   };

//   /** 🔹 Load More */
//   const loadMoreTransactions = () => {
//     if (!hasMore || isLoadingMore || isPending) return;
//     fetchTransactions(page + 1);
//   };

//   /** 🔹 Apply Filters */

// // const applyFilters = (newFilters: any) => {
// //   setFilterUIState(newFilters); // ✅ persist UI state

// //   let direction: string | undefined;
// //   let atm: string | undefined; //when add then see
// //   let refund: string | undefined; //when add then see

// //   if (newFilters.checked.credit && !newFilters.checked.debit) {
// //     direction = 'credit';
// //   } else if (!newFilters.checked.credit && newFilters.checked.debit) {
// //     direction = 'debit';
// //   }

// //   console.log("apply filter=>",newFilters.checked);

// //   const formattedFilters = {
// //     from_date: newFilters.from,
// //     to_date: newFilters.to,
// //     ...(direction && { direction }),
// //   };

// //   setFilters(formattedFilters);
// //   fetchTransactions(1, formattedFilters);
// //   cardDetailRef.current?.close?.();
// // };

// //   const resetFilters = () => {
// //   const clearedUI = {
// //     from: '',
// //     to: '',
// //     checked: {
// //       all: false,
// //       debit: false,
// //       credit: false,
// //       refund: false,
// //       atm: false,
// //     },
// //   };

// //   setFilterUIState(clearedUI);
// //   setFilters({ from_date: '', to_date: '', direction: [] });
// //   fetchTransactions(1, clearedUI);
// //   cardDetailRef.current?.close?.();
// // };

// const applyFilters = (newFilters: any) => {
//   setFilterUIState(newFilters);

//   /** 🔹 Transaction direction */
//   let direction;
//   if (newFilters.checked.credit && !newFilters.checked.debit) {
//     direction = 'credit';
//   } else if (!newFilters.checked.credit && newFilters.checked.debit) {
//     direction = 'debit';
//   }

//   /** 🔹 Status */
//   let status: string[] = [];
//   if (!newFilters.status.all) {
//     if (newFilters.status.completed) status.push('completed');
//     if (newFilters.status.pending) status.push('pending');
//     if (newFilters.status.failed) status.push('failed');
//   }

//   const formattedFilters = {
//     from_date: newFilters.from,
//     to_date: newFilters.to,
//     ...(direction && { direction }),
//     ...(newFilters.amount.min && { min_amount: newFilters.amount.min }),
//     ...(newFilters.amount.max && { max_amount: newFilters.amount.max }),
//     ...(status.length > 0 && { status }),
//   };

//   setFilters(formattedFilters);
//   fetchTransactions(1, formattedFilters);
//   cardDetailRef.current?.close?.();
// };

// const resetFilters = () => {
//   const clearedUI = {
//     from: '',
//     to: '',
//     amount: { min: '', max: '' },
//     status: {
//       all: false,
//       completed: false,
//       pending: false,
//       failed: false,
//     },
//     checked: {
//       all: false,
//       debit: false,
//       credit: false,
//       refund: false,
//       atm: false,
//     },
//   };

//   setFilterUIState(clearedUI);
//   setFilters({
//     from_date: '',
//     to_date: '',
//     direction: [],
//     min_amount: '',
//     max_amount: '',
//     status: [],
//   });

//   fetchTransactions(1);
//   cardDetailRef.current?.close?.();
// };



//   /** 🔹 Navigation */
//   const pressBackArrow = () => navigation.goBack();

//   const handleNavigateTransactionHistory = (item: any) => {
//     if (item) {
//       navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL,{ DETAIL: item });
//     }
//   };

//   return {
//     transactions,
//     search,
//     setSearch,
//     cardDetailRef,
//     pressBackArrow,
//     loadMoreTransactions,
//     applyFilters,
//     resetFilters,
//     handleNavigateTransactionHistory,
//     isLoadingMore,
//     isPending,
//     filterUIState,
//     setFilterUIState
//   };
// }



// anas gpt
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { getMonthlyStatement, getMonthlyStatementUrl, paymentHistry } from '../../../queries/accountQueries/accountQuery';
import { CommonUtils, Toast } from '../../../utils';
import { ACCOUNT_HISTRY_VALIDATION } from '../../../utils/data';
import { CardpaymentHistry } from '../../../queries/card.Queries/card.query';

const LIMIT = 10;

export default function useTransactionHistoryViewModel(props: any) {
  const assetId = props?.route?.params?.assetId;
  const show = props?.route?.params?.show;

  const navigation = useNavigation();

  const cardDetailRef = useRef<any>(null);
  const StatementRef = useRef<any>(null);
  const YearRedRef = useRef<any>(null);
  const CURRENT_YEAR = new Date().getFullYear();
  const MAX_YEAR = Array.from(
  { length: CURRENT_YEAR - 2000 + 1 },
  (_, i) => 2000 + i
  ).reverse();
  
  /** 🔹 States */
  const [transactions, setTransactions] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [monthlyStementList, setmonthlyStementList] = useState();
  const [loadingYear, setloadingYear] = useState('');
  const [loadingMonth, setloadingMonth] = useState('');


  /** 🔹 Filters (API) */
  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    direction: [] as string[],
    atm: '',
    refund: '',
    min_amount: '',
    status: [] as string[],
  });

  /** 🔹 Filters (UI) */
  const [filterUIState, setFilterUIState] = useState({
    from: '',
    to: '',
    amount: {
      min: ''
    },
    status: {
      all: false,
      completed: false,
      pending: false,
      failed: false,
    },
    checked: {
      all: false,
      debit: false,
      credit: false,
      refund: false,
      atm: false,
    },
  });

  const historyMutation =
  show == ACCOUNT_HISTRY_VALIDATION.COMPLETE
    ? CardpaymentHistry
    : paymentHistry;

  /** 🔹 API */
  const { mutate: paymentHistryFunc, isPending } = historyMutation({
    callback: (response: any) => {
      if (!response?.success) {
        setIsLoadingMore(false);
        return;
      }

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

  const { mutate: getMonthlyStatementFunc, isPending: getMonthlyStatementPending } = getMonthlyStatement({
    callback: (response: any) => {
      if (response?.success) {
        setmonthlyStementList(response?.results?.statements)
        StatementRef?.current?.open()
        setloadingYear('')
      }
    },
  });

  
  const { mutate: getMonthlyStatementUrlFunc, isPending: getMonthlyStatementUrlPending } = getMonthlyStatementUrl({
    callback: (response: any) => {
      if (response?.success) {
        CommonUtils.downloadFile(response?.results?.url)     
        setloadingMonth('')   
      }
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

    const payload = {
      assetId,
      body: {
        page: pageNumber,
        limit: LIMIT,
        search,
        sort: { 
          key: 'created_at',
          order: 'desc',
        },
        filters: {
          ...(activeFilters.from_date && { from_date: activeFilters.from_date }),
          ...(activeFilters.to_date && { to_date: activeFilters.to_date }),
          ...(activeFilters.direction?.length > 0 && {
            direction: activeFilters.direction,
          }),
          // ...(activeFilters.atm && { atm: activeFilters.atm }),
          // ...(activeFilters.refund && { refund: activeFilters.refund }),
          // ...(parseInt(activeFilters.min_amount) > 0 && { min_amount: parseInt(activeFilters.min_amount) }),
          // ...(activeFilters.status?.length > 0 && {
          //   status: activeFilters.status,
          // }), 
        },
      },
    };

      const payloadWithParams = {
          card_id: assetId,
          payload: {
            page: pageNumber,
            limit: LIMIT,
            // search,
            sort: {
              key: 'created_at',
              order: 'desc',
            }
          }
      };


    console.log(show,"uncomment for refunct amount and atm==>",payload);
    if (show == ACCOUNT_HISTRY_VALIDATION.COMPLETE) {
      paymentHistryFunc(payloadWithParams)
    } else if (show == ACCOUNT_HISTRY_VALIDATION.INCOMPLETE){
      paymentHistryFunc(payload);
    }
  };

  /** 🔹 Load More */
  const loadMoreTransactions = () => {
    if (!hasMore || isLoadingMore || isPending) return;
    fetchTransactions(page + 1);
  };

  /** 🔹 Apply Filters */
  const applyFilters = (newFilters: any) => {

    if (show == ACCOUNT_HISTRY_VALIDATION.COMPLETE && !CommonUtils.RegixNumbersOnly.test(newFilters.amount.min)){
      return Toast.showToast("Enter valid amount range", '', 'error');
    }

    setFilterUIState(newFilters);

    /** Direction */
    let direction: string[] = [];
    if (newFilters.checked.credit && !newFilters.checked.debit) {
      direction = ['credit'];
    } else if (!newFilters.checked.credit && newFilters.checked.debit) {
      direction = ['debit'];
    }
    
    let atm: string | undefined; //when add then see
    let refund: string | undefined; //when add then see
    
    if (newFilters.checked.atm) {
      atm = 'atm'
    }
    if (newFilters.checked.refund) {
      refund = 'refund'
    }

    /** Status */
    let status: string[] = [];
    if (!newFilters.status.all) {
      if (newFilters.status.completed) status.push('completed');
      if (newFilters.status.pending) status.push('pending');
      if (newFilters.status.failed) status.push('failed');
    }

    const formattedFilters = {
      from_date: newFilters.from,
      to_date: newFilters.to,
      direction,
      atm: atm,
      refund: refund,
      min_amount: newFilters.amount.min,
      status,
    };

    console.log("checking==>",formattedFilters);
    // return

    setFilters(formattedFilters);
    fetchTransactions(1, formattedFilters);
    cardDetailRef.current?.close?.();
  };

  /** 🔹 Reset Filters */
  const resetFilters = () => {
    const clearedUI = {
      from: '',
      to: '',
      amount: { min: ''},
      status: {
        all: false,
        completed: false,
        pending: false,
        failed: false,
      },
      checked: {
        all: false,
        debit: false,
        credit: false,
        refund: false,
        atm: false,
      },
    };

    setFilterUIState(clearedUI);
    setFilters({
      from_date: '',
      to_date: '',
      atm: '',
      refund: '',
      direction: [],
      min_amount: '',
      status: [],
    });

    fetchTransactions(1);
    cardDetailRef.current?.close?.();
  };

  /** 🔹 Navigation */
  const pressBackArrow = () => navigation.goBack();

  const handleNavigateTransactionHistory = (item: any) => {
    console.log("handleNavigateTransactionHistory==>",item);
    // return
    if (item) {
      navigation.navigate(HOME_ROUTES.TRANSACTION_DETAIL, {
        DETAIL: item,
        showAttachement: show == ACCOUNT_HISTRY_VALIDATION.INCOMPLETE ? true : false
      });
    }
  };

  
  function openMothlyStetement(YEAR: String) {
    setloadingYear(YEAR)
    let payload= {
      asset_id: assetId,
      year: YEAR
    }
    getMonthlyStatementFunc(payload)
  }

  function openMothlyStetementSheet() {
        YearRedRef?.current?.open()
  }

  function downloadStatement(ID: any) {
    setloadingMonth(ID)
    getMonthlyStatementUrlFunc(ID)
  }

      
  return {
    transactions,
    search,
    setSearch,
    cardDetailRef,
    YearRedRef,
    MAX_YEAR,
    StatementRef,
    pressBackArrow,
    loadMoreTransactions,
    applyFilters,
    resetFilters,
    handleNavigateTransactionHistory,
    isLoadingMore,
    isPending,
    filterUIState,
    setFilterUIState,
    getMonthlyStatementFunc,
    getMonthlyStatementPending,
    monthlyStementList,
    getMonthlyStatementUrlFunc,
    getMonthlyStatementUrlPending,
    openMothlyStetement,
    openMothlyStetementSheet,
    downloadStatement,
    loadingYear, 
    setloadingYear,
    loadingMonth,
    setloadingMonth
  };
}

