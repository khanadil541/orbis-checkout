"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Box, Text, Icon, Button, useToken, Fragment } from '@chakra-ui/react'
import hexToRgba from 'hex-to-rgba';
import { stepsContent, steps } from './data'
import { MdArrowRightAlt, MdArrowBack } from 'react-icons/md'


export const CheckoutTour = ({ isOpen, otpStep, activeStep, setActiveStep }) => {
    const [mainColor] = useToken('colors', ['teal.50']);
    return (
        <Fragment>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                exit={{ opacity: 0, x: 15 }} transition={{ duration: .5 }}>
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
        </Fragment>
    )
}
