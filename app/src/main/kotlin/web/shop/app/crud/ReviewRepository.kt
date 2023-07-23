package web.shop.app.crud

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ReviewRepository : CrudRepository<Review, Long?>{
  override fun findById(reviewId: Long): Optional<Review>
}


