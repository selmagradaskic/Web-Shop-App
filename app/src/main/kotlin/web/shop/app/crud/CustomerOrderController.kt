package web.shop.app.crud

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.sql.Date
import java.time.LocalDate

@RestController
@RequestMapping("/orders")
@CrossOrigin(exposedHeaders= ["Access-Control-Allow-Origin"])
class CustomerOrderController(@Autowired val customerOrderRepository: CustomerOrderRepository) {

  @GetMapping("")
  fun getAllOrders(): MutableIterable<CustomerOrder?> {
    return customerOrderRepository.findAll()
  }

  @PostMapping("")
  fun createAnOrder(@RequestBody order: CustomerOrder): ResponseEntity<CustomerOrder> {
    val createdOrder = customerOrderRepository.save(order)
    return ResponseEntity(createdOrder, HttpStatus.CREATED)
  }

  @GetMapping("/{id}")
  fun getReviewById(@PathVariable("id") customerOrderId: Long): ResponseEntity<CustomerOrder> {
    val order = customerOrderRepository.findById(customerOrderId).orElse(null)
    return if (order != null) ResponseEntity(order, HttpStatus.OK)
    else ResponseEntity(HttpStatus.NOT_FOUND)
  }

  @PutMapping("/{id}")
  fun updateReviewById(@PathVariable("id") customerOrderId: Long, @RequestBody customerOrder: CustomerOrder): ResponseEntity<CustomerOrder> {
    val oldOrder = customerOrderRepository.findById(customerOrderId).orElse(null)
    return if (customerOrderRepository.existsById(customerOrderId)) {
      val order = CustomerOrder(
        id = customerOrderId,
        product = customerOrder.product,
        customerName = customerOrder.customerName,
        address = customerOrder.address,
        city = customerOrder.city,
        countryState = customerOrder.countryState,
        zip = customerOrder.zip,
        card = customerOrder.card,
        exMonth = customerOrder.exMonth,
        exYear = customerOrder.exYear,
        cvv = customerOrder.cvv,
        createdDate = oldOrder.createdDate,
        updatedDate = Date.valueOf(LocalDate.now())
      )
      val updatedOrder = this.customerOrderRepository.save(customerOrder)
      ResponseEntity(updatedOrder, HttpStatus.CREATED)
    } else {
      ResponseEntity(HttpStatus.NOT_FOUND)
    }
  }

  @DeleteMapping("/{id}")
  fun deleteOrderById(@PathVariable("id") customerOrderId: Long): ResponseEntity<CustomerOrder> {
    if (!customerOrderRepository.existsById(customerOrderId)) {
      return ResponseEntity(HttpStatus.NOT_FOUND)
    }
    customerOrderRepository.deleteById(customerOrderId)
    return ResponseEntity(HttpStatus.NO_CONTENT)
  }

  @GetMapping("/product/{productId}")
  fun getOrdersByProduct(@PathVariable("productId") productId: Int): ResponseEntity<List<CustomerOrder>> {
    val orders = getAllOrders()
    var ordersByProduct = mutableListOf<CustomerOrder>()
    for (order in orders) {
      if (order != null && order.product == productId) {
        ordersByProduct.add(order)
      }
    }
    return ResponseEntity(ordersByProduct, HttpStatus.OK)
  }
}
