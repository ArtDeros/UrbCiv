import { IconButton, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const FloatingChatButton = () => {
  const navigate = useNavigate()

  return (
    <IconButton
      aria-label="Abrir chat"
      position="fixed"
      bottom="20px"
      right="20px"
      size="lg"
      colorScheme="blue"
      borderRadius="full"
      boxShadow="lg"
      onClick={() => navigate('/chat')}
      zIndex={1000}
      p={0}
      overflow="hidden"
    >
      <Image
        src="/Mi2So.webp"
        alt="Asistente Virtual"
        w="100%"
        h="100%"
        objectFit="cover"
      />
    </IconButton>
  )
}

export default FloatingChatButton 