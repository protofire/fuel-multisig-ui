import { AppBar, Stack, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/config/app";
import { LOGO_APP } from "@/config/images";
import { ROUTES } from "@/config/routes";
import { ConnectButton } from "@/sections/common/ConnectButton";

export function TopBar({
  buttonActionComponent = <ConnectButton />,
}: {
  buttonActionComponent?: React.ReactNode;
}) {
  return (
    <AppBar elevation={0} position="fixed">
      <Toolbar>
        <Stack direction="row" alignItems="center" gap={1} sx={{ flexGrow: 1 }}>
          <Link href={ROUTES.Welcome} passHref>
            <Image
              src={LOGO_APP}
              alt={`${APP_NAME} Wallet`}
              priority
              width={160}
              height={50}
            />
          </Link>
        </Stack>
        {buttonActionComponent}
      </Toolbar>
    </AppBar>
  );
}
