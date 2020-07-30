import axios from "axios";

export const postReview = (review) => {
    return (dispatch) => {
        axios.post("https://movies-info-f83aa.firebaseio.com/reviews.json", review)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        })
    }
}