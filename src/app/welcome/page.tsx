import { Box } from "@mui/material";

import { WelcomeCard } from "@/sections/WelcomeView/WelcomeCard";

// import ErrorMessage from "@/components/common/ErrorMessage";
// import { BasicLayout } from "@/components/layout/BasicLayout";
// import { Footer } from "@/components/layout/Footer";
// import { MainContentCard } from "@/components/layout/shared/MainContentCard";
// import { XsignersAccountTable } from "@/components/XsignersAccountTable";
// import { ROUTES } from "@/config/routes";
// import { useCallerXsignersAccount } from "@/context/CallerXsigerAccounts";
// import { usePolkadotContext } from "@/context/usePolkadotContext";
// import { useSetXsignerSelected } from "@/hooks/xsignerSelected/useSetXsignerSelected";

export default function WelcomePage() {
  // const { accountConnected, network } = use();
  // const { setXsigner, clearXsignerSelected } = useSetXsignerSelected();
  // const theme = useTheme();
  // const {
  //   multisigs,
  //   isLoading: isLoadingMultisigs,
  //   error,
  // } = useCallerXsignersAccount();

  // useEffect(() => {
  //   clearXsignerSelected();
  // }, [clearXsignerSelected]);

  return (
    <Box>
      {/* {error && <ErrorMessage message={error} />} */}
      <WelcomeCard />
      {/* {!isLoadingMultisigs ? (
        <XsignersAccountTable
          network={network}
          onClick={setXsigner}
          multisigs={multisigs}
          accountConnected={accountConnected?.address}
        />
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" p={2}>
          <CircularProgress size={50} />
        </Box>
      )} */}
      <Box sx={{ padding: "0 15.5rem 1rem 0" }}>Todo </Box>
    </Box>
  )
}

// WelcomePage.getLayout = (page: ReactNode) => <BasicLayout>{page}</BasicLayout>;
WelcomePage.connectedWalletRequired = false;
