package web.shop.app

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@CrossOrigin(origins = ["http://localhost:4200"])
class Controller(@Autowired val reviewRepository: Repository) {
  // standard constructors

  @GetMapping("/reviews")
  fun getReviews(@PathVariable reviewId: Long): List<Reviews> {
    return reviewRepository.findByReviewId(reviewId)
  }


  @PostMapping("/reviews")
  fun addReview(@RequestBody review: Reviews) {
    reviewRepository.save(review)
  }

  @PutMapping("/reviews/{reviewId}")
  fun updateReview(@PathVariable reviewId: Long, @RequestBody review: Reviews): Reviews {
    return reviewRepository.findById(reviewId)
      .map { review ->
        reviewRepository.save(review!!)
      }.orElseThrow { NotFoundException() }
  }

  @DeleteMapping("/reviews/{reviewId}")
  fun deleteReview(@PathVariable reviewId: Long): ResponseEntity<*> {
    return reviewRepository.findById(reviewId)
      .map { review ->
        reviewRepository.delete(review!!)
        ResponseEntity.ok().build<Unit>()
      }.orElseThrow { NotFoundException() }
  }
}
