import { OIDCClient } from '@plusauth/plusauth-oidc-client-js'

console.log("ISSUER:", import.meta.env.VITE_APP_OIDC_ISSUER)
console.log("CLIENT ID:", import.meta.env.VITE_APP_CLIENT_ID)
const Auth = new OIDCClient({
  issuer: import.meta.env.VITE_APP_OIDC_ISSUER,
  client_id: import.meta.env.VITE_APP_CLIENT_ID,
  redirect_uri: 'http://localhost:5050/callback',
  response_type: 'id_token token code',
  scope: 'openid profile email',
})

export { Auth }
