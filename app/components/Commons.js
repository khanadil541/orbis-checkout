import { Fragment } from "react"
import { Flex, Image, Text, Divider} from "@chakra-ui/react"

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