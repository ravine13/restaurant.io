import React from 'react'
import { Rating } from 'flowbite-react'

const RatingComponent = ({rating}) => {
  const filledStars = Array.from({ length: rating }, (_, index) => (
    <Rating.Star key={index} />
  ))

  const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
    <Rating.Star key={rating + index} filled={false} />
  ))

  return (
    <Rating>
      {filledStars}
      {emptyStars}
    </Rating>
  )
}

export default RatingComponent