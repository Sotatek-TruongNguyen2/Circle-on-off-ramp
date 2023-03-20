const axios = require('axios');
const { uuid } = require('uuidv4');

const WIRE_BANK_ACCOUNT_ID = "2285081c-af1d-4ccd-89c0-45b02065cc60";
const SEC_WIRE_BANK_ACCOUNT_ID = "ef8e1cc6-97e8-485a-b3d0-7e555d70d421";
const TRD_WIRE_BANK_ACCOUNT_ID = "8fc15102-cfa4-43ac-ad7f-849c48b9b743";
// const MASTER_WALLET_ADDRESS = "0x494780da5b2f2a1efc115801e959cf0473d09932";
const CIRCLE_SANDBOX_API_KEY = "QVBJX0tFWTplMzY4MzAyYzgyODgyYjM2MzFhNTE3ODAxNzc0YWRkODozNTVmZWI5NzRlYzcwODMzYTllYjVhNTNiMGQ4MDZlOA";

const main = async () => {
  const circleAPI = await axios.create({
    baseURL: 'https://api-sandbox.circle.com',
    timeout: 10000,
    headers: { 'Authorization': `Bearer ${CIRCLE_SANDBOX_API_KEY}` }
  })

  // const masterWallet = (await circleAPI.get("v1/configuration")).data.data;
  // const masterWalletId = masterWallet.payments.masterWalletId;
  // console.log(masterWallet);


  // ============ Generate a blockchain address for your master wallet ================= 

  // const resp = await circleAPI.post(`v1/wallets/${masterWalletId}/addresses`, {
  //   idempotencyKey: uuid(),
  //   currency: "USD",
  //   chain: "ETH"
  // })
  // console.log(resp);

  // ============ Check master wallet balance ================= 

  const masterWalletBalance = (await circleAPI.get("v1/businessAccount/balances")).data.data;
  console.log(masterWalletBalance);

  // ============ Link a bank account master wallet (allows payment) ==============

  // First case will be for US-bank-account
  // const resp = (await circleAPI.post("v1/banks/wires", {
  //   idempotencyKey: uuid(),
  //   accountNumber: "5173375000000006", // This number are retrieved from testing account (Circle)
  //   routingNumber: "122105155", // ABA routing number 
  //   billingDetails: {
  //     name: "Nguyen quang truong",
  //     city: "Vinh yen",
  //     country: "US",
  //     postalCode: "280000",
  //     line1: "100 Money Street",
  //     district: "MA"
  //   },
  //   bankAddress: {
  //     bankName: "WELLS FARGO BANK, NA",
  //     line1: "177 Lam son street Vinh yen Vinh ph",
  //     city: "SAN FRANCISCO",
  //     district: "CA",
  //     country: "US"
  //   }
  // })).data.data;

  // GET DETAILS OF A WIRED BANK ACCOUNT
  // const wireBankAccountDetails = (await circleAPI.get(`v1/businessAccount/banks/wires/${TRD_WIRE_BANK_ACCOUNT_ID}`));
  // console.log(wireBankAccountDetails);

  // GET ALL WIRE BANK ACCOUNTS
  // const wireBankAccounts = (await circleAPI.get(`v1/businessAccount/banks/wires`)).data.data;
  // console.log(wireBankAccounts);

  // // const instructions = (await circleAPI.get(`v1/banks/wires/ef8e1cc6-97e8-485a-b3d0-7e555d70d421/instructions`)).data.data;
  // const instructions = (await circleAPI.get(`/v1/businessAccount/banks/wires/${WIRE_BANK_ACCOUNT_ID}/instructions?currency=USD`)).data.data;
  // const instructions = (await circleAPI.get(`/v1/businessAccount/banks/wires/${SEC_WIRE_BANK_ACCOUNT_ID}/instructions?currency=USD`)).data.data;
  // console.log(instructions);

  const resp = (await circleAPI.post('/v1/payouts', {
    idempotencyKey: uuid(),
    // source: {
    //   type: "wallet",
    //   id: masterWalletId
    // },
    destination: {
      type: "wire",
      id: "ef8e1cc6-97e8-485a-b3d0-7e555d70d421"
    },
    amount: {
      currency: "USD",
      amount: "6.21"
    },
    metadata: {
      beneficiaryEmail: "john.smith@email.com"
    }
  })).data.data;

  // console.log(resp);

}

main();
