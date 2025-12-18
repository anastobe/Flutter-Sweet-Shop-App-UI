// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import { HOME_ROUTES } from '../../../constants';
// import { BENEFICIARY_MANAGEMENT_DATA } from '../../../utils/data';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { DeleteBeneficiary, getBeneficiaryDetail } from '../../../queries/moreQueries/moreQuery';
// import QueryKey from '../../../queries/queryKey';
// import { useQueryClient } from '@tanstack/react-query';
// import { StatusBar } from 'react-native';
// import { THEME } from '../../../styles';

// export const useBeneficiariesManagementViewModel = () => {

//   const dispatch = useDispatch()
//   const [open, setOpen] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [refreshing, setrefreshing] = useState(false);
//   const [getBeneficiaryDetail_Data, setgetBeneficiaryDetail_Data] = useState([]);
//   const [clickableBeneficiaryObject, setclickableBeneficiaryObject] = useState({});
//   const navigation = useNavigation();
//   const queryClient = useQueryClient();

//   function pressBackArrow() {
//     navigation.goBack();
//   }

//   function pressRightArrow() {
//     navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
//   }

//   function onBeneficiaryPress() {
//     navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
//   }

//   function onPressDelete(item:any) {
//     setclickableBeneficiaryObject(item)
//     setOpen(!open)
//   }

//   function onPressDeleteBtn() {
//     DeleteBeneficiaryFunc(clickableBeneficiaryObject?.id)
//   }

//   function onPressView() {
//     setOpen2(!open2)
//   }

//   function onRefresh() {
//     // refetchgetBeneficiaryDetail()
//   }
  
//   const { mutate: DeleteBeneficiaryFunc, isPending: isPendingDeleteBeneficiary } = DeleteBeneficiary({
//     callback: (res: any) => {
//       setOpen(false)  

      
//     const deletedId = res?.results?.update_payments_beneficiary_by_pk?.id;
//     console.log("delete Id=>",deletedId);
    
//     if (!deletedId) return;

//     queryClient.setQueryData([QueryKey.GET_BENEFICIARY], (oldData: any) => {
//       if (!oldData?.results) return oldData;

//       return {
//         ...oldData,
//         results: oldData.results.filter((item: any) => item.id !== deletedId),
//       };
//     });


//     },
//   });

//   // get me
//   // const {data: getBeneficiaryDetail_Data, refetch: refetchgetBeneficiaryDetail, isFetching: isFetchingBeneficiary } = getBeneficiaryDetail({
//   //   enabled: false,
//   //   dispatch,
//   // });

  
//     const { mutate: getBeneficiaryDetailFunc, isPending } = getBeneficiaryDetail({
//       callback: (res: any) => {
//         console.log("Login response:", res);
//         if (res?.success) {
//           setgetBeneficiaryDetail_Data(res?.results?.values)
//         }
//       },
//     });
  
//   useEffect(()=>{
//     let payload = {
//       page: 1,
//       limit: 100,
//       sort: {
//           key: "created_at",
//           order: "desc"
//       },
//       search: "",
//       filters: {
//           is_deleted: false
//       }
//     }

//     getBeneficiaryDetailFunc(payload)
//   },[])

//   return {
//     data: BENEFICIARY_MANAGEMENT_DATA,
//     pressBackArrow,
//     pressRightArrow,
//     onBeneficiaryPress,
//     open,
//     setOpen,
//     open2,
//     setOpen2,
//     onPressDelete,
//     onPressDeleteBtn,
//     onPressView,
//     // refetchgetBeneficiaryDetail,
//     getBeneficiaryDetail_Data,
//     // isFetchingBeneficiary,
//     DeleteBeneficiaryFunc,
//     isPendingDeleteBeneficiary,
//     onRefresh,
//     refreshing,
//     setrefreshing
//   };
// };




import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteBeneficiary, getBeneficiaryDetail } from '../../../queries/moreQueries/moreQuery';
import { useQueryClient } from '@tanstack/react-query';
import QueryKey from '../../../queries/queryKey';

export const useBeneficiariesManagementViewModel = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [clickableBeneficiaryObject, setClickableBeneficiaryObject] = useState<any>({});

  /* ---------------- NAVIGATION ---------------- */

  function pressBackArrow() {
    navigation.goBack();
  }

  function pressRightArrow() {
    navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
  }

  function onPressView() {
    setOpen2(!open2);
  }

  /* ---------------- DELETE ---------------- */

  function onPressDelete(item: any) {
    setClickableBeneficiaryObject(item);
    setOpen(true);
  }

  function onPressDeleteBtn() {
    DeleteBeneficiaryFunc(clickableBeneficiaryObject?.id);
  }

  const { mutate: DeleteBeneficiaryFunc, isPending: isPendingDeleteBeneficiary } =
    DeleteBeneficiary({
      callback: (res: any) => {
        setOpen(false);

        const deletedId = res?.results?.update_payments_beneficiary_by_pk?.id;
        if (!deletedId) return;

        setBeneficiaries(prev => prev.filter(item => item.id !== deletedId));
      },
    });

  /* ---------------- GET BENEFICIARIES ---------------- */

  const { mutate: getBeneficiaryDetailFunc, isPending } = getBeneficiaryDetail({
    callback: (res: any) => {
      const newData = res?.results?.values || [];

      setBeneficiaries(prev =>
        page === 1 ? newData : [...prev, ...newData]
      );

      setHasMore(newData.length === 10);
      setRefreshing(false);
    },
  });

  function fetchBeneficiaries(pageNumber: number) {
    if (!hasMore && pageNumber !== 1) return;

    const payload = {
      page: pageNumber,
      limit: 10,
      sort: {
        key: 'created_at',
        order: 'desc',
      },
      search: '',
      filters: {
        is_deleted: false,
      },
    };

    getBeneficiaryDetailFunc(payload);
  }

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {
    fetchBeneficiaries(1);
  }, []);

  /* ---------------- LOAD MORE ---------------- */

  function onLoadMore() {
    if (isPending || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchBeneficiaries(nextPage);
  }

  /* ---------------- PULL TO REFRESH ---------------- */

  function onRefresh() {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchBeneficiaries(1);
  }

  return {
    pressBackArrow,
    pressRightArrow,
    open,
    setOpen,
    open2,
    setOpen2,
    onPressDelete,
    onPressDeleteBtn,
    onPressView,

    beneficiaries,
    isPending,
    onLoadMore,
    onRefresh,
    refreshing,
    isPendingDeleteBeneficiary,
  };
};
