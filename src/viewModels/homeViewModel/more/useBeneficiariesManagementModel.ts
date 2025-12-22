import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '../../../constants';
import { useEffect, useRef, useState } from 'react';
import { DeleteBeneficiary, getBeneficiaryDetail } from '../../../queries/moreQueries/moreQuery';

export const useBeneficiariesManagementViewModel = () => {
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchTimeoutRef = useRef<any>(null);
  const clickableBeneficiaryObject = useRef<any>(null);

  /* ---------------- NAV ---------------- */

  function pressBackArrow() {
    navigation.goBack();
  }

  function pressRightArrow() {
    navigation.navigate(HOME_ROUTES.ADD_NEW_BENEFICIARY);
  }

  /* ---------------- SEARCH ---------------- */

  function onSearch(text: string) {
    setSearch(text);
    setIsSearching(true);          // 👈 start loader
    setBeneficiaries([]);          // 👈 hide old list
    setPage(1);
    setHasMore(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchBeneficiaries(1, text);
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

  function onPressDeleteBtn() {
    DeleteBeneficiaryFunc(clickableBeneficiaryObject.current?.id);
  }

  const { mutate: DeleteBeneficiaryFunc, isPending: isPendingDeleteBeneficiary } =
    DeleteBeneficiary({
      callback: (res: any) => {
        setOpen(false);
        const deletedId = res?.results?.update_payments_beneficiary_by_pk?.id;
        if (deletedId) {
          setBeneficiaries(prev => prev.filter(i => i.id !== deletedId));
        }
      },
    });

  /* ---------------- API ---------------- */

  const { mutate: getBeneficiaryDetailFunc, isPending } = getBeneficiaryDetail({
    callback: (res: any) => {
      const newData = res?.results?.values || [];

      setBeneficiaries(prev =>
        page === 1 ? newData : [...prev, ...newData]
      );

      setHasMore(newData.length === 10);
      setIsSearching(false); // 👈 stop loader
    },
  });

  function fetchBeneficiaries(pageNumber: number, searchText = search) {
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
    if (isPending || isSearching || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchBeneficiaries(nextPage);
  }

  return {
    pressBackArrow,
    pressRightArrow,

    open,
    setOpen,
    onPressDelete,
    onPressPayment,
    onPressDeleteBtn,

    beneficiaries,
    isPending,
    isPendingDeleteBeneficiary,
    onLoadMore,

    search,
    onSearch,
    isSearching, // 👈 expose to screen
  };
};
