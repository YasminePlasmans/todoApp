import { Auth0Provider } from "@auth0/auth0-react"
import { createRoot } from "react-dom/client"

import App from "./App"

const container = document.getElementById("app")
const root = createRoot(container!)
root.render(
  <Auth0Provider
    domain="yasminepl.eu.auth0.com"
    clientId="x87p4FVLKckynLZfXVd7U0NHIPbYTtQE"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
)
