package web.shop.app.crud

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CustomerOrderRepository : CrudRepository<CustomerOrder, Long?> {
  override fun findById(customerOrderId: Long): Optional<CustomerOrder>

}
