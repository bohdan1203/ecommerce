import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRating, updateRating } from "../features/productsSlice";

function RatingSelect({ product }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    const currentUsersProductRating = product.ratings?.find(
      (rating) => rating.userId === currentUser?.id
    );
    setSelectedRating(currentUsersProductRating?.rating || "");
  }, [currentUser?.id, product.ratings]);

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  const handleRatingSubmit = () => {
    const rating = Number(selectedRating);
    const payload = {
      productId: product.id,
      productKey: product.key,
      rating: { userId: currentUser.id, rating },
    };

    if (product.ratings.some((rating) => rating.userId === currentUser?.id)) {
      const ratingToUpdate = product.ratings.find(
        (rating) => rating.userId === currentUser.id
      );
      dispatch(updateRating({ ...payload, ratingKey: ratingToUpdate.id }));
    } else {
      dispatch(addRating(payload));
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg my-5">
      <label
        htmlFor="rating"
        className="block px-3 py-2 font-medium text-center text-gray-700"
      >
        Rate This Product
      </label>
      <select
        id="rating"
        value={selectedRating}
        className="block w-full px-3 py-2 text-gray-700 bg-white appearance-none"
        onChange={handleRatingChange}
        onBlur={handleRatingSubmit}
      >
        <option value="" disabled>
          How many stars would you give to this product?
        </option>
        {[1, 2, 3, 4, 5].map((rate) => (
          <option value={rate} key={rate} className="text-center">
            {String.fromCodePoint(9733).repeat(rate)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RatingSelect;
