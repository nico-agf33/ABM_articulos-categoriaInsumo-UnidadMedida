import {PencilFill} from "react-bootstrap-icons";

interface EditButtonProps{onClick:()=>void;}

const EditButton=({onClick}:EditButtonProps)=>{
    return(
    <PencilFill
        color="#FBC02D"
        size={24}
        onClick={onClick}
        onMouseEnter={()=>{document.body.style.cursor='pointer'}}
        onMouseLeave={()=>{document.body.style.cursor='default'}}
    />
    )
}
export default EditButton
