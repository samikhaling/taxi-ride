"use client";
import React, { useEffect, useState } from 'react'

const session_token='0222503c-1e70-4e21-88a0-067d3a407edf'
const MAPBOX_RETRIVE_URL='https://api.mapbox.com/search/searchbox/v1/retrieve/'

function AutoCompleteAddress() {
  const [source,setSource]=useState<any>()
  const [sourceChange,setSourceChange]=useState<any>(false)
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

    const onSourceAddressClick = async(item:any)=>{
        setSource(item.full_address);
        setAddressList([]);
        setSourceChange(false);
         const res=await fetch(MAPBOX_RETRIVE_URL+item.mapbox_id
            +"?session_token="+session_token
            +"&access_token="+process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN)
        
        const result=await res.json();
        console.log(result);
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
                onClick={()=>{onSourceAddressClick(item)}}
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