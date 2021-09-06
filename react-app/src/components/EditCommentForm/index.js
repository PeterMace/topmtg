import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editComment } from '../../store/comment';
import { useHistory } from 'react-router-dom';


const EditCommentForm = ({comment, hideForm}) => {
    //const photos = useSelector(state => state.photos);
    const id = comment.id;
    const userId = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [content, setContent] = useState(comment.content);
    const updateContent = (e) => setContent(e.target.value);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(content.length > 0 && content.length < 450){
            const payload = {
                id,
                content
            }    
            const dispatchComment = await dispatch(editComment(payload));
            hideForm();
            window.location.reload();
            
        } else{
            setErrors(["Comment must be not empty and less than 450 characters"])
        }   

      };

    
    return (
        <>
            { userId && (
                <form onSubmit={handleSubmit} className='photo-form'>
                    <h3> Update Comment</h3>
                    {errors.map((error)=>(
                        <p key={error}>{error}</p>
                    ))}

                    <input
                        type="text"
                        name="comment"

                        value={content}
                        onChange={updateContent} />
                    <button type="submit">Save</button>
                </form>)
            }
        </>
   )
};

export default EditCommentForm;