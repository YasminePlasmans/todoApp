import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { useAuth0 } from "@auth0/auth0-react"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import * as dayjs from "dayjs"
import enGB from "dayjs/locale/en-gb"
import { useEffect, useState } from "react"

import { theme } from "./App.config"
import { UserType } from "./constants/types"
import List from "./routes/List"
import Login from "./routes/Login"

const createApolloClient = () => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "ws://trustpair.hasura.app/v1/graphql",
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: {
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
              "mW8avRrjgSzJw3029oExXR7435fP5iqSmiw3asBuB7eXa1VOW8LDrKG7VFUsMrAG",
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  })
}

export default function App() {
  dayjs.locale(enGB)

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
  const [randomUser, setRandomUser] = useState<UserType>()

  useEffect(() => {
    fetch("https://randomuser.me/api/?inc=name,picture")
      .then((res) => res.json())
      .then((data) => {
        setRandomUser(data.results[0])
      })
  }, [])

  const client = createApolloClient()

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={enGB}>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                <img
                  src="https://trustpair.fr/wp-content/uploads/2020/05/Trustpair_logo1.svg"
                  alt="Trustpair Logo"
                  height={35}
                />
              </Box>
              {isAuthenticated ? (
                <>
                  <Avatar src={randomUser?.picture?.thumbnail} />
                  <Button
                    color="inherit"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" onClick={loginWithRedirect}>
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>
          {isAuthenticated ? <List /> : <Login login={loginWithRedirect} />}
        </LocalizationProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}
