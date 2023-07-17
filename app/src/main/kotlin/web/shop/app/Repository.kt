package web.shop.app

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface Repository : CrudRepository<Reviews?, Long?>{
  fun findByReviewId(reviewId: Long): List<Reviews>
}


