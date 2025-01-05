import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import useCheckHealth from '@/hooks/useCheckHealth'
import { getErrorAsError } from '@/lib/utils'
import { userDataAtom } from '@/atoms'

import { createLazyFileRoute } from '@tanstack/react-router'
import { AlertCircleIcon, Loader2 } from 'lucide-react'
import { useCallback, useState, useRef } from 'react'
import { useSetAtom } from 'jotai'

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

  const setUserData = useSetAtom(userDataAtom)

  // I should use react-hook-form here, but this is the only form in the app and it's a only single field and button

  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const usernameInputRef = useRef<HTMLInputElement>(null)

  const handleGo = useCallback(async () => {
    if (!isHealthy || isChecking) return

    if (!username) {
      setFetchError('Username is required')
      usernameInputRef.current?.focus()
      return
    }

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

      if (!response.ok) {
        throw new Error(data.error)
      }

      setUserData(data)

    } catch (err) {
      const error = getErrorAsError(err)
      setFetchError(error.message)
    } finally {
      setIsLoading(false)
    }

  }, [isChecking, isHealthy, setUserData, username])

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
          <form onSubmit={(e) => e.preventDefault()}>
            { fetchError && <div className="text-red-500 mb-2">{fetchError}</div>}
            <Input ref={usernameInputRef} disabled={!isHealthy || isChecking || isLoading} placeholder="MyAnimeList username" required onChange={(e) => setUsername(e.target.value)} />
            <Button disabled={!isHealthy || isChecking || isLoading} className='mt-4 w-full bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700' onClick={handleGo}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">
                    <Loader2 className="animate-spin" />
                  </span>
                  Grabbing data...
                </span>
              ) : isHealthy ? 'Go!' : isChecking ? 'Starting up...' : ':('}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}
