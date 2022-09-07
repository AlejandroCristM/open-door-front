import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const {REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID} = process.env;
console.log(REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN);

root.render(
  <React.StrictMode>
    <Auth0Provider 
      domain={REACT_APP_AUTH0_DOMAIN} 
      clientId={REACT_APP_AUTH0_CLIENT_ID} 
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
