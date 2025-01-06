import { store } from '@/atoms'
import Footer from '@/components/footer'
import TitleBar from '@/components/title-bar'

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Provider } from 'jotai'

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-svh">
      <TitleBar />
      <div className="p-4">
        <Provider store={store}>
          <Outlet />
        </Provider>
      </div>
      <Footer />
    </div>
  ),
})
