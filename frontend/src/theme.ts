import { extendTheme } from '@chakra-ui/react'
import type { ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
    neon: {
      blue: '#00F3FF',
      purple: '#B026FF',
      pink: '#FF10F0',
    },
  },
  components: {
    Button: {
      baseStyle: (props: any) => ({
        fontWeight: 'bold',
        borderRadius: 'md',
      }),
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.500' : 'blue.600',
          },
        }),
        outline: (props: any) => ({
          borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          color: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.900' : 'blue.50',
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: (props: any) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
            borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
            },
            _focus: {
              borderColor: props.colorMode === 'dark' ? 'blue.400' : 'blue.500',
              boxShadow: `0 0 0 1px ${props.colorMode === 'dark' ? 'blue.400' : 'blue.500'}`,
            },
          },
        }),
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
      },
    },
    Drawer: {
      baseStyle: (props: any) => ({
        dialog: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        },
      }),
    },
  },
})

export default theme 