package web.shop.app.crud

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType

@Entity
@Table("reviews")
data class Review(
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column("id")
  val id: Int = 0,

  @Column("author")
  val author: String? = null,

  @Column("review")
  val review: String? = null
)
