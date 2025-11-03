import { HOME_ROUTES } from "../constants";


export interface BeneficiaryType {
  key: string;
  label: string;
}

const BENEFICIARY_TYPES: BeneficiaryType[] = [
  { key: 'frontier', label: 'Frontier Pay User (by @username, email, or phone)' },
  { key: 'bank', label: 'Bank Account' },
];

const ACCOUNT_TYPES = [
  { label: 'Account Type', value: '' },
  { label: 'Current', value: 'current' },
  { label: 'Savings', value: 'savings' },
];

const COUNTRIES = [
  { label: 'Country', value: '' },
  { label: 'Pakistan', value: 'pakistan' },
  { label: 'America', value: 'america' },
];

const CURRENCIES = [
  { label: 'Currency', value: '' },
  { label: 'PKR', value: 'pkr' },
  { label: 'USD', value: 'usd' },
  { label: 'GBP', value: 'gbp' },
];


// Sample card data
const Accounts = [
  {
    id: '0',
    masked: '•••• 6243',
    balance: '€53,556.50',
    onHold: '€22.50',
    available: '€53,534.00',
  },
  {
    id: '1',
    masked: '•••• 7890',
    balance: '€20,100.00',
    onHold: '€1,000.00',
    available: '€19,100.00',
  },
  {
    id: '2',
    masked: '•••• 9988',
    balance: '€75,000.00',
    onHold: '€2,500.00',
    available: '€72,500.00',
  },
    {
    id: '3',
    masked: '•••• 6243',
    balance: '€53,556.50',
    onHold: '€22.50',
    available: '€53,534.00',
  },
  {
    id: '4',
    masked: '•••• 7890',
    balance: '€20,100.00',
    onHold: '€1,000.00',
    available: '€19,100.00',
  },
  {
    id: '5',
    masked: '•••• 9988',
    balance: '€75,000.00',
    onHold: '€2,500.00',
    available: '€72,500.00',
  },
];

const REQUEST_DATA = [
  {
    id: 1,
    title: "Payment Received",
    status: "Rejected",
    message: "Your new card has been created and is ready to use.",
    date: "28/10/2025   12:00pm",
    by: "Mark Jason",
    type: "payment",
    icon: "card-outline",
  },
  {
    id: 2,
    title: "Order Confirmed",
    status: "Completed",
    message: "Your recent order has been successfully confirmed.",
    date: "29/10/2025   09:30am",
    by: "Emma Watson",
    type: "beneficiary",
    icon: "people-outline",
  },
  {
    id: 3,
    title: "Card Created",
    status: "Pending",
    message: "Your new card has been created and is ready to use.",
    date: "28/10/2025   10:45am",
    by: "John Doe",
    type: "cardcreated",
   icon: "card-outline",
  },
];



const DATA = [
  {
    id: '1', 
    name: 'Bill Payment', 
    amount: '+£51.00' 
  },
  {
    id: '2', 
    name: 'Bill Payment', 
    amount: '-£51.00' 
  },
  {
    id: '3', 
    name: 'Bill Payment', 
    amount: '+£51.00' 
  },
];



const DATA_STATEMENT = [
  {
    id: '1', 
    name: 'Top-up via debit card (**** 1291)', 
    amount: '+£51.00' 
  },
  {
    id: '2', 
    name: 'Exchanged £1,000 to €1,138 @ 1.14 rate', 
    amount: '-£51.00' 
  },
  {
    id: '3', 
    name: 'Withdrawn to HSBC Account (****6523)', 
    amount: '+£51.00' 
  },
];

const SPECIFIC_ACCOUNT_DETAIL = [
  {
    title: 'May 21',
    data: [
      { id: '1', name: 'Bill Payment', amount: '£51.00' },
    ],
  },
  {
    title: 'May 19',
    data: [
      { id: '2', name: 'Top-up via debit card (**** 1291)', amount: '£20.00' },
      { id: '3', name: 'Top-up via debit card (**** 1291)', amount: '£2.00' },
    ],
  },
  {
    title: 'May 29',
    data: [
      { id: '1', name: 'Top-up via debit card (**** 1291)', amount: '£51.00' },
    ],
  },
];

const BENEFICIARY_MANAGEMENT_DATA = [
  { id: '1', name: 'Emma Roberts', currency: 'GBP' },
  { id: '2', name: 'Omar Farooq', currency: 'AED' },
  { id: '3', name: 'Liam Anderson', currency: 'USD' },
  { id: '4', name: 'Ayesha Iqbal', currency: 'EUR' },
];

const PAYMENT_OPTION = [
  { id: '1', name: 'Bank Transfer', detailTxt: 'Transfer funds to any bank account locally.', icon: "business-outline", route: HOME_ROUTES.BANK_TRANSFER },
  { id: '2', name: 'International Transfer', detailTxt: 'Send payments across borders in multiple currencies.', icon: "earth-outline", route: HOME_ROUTES.INTERNATIONAL_TRANSFER  },
  { id: '3', name: 'To My Account', detailTxt: 'Move money between your own accounts.', icon: "wallet-outline", route: HOME_ROUTES.MY_ACCOUNT_TRANSFER  }
];



const ACTIVE_ACCOUNT = [
    {
        card_id: "55bc44ac-96f8-4b47-9605-246a14d24b1a",
        card_name: "kk",
        card_status: "inactive",
        format: "virtual",
        spending_type: "Daily",
        spending_limit: "6500",
        linked_account: "savings",
        currency_type: "savings",
        card_design: null,
        secure_id: "018d31a4-943f-42a7-919a-62cb7ed7c10e",
        created_at: "2025-08-08T09:47:49.573Z",
        clowd9_user_id: "f07c0bce-53cf-4389-9435-89707fbc0a2f",
        user_id: "61"
    },
    {
        card_id: "61a9c148-3601-460d-bcb4-906756cbfea5",
        card_name: "gg",
        card_status: "inactive",
        format: "virtual",
        spending_type: "Weekly",
        spending_limit: "258",
        linked_account: "savings",
        currency_type: "savings",
        card_design: null,
        secure_id: "ffc907e3-fcbc-4c3e-9634-85d55a73f09a",
        created_at: "2025-08-08T09:46:11.205Z",
        clowd9_user_id: "f07c0bce-53cf-4389-9435-89707fbc0a2f",
        user_id: "61"
    },
        {
        card_id: "55bc44ac-96-4b47-9605-246a14d24b1a",
        card_name: "kk",
        card_status: "inactive",
        format: "virtual",
        spending_type: "Daily",
        spending_limit: "6500",
        linked_account: "savings",
        currency_type: "savings",
        card_design: null,
        secure_id: "018d31a4-943f-42a7-919a-62cb7ed7c10e",
        created_at: "2025-08-08T09:47:49.573Z",
        clowd9_user_id: "f07c0bce-53cf-4389-9435-89707fbc0a2f",
        user_id: "61"
    },
    {
        card_id: "61a9c8-3601-460d-bcb4-906756cbfea5",
        card_name: "gg",
        card_status: "inactive",
        format: "virtual",
        spending_type: "Weekly",
        spending_limit: "258",
        linked_account: "savings",
        currency_type: "savings",
        card_design: null,
        secure_id: "ffc907e3-fcbc-4c3e-9634-85d55a73f09a",
        created_at: "2025-08-08T09:46:11.205Z",
        clowd9_user_id: "f07c0bce-53cf-4389-9435-89707fbc0a2f",
        user_id: "61"
    }
]

const CARD_DETAIL = [
    {
        card_id: "55bc44ac-96f8-4b47-9605-246a14d24b1a",
        card_name: "kk",
        card_status: "inactive",
        format: "virtual",
        spending_type: "Daily",
        spending_limit: "6500",
        linked_account: "savings",
        currency_type: "savings",
        card_design: null,
        secure_id: "018d31a4-943f-42a7-919a-62cb7ed7c10e",
        created_at: "2025-08-08T09:47:49.573Z",
        clowd9_user_id: "f07c0bce-53cf-4389-9435-89707fbc0a2f",
        user_id: "61"
    },
  ]

const CURRENT_ACCOUNT = [
    {
        card_id: "55bc44ac-96f8-4b47-9605-246a14d24b1a",
        card_name: "kk",
        card_status: "inactive",
        format: "virtual",
        spending_type: "Daily",
        spending_limit: "6500",
        linked_account: "savings",
        currency_type: "savings",
        card_design: null,
        secure_id: "018d31a4-943f-42a7-919a-62cb7ed7c10e",
        created_at: "2025-08-08T09:47:49.573Z",
        clowd9_user_id: "f07c0bce-53cf-4389-9435-89707fbc0a2f",
        user_id: "61"
    },
  ]

export { 
    Accounts,
    DATA,
    DATA_STATEMENT,
    REQUEST_DATA,
    BENEFICIARY_MANAGEMENT_DATA,
    SPECIFIC_ACCOUNT_DETAIL,
    ACTIVE_ACCOUNT,
    CARD_DETAIL,
    CURRENT_ACCOUNT,
    PAYMENT_OPTION,
    BENEFICIARY_TYPES,
    ACCOUNT_TYPES,
    COUNTRIES,
    CURRENCIES



};
