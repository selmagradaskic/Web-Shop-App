package web.shop.app.crud

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.sql.Date
import java.time.LocalDate
import java.util.*


@RestController
@RequestMapping("/reviews")
@CrossOrigin(exposedHeaders= ["Access-Control-Allow-Origin"])
public class ReviewController (@Autowired val reviewRepository: ReviewRepository) {

  @GetMapping("")
  fun getAllReviews(): MutableIterable<Review?> {
    return reviewRepository.findAll()
  }


  @PostMapping("")
  fun createReview(@RequestBody review: Review): ResponseEntity<Review> {
    val createdReview = reviewRepository.save(review)
    return ResponseEntity(createdReview, HttpStatus.CREATED)
  }

  @GetMapping("/{id}")
  fun getReviewById(@PathVariable("id") reviewId: Long): ResponseEntity<Review> {
    val review = reviewRepository.findById(reviewId).orElse(null)
    return if (review != null) ResponseEntity(review, HttpStatus.OK)
    else ResponseEntity(HttpStatus.NOT_FOUND)
  }

  @PutMapping("/{id}")
  fun updateReviewById(@PathVariable("id") reviewId: Long, @RequestBody review: Review): ResponseEntity<Review> {
    val oldReview = reviewRepository.findById(reviewId).orElse(null)
    return if (reviewRepository.existsById(reviewId)) {
      val review = Review(
        id = reviewId,
        author = review.author,
        review = review.review,
        stars = review.stars,
        product = oldReview.product,
        createdDate = oldReview.createdDate,
        updatedDate = Date.valueOf(LocalDate.now())
      )
      val updatedReview = this.reviewRepository.save(review)
      ResponseEntity(updatedReview, HttpStatus.CREATED)
    } else {
      ResponseEntity(HttpStatus.NOT_FOUND)
    }
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
