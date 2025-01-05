import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stats/')({
  component: RouteComponent,
  beforeLoad: async () => {
    // TODO: check user data atom and other stuff before allowing the route to load
    console.log('Before loading "/stats/"')
  }
})

function RouteComponent() {
  return <div>Hello "/stats/"!</div>
}
