export const categoryData = [
  { id: 1, category: "CATEGORY", amount: 2.5, number: 400 },
  { id: 2, category: "DIAMOND", amount: 1.5, number: 344 },
  { id: 3, category: "GOLD", amount: 2.3, number: 654 },
  { id: 4, category: "BRONZE", amount: 3.3, number: 235 },
  { id: 5, category: "SILVER", amount: 5.4, number: 786 },
  { id: 6, category: "GOLD", amount: 3.2, number: 399 },
  { id: 7, category: "BRONZE", amount: 1.5, number: 599 },
  { id: 8, category: "SILVER", amount: 3.1, number: 600 },
  { id: 10, category: "DIAMOND", amount: 4.5, number: 900 },
  { id: 11, category: "GOLD", amount: 6.6, number: 800 }
];

export const regionData = [
  { id: 1, region: "NORTH", amount: 5.5, number: 400 },
  { id: 2, region: "SOUTH", amount: 1.5, number: 344 },
  { id: 3, region: "EAST", amount: 2.3, number: 654 },
  { id: 4, region: "WEST", amount: 3.3, number: 235 },
  { id: 5, region: "NORTH", amount: 5.4, number: 786 },
  { id: 6, region: "WEST", amount: 3.2, number: 399 },
  { id: 7, region: "EAST", amount: 1.5, number: 599 },
  { id: 8, region: "NORTH", amount: 3.1, number: 600 },
  { id: 10, region: "SOUTH", amount: 4.5, number: 900 },
  { id: 11, region: "EAST", amount: 6.6, number: 800 }
];

export const customerData = [
  { id: 1, region: "NORTH", amount: 5.5, number: 400 },
  { id: 2, region: "SOUTH", amount: 1.5, number: 344 },
  { id: 3, region: "EAST", amount: 2.3, number: 654 },
  { id: 4, region: "WEST", amount: 3.3, number: 235 },
  { id: 5, region: "NORTH", amount: 5.4, number: 786 },
  { id: 6, region: "WEST", amount: 3.2, number: 399 },
  { id: 7, region: "EAST", amount: 1.5, number: 599 },
  { id: 8, region: "NORTH", amount: 3.1, number: 600 },
  { id: 10, region: "SOUTH", amount: 4.5, number: 900 },
  { id: 11, region: "EAST", amount: 6.6, number: 800 }
];

export const cusOverDue = [
  { id: 1, name: "Krishna", code: 17000, amount: "4,677.33", inactive: "august 15, 2023", invoice: 34 },
  { id: 2, name: "Satish", code: 17001, amount: "4,677,34", inactive: "august 15, 2023", invoice: 34 },
  { id: 3, name: "Sanjay", code: 17002, amount: "5,775,45", inactive: "august 15, 2023", invoice: 34 },
  { id: 4, name: "Anil", code: 17003, amount: "5,775,45", inactive: "august 15, 2023", invoice: 34 },
  { id: 6, name: "Sanamway", code: 17004, amount: "5,775,45", inactive: "august 15, 2023", invoice: 34 },
  { id: 7, name: "Shammi", code: 17005, amount: "5,775,45", inactive: "august 15, 2023", invoice: 34 },
  { id: 8, name: "Karan", code: 17006, amount: "5,775,45", inactive: "august 15, 2023", invoice: 34 },
  { id: 10, name: "Arjun", code: 17007, amount: "5,775,45", inactive: "august 15, 2023", invoice: 34 },
  { id: 11, name: "Bheem", code: 17008, amount: "5,775,45", inactive: "august 15, 2023", invoice: 34 }
];

export const inactList = [
  {
    id: 1,
    name: "Krishna",
    code: 17000,
    amount: "4,677.33",
    inactive: "august 15, 2023",
    reason: "Product Due",
    color: "teal"
  },
  {
    id: 2,
    name: "Satish",
    code: 17001,
    amount: "4,677,34",
    inactive: "august 15, 2023",
    reason: "Completed",
    color: "green"
  },
  {
    id: 3,
    name: "Sanjay",
    code: 17002,
    amount: "5,775,45",
    inactive: "august 15, 2023",
    reason: "Payment not cleared",
    color: "yellow"
  },
  {
    id: 4,
    name: "Anil",
    code: 17003,
    amount: "5,775,45",
    inactive: "august 15, 2023",
    reason: "GST due",
    color: "red"
  },
  {
    id: 6,
    name: "Sanamway",
    code: 17004,
    amount: "5,775,45",
    inactive: "august 15, 2023",
    reason: "Product Due",
    color: "teal"
  },
  {
    id: 7,
    name: "Shammi",
    code: 17005,
    amount: "5,775,45",
    inactive: "august 15, 2023",
    reason: "GST due",
    color: "red"
  },
  {
    id: 8,
    name: "Karan",
    code: 17006,
    amount: "5,775,45",
    inactive: "august 15, 2023",
    reason: "Payment not cleared",
    color: "yellow"
  },
  {
    id: 10,
    name: "Arjun",
    code: 17007,
    amount: "5,775,45",
    inactive: "august 15, 2023",
    reason: "Completed",
    color: "green"
  },
  {
    id: 11,
    name: "Bheem",
    code: 17008,
    amount: "5,775,45",
    inactive: "august 15, 2023",
    reason: "GST due",
    color: "red"
  }
];

export const totalOsData = [
  {
    id: 1,
    invoice_no: 2600041,
    invoice_date: "14-aug-23",
    invoice_amount: "4,677.33",
    payment_status: "Paid",
    color: "teal",
    due_since: "August 15, 2023"
  },
  {
    id: 2,
    invoice_no: 2600042,
    invoice_date: "15-aug-23",
    invoice_amount: "3,245.75",
    payment_status: "Processing",
    color: "yellow",
    due_since: "August 16, 2023"
  },
  {
    id: 3,
    invoice_no: 2600043,
    invoice_date: "16-aug-23",
    invoice_amount: "5,899.99",
    payment_status: "Unpaid",
    color: "red",
    due_since: "May 17, 2023"
  },
  {
    id: 4,
    invoice_no: 2600044,
    invoice_date: "17-aug-23",
    invoice_amount: "2,345.67",
    payment_status: "Processing",
    color: "yellow",
    due_since: "April 18, 2023"
  },
  {
    id: 5,
    invoice_no: 2600045,
    invoice_date: "18-aug-23",
    invoice_amount: "7,890.12",
    payment_status: "Paid",
    color: "teal",
    due_since: "August 19, 2023"
  },
  {
    id: 6,
    invoice_no: 2600046,
    invoice_date: "19-aug-23",
    invoice_amount: "1,234.56",
    payment_status: "Pending",
    color: "red",
    due_since: "April 20, 2023"
  },
  {
    id: 7,
    invoice_no: 2600047,
    invoice_date: "20-aug-23",
    invoice_amount: "9,876.54",
    payment_status: "Paid",
    color: "teal",
    due_since: "March 21, 2023"
  },
  {
    id: 8,
    invoice_no: 2600048,
    invoice_date: "21-aug-23",
    invoice_amount: "6,543.21",
    payment_status: "Pending",
    color: "red",
    due_since: "July 22, 2023"
  },
  {
    id: 9,
    invoice_no: 2600049,
    invoice_date: "22-aug-23",
    invoice_amount: "3,210.98",
    payment_status: "Paid",
    color: "teal",
    due_since: "July 23, 2023"
  },
  {
    id: 10,
    invoice_no: 2600050,
    invoice_date: "23-aug-23",
    invoice_amount: "8,765.43",
    payment_status: "Pending",
    color: "red",
    due_since: "July 24, 2023"
  }
];
