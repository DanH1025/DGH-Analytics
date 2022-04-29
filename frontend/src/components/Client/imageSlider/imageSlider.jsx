import React, {useState , useEffect , useRef} from 'react'
import './imageSlider.css'
import {ArrowBackIos,ArrowForwardIos} from '@material-ui/icons'
import { sliderData } from './sliderData';



export default function ImageSlider({slides}) {
    const [current , setCurrent] = React.useState(0);
    const length = slides.length;


    //to slide to next image
    const nextImg = ()=>{
        setCurrent(current === length - 1? 0 : current + 1); // if the image gets to the last one comeback to 0 else add one to the current index 
    };

    //to slide back to prev image
    const prevImg = ()=>{
        setCurrent (current===0? length - 1 : current - 1); // if the image is on the first image then go to the last image else go to the prev image on the array
    };

    console.log(current)

    if(!Array.isArray(slides) || slides.length <= 0){
        return null
    }

  return (
    <div className='imageSlider'>
      
      <h1>High Quality Products</h1>

            <ArrowBackIos className='to-prev'  onClick={prevImg}  />
            <ArrowForwardIos className="to-next" onClick={nextImg} /> 

            

        {sliderData.map((slide,index)=>{
            return (
             
                    <div className={index === current? 'slide active' : 'slide'} key={index}>
                    {index === current &&
                        (<img src={slide.image} alt='DGH electronic shop' className='image' />)
                    }
                
                </div>
                
            )
         
        })}
        </div>
       
 
  ) 
}
