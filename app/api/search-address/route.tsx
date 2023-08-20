import { NextResponse } from "next/server";
const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest"
export async function GET(request:any) {

    const {searchParams}=new URL(request.url);

    const searchText=searchParams.get('q');

    const res=await fetch(BASE_URL+'?q='+searchText+'?language=en&limit=6&session_token=0222503c-1e70-4e21-88a0-067d3a407edf'
    +"&access_token="+process.env.MAPBOX_ACCESS_TOKEN,
    {
        headers:{
            "Content-Type": "application/json"
        }
    })

    const searchResult=await res.json();
    return NextResponse.json(searchResult)
    
}