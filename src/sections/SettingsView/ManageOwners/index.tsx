import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ROUTES } from "@/config/routes";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useRecentlyClicked } from "@/hooks/common/useRecentlyClicked";
import { useAccountWalletSelected } from "@/hooks/useAccountWalletSelected";
import { AccountSigner } from "@/sections/shared/AccountSigner";

import { DeleteOwnerModal } from "./DeleteOwnerModal";
import { useManageOwnersUi } from "./useManageOwnersUi";

interface Props {
  multisigSelected: MultisignatureAccount;
  isB256Activated: boolean;
}

export function ManageOwners({ multisigSelected, isB256Activated }: Props) {
  const { owners } = multisigSelected;
  const router = useRouter();
  const [currentOwner, setCurrentOwner] = useState<
    AccountWalletItem | undefined
  >();
  const isPendingDelete = false;
  const { accountWalletItem } = useAccountWalletSelected();
  const { ownersQuery } = useManageOwnersUi({
    owners,
    accountWalletItemConnected: accountWalletItem,
  });
  const isOnlyOne = ownersQuery.data?.length <= 1;
  const { openModal, isOpen, closeModal } = useModalBehaviour();
  const {
    openModal: openModalDelete,
    isOpen: isOpenModalDelete,
    closeModal: closeModalDelete,
  } = useModalBehaviour();
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(1500);

  const handleLocalDelete = (owner: AccountWalletItem) => {
    if (isPendingDelete || isOnlyOne) return;

    setCurrentOwner(owner);
    openModalDelete();
  };
  const handleAddOwner = () => {
    router.push(ROUTES.SetOwners);
  };

  return (
    <Box display="flex">
      <DeleteOwnerModal
        owner={currentOwner}
        isOpen={isOpenModalDelete}
        closeModal={closeModalDelete}
      />
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
                      onClick={() => handleLocalDelete(accountOwner)}
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
        <Button
          ref={refButton}
          variant="text"
          sx={{
            justifyContent: "flex-start",
            width: "150px",
            fontSize: 14,
            marginTop: "1rem",
          }}
          {...(!ownersQuery.isFetched ||
          ownersQuery.isLoading ||
          recentlyClicked
            ? { isLoading: true }
            : { onClick: handleAddOwner })}
        >
          {recentlyClicked ? (
            <CircularProgress color="secondary" size={20} />
          ) : (
            `+ Add new owner`
          )}
        </Button>
      </Box>
    </Box>
  );
}
