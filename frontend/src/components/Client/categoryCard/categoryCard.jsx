import React , {useState} from 'react'
import './categoryCard.css'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';
import { getProductsBySearch,getProductsByCategory } from '../../../redux/actions/productActions';
import { useDispatch } from 'react-redux';



export default function CategoryCard(props) {

  const [rating, setRating] = useState(2)
    const dispatch  = useDispatch();


  const handleCategorySelection =()=>{
    console.log("getting the category information")
    console.log(props.title);
    
    dispatch(getProductsByCategory(props.value));


}




  return (
    <Link to='/search'>
    <div className='categoryCard' onClick={handleCategorySelection}  >
        <div className="categoryCardWrapper">
            <div className="imageHolderSide">
                <img 
                src={props.image}                
                alt={props.title} />
            </div>
            <div className="cardBodySide">
                  {/* <span>                    
                    <StarBorderIcon style={props.rating >=1? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}} />
                    <StarBorderIcon style={props.rating >=2? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                    <StarBorderIcon style={props.rating >=3? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                    <StarBorderIcon style={props.rating >=4? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                    <StarBorderIcon style={props.rating >=5? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                  </span>  */}
                    <p>{props.title}</p>
                    {/* <p><a href="/">view more</a></p> */}
            </div>
        </div>
    </div>
    </Link>
  )
}
