import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'

const Category = () => {
  const { products } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)

  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])

  const handleCategoryChange = (event) => {
    if (event.target.checked) {
      setCategory([...category, event.target.value])
    } else {
      setCategory(category.filter(item => item !== event.target.value))
    }
  }

  const handleSubCategoryChange = (event) => {
    if (event.target.checked) {
      setSubCategory([...subCategory, event.target.value])
    } else {
      setSubCategory(subCategory.filter(item => item !== event.target.value))
    }
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter options */}
      <div className='min-w-60'>

        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
        </p>

        {/* Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? ' ' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>
            CATEGORIES
          </p>

          <div className='flex flex-col gap-2 font-ligth text-gray-700'>

            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Men'}
                onChange={handleCategoryChange}
              />
              Men
            </p>

            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Women'}
                onChange={handleCategoryChange}
              />
              Women
            </p>

            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'Kids'}
                onChange={handleCategoryChange}
              />
              Kids
            </p>

          </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? ' ' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>
            TYPE
          </p>

          <div className='flex flex-col gap-2 font-ligth text-gray-700'>

            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'TopWear'}
                onChange={handleSubCategoryChange}
              />
              TopWear
            </p>

            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'BottomWear'}
                onChange={handleSubCategoryChange}
              />
              BottomWear
            </p>

            <p className='flex gap-2'>
              <input
                className='w-3'
                type='checkbox'
                value={'WinterWear'}
                onChange={handleSubCategoryChange}
              />
              WinterWear
            </p>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Category