import { Grid, Typography } from "@mui/material";

import { APP_VERSION } from "@/config/environment";

export default function MyApp() {
  return (
    <Grid>
      <Typography>Index App {APP_VERSION}</Typography>
    </Grid>
  );
}
