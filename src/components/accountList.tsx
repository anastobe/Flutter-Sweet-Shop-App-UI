import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

const AccountList = ({ account, onPress }: any) => {

  const asset = account.assets?.[0]; // default first currency

  return (
    <TouchableOpacity style={styles.accountCard} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.accountName}>{account.name}</Text>
        <Text style={styles.currency}>
          {asset?.currency?.iso_code}
        </Text>
      </View>

      <Text style={styles.iban}>
        IBAN: {account.iban}
      </Text>

    </TouchableOpacity>
  );
};

export default AccountList;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111',
  },

  separator: {
    height: 10,
  },

  accountCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F6F7F9',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  accountName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },

  currency: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A90E2',
  },

  iban: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },

  balanceRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  balanceLabel: {
    fontSize: 12,
    color: '#999',
  },

  balanceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
});
