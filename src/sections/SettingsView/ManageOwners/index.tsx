import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useRecentlyClicked } from "@/hooks/common/useRecentlyClicked";
import { useDeleteOwner } from "@/hooks/multisigContract/settings/useDeleteOwner";
import { useAccountWalletSelected } from "@/hooks/useAccountWalletSelected";
import { AccountSigner } from "@/sections/shared/AccountSigner";

import { DeleteOwnerModal } from "./DeleteOwnerModal";
import { useManageOwnersUi } from "./useManageOwnersUi";

interface Props {
  multisigSelected: MultisignatureAccount;
  isB256Activated: boolean;
  handleAddOwner: () => void;
}

export function ManageOwners({
  multisigSelected,
  isB256Activated,
  handleAddOwner,
}: Props) {
  const { owners } = multisigSelected;
  const [currentOwner, setCurrentOwner] = useState<
    AccountWalletItem | undefined
  >();
  const {
    deleteOwner,
    isPending: isPendingDelete,
    ownerDeleting,
  } = useDeleteOwner({ multisigAddress: multisigSelected.address });
  const { accountWalletItem } = useAccountWalletSelected();
  const { ownersQuery } = useManageOwnersUi({
    owners,
    accountWalletItemConnected: accountWalletItem,
  });
  const isOnlyOne = ownersQuery.data?.length <= 1;
  const {
    openModal: openModalDelete,
    isOpen: isOpenModalDelete,
    closeModal: closeModalDelete,
  } = useModalBehaviour();
  const { ref: refButton, recentlyClicked } = useRecentlyClicked(1500);

  const handleLocalDelete = (owner: AccountWalletItem) => {
    if (
      isPendingDelete ||
      isOnlyOne ||
      ownerDeleting?.address.b256 === owner.address.b256
    )
      return;

    setCurrentOwner(owner);
    openModalDelete();
  };

  return (
    <Box display="flex">
      <DeleteOwnerModal
        owner={currentOwner}
        isOpen={isOpenModalDelete}
        closeModal={closeModalDelete}
        onConfirm={deleteOwner}
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
            const _isDeleting =
              ownerDeleting?.address.b256 === accountOwner.address.b256;

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
                    {isPendingDelete &&
                    currentOwner?.address.b256 === accountOwner.address.b256 ? (
                      <CircularProgress color="secondary" size={20} />
                    ) : (
                      <DeleteOutlinedIcon
                        onClick={() => handleLocalDelete(accountOwner)}
                        sx={{
                          cursor:
                            isOnlyOne || isPendingDelete || _isDeleting
                              ? "not-allowed"
                              : "pointer",
                        }}
                        color={
                          isOnlyOne || isPendingDelete || _isDeleting
                            ? "disabled"
                            : "inherit"
                        }
                      />
                    )}
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
            ? { disabled: true }
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
