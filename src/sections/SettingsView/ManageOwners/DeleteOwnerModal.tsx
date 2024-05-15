import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Modal, Typography } from "@mui/material";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { UseModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { AccountSigner } from "@/sections/shared/AccountSigner";

interface Props extends Omit<UseModalBehaviour, "openModal"> {
  onConfirm?: () => void;
  owner?: AccountWalletItem;
}

export function DeleteOwnerModal({
  isOpen,
  closeModal,
  onConfirm,
  owner,
}: Props) {
  return (
    <Modal
      open={isOpen}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={2}
        width={500}
        sx={(theme) => ({ backgroundColor: theme.palette.grey.A100 })}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          mt={1}
          pl={2}
        >
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" color="primary">
              Are you sure you want to delete this owner?
            </Typography>
            <Typography variant="h6" onClick={closeModal}>
              <CloseIcon />
            </Typography>
          </Box>
          <Box mt={3} mb={2}>
            {owner && <AccountSigner owner={owner} truncateAmount={12} />}
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={300}
          mt={3}
        >
          <Button onClick={closeModal} variant="outlined" sx={{ width: 94 }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              closeModal();
              onConfirm?.();
            }}
            variant="contained"
            sx={{ width: 134 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
