package web.shop.app.crud

import org.springframework.data.annotation.Id
import org.springframework.data.jpa.repository.Temporal
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.sql.Date
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table("reviews")
data class Review(
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column("id")
  var id: Long,

  @Column("author")
  val author: String,

  @Column("review")
  var review: String,

  @Column("stars")
  var stars: Int,

  @Column("product")
  val product: Int,

  @Temporal(TemporalType.DATE)
  val createdDate: Date = Date.valueOf(LocalDate.now()),

  @Temporal(TemporalType.DATE)
  var updatedDate: Date = Date.valueOf(LocalDate.now())

)
