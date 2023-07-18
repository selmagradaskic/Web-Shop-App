package web.shop.app.crud

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/reviews")
public class ReviewController (@Autowired val reviewRepository: ReviewRepository) {
  // standard constructors

  @GetMapping("")
  fun getAllReviews(): MutableIterable<Review?> {
    return reviewRepository.findAll()
  }


  @PostMapping("")
  fun createReview(@RequestBody review: Review): ResponseEntity<Review> {
    val createdUser = reviewRepository.save(review)
    return ResponseEntity(createdUser, HttpStatus.CREATED)
  }

  @GetMapping("/{id}")
  fun getReviewById(@PathVariable("id") reviewId: Long): ResponseEntity<Review> {
    val user = reviewRepository.findById(reviewId).orElse(null)
    return if (user != null) ResponseEntity(user, HttpStatus.OK)
    else ResponseEntity(HttpStatus.NOT_FOUND)
  }

  @PutMapping("/{id}")
  fun updateReviewById(@PathVariable("id") reviewId: Long, @RequestBody review: Review): ResponseEntity<Review> {

    val existingReview = reviewRepository.findById(reviewId).orElse(null) ?: return ResponseEntity(HttpStatus.NOT_FOUND)

    val updatedReview = existingReview.copy(author = review.author, review = review.review)
    reviewRepository.save(updatedReview)
    return ResponseEntity(updatedReview, HttpStatus.OK)
  }

  @DeleteMapping("/{id}")
  fun deleteReviewById(@PathVariable("id") reviewId: Long): ResponseEntity<Review> {
    if (!reviewRepository.existsById(reviewId)) {
      return ResponseEntity(HttpStatus.NOT_FOUND)
    }
    reviewRepository.deleteById(reviewId)
    return ResponseEntity(HttpStatus.NO_CONTENT)
  }
}
