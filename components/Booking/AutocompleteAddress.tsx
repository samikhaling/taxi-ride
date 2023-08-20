"use client";
import React, { useEffect, useState } from 'react'

function AutoCompleteAddress() {
  const [source,setSource]=useState<any>()
  const [addressList,setAddressList]=useState<any>([]);
      useEffect(()=>{
        const delayDebounceFn=  setTimeout(()=>{
            getAddressList()
        },1000)
        return () => clearTimeout(delayDebounceFn)   
    },[source]);
   const getAddressList=async()=>{
        setAddressList([]);
        const res=await fetch('/api/search-address?q='+source,{
            headers:{
                "Content-Type": "application/json",  
        }
        });

        const result=await res.json();
        setAddressList(result)
        
    }
  return (
    <div className='mt-5' >
        <div className='relative'>
            <label className='text-gray-400'>Where From?</label>
            <input type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]'
             value={source}
                onChange={(e)=>{
                    setSource(e.target.value);
                }}
            />
            {addressList?.suggestions?
            <div className='shadow-md p-1 rounded-md
            absolute w-full bg-white z-20'>
            {addressList?.suggestions.map((item:any,index:number)=>(
                <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer'
                onClick={()=>{setSource(item.full_address);
                setAddressList([])}}
                >{item.full_address}</h2>
            ))}
           </div>:null}
        </div>
        <div className='mt-2'>
            <label className='text-gray-400'>Where To?</label>
            <input type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300'/>
        </div>
    </div>
  )
}

export default AutoCompleteAddress