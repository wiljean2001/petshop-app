'use client'
import { Toaster } from '@/components/ui/toaster'
import { useMounted } from '@/hooks/use-mounted'
import { ThemeProvider } from 'next-themes'
// import { useState } from 'react'
// import { ApolloWrapper } from '@/lib/apollo/apollo-wrapper'
// import { Provider as ReduxProvider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { persistor, store } from '@/store/store'
// import Guard from '@/components/guard'
// // import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Provider = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted()

  // const [queryClient] = useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           staleTime: 1000 * 60 * 1, // Request won't be refetched for 1min except if forced to
  //           cacheTime: 1000 * 60 * 60 * 1, // Cached for 1h
  //           refetchOnWindowFocus: false,
  //           retry: 1,
  //         },
  //       },
  //     })
  // )

  if (!mounted) {
    return null
  }

  return (
    <>
      <ThemeProvider attribute='class'>
        {/* 
        <ApolloWrapper>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Guard excludedRoutes={['/es', '/es/login', '/es/register']}>
                <QueryClientProvider client={queryClient}> */}
        {children}
        {/* </QueryClientProvider>
              </Guard>
            </PersistGate>
          </ReduxProvider>
        </ApolloWrapper> */}
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default Provider
