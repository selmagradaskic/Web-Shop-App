package web.shop.app

import org.springframework.data.annotation.Id
import javax.persistence.*

@Entity
@Table(name = "reviews")
data class Reviews(
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private val id: Int = 0,

  @Column(name = "author")
  val author: String? = null,

  @Column(name = "review")
  val review: String? = null
)
