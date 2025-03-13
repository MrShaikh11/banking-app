const data = [
  {
    id: "1a2b3c",
    name: "John Doe",
    email: "john@email.com",
    password: "123456",
    role: "admin",
    transactions: [
      { type: "withdraw", amt: 100, balance: 900 },
      { type: "deposit", amt: 200, balance: 1100 },
      { type: "withdraw", amt: 50, balance: 1050 },
      { type: "deposit", amt: 300, balance: 1350 },
      { type: "withdraw", amt: 150, balance: 1200 },
    ],
  },
  {
    id: "4d5e6f",
    name: "Jane Smith",
    email: "jane@email.com",
    password: "abcdef",
    role: "user",
    transactions: [
      { type: "deposit", amt: 200, balance: 1700 },
      { type: "withdraw", amt: 50, balance: 1650 },
      { type: "deposit", amt: 400, balance: 2050 },
      { type: "withdraw", amt: 300, balance: 1750 },
      { type: "deposit", amt: 100, balance: 1850 },
    ],
  },
  {
    id: "7g8h9i",
    name: "Alice Brown",
    email: "alice@email.com",
    password: "alice123",
    role: "admin",
    transactions: [
      { type: "deposit", amt: 300, balance: 2300 },
      { type: "withdraw", amt: 100, balance: 2200 },
      { type: "deposit", amt: 500, balance: 2700 },
      { type: "withdraw", amt: 200, balance: 2500 },
      { type: "deposit", amt: 100, balance: 2600 },
    ],
  },
  {
    id: "0j1k2l",
    name: "Bob Johnson",
    email: "bob@email.com",
    password: "bobpass",
    role: "user",
    transactions: [
      { type: "withdraw", amt: 150, balance: 650 },
      { type: "deposit", amt: 100, balance: 750 },
      { type: "withdraw", amt: 50, balance: 700 },
      { type: "deposit", amt: 200, balance: 900 },
      { type: "withdraw", amt: 100, balance: 800 },
    ],
  },
  {
    id: "3m4n5o",
    name: "Charlie White",
    email: "charlie@email.com",
    password: "charliepwd",
    role: "user",
    transactions: [
      { type: "deposit", amt: 400, balance: 1600 },
      { type: "withdraw", amt: 200, balance: 1400 },
      { type: "deposit", amt: 300, balance: 1700 },
      { type: "withdraw", amt: 100, balance: 1600 },
      { type: "deposit", amt: 150, balance: 1750 },
    ],
  },
  {
    id: "6p7q8r",
    name: "Daisy Green",
    email: "daisy@email.com",
    password: "daisy123",
    role: "admin",
    transactions: [
      { type: "withdraw", amt: 300, balance: 1500 },
      { type: "deposit", amt: 500, balance: 2000 },
      { type: "withdraw", amt: 100, balance: 1900 },
      { type: "deposit", amt: 200, balance: 2100 },
      { type: "withdraw", amt: 50, balance: 2050 },
    ],
  },
  {
    id: "9s0t1u",
    name: "Ethan Clark",
    email: "ethan@email.com",
    password: "ethanpass",
    role: "user",
    transactions: [
      { type: "deposit", amt: 150, balance: 1050 },
      { type: "withdraw", amt: 50, balance: 1000 },
      { type: "deposit", amt: 200, balance: 1200 },
      { type: "withdraw", amt: 100, balance: 1100 },
      { type: "deposit", amt: 50, balance: 1150 },
    ],
  },
  {
    id: "2v3w4x",
    name: "Fiona Black",
    email: "fiona@email.com",
    password: "fiona123",
    role: "admin",
    transactions: [
      { type: "withdraw", amt: 400, balance: 2100 },
      { type: "deposit", amt: 600, balance: 2700 },
      { type: "withdraw", amt: 300, balance: 2400 },
      { type: "deposit", amt: 200, balance: 2600 },
      { type: "withdraw", amt: 100, balance: 2500 },
    ],
  },
  {
    id: "5y6z7a",
    name: "George King",
    email: "george@email.com",
    password: "georgepass",
    role: "user",
    transactions: [
      { type: "deposit", amt: 250, balance: 1350 },
      { type: "withdraw", amt: 100, balance: 1250 },
      { type: "deposit", amt: 150, balance: 1400 },
      { type: "withdraw", amt: 200, balance: 1200 },
      { type: "deposit", amt: 100, balance: 1300 },
    ],
  },
  {
    id: "8b9c0d",
    name: "Hannah Scott",
    email: "hannah@email.com",
    password: "hannahpwd",
    role: "user",
    transactions: [
      { type: "withdraw", amt: 200, balance: 1100 },
      { type: "deposit", amt: 300, balance: 1400 },
      { type: "withdraw", amt: 150, balance: 1250 },
      { type: "deposit", amt: 200, balance: 1450 },
      { type: "withdraw", amt: 100, balance: 1350 },
    ],
  },
];

export default data;
