import { Box, CircularProgress } from "@mui/material";
import { useFetchMarkets } from "../services/hooks/useFetchMarkets";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import MarketDetails from "../pages/MarketDetails";
const MarketDetailsContainer = () => {
  const id = useParams().id;
  const { data: markets, isError, isLoading } = useFetchMarkets();
  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (isError) {
    enqueueSnackbar(" خطایی رخ داد. ", { variant: "error" });
  }

  return <MarketDetails markets={markets ?? []} id={id ?? ""} />;
};

export default MarketDetailsContainer;
