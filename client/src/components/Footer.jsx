import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='mt-40'>

      {/* Main Footer */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

        {/* Logo and description */}
        <div>
          <img
            src={assets.Logo}
            className='mb-5 w-32'
            alt='ShopStop logo'
          />

          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Your one-stop shop for quality products,
            great prices, and a convenient shopping
            experience.
          </p>

          <p className='mt-5 font-medium'>
            Follow us:
          </p>

          <p className='text-gray-600 mt-2'>
            Facebook &nbsp; Instagram &nbsp; X
          </p>
        </div>

        {/* Company */}
        <div>
          <p className='text-xl font-medium mb-5'>
            COMPANY
          </p>

          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Get in touch */}
        <div>
          <p className='text-xl font-medium mb-5'>
            GET IN TOUCH
          </p>

          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+254 758 848 408</li>
            <li>shopstop@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div>
        <hr />

        <p className='py-5 text-sm text-center text-gray-500'>
          Copyright © 2026 shopstop.com. All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer