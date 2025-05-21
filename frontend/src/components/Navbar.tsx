import { Box, Flex, Button, IconButton, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa'
import { useColorModeContext } from '../contexts/ColorModeContext'
import { useLocation } from '../contexts/LocationContext'

const Navbar = () => {
  const { colorMode, toggleColorMode, bgColor } = useColorModeContext()
  const { language, setLanguage } = useLocation()

  return (
    <Box bg={bgColor} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <RouterLink to="/">
          <Text fontSize="xl" fontWeight="bold">
            UrbCiv Assistant
          </Text>
        </RouterLink>

        <Flex alignItems="center" gap={4}>
          <RouterLink to="/chat">
            <Button colorScheme="blue" variant="ghost">
              Chat
            </Button>
          </RouterLink>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<FaGlobe />}
              variant="ghost"
              colorScheme="blue"
            >
              {language === 'en' ? 'English' : 'Español'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setLanguage('en')}>English</MenuItem>
              <MenuItem onClick={() => setLanguage('es')}>Español</MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            aria-label="Cambiar tema"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 