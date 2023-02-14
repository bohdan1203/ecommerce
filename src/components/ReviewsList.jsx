import { Fragment } from "react";

function ReviewsList({ product }) {
  const reviews = product.reviews || [];

  return (
    <Fragment>
      {reviews.length > 0 ? (
        <ul className="list-disc pl-5 mt-5">
          {reviews.map((review, i) => {
            const date = new Date(review.date).toLocaleDateString();
            return (
              <li key={"" + review.id + review.key + i} className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  {review.username}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{date}</p>
                <p className="text-gray-700">{review.review}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center mt-5 text-gray-700">No reviews yet</div>
      )}
    </Fragment>
  );
}

export default ReviewsList;
