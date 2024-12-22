import TitleBar from '@/components/title-bar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <TitleBar />
      <Outlet />
    </>
  ),
})
