import { MdOutlineAccountCircle, MdOutlineLocalShipping, MdOutlinePayment } from "react-icons/md"
import { FaCcAmex, FaCcMastercard } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
export const steps = [
    { title: 'Account', description: 'Contact Info', icon: MdOutlineAccountCircle },
    { title: 'Shipping', description: 'Date & Time', icon: MdOutlineLocalShipping },
    { title: 'Payment', description: 'Select Rooms', icon: MdOutlinePayment },
    { title: 'Order Confirmed', icon: GiConfirmed}
]

export const stepsContent = {
    HEAD: {
        otpStep: 'Secure one-time password (OTP)',
        "0": 'Checking out with a Orbis account',
        "1": 'Address',
        "2": "Payment",
        "3": 'Order Confirmation'

    },
    TEXT: {
        otpStep: 'Orbis employs an OTP authentication mechanism for swift and effortless logins, eliminating the hassle of managing numerous username and password combinations. Additionally, /n if a Orbis Account user has already been authenticated through device login, they are seamlessly logged in, bypassing the OTP process altogether.',
        "0": 'During the initial stage of checkout, Orbis automatically identifies account holders via their registered email or phone number.',
        "1": 'Choose between utilizing a saved address or entering a new one during the checkout process to expedite shipping and ensure accurate delivery.',
        "2": "Choose between utilizing a saved payment methods or entering a new one during the checkout process.",
        "3": "Text updates and tracking pages keep shoppers informed in real time to reduce support tickets for your staff. It also gives you an opportunity to inspire future purchases through product recommendations, and lets shoppers easily add new products to their carts."
    }
}

export const savedAddress = [
    {name: 'John Doe', addr: '456 Ipsum Avenue, Loremville, Ipsum County, ZIP: 67890', email: 'johndoe@gmail.com', id: 'jd'},
    {name: 'Jane Smith', addr: '789 Lorem Road, Ipsumtown, Ipsumshire, ZIP: 54321', email: 'janesmith@gmail.com', id: 'js'},
    {name: 'Lorem Ipsum', addr: '789 Lorem Road, Ipsumtown, Ipsumnagar, ZIP: 64321', email: 'janesmith@gmail.com', id: 'li'}
] 

export const savedCards = [
    {cardId: 'amx', cardNum: '**** **** **** 1111', expiry: '12/25', cardType: {icon: FaCcAmex, type: 'Amex'}},
    {cardId: 'vsa', cardNum: '**** **** **** 4352', expiry: '07/27', cardType: {icon: RiVisaFill, type: 'Visa'}},
    {cardId: 'mstrcrd', cardNum: '**** **** **** 8546', expiry: '02/26', cardType: {icon: FaCcMastercard, type: 'Master Card'}},
]