import { Alert, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useGetWalletInfoByAddress } from "../../hooks/useWallets";
import RateCard from "../RateCard";
import BalanceCard from "../BalanceCard";

const InfoAlert = (isOld) =>{
    return isOld ? <Alert severity="warning">Wallet is old!</Alert> : <Alert severity="success">Wallet up to date!</Alert> 
}

export const Wallet = ({address}) => {
  const [currency, setCurrency] = useState('USD')
  const [exchangesRate, setExchangesRate] = useState()
  const [currentExchangeRate, setCurrentExchangeRate] = useState()
  const [isOld, setIsOld] = useState()
  const [balance, setBalance] = useState()
  const {data, refetch, isSuccess} = useGetWalletInfoByAddress(address)

  useEffect(() => {
    if(isSuccess){
      const { wallet, balance } = data
      setExchangesRate(wallet.exchangesRate)
      setCurrentExchangeRate(wallet.exchangesRate.find((e)=> e.currency === currency))
      setBalance(balance)
      setIsOld(wallet.isOld)
    }
  }, [isSuccess, data])

  useEffect(()=>{
    if(exchangesRate){
      setCurrentExchangeRate(exchangesRate.find((e)=> e.currency === currency))
    }
  },[currency])

  return (
   isSuccess && exchangesRate ?
     ( <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} mt={"15px"}>
        <Grid item xs={12}>
          <InfoAlert isOld={isOld} />
        </Grid>
        <Grid item xs={6}>
          <RateCard exchangeRate={currentExchangeRate} address={address} refetch={refetch}/>
        </Grid>
        <Grid item xs={6}>
        <BalanceCard currency={currency} setCurrency={setCurrency} balance={balance} />
        </Grid>
      </Grid>)
    : <CircularProgress />
  );
};
