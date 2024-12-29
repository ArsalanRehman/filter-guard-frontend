import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as APIs from 'utils/APIs/APICenter.js'
import { language_option } from 'utils/Constants.js'
import { useGlobalState } from 'utils/GlobalState.ts'
import LanguageLocalizer, {
  ChangeLanguage,
} from 'utils/LanguageLocalizer.js'

const Login = () => {
  const { setUserName } = useGlobalState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogin = async () => {
    const success = await APIs.LoginAPI(username, password, setUserName)
    if (success) {
      console.log('logged in');
      
      navigate('/activityLog')
    } else {
      toast({
        title: LanguageLocalizer['login_error'],
        description: LanguageLocalizer['check_password'],
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleChange = (event) => {
    ChangeLanguage(event.target.value)
    window.location.reload()
  }

  return (
    <Box
      maxW='md'
      mx='auto'
      mt='10%'
      p={6}
      borderWidth='1px'
      borderRadius='lg'
      boxShadow='lg'
    >
      {language_option && (
        <Select
          mb='24px'
          name='urgencyLevel'
          defaultValue={localStorage.getItem('lang')}
          onChange={handleChange}
          size='md'
        >
          <option value='tr'>Türkçe</option>
          <option value='en'>English</option>
        </Select>
      )}

      <Heading mb={6} textAlign='center'>
        {LanguageLocalizer['login']}
      </Heading>
      <FormControl id='username' mb={4}>
        <FormLabel>{'E-posta'}</FormLabel>
        <Input
          type='email'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => {
            if (e.code === 'Enter') handleLogin()
          }}
        />
      </FormControl>
      <FormControl id='password' mb={4}>
        <FormLabel>{LanguageLocalizer['password']}</FormLabel>
        <Input
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.code === 'Enter') handleLogin()
          }}
        />
      </FormControl>
      <Stack direction='row' spacing={4} justify='flex-end'>
        <Button colorScheme='orange' onClick={handleLogin}>
          {LanguageLocalizer['login']}
        </Button>
      </Stack>
    </Box>
  )
}

export default Login
