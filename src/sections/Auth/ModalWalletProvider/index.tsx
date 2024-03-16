import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import React from "react";

import { WalletProviderItem } from "@/domain/ui/WalletProviderItem";
import { getConnectorImage } from "@/services/fuel/connectors/icons";
import { openInNewTab } from "@/utils/browserMethods";

import {
  ModalStyled,
  ModalStyledDivider,
  ModalStyledList,
  ModalStyledListItem,
  ModalTypography,
} from "./styled";

type Props = {
  open: boolean;
  wallets: WalletProviderItem[];
  connectWallet: (wallet: string) => void;
  onClose: () => void;
  handleClose: () => void;
};

export function ModalWallet({
  open,
  wallets,
  connectWallet,
  onClose,
  handleClose,
}: Props) {
  const walletInstalled = wallets.filter((wallet) => wallet.installed);
  const walletNotInstalled = wallets.filter((wallet) => !wallet.installed);

  const handleClick = (walletName: string) => {
    onClose();
    connectWallet(walletName);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalStyled>
        <ModalTypography id="modal-modal-title" variant="h3">
          Connect your wallet
        </ModalTypography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box>
          <ModalStyledList disablePadding>
            {walletInstalled.map((w) => (
              <ListItem key={w.id}>
                <>
                  <ModalStyledListItem
                    onClick={() => {
                      handleClick(w.id);
                    }}
                  >
                    <ListItemIcon>
                      {w.logo.src ? getConnectorImage(w.logo?.src) : null}
                    </ListItemIcon>
                    <ListItemText primary={`${w.id}`} />
                    <Chip
                      label="Installed"
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  </ModalStyledListItem>
                </>
              </ListItem>
            ))}
          </ModalStyledList>
        </Box>
        <Box>
          <ModalStyledDivider variant="middle" />
          <ModalStyledList disablePadding>
            {walletNotInstalled.map((w) => (
              <ListItem key={w.id}>
                <>
                  <ModalStyledListItem
                    onClick={() => {
                      openInNewTab(w.installUrl);
                    }}
                  >
                    <ListItemIcon>
                      {w.logo.src ? getConnectorImage(w.logo?.src) : null}
                    </ListItemIcon>
                    <ListItemText primary={`${w.name}`} />
                    <Chip
                      label="Installation needed"
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </ModalStyledListItem>
                </>
              </ListItem>
            ))}
          </ModalStyledList>
        </Box>
      </ModalStyled>
    </Modal>
  );
}
