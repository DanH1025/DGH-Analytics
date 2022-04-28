import React from 'react'
import './categoryCard.css'


export default function CategoryCard() {
  return (
    <div className='categoryCard'>
        <div className="categoryCardWrapper">
            <div className="imageHolderSide">
                <img 
                src="http://bigone4.demo.towerthemes.com/image/cache/catalog/product/27-600x600.jpg"                
                alt="Category Name" />
            </div>
            <div className="cardBodySide">
                    <p>Category Title</p>
                    <p><a href="/">view more</a></p>
            </div>
        </div>
    </div>
  )
}
