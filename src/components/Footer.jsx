import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum sed minima ducimus accusamus alias praesentium, molestias nesciunt blanditiis eligendi cumque. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda libero laborum voluptas id ab voluptatibus saepe nesciunt, porro sunt aliquid.</p>
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