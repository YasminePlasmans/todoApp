import { Box, Button, Typography } from "@mui/material"

export default function Login({ login }: { login: () => void }) {
  return (
    <Box
      sx={{
        m: 5,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" paragraph>
        Please register or login to use this application
      </Typography>
      <Button onClick={login} variant={"contained"}>
        Login
      </Button>
    </Box>
  )
}
