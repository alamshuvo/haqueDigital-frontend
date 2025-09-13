import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import router from './routes/route.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors />
    </Provider>
  </StrictMode>,
)
