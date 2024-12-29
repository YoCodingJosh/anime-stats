import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useCheckHealth from '@/hooks/useCheckHealth'
import { createLazyFileRoute } from '@tanstack/react-router'
import { AlertCircleIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const {
    isHealthy,
    isChecking,
    error,
  } = useCheckHealth()

  return (
    <div className="flex flex-col justify-center items-center h-[85svh] gap-10">
      {error && (
        <Alert className="w-[420px]">
          <AlertCircleIcon className="w-4 h-4" />
          <AlertTitle>System down</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card className={`transition-opacity w-[420px] ${error ? 'opacity-50 mb-[calc(2.5rem+74px)]' : ''}`}>
        <CardHeader>
          <CardTitle>Let's do this!</CardTitle>
          <CardDescription>Enter your username, and let's crunch some numbers!</CardDescription>
        </CardHeader>
        <CardContent>
          <Input disabled={!isHealthy} placeholder="MyAnimeList username" />
          <Button disabled={!isHealthy} className='mt-4 w-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700'>
            {isHealthy ? 'Go!' : isChecking ? 'Starting up...' : ':('}
          </Button>
        </CardContent>
      </Card>
    </div >
  )
}
