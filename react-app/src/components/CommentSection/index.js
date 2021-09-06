import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, } from '../../store/comment';
import { useHistory } from 'react-router-dom';
import { CreateCommentForm } from '../CreateCommentForm'
import CommentDetail from '../CommentDetail';
import './CommentSection.css';

export const CommentSection = ({deckId}) => {
    const userId = useSelector(state => state.session.user?.id);
    const stateComments = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [comments, setComments] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const data = await dispatch(fetchComments(deckId));
          setComments({...data});
        }
        fetchData();
    }, [])

    return (
        
        <div>
          <h3> Comments </h3>
          {comments &&  Object.keys(comments).map(function(keyName, keyIndex) {
            return (
              <div className="comment">
                <CommentDetail key={comments[keyName].id} comment={comments[keyName]} />
              </div>
            );
          })}
            <br />
            < CreateCommentForm deckId={deckId} />
        </ div>
    );
};

export default CommentSection;