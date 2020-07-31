import axios from "axios";

export const postReview = (review, movieId) => {
    return (dispatch) => {
        axios.post(`https://movies-info-f83aa.firebaseio.com/reviews/${movieId}.json`, review)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        })
    }
}