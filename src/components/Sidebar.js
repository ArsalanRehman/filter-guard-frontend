import { Box, Button, Icon, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiBookContent, BiKey, BiSolidPurchaseTag } from 'react-icons/bi'
import { GoProjectRoadmap } from 'react-icons/go'
import {
  MdDone,
  MdManageHistory,
  MdOutlineManageSearch,
  MdOutlineNewLabel,
} from 'react-icons/md'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { BiPurchaseTag } from 'react-icons/bi'
import { BsGear, BsPcDisplay, BsPersonCircle } from 'react-icons/bs'
import { FaComputer } from 'react-icons/fa6'
import { MdOutlineChecklist, MdOutlineManageAccounts } from 'react-icons/md'
import { RiAdminFill } from 'react-icons/ri'
import { RxHamburgerMenu } from 'react-icons/rx'
import { TbActivity, TbZoomMoney, TbLogs } from 'react-icons/tb'
import { VscDebugContinue } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import { Seperator } from 'utils/CustomElements.jsx'
import { useGlobalState } from 'utils/GlobalState.ts'
import LanguageLocalizer from 'utils/LanguageLocalizer.js'

const Sidebar = () => {
  const { userName, setUserName } = useGlobalState()
  const navigate = useNavigate()
  const [defaultAccordion, setDefaultAccordion] = useState(0)

  useEffect(() => {}, [userName, setUserName])

  const handleLogout = async () => {
    onClose()
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    localStorage.removeItem('departmentHead')
    localStorage.removeItem('role')
    localStorage.removeItem('UserID')
    setUserName('')
    navigate('/')
  }

  const { isOpen, onOpen, onClose } = useDisclosure(true)
  const btnRef = React.useRef()

  const SidebarItem = ({ to, label, icon: IconComponent }) => (
    <Link to={to} onClick={onClose}>
      <Box display='flex' alignItems='center' _hover={{ bg: 'gray.300' }}>
        {IconComponent && <Icon as={IconComponent} mr='2' />}{' '}
        <Text py='2' px='4' borderRadius='md'>
          {label}
        </Text>
      </Box>
    </Link>
  )

  return (
    <>
      {/* When closed */}
      <Flex
        direction='column'
        height='100vh' // Make it take the full viewport height
        bg='orange' // Background for sidebar
      >
        <Box display={'flex'} flexDirection={'column'} h='100%' bg='orange'>
          <IconButton
            bg='orange'
            p={3}
            m={3}
            colorScheme='orange'
            aria-label='Side bar'
            size='lg'
            onClick={onOpen}
            ref={btnRef}
            icon={<Icon as={RxHamburgerMenu} />}
          />



        </Box>
      </Flex>

      {/* When open */}
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {LanguageLocalizer['welcome']} {userName}
            {/* <br /> */}
            {/* {localStorage.getItem('role') === 'user' && (
              <div>
                {LanguageLocalizer['department_head']} :{' '}
                {localStorage.getItem('departmentHead')}
              </div>
            )} */}
          </DrawerHeader>

          <DrawerBody>
  <Accordion
    onChange={(e) => {
      setDefaultAccordion(e);
    }}
    allowToggle
    defaultIndex={[defaultAccordion]}
  >
    {/* Child History Menu */}
    <AccordionItem>
      <AccordionButton bg="orange" borderRadius={4}>
        <BsPersonCircle />
        <Text ml={2}>Child History</Text>
      </AccordionButton>
      <AccordionPanel>
        <SidebarItem
          to="/activityLog"
          label="Activity Log"
          icon={BiBookContent} // Replace with a relevant icon
        />
      </AccordionPanel>
    </AccordionItem>

    {/* User Settings Menu */}
    <AccordionItem>
      <AccordionButton bg="orange" borderRadius={4}>
        <BsGear />
        <Text ml={2}>User Settings</Text>
      </AccordionButton>
      <AccordionPanel>
        <SidebarItem
          to="/changePassword"
          label="Change Password"
          icon={BiKey} // Replace with a relevant icon
        />
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
</DrawerBody>


          <DrawerFooter justifyContent='flex-start'>
            <Button mt='4' colorScheme='red' onClick={handleLogout}>
              {LanguageLocalizer['logout']}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar
