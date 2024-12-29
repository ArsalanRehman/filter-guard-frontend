import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import UpdatePassword from './pages/UpdatePassword.js'
import { useGlobalState } from './utils/GlobalState.ts'
import ActivityLog from './pages/ActivityLog'

const App = () => {
  const { userName, setUserName } = useGlobalState()

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setUserName(localStorage.getItem('username'));
    } else {
      setUserName(null);
    }
  }, [setUserName]);
  


  return (
    <ChakraProvider>
      <Router>
        <Flex minHeight='100vh'>
          <Box position={'fixed'} top={0} left={0}>
            {userName && <Sidebar />}
          </Box>
          <Flex
            flex={1}
            flexDir='column'
            maxHeight={'100vh'}
            marginLeft={userName ? '72px' : '0px'}
            // marginRight={userName ? '60px' : '0px'}
          >
          <Routes>
            <Route
              path="/"
              element={<Navigate to={userName ? '/activityLog' : '/login'} replace />}
            />
            <Route
              path="/login"
              element={!userName ? <Login /> : <Navigate to="/activityLog" replace />}
            />
            <Route
              path="/activityLog"
              element={userName ? <ActivityLog /> : <Navigate to="/login" replace />}
            />
              <Route
              path="/updatePassword"
              element={userName ? <UpdatePassword /> : <Navigate to="/login" replace />}
            />
          </Routes>

            <Box flex={1}></Box>
            <Box>{userName && <Footer />}</Box>
          </Flex>
          {/* <Box position={'fixed'} top={0} right={0}>
            {userName && <ChatSidebar />}
          </Box> */}
        </Flex>
      </Router>
    </ChakraProvider>
  )
}

export default App
