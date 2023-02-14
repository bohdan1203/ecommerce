import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addReview } from "../features/productsSlice";

function AddReview({ product }) {
  const reviewRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <form
      className="mt-5 max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          addReview({
            productKey: product.key,
            productId: product.id,
            review: {
              userId: currentUser.id,
              username: currentUser.username,
              date: new Date().toISOString(),
              review: reviewRef.current.value,
            },
          })
        );
        reviewRef.current.value = "";
      }}
    >
      <div>{currentUser?.username}</div>
      <textarea
        placeholder="Write your review..."
        className="mt-3 p-3 border border-gray-400 rounded w-full resize-none focus:outline-none focus:shadow-outline"
        ref={reviewRef}
      />
      <button
        type="submit"
        className="mt-3 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Add Review
      </button>
    </form>
  );
}

export default AddReview;
