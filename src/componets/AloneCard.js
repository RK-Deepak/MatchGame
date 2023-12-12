import React from 'react'
import cover from "../img/cover.png"

const AloneCard=({card,handlechoice,flipped,disabled})=>
{
          
          const clickhandler=()=>
          {
                    if(!disabled)
                    {
                              handlechoice(card);
                    }
                   
                   
          }
        
   return (
          <div className={`mx-auto flex border border-slate-800 relative card rounded-md ${flipped ? "flipped" : ""} rounded-md`}>
    
     <img src={cover} alt="back" onClick={clickhandler} className='absolute back rounded-md' />
          <img src={card?.src} alt='front' className='front rounded-md' />
          
     </div>


   )
}
export default AloneCard;