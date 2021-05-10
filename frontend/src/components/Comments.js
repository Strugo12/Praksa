import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Comment(props) {
  axios.defaults.withCredentials = true;
  const [comments, setComments] = useState([]);
  const { id } = props;
  useEffect(() => {
    const fecthData = async () => {
      const { data } = await axios.get(`/product/comments/${id}`);
      setComments(data);
    };
    fecthData();
  }, []);

  return (
    <div>
      <h1>Comments</h1>

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <span>Author: {comment.username}</span>
          <div>Comment: {comment.body}</div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
}
