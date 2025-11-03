import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bhvr')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bhvr"!</div>
}
