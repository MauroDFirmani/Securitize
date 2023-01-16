import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import Wallets from "../components/Wallets";
import NavBar from "../components/NavBar";
import { useGetWallets } from "../hooks/useWallets";

const Home=()=> {
    const [wallets, setWallets] = useState()
    const { data, refetch } = useGetWallets();

    useEffect(() => {
        setWallets(data)
    }, [data])
    
    return (
            <Container fixed>
                <NavBar />
                <Box marginTop={"35px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {!!wallets ? <Wallets wallets={wallets} />  : <CircularProgress />}
                </Box>
            </Container>
    );
}

export default Home;
