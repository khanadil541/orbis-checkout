'use client'
import styles from "./page.module.css";
import {
  Box, Button, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, InputLeftAddon, Image, PinInput, PinInputField, HStack,
  Text, useDisclosure, useToken, Stepper, Step, StepIndicator, StepStatus, Progress, StepIcon, useSteps, StepNumber, StepTitle, StepDescription, StepSeparator, Icon, Input, InputGroup, Flex, Divider, InputLeftElement, Alert, AlertIcon, AlertTitle, AlertDescription
} from "@chakra-ui/react";
import { AnimatePresence, motion, Reorder } from "framer-motion"
import hexToRgba from 'hex-to-rgba'
import { Fragment, useState } from "react";
import { MdArrowRightAlt, MdArrowBack, MdOutlineShoppingCart, MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import TypewriterEffect from "./components/TypewriterEffect";
import { stepsContent, steps, savedAddress as savedAddr, savedCards as cards } from "./components/data"



export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mainColor] = useToken('colors', ['teal.50']);
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
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="scale" size={'xl'}>
        <ModalOverlay>
          <ModalContent w={'100%'} maxW={'880px'}>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: .5 }}>
              <Box position={'absolute'} left={'-280px'} w={'260px'} top={0} transform={'translate(10, 10)'} bg={hexToRgba(mainColor, '0.3')} p={5} borderRadius={5}>
                {
                  !otpStep && stepsContent.HEAD[activeStep.toString()] && (() => {
                    return <Fragment>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: .5 }}>
                        <Text color={'white'} as={'b'} fontSize={20} lineHeight={1}>{stepsContent.HEAD[activeStep.toString()]}</Text>
                        <Text color={'gray.200'}>
                          {stepsContent.TEXT[activeStep.toString()]}
                        </Text>
                      </motion.div>
                    </Fragment>
                  })()

                }
                {
                  !!otpStep && !!activeStep.toString() && (() => {
                    return <Fragment>
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }} exit={{ opacity: 0, x: 15 }} transition={{ duration: .5 }}>
                        <Text color={'white'} as={'b'} fontSize={20} lineHeight={1}>{stepsContent.HEAD.otpStep}</Text>
                        <Text color={'gray.200'}>
                          {stepsContent.TEXT.otpStep}
                        </Text>
                      </motion.div>
                    </Fragment>
                  })()


                }

                <Box display={'flex'} justifyContent={'space-between'}>
                  {
                    activeStep !== 0 && <Button variant={'ghost'} p={0} onClick={() => setActiveStep(activeStep - 1)} _hover={{ opacity: .3 }} >
                      <Icon as={MdArrowBack}> </Icon>
                      Prev
                    </Button>
                  }
                  {
                    activeStep !== steps.length - 1 && <Button variant={'ghost'} p={0} onClick={() => nextStep(activeStep)} _hover={{ opacity: .3 }}>
                      Next
                      <Icon as={MdArrowRightAlt}></Icon>
                    </Button>
                  }

                </Box>
              </Box>
            </motion.div>

            <ModalBody bg={'gray.100'} rounded={'lg'} p={0}>
              <Button rounded={'50%'} position={'absolute'} right={0} p={0} onClick={onClose}>
                <Icon as={IoMdCloseCircle} boxSize={8} fill={'gray'}></Icon>
              </Button>
              <AnimatePresence mode="wait">

                <Grid templateColumns={'60% 40%'} h={'100%'}>
                  <motion.div initial={{ x: -15 }} animate={isOpen ? { x: 0 } : { x: -15 }} exit={{ x: 15 }} transition={{ duration: .2 }}>
                    <Box bg={'white'} px={3} py={2} borderLeftRadius={'lg'} h={'100%'} pb={5}>
                      <Text fontSize={'xl'} as={'b'}>Orbis Shop</Text>
                      <Box position='relative' mt={3}>
                        <Stepper index={activeStep}>
                          {steps.map((step, index) => (
                            (index === steps.length - 1) ? <Fragment></Fragment> :

                              <Step key={index}>

                                <StepStatus
                                  complete={<Box flexShrink='0' display={'flex'} alignItems={'center'} gap={2}>
                                    <Icon as={step.icon} fill={'green'} boxSize={8}></Icon>
                                    <Text color={'green'}>{step.title}</Text>
                                  </Box>}
                                  incomplete={<Box flexShrink='0' display={'flex'} alignItems={'center'} gap={2}>
                                    <Icon as={step.icon} fill={'black'} boxSize={8}></Icon>
                                    <StepTitle color={'black'}> {step.title}</StepTitle>
                                  </Box>}
                                  active={<Box flexShrink='0' display={'flex'} alignItems={'center'} gap={2}>
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
                        activeStep === 0 && !otpStep && (

                          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={3} mt={2}>
                            <Text mb={3} as={'b'} fontSize={'xl'}>Enter Mobile Number</Text>
                            <InputGroup>
                              <InputLeftElement w={'100%'} justifyContent={'start'} px={3}>
                                +91 <TypewriterEffect text={text} delay={50} />

                              </InputLeftElement>
                              <Input></Input>
                            </InputGroup>

                            <Button size={'lg'} mt={2} bg={'black'} color={'white'}>Continue <Icon as={MdArrowRightAlt} ml={3}></Icon></Button>
                            <Text fontSize={'sm'} width={'100%'} maxW={'350px'} color={'gray.500'} mt={1}>
                              By proceeding, I accept that I have read and understood the Gokwik's Privacy Policy and T&C

                            </Text>
                          </Box>
                        )
                      }
                      {
                        activeStep === 0 && !!otpStep && (

                          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={3} mt={2}>
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
                              By proceeding, I accept that I have read and understood the Gokwik's Privacy Policy and T&C

                            </Text>
                          </Box>
                        )
                      }
                      {
                        activeStep === 1 && (
                          <Box display={'flex'} flexDirection={'column'} p={3} mt={2}>
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
                              We sent an email to registered email address with your order confirmation and receipt.
                            </AlertDescription>
                          </Alert>
                        )
                      }
                    </Box>
                  </motion.div>
                  <motion.div initial={{ x: 15 }} animate={isOpen ? { x: 0 } : { x: 15 }} exit={{ x: -15 }} transition={{ duration: .2 }}>
                    <Box p={3}>
                      <Box rounded={'lg'} bg={'whiteAlpha.900'} py={2} px={3}>
                        <Text>
                          <Icon as={MdOutlineShoppingCart} mr={2}></Icon>
                          Order Summary
                        </Text>
                        <Flex dir="column" justify={'center'} alignItems={'center'} mt={3}>
                          <Image src={'https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-3.png?v=1685530085'} w={'100px'} h={'50px'}></Image>
                          <Text fontSize={'sm'} color={'gray.800'}>boAt Wave Call | Bluetooth Calling Smartwatch with 1.69" (4.29 cm) HD Curved Display, 150+ Watch Faces, Heart Rate & SPO2 Monitoring - Blue</Text>
                        </Flex>
                        <Flex justify={'space-between'} mt={3}>
                          <Text fontSize={'md'} color={'gray.900'}>Subtotal</Text>
                          <Text fontSize={'md'} color={'gray.900'}>$259</Text>
                        </Flex>
                        <Flex justify={'space-between'} mt={3}>
                          <Text>Shipping</Text>
                          <Text>Free</Text>
                        </Flex>
                        <Divider mt={3}></Divider>
                        <Flex justify={'space-between'} mt={3}>
                          <Text as={'b'}>Total</Text>
                          <Text as={'b'}>$259</Text>
                        </Flex>
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
                </Grid>

              </AnimatePresence>
            </ModalBody>

          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
}
