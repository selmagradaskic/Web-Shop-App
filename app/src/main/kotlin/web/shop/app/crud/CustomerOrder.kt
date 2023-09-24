package web.shop.app.crud

import org.springframework.data.annotation.Id
import org.springframework.data.jpa.repository.Temporal
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.sql.Date
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.TemporalType

@Entity
@Table("customer_orders")
data class CustomerOrder (
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column("id")
  val id: Long,

  @Column("product")
  val product: Int,

  @Column("customer_name")
  val customerName: String,

  @Column("email")
  val email: String,

  @Column("address")
  val address: String,

  @Column("city")
  val city: String,

  @Column("country_state")
  val countryState: String,

  @Column("zip")
  val zip: Int,

  @Column("card")
  val card: Long,

  @Column("ex_month")
  val exMonth: String,

  @Column("ex_year")
  val exYear: String,

  @Column("cvv")
  val cvv: Int,

  @Temporal(TemporalType.DATE)
  val createdDate: Date = Date.valueOf(LocalDate.now()),

  @Temporal(TemporalType.DATE)
  var updatedDate: Date = Date.valueOf(LocalDate.now())




)

