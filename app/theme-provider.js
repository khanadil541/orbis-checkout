'use client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
    styles: {
        global: {
            // styles for the `body`
            body: {
                bg: 'gray.100',
                color: '#000',
            },
            // styles for the `a`
            a: {
                color: 'teal.500',
                _hover: {
                    textDecoration: 'underline',
                },
            },
        },
    },
})
export default function ThemeProvider({children}) {
  return (
    <ChakraProvider theme={theme}>
        {children}
    </ChakraProvider>
  )
}
