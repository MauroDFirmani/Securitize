import {useMutation, useQuery} from "react-query";
import client from "../config/client";
import queryClient from "../config/cache";

const WALLETS = "/wallets";

const getWallets = async () => {
  const {data} = await client.get(`${WALLETS}`);
  return data;
};

const getWalletInfoByAddress = async (address) => {
  const {data} = await client.get(`${WALLETS}/${address}`);
  return data;
};

const updateWallet = async ({address, newExchangeRate}) => {
  const {data} = await client.put(`${WALLETS}/${address}`, newExchangeRate);
  return data;
};

const createWallet = async (wallet) => {
  const {data} = await client.post(`${WALLETS}`, wallet);
  return data;
};

export const useGetWallets = () => {
  return useQuery(["wallets"], () => getWallets(), {
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: 2000,
  });
};

export const useGetWalletInfoByAddress = (address) => {
  return useQuery(["wallet", address], () => getWalletInfoByAddress(address), {
    refetchOnMount: true,
    refetchOnReconnect: false,
  });
};

export const useCreateWallet = () => {
  return useMutation((wallet) => createWallet(wallet));
};

export const useUpdateWallet = () => {
  return useMutation(
    ({address, newExchangeRate}) => updateWallet({address, newExchangeRate}),
    {
      onSuccess: (data) => queryClient.setQueryData(["wallet", data.wallet.address], data),
    }
  );
};
