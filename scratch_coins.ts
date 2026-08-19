import { getCcPaymentCoins } from "./src/services/ccpayment/ccpayment";
(async () => {
  const res = await getCcPaymentCoins("deposit");
  const usdt = res.data?.coins.find(c => c.symbol === "USDT");
  console.log(usdt?.networks.map(n => n.chain));
})();
