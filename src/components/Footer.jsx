import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>Welcome to Everything Store – your one-stop shop for everything you need, all in one place. From the latest gadgets to everyday essentials, we bring you quality products at unbeatable prices. We’re committed to fast shipping, secure payments, and customer-first service. Shop smart, shop easy – only at Everything Store.</p>
                </div>

                <div>
                    <p className='text-xl text-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>

                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>Get in touch</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1 (555) 123-4567</li>
                        <li>contact@everythingstore.com</li>
                    </ul>
                </div>


            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ EverythingStore.com - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer