import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useCheckHealth from '@/hooks/useCheckHealth'
import { createLazyFileRoute } from '@tanstack/react-router'

import { useCallback, useState } from 'react'
import { AlertCircleIcon } from 'lucide-react'
import { getErrorAsError } from '@/lib/utils'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const {
    isHealthy,
    isChecking,
    error,
  } = useCheckHealth()

  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const handleGo = useCallback(async () => {
    if (!isHealthy || isChecking) return

    setIsLoading(true)
    setFetchError(null)

    try {
      const response = await fetch(`${BACKEND_URL}/api/${username}`, {
        method: 'POST',
      })

      const data = await response.json()

      if (response.status === 404) {
        setFetchError('User not found')
        return
      }

      console.log(data)
    } catch (err) {
      const error = getErrorAsError(err)
      setFetchError(error.message)
    } finally {
      setIsLoading(false)
    }

  }, [isChecking, isHealthy, username])

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
          { fetchError && <div className="text-red-500 mb-2">{fetchError}</div>}
          <Input disabled={!isHealthy} placeholder="MyAnimeList username" required onChange={(e) => setUsername(e.target.value)} />
          <Button disabled={!isHealthy || isChecking || isLoading} className='mt-4 w-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700' onClick={handleGo}>
            {isLoading ? (
              <span>
                <span className="animate-spin">🔄</span> Grabbing data...
              </span>
            ) : isHealthy ? 'Go!' : isChecking ? 'Starting up...' : ':('}
          </Button>
        </CardContent>
      </Card>
    </div >
  )
}
