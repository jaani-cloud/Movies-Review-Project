import { useState } from "react";

export default function ReviewForm() {
    const [selectedType, setSelectedType] = useState(null)
    const [comment, setComment] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedType) {
            alert("Please select a review typ")
            return;
        }
    }

    return (
        <div>
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Review Type</label>
                    <div>
                        <button
                            type="button"
                            onClick={() => setSelectedType("Skip")}
                        >
                            Skip
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedType("Time Pass")}
                        >
                            Time Pass
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedType("Go for It")}
                        >
                            Go For It
                        </button>

                    </div>
                </div>

                <div>
                    <textarea
                        name="" id=""
                        placeholder="Write your review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
};
