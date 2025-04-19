import React, { useReducer, useEffect } from 'react'
import { authManager } from './config/context/auth-manager'
import AuthContext from './config/context/auth-context'
import AppRouter from './router/AppRouter'
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const init = () => JSON.parse(localStorage.getItem('user')) || { signed: false }

function App() {
  const [user, dispatch] = useReducer(
    authManager, {}, init
  )

  useEffect(() => {
    if (!user) return
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])



  return (
    <PrimeReactProvider>
        <AuthContext.Provider value={{ dispatch, user }}>
          <AppRouter />
        </AuthContext.Provider>
    </PrimeReactProvider>

  )
}

export default App;