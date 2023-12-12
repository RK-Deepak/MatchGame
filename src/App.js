

import './App.css';
import React, { useEffect, useState } from 'react'

import helmet from "./img/helmet-1.png"
import posion from "./img/potion-1.png"
import sword from "./img/sword-1.png"
import shield from "./img/shield-1.png"
import scroll from "./img/scroll-1.png"
import ring from "./img/ring-1.png"
import AloneCard from './componets/AloneCard';

function App() {


  const [gamecards,setgamecards]=useState(null);
  const [turns,setturns]=useState(0);
  const [choiceone,setchoiceone]=useState(null);
  const [choicetwo,setchoicetwo]=useState(null);
  const [disabled,setdisabled]=useState(false);

  const cards=[
    {"src":helmet,matched:false},
    {"src":posion ,matched:false},
    {"src":sword ,matched:false},
    {"src":shield ,matched:false},
    {"src":scroll ,matched:false},
    {"src":ring ,matched:false},

  ]

 

  const shuffledCards=()=>
  { 
    const shuffledCards=[...cards,...cards].sort(()=>Math.random() - 0.5).map((card)=>({...card,id:Math.random()}));

    setgamecards(shuffledCards);
    setturns(0);

  }
  useEffect(()=>
  {
      shuffledCards();
      setdisabled(false);
  },[])

  const gamehandler=()=>
  {
    shuffledCards();
    setturns(0);
  }
  const handlechoice=(card)=>
  {
    choiceone?setchoicetwo(card):setchoiceone(card);
  
    
  }
  useEffect(()=>
  {
    if(turns<15)
    {

    
       if(choiceone && choicetwo)
       {
        setdisabled(true);
         if(choiceone?.src===choicetwo?.src && choiceone?.id!==choicetwo?.id)
         {
        
          setgamecards((prev) => {
            return prev.map((card) => {
              if (card.src === choiceone.src) {
                return { ...card, matched: true };
              }
              return card; 
            });
          });
          setdisabled(false)
          reset();
         }
         else if(choiceone?.id===choicetwo?.id)
         {
          console.log("choose different")
         }
        
         
         else 
         {
          console.log("unmatched")
          setTimeout(() => {
            reset();
            setdisabled(false);
          }, 1000);
        
         }
         
       }
      }
      else 
      {
        setdisabled(true);
      }
  },[choiceone,choicetwo])


  const reset=()=>
  {
    setchoiceone(null);
    setchoicetwo(null);
    setturns((prev)=>prev+1);
    
  }

  console.log(gamecards)

  return (
    <div className="App flex items-center min-h-screen flex-col p-2 gap-2 bg-black  ">
  <h1 className='text-xl font-bold underline text-white '>Match Game</h1>
  <button className='px-2 py-1 bg-green-400 rounded-md font bold text-white'onClick={gamehandler} >New Game</button>
  <p className='text-slate-400 font-bold text-lg'>{turns < 15 ? `Turns: ${turns}` : "Start New Game"} <span className=' font-semibold text-red-800 '>{turns >= 15? "You Lost" : ""}</span></p>

  <div className='grid grid-cols-4 gap-2'>
    {
      gamecards &&  gamecards.map((card)=>(
        <AloneCard card={card} key={card.id} handlechoice={handlechoice} flipped={card?.matched || card===choiceone || card===choicetwo} disabled={disabled} />
      ))

    }
  </div>
    </div>
  );
}

export default App;
