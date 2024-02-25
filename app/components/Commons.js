import { Fragment, useEffect, useState } from "react"
import { Flex, Image, Text, Divider, Box, Icon, Button, useToken } from "@chakra-ui/react"
import { motion } from "framer-motion"
import hexToRgba from 'hex-to-rgba';
import { stepsContent, steps } from './data'
import { MdArrowRightAlt, MdArrowBack } from 'react-icons/md'
export const OrderSummary = () => {
    return (
        <Fragment>
            <Flex dir="column" justify={'center'} alignItems={'center'} mt={3}>
                <Image src={'https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-3.png?v=1685530085'} w={'100px'} h={'50px'}></Image>
                <Text fontSize={'sm'} color={'gray.800'}>{`boAt Wave Call | Bluetooth Calling Smartwatch with 1.69" (4.29 cm) HD Curved Display, 150+ Watch Faces, Heart Rate & SPO2 Monitoring - Blue`}</Text>
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
        </Fragment>
    )
}

export const CheckoutTour = ({ isOpen, otpStep, activeStep, setActiveStep, nextStep, isMobile }) => {
    const [mainColor] = useToken('colors', ['teal.50']);
    const [show, setShow] = useState(!isMobile);
    useEffect(() => {
        if (!!isMobile) {
            setTimeout(() => {
                setShow(true)
            }, 3000)
        } else {
            setShow(true)
        }
    }, [])
    if (show) {
        return <Fragment>
            <motion.div initial={{ opacity: 0 }} animate={isOpen ? { opacity: 1 } : { opacity: 0}}
                exit={{ opacity: 0, x: 15 }} transition={{ duration: !!isMobile ? .3 : .5 }}>
                <Box position={!!isMobile ? 'absolute' : 'relative'} w={!!isMobile ? '100%' : 'unset'} height={!!isMobile ? '100%' : 'unset'} left={!!isMobile ? '0' : 'unset'} bottom={!!isMobile ? '0' : 'unset'} top={!!isMobile ? '0' : 'unset'} bg={'rgba(0,0,0,.4)'} zIndex={999}>
                    <Box position={'absolute'} left={isMobile ? '50%' : '-280px'} w={'260px'} top={!!isMobile ? '50%' : 0} transform={!!isMobile ? ' translateY(-50%) translateX(-50%)' : 'translate(10, 10)'} bg={!!isMobile ? 'black' : hexToRgba(mainColor, '0.3')} p={5} borderRadius={5} zIndex={999}>
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
                                activeStep !== steps.length - 1 && <Button variant={'ghost'} p={0} onClick={() => { !!isMobile && setShow(false); nextStep(activeStep) }} _hover={{ opacity: .3 }}>
                                    Next
                                    <Icon as={MdArrowRightAlt}></Icon>
                                </Button>
                            }

                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </Fragment>
    }
    return (
        <Fragment></Fragment>
    )
}
