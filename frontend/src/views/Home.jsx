import {
  Box,
  Container,
} from "@mui/material";
import { NavBar } from "../components/NavBar";
import { withSpinner } from "../components/Spinner"
import { Wallets } from "../components/Wallets/Wallets";
import { useGetWallets } from "../hooks/useWallets";

const WalletsWithSpinner = withSpinner(Wallets)

const Home=()=> {
    const { data, isLoading } = useGetWallets();    
    return (
            <Container fixed>
                <NavBar />
                <Box marginTop={"35px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <WalletsWithSpinner isLoading={isLoading} wallets={data} />
                </Box>
            </Container>
    );
}

export default Home;
