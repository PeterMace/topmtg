import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, } from '../../store/comment';
import { useHistory } from 'react-router-dom';
import { CreateCommentForm } from '../CreateCommentForm'
// import CommentDetail from '../CommentDetail';


export const CommentSection = ({deckId}) => {
    //const photos = useSelector(state => state.photos);
    const userId = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);


    const comments = useSelector(state => state.comments);

    useEffect(() => {
        async function fetchData() {
          await dispatch(fetchComments(deckId));
        }
        fetchData();
        console.log(comments);
    }, [])

    
    // if (!comments?.length) {
    //     return null;
    // }
    return (
        <div>
          {/* { comments.map((comment) => {
            return (
              <CommentDetail comment={comment} />
            );
          })} */}
            < CreateCommentForm deckId={deckId} />
        </ div>
    );
};

export default CommentSection;