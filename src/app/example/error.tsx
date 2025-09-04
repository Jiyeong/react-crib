'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function ExampleError({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div>
      <h1>Sample Error</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  )
}