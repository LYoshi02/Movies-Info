import axios from "axios";

export const likeReview = (movieId, reviewId, likesArray, token) => {
    return (dispatch) => {
      console.log(movieId, reviewId, likesArray);
      axios
        .put(
          `https://movies-info-f83aa.firebaseio.com/reviews/${movieId}/${reviewId}/likes.json?auth=${token}`,
          likesArray
        )
        .then((res) => {
        
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
};

// export const likeReviewSuccess = (reviewId, likesArray) {
//     return {
//         type: 
//     }
// }