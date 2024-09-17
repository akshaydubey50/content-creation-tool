import React from 'react'

export default function ResourceSidebar() {
    const resCat =[
        {name:"Tools",id:1},
        {name:"Jobs",id:2},
        {name:"Memes",id:3},
        {name:"News",id:4},
        {name:"Resources",id:5},
    ]
  return (
    <>
    {resCat.map((item)=>{
        return(
            <div key={item.id} className='py-2 rounded-md pl-4 hover:cursor-pointer font-medium hover:text-light-yellow hover:bg-orange-200'>
                {item.name}
            </div>
        )
    })}
    </>
  )
}
