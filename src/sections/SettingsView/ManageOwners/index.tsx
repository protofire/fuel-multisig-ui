import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Divider, Typography } from "@mui/material";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { useAccountWalletSelected } from "@/hooks/useAccountWalletSelected";
import { AccountSigner } from "@/sections/shared/AccountSigner";
import { LoadingButton } from "@/sections/shared/common/LoadingButton";

import { useManageOwnersUi } from "./useManageOwnersUi";

interface Props {
  multisigSelected: MultisignatureAccount;
  isB256Activated: boolean;
}

export function ManageOwners({ multisigSelected, isB256Activated }: Props) {
  const { owners } = multisigSelected;
  const isPendingDelete = false;
  const { accountWalletItem } = useAccountWalletSelected();
  const { ownersQuery } = useManageOwnersUi({
    owners,
    accountWalletItemConnected: accountWalletItem,
  });
  const isOnlyOne = ownersQuery.data?.length <= 1;

  return (
    <Box display="flex">
      <Box minWidth={300}>
        <Typography variant="h5">Manage Owners</Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          Add, remove or ename existing owners. Owner names are only stored
          locally and will never be shared with us or any third parties.
        </Typography>
        <Box mt={2}>
          {ownersQuery.data.map((accountOwner) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                key={accountOwner.address.b256}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <AccountSigner
                    owner={accountOwner}
                    isB256Activated={isB256Activated}
                  />
                  <Box display="flex" gap={0.25}>
                    <DeleteOutlinedIcon
                      onClick={() => {
                        if (isPendingDelete || isOnlyOne) return;

                        console.log(accountOwner);
                      }}
                      sx={{
                        cursor:
                          isOnlyOne || isPendingDelete
                            ? "not-allowed"
                            : "pointer",
                      }}
                      color={
                        isOnlyOne || isPendingDelete ? "disabled" : "inherit"
                      }
                    />
                    {/* {isPendingDelete && isYou ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : (
                      <DeleteOutlinedIcon
                        onClick={() =>
                          !isPendingDelete && handleLocalDelete(owner)
                        }
                        sx={{
                          cursor:
                            owners?.length === 1 || isDeletedLoading
                              ? "not-allowed"
                              : "pointer",
                        }}
                        color={
                          owners?.length === 1 || isDeletedLoading
                            ? "disabled"
                            : "inherit"
                        }
                      />
                    )} */}
                  </Box>
                </Box>
                <Box>
                  <Divider sx={{ margin: "0.5rem 0" }} />
                </Box>
              </Box>
            );
          })}
        </Box>
        <LoadingButton
          variant="text"
          sx={{
            justifyContent: "flex-start",
            width: "150px",
            fontSize: 14,
            marginTop: "1rem",
          }}
          // {...(owners === undefined
          //   ? { isLoading: true }
          //   : { onClick: handleAddOwner })}
        >
          + Add new owner
        </LoadingButton>
      </Box>
    </Box>
  );
}
