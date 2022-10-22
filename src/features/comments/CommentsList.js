import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import Comment from "./Comment";
import { selectCommentsByCampsiteId } from "./commentsSlice";
import CommentForm from "./CommentForm";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

const CommentsList = ({ campsiteId }) => {
  const comments = useSelector(selectCommentsByCampsiteId(campsiteId));

  const isLoading = useSelector((state) => state.comments.isLoading);
  const errMsg = useSelector((state) => state.comments.errMsg);

  if (isLoading) {
    return <Loading />;
  }

  if (errMsg) {
    return <Error errMsg={errMsg} />;
  }

  if (comments && comments.length > 0) {
    return (
      <Col md="5" className="m-1">
        {comments.map((comment) => {
          return (
            <div className="d-flex mb-5" key={comment.id}>
              <Comment comment={comment} />
            </div>
          );
        })}
        <CommentForm campsiteId={campsiteId} />
      </Col>
    );
  }

  // if (comments && comments.length > 0) {
  //   return isLoading ? (
  //     <Loading />
  //   ) : errMsg ? (
  //     <Error errMsg={errMsg} />
  //   ) : (
  //     <Col md="5" className="m-1">
  //       {comments.map((comment) => {
  //         return (
  //           <div className="d-flex mb-5" key={comment.id}>
  //             <Comment comment={comment} />
  //           </div>
  //         );
  //       })}
  //       <CommentForm campsiteId={campsiteId} />
  //     </Col>
  //   );
  // }
  return (
    <Col md="5" className="m-1">
      There are no comments for this campsite yet.
    </Col>
  );
};

export default CommentsList;
