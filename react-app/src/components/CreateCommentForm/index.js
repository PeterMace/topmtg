import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment, } from '../../store/comment';
import { useHistory } from 'react-router-dom';


export const CreateCommentForm = ({deckId}) => {
    const userId = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    const updateContent = (e) => setContent(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(content,userId,deckId);
        const data = await dispatch(createComment(content, userId, deckId));
        if ('errors' in data) {
            setErrors(data.errors)
        }
        // else{
        //     history.push(`/decks/${data.id}`)
        // }
      };

    
    return (
        <>
            { userId && (
                <form onSubmit={handleSubmit} className='photo-form'>
                    <h3> Comments </h3>
                    {errors.map((error)=>(
                        <p key={error}>{error}</p>
                    ))}
                    <input
                        type="text"
                        placeholder="Comment Here"
                        value={content}
                        onChange={updateContent} />
                    <button type="submit">Post Comment</button>
                </form>)
            }
        </>
   )
};

export default CreateCommentForm;