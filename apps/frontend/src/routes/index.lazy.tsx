import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex justify-center items-center h-[85svh]">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Let's do this!</CardTitle>
          <CardDescription>Enter your username, and let's crunch some numbers!</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="MyAnimeList username" />
          <Button className='mt-4 w-full'>Go!</Button>
        </CardContent>
      </Card>
    </div>
  )
}
