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
                    <p>{props.title}</p>                   
            </div>
        </div>
    </div>
    </Link>
  )
}
