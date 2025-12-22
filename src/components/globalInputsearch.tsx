import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { MainContainer } from '../components';
import { FONT_SIZES, FONTFAMILY, THEME } from '../styles';
import { LoaderOnly } from '../components/activityIndicator';
import StatusBarManager from '../components/statusBarManager';
import { handleSize } from '../config/responsiveTheme';
import InputField from '../components/textInput';

import { HOME_ROUTES } from '../constants';
import {
  DeleteBeneficiary,
  getBeneficiaryDetail,
} from '../queries/moreQueries/moreQuery';

const GlobalInputsearch = ({placeholder, onSelectBeneficiary }: any) => {
  const navigation = useNavigation();

  const [ListArray, setListArray] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchTimeoutRef = useRef<any>(null);
  const clickableBeneficiaryObject = useRef<any>(null);
  const onEndReachedCalledDuringMomentum = useRef(false);

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
    setIsSearching(true);
    setListArray([]);
    setPage(1);
    setHasMore(true);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchListArray(1, text);
    }, 500);
  }


  /* ---------------- API ---------------- */

  const { mutate: getBeneficiaryDetailFunc, isPending } =
    getBeneficiaryDetail({
      callback: (res: any) => {
        const newData = res?.results?.values || [];

        setListArray(prev =>
          page === 1 ? newData : [...prev, ...newData],
        );

        setHasMore(newData.length === 10);
        setIsSearching(false);
      },
    });

  function fetchListArray(pageNumber: number, searchText = search) {
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
    fetchListArray(1);
  }, []);

  /* ---------------- LOAD MORE ---------------- */

  function onLoadMore() {
    if (isPending || isSearching || !hasMore) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchListArray(nextPage);
  }

  /* ---------------- RENDER ITEM ---------------- */

  function renderItem({ item }: any) {
    const initials = `${item?.first_name} ${item?.last_name}`
      .split(' ')
      .map((n: any) => n[0])
      .join('');

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                console.log('BENEFICIARY CLICKED ===>', item);
                onSelectBeneficiary?.(item);
            }}
            >
      <LinearGradient
        colors={['#433c71ff', '#2c2d5e', '#272d5a']}
        style={styles.item}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {item?.first_name} {item?.last_name}
          </Text>
          <Text style={styles.currency}>
            {item?.currency?.iso_code || 'XXX'}
          </Text>
        </View>

        {/* <TouchableOpacity
          style={styles.butnCont}
          onPress={() => onPressDelete(item)}
        >
          <Icon name="trash-outline" size={20} color={THEME.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.butnCont2}
          onPress={() => onPressPayment(item)}
        >
          <Icon
            name="arrow-forward-outline"
            size={20}
            color={THEME.white}
          />
        </TouchableOpacity> */}

      </LinearGradient>
        </TouchableOpacity>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <MainContainer
      pressRightArrow={pressRightArrow}
      showBackArrow={false}
      pressBackArrow={pressBackArrow}
      mainContainerStyle={styles.container}
    >
      <StatusBarManager
        backgroundColor={THEME.darkSecondary}
        barStyle="light-content"
      />

      <View style={{ paddingHorizontal: handleSize.w(20), flex: 1 }}>

        <View style={{ flexDirection :'row', justifyContent: "space-between", marginTop: handleSize.h(20),  marginBottom: handleSize.h(10) }} >
            <Text style={styles.headingLeftTxt} >{placeholder}</Text>
            <TouchableOpacity onPress={pressRightArrow} style={styles.rightIconCont}>
                <Icon name="close" size={handleSize.f(20)} color={THEME.textPrimary} />
            </TouchableOpacity>
        </View>

        <InputField
          removeTitle
          margBtm={15}
          textInputStyle={styles.innerinput}
          imgViewLeft={styles.imgViewLeft}
          imageLeft="search-outline"
          imagetintColorLeft={THEME.white}
          placeholder="Search"
          value={search}
          onChangeText={onSearch}
          keyboardType="default"
          customInpStyle={styles.innerinput}
        />

        <FlatList
          data={ListArray}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.3}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum.current) {
              onLoadMore();
              onEndReachedCalledDuringMomentum.current = true;
            }
          }}
          ListFooterComponent={() =>
            isPending && ListArray.length > 0 ? (
              <LoaderOnly />
            ) : null
          }
          ListEmptyComponent={() => {
            if (isSearching || isPending) {
              return <LoaderOnly />;
            }

            return (
              <Text style={styles.txtEmptyTxt}>
                No Beneficiary Found
              </Text>
            );
          }}
        />
      </View>
    </MainContainer>
  );
};

export default GlobalInputsearch;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.white },

  title: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    marginTop: handleSize.h(10),
  },
  txtEmptyTxt: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    marginBottom: handleSize.h(10),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.Regular,
    color: THEME.white,
    lineHeight: handleSize.h(20),
    marginBottom: handleSize.h(10),
    // marginBottom: handleSize.h(30),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.textPrimary,
    borderRadius: handleSize.f(12),
    padding: handleSize.h(12),
    // height: 100,
    marginBottom: handleSize.h(10),
  },
  avatar: {
    width: handleSize.w(40),
    height: handleSize.h(40),
    borderRadius: handleSize.f(14),
    backgroundColor: THEME.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: handleSize.w(12),
    marginLeft: handleSize.w(5),
  },
  avatarText: {
    color: THEME.textPrimary,
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix),
    textTransform: "capitalize" 
  },
  name: {
    fontSize: handleSize.f(FONT_SIZES.onesix),
    fontFamily: FONTFAMILY.SemiBold,
    color: THEME.white,
    textTransform: "capitalize" 
  },
  currency: {
    fontSize: handleSize.f(FONT_SIZES.onefour),
    fontFamily: FONTFAMILY.Light,
    color: THEME.white,
  },
  forgetTxtpop: {
    backgroundColor: THEME.primary,
    width: '100%',
    marginTop: handleSize.h(20),
    marginBottom: handleSize.h(20),
  },
  butnCont: {
    width: handleSize.w(35),
    height: handleSize.h(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:handleSize.w(5),
  },
  butnCont2:{
    width: handleSize.w(35),
    height: handleSize.h(40),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
    // backgroundColor: "red"
  },
  modal: {
    backgroundColor: 'rgba(64, 64, 65, 0.98)',
    borderRadius: handleSize.f(16),
    padding: handleSize.h(24),
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: handleSize.h(10),
    right: handleSize.w(15),
  },
  closeText: {
    fontSize: handleSize.f(FONT_SIZES.foureight),
    color: THEME.white,
  },
  iconCircle: {
    backgroundColor: THEME.primary,
    borderRadius: handleSize.f(100),
    width: handleSize.w(56),
    height: handleSize.h(56),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: handleSize.h(10),
  },
  titles: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.twotwo),
    color: THEME.white,
    textAlign: 'center',
    lineHeight: handleSize.h(30),
    marginTop: handleSize.h(20),
  },
  description: {
    marginTop: handleSize.h(10),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour),
    color: THEME.white,
    textAlign: 'center',
  },
  
  innerinput: {  
    height: handleSize.h(56),
    paddingLeft: handleSize.w(20),
    fontFamily: FONTFAMILY.Regular,
    fontSize: handleSize.f(FONT_SIZES.onefour), 
    color: THEME.white,
    justifyContent: "center",
  },
  headingLeftTxt : {      
    fontFamily: FONTFAMILY.Medium,
    fontSize: handleSize.f(FONT_SIZES.onesix), 
    color: THEME.white
  },

  imgViewLeft: {
    width: handleSize.w(35),
    height: handleSize.h(56),
    position: 'absolute',
    left: handleSize.w(5),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },

  rightIconCont: {
    width: handleSize.w(28),
    height: handleSize.h(28),
    borderRadius: handleSize.f(50),
    justifyContent: "center",
    alignItems: "center",
    // marginRight: handleSize.w(20),
    backgroundColor: THEME.white,
    alignSelf: "flex-end",
  },
});
