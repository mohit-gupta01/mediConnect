import FaqItem from "./FaqItem";
import {faqs} from '../assets/data/faqs';


const FaqList = () => {
    return (
        <ul className="mt-[38px]">
            {faqs.map((item,index)=><FaqItem key={index} item={item}/>)}
        </ul>
    )
}

export default FaqList;
