"use client";
import React from 'react'
import AutoCompleteAddress from './AutocompleteAddress'
import Cars from './Cars';
import Cards from './Cards';

function Booking() {
  // const screenHight = (window.innerHeight)*0.72;
  return (
    <div className='p-5'>
        <h2 className='text-[20px] font-semibold'>Booking</h2>
        <div className='border-[1px] p-5 rounded-md'>
        <AutoCompleteAddress />
        <Cars/>
        <Cards/>
        </div>      
        
    </div>
  )
}

export default Booking