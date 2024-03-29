'use client'
import styles from "./page.module.css";
import {
  Box, Button, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, InputLeftAddon, Image, PinInput, PinInputField, HStack,
  Text, useDisclosure, useToken, Stepper, Step, StepIndicator, StepStatus, Progress, StepIcon, useSteps, StepNumber, StepTitle, StepDescription, StepSeparator, Icon, Input, InputGroup, Flex, Divider, InputLeftElement, Alert, AlertIcon, AlertTitle, AlertDescription, Collapse
} from "@chakra-ui/react";
import { AnimatePresence, motion, Reorder } from "framer-motion"

import { Fragment, useState } from "react";
import { MdArrowRightAlt, MdArrowBack, MdOutlineShoppingCart, MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import TypewriterEffect from "./components/TypewriterEffect";
import { stepsContent, steps, savedAddress as savedAddr, savedCards as cards } from "./components/data"
import { useMediaQuery } from "react-responsive";
import { OrderSummary, CheckoutTour } from "./components/Commons";
import { FaAngleDown } from "react-icons/fa6";
//import {CheckoutTour} from "./components/CheckoutTour";



export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTab = useMediaQuery({query: '(max-width: 1467px)'});
  const isDesktop = useMediaQuery({query: '(min-width: 1467px)'})

  const { activeStep, isActiveStep, isCompleteStep, isIncompleteStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const [text, setText] = useState("");
  const [otp, setOtp] = useState("")
  const [otpStep, setOtpStep] = useState(false);
  const [savedAddress, setSaveAddress] = useState(savedAddr)

  const max = steps.length - 1
  const progressPercent = (activeStep / max) * 100;
  const [selectedAddress, setSelectedAddress] = useState(savedAddr[0].id);
  const [selectedCard, setSelectedCard] = useState(cards[0].cardId);
  const [savedCards, setSavedCards] = useState(cards);
  const [collapseSummary, setCollapseSummary] = useState(false)
  const nextStep = (step) => {
    if (step === 0) {
      if (!otpStep) {
        setTimeout(() => {
          setOtpStep(!otpStep);
        }, 13 * 50)
        setText("9910486658")
        setOtpStep(false)
        return
      }
      setTimeout(() => {
        setOtpStep(false)
        setActiveStep(step + 1)
      }, 1000)
      setOtp("1234");
      return
    }
    setActiveStep(step + 1);

  }
  const selecteSavedAddress = (selectedAddrIndex) => {
    let firstItem;
    const filteredItem = savedAddress.filter((item) => {
      if (item.id === selectedAddrIndex) {
        firstItem = [item]
        return false;
      }
      return true
    })
    setSaveAddress([...firstItem, ...filteredItem]);
    setSelectedAddress(firstItem[0].id)
  }
  const selectSavedCards = (selectedCardId) => {
    let firstItem;
    const filteredItem = savedCards.filter((item) => {
      if (item.cardId === selectedCardId) {
        firstItem = [item];
        return false;
      }
      return true
    })
    setSavedCards([...firstItem, ...filteredItem]);
    setSelectedCard(firstItem[0].cardId)
  }
  return (
    <Box width={'100%'} height={'100vh'} display={'grid'} placeItems={'center'}>
      <Button colorScheme={'teal'} mb={5} onClick={onOpen}>Launch Demo</Button>
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="scale" size={isMobile ? 'full' : 'xl'}>
        <ModalOverlay>
          <ModalContent w={'100%'} maxW={'880px'}>
            {!(isMobile || isTab) && <Fragment><CheckoutTour isOpen={isOpen} isTab={isTab} otpStep={otpStep} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} isMobile={isTab || isMobile}></CheckoutTour></Fragment>}

            <ModalBody bg={'gray.100'} rounded={'lg'} p={0}>
              <Button rounded={'50%'} position={'absolute'} right={0} p={0} onClick={onClose}>
                <Icon as={IoMdCloseCircle} boxSize={8} fill={'gray'}></Icon>
              </Button>
              <AnimatePresence mode="wait">

                <Grid templateColumns={isMobile ? '1fr' : '60% 40%'} h={'100%'}>
                  <motion.div initial={{ x: -15 }} animate={isOpen ? { x: 0 } : { x: -15 }} exit={{ x: 15 }} transition={{ duration: .2 }}>
                    <Box bg={!isMobile && 'white'} px={3} py={2} borderLeftRadius={'lg'} h={'100%'} pb={5}>
                      <Text fontSize={'xl'} as={'b'}>Orbis Shop</Text>
                      <Box position='relative' mt={3}>
                        <Stepper index={activeStep}>
                          {steps.map((step, index) => (
                            (index === steps.length - 1) ? <Fragment key={index}></Fragment> :

                              <Step key={index}>

                                <StepStatus
                                  complete={<Box flexShrink='0' display={'flex'} alignItems={'center'} gap={!!isMobile ? 0 : 2} flexDirection={isMobile && 'column'}>
                                    <Icon as={step.icon} fill={'green'} boxSize={8}></Icon>
                                    <Text color={'green'}>{step.title}</Text>
                                  </Box>}
                                  incomplete={<Box flexShrink='0' display={'flex'} alignItems={'center'} gap={!!isMobile ? 0 : 2} flexDirection={isMobile && 'column'}>
                                    <Icon as={step.icon} fill={'black'} boxSize={8}></Icon>
                                    <StepTitle color={'black'}> {step.title}</StepTitle>
                                  </Box>}
                                  active={<Box flexShrink='0' display={'flex'} alignItems={'center'} gap={!!isMobile ? 0 : 2} flexDirection={isMobile && 'column'}>
                                    <Icon as={step.icon} fill={'blue.500'} boxSize={8}></Icon>
                                    <StepTitle color={'blue.500'}> {step.title}</StepTitle>
                                  </Box>}
                                />
                                <StepSeparator />
                              </Step>
                          ))}
                        </Stepper>
                      </Box>
                      {
                        !!isMobile && <Box bg={'white'} px={3} py={2} mt={4} rounded={3}>
                          <motion.header initial={false} onClick={() => setCollapseSummary(!collapseSummary)}>
                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                              <Text display={'flex'} alignItems={'center'} gap={2} cursor={'pointer'}>
                                <Icon as={MdOutlineShoppingCart}></Icon>
                                Order Summary <Icon as={FaAngleDown}></Icon>
                              </Text>
                              <Text>$259</Text>
                            </Flex>
                          </motion.header>
                          <AnimatePresence initial={false}>{
                            !!collapseSummary && <motion.section key="content"
                              initial="collapsed"
                              animate="open"
                              exit="collapsed"
                              variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0, overflow: 'hidden' }
                              }}
                              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}>
                              <Fragment>
                                <OrderSummary></OrderSummary>
                              </Fragment>
                            </motion.section>
                          }


                          </AnimatePresence>
                        </Box>
                      }
                      {
                        activeStep === 0 && !otpStep && (

                          <Fragment>
                            {(!!isMobile || !!isTab) && <CheckoutTour isOpen={isOpen} otpStep={otpStep} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} isMobile={isMobile || isTab}></CheckoutTour>}
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={3} mt={2} bg={!!isMobile && 'white'} rounded={3}>
                              <Text mb={3} as={'b'} fontSize={'xl'}>Enter Mobile Number</Text>
                              <InputGroup>
                                <InputLeftElement w={'100%'} justifyContent={'start'} px={3}>
                                  +91 <TypewriterEffect text={text} delay={50} />

                                </InputLeftElement>
                                <Input></Input>
                              </InputGroup>

                              <Button size={'lg'} mt={2} bg={'black'} color={'white'}>Continue <Icon as={MdArrowRightAlt} ml={3}></Icon></Button>
                              <Text fontSize={'sm'} width={'100%'} maxW={'350px'} color={'gray.500'} mt={1}>
                                {`By proceeding, I accept that I have read and understood the Orbis's Privacy Policy and T&C`}

                              </Text>
                            </Box>
                          </Fragment>
                        )
                      }
                      {
                        activeStep === 0 && !!otpStep && (
                          <Fragment>
                            {(!!isMobile || !!isTab) && <CheckoutTour isOpen={isOpen} otpStep={otpStep} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} isMobile={isMobile || isTab}></CheckoutTour>}
                            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={3} mt={2} bg={!!isMobile && 'white'} rounded={3}>
                              <Text mb={3} as={'b'} fontSize={'lg'} w={'85%'}>Enter the one-time verification code sent to your mobile to log into your secure account.</Text>
                              <HStack>
                                <PinInput type='alphanumeric' defaultValue={otp} value={otp}>
                                  <PinInputField />
                                  <PinInputField />
                                  <PinInputField />
                                  <PinInputField />
                                </PinInput>
                              </HStack>

                              <Button size={'lg'} mt={2} bg={'black'} color={'white'}>Continue <Icon as={MdArrowRightAlt} ml={3}></Icon></Button>
                              <Text fontSize={'sm'} width={'100%'} maxW={'350px'} color={'gray.500'} mt={1}>
                                {`By proceeding, I accept that I have read and understood the Gokwik's Privacy Policy and T&C`}

                              </Text>
                            </Box>
                          </Fragment>
                        )
                      }
                      {
                        activeStep === 1 && (
                          <Box display={'flex'} flexDirection={'column'} p={3} mt={2}>
                            {(!!isMobile || !!isTab) && <CheckoutTour isOpen={isOpen} otpStep={otpStep} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} isMobile={isMobile || isTab}></CheckoutTour>}
                            <motion.div initial={{ x: -15 }} animate={isOpen ? { x: 0 } : { x: -15 }} exit={{ x: 15 }} transition={{ duration: .2 }}>
                              <Text mb={3} as={'b'} fontSize={'lg'} w={'85%'}>Shipping Address</Text>
                              <Reorder.Group axis="y" values={savedAddress}>
                                {
                                  savedAddress.map((address) => (
                                    <Reorder.Item key={address.id} value={address.id}>
                                      <Box border={'1px solid'} borderColor={selectedAddress === address.id ? 'black' : 'gray.200'}
                                        p={2} pos={'relative'} rounded={6} mt={3} px={5} cursor={'pointer'} onClick={() => selecteSavedAddress(address.id)}>
                                        {
                                          selectedAddress === address.id && <Box height={'20px'} width={'20px'} borderTopLeftRadius={6} borderBottomEndRadius={6} position={'absolute'} bg={'black'} color={'white'} display={'flex'} alignItems={'center'} justifyContent={'center'} left={0} top={0}>
                                            &#10003;
                                          </Box>
                                        }
                                        <Text as={'b'}>{address.name}</Text>
                                        <Text>{address.addr}</Text>
                                        <Text color={'gray.500'} mt={4} fontSize={15}>{address.email}</Text>
                                      </Box>
                                    </Reorder.Item>
                                  ))
                                }
                              </Reorder.Group>
                              <Text display={'flex'} alignItems={'center'} mt={3} cursor={'pointer'}>
                                <Icon as={MdAdd}></Icon>
                                Add New Address
                              </Text>
                              <Box placeItems={'center'} display={'grid'}>
                                <Button size={'lg'} mt={2} bg={'black'} color={'white'}>Continue <Icon as={MdArrowRightAlt} ml={3}></Icon></Button>
                              </Box>
                            </motion.div>
                          </Box>
                        )
                      }
                      {
                        activeStep === 2 && (
                          <Box display={'flex'} flexDirection={'column'} p={3} mt={2}>
                            {(!!isMobile || !!isTab) && <CheckoutTour isOpen={isOpen} otpStep={otpStep} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} isMobile={isMobile || isTab}></CheckoutTour>}
                            <motion.div initial={{ x: -15 }} animate={isOpen ? { x: 0 } : { x: -15 }} exit={{ x: 15 }} transition={{ duration: .2 }}>
                              <Text mb={3} as={'b'} fontSize={'lg'} w={'85%'}>Payment</Text>
                              <Reorder.Group axis="y" values={selectedCard}>
                                {
                                  savedCards.map(card => (
                                    <Reorder.Item key={card.cardId} value={card.cardId}>
                                      <Box border={'2px solid'} borderColor={selectedCard === card.cardId ? 'black' : 'gray.200'}
                                        p={2} pos={'relative'} rounded={6} mt={3} px={5} cursor={'pointer'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                        <Flex alignItems={'center'} onClick={() => selectSavedCards(card.cardId)}>
                                          <Icon as={card.cardType.icon} boxSize={8} mr={2}></Icon>
                                          <Box>
                                            <Text>{card.cardNum}</Text>
                                            <Text color={'gray.500'} fontSize={10}>Expiry- {card.expiry}</Text>
                                          </Box>
                                        </Flex>
                                        <Flex gap={3}>
                                          <Icon as={MdEdit} fill={'gray.500'}></Icon>
                                          <Icon as={MdDelete} fill={'gray.500'}></Icon>
                                        </Flex>
                                      </Box>
                                    </Reorder.Item>
                                  ))
                                }
                              </Reorder.Group>
                              <Text display={'flex'} alignItems={'center'} mt={3} cursor={'pointer'}>
                                <Icon as={MdAdd}></Icon>
                                Add New Payment Method
                              </Text>
                              <Box placeItems={'center'} display={'grid'}>
                                <Button size={'lg'} mt={2} bg={'black'} color={'white'}>Pay $259</Button>
                              </Box>
                            </motion.div>
                          </Box>
                        )
                      }
                      {
                        activeStep === 3 && (
                          <Alert status="success" variant={'subtle'} mt={2} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} textAlign={'center'} height={'200px'}>
                            <AlertIcon boxSize={'40px'} mr={0}></AlertIcon>
                            <AlertTitle mt={4} mb={1} fontSize={'lg'}>
                              Order Confirmed
                            </AlertTitle>
                            <AlertDescription>
                              We have sent an email to registered email address with your order confirmation and receipt.
                            </AlertDescription>
                          </Alert>
                        )
                      }
                    </Box>
                  </motion.div>

                  {
                    !isMobile &&

                    <motion.div initial={{ x: 15 }} animate={isOpen ? { x: 0 } : { x: 15 }} exit={{ x: -15 }} transition={{ duration: .2 }}>
                      <Box p={3}>
                        <Box rounded={'lg'} bg={'whiteAlpha.900'} py={2} px={3}>
                          <Text>
                            <Icon as={MdOutlineShoppingCart} mr={2}></Icon>
                            Order Summary
                          </Text>
                          <OrderSummary></OrderSummary>
                        </Box>
                        <Box rounded={'lg'} bg={'whiteAlpha.900'} py={2} px={3} mt={5}>
                          <InputGroup>
                            <InputLeftElement>
                              <Icon as={CiDiscount1} boxSize={8} ></Icon>
                            </InputLeftElement>
                            <Input border={'1px dashed'} _focusVisible={{ border: '1px dashed' }}></Input>
                          </InputGroup>
                          <Text textAlign={'right'} mt={1} fontSize={12}>Have a gift card?</Text>
                        </Box>
                      </Box>
                    </motion.div>
                  }
                </Grid>

              </AnimatePresence>
            </ModalBody>

          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
}
