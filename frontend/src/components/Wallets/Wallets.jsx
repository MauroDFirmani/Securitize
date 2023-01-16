import { Box } from "@mui/material";
import { Wallet }from "../Wallet";

export const Wallets = ({ wallets}) => {
  return (
        <Box style={{ width: "60%"}} mt={"15px"} mb={"15px"}> 
          {wallets.map((wallet,index ) => (
            <Box key={`f-${index}`}>  
              <Wallet  key={index} address={wallet.address} />
            </Box>
          ))}
        </Box>
  );
};
