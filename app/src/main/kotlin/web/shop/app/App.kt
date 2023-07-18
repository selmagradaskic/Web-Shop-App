package web.shop.app
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@ComponentScan(
  basePackageClasses = [web.shop.app.crud.ReviewController::class])
@EntityScan("package web.shop.app.crud.review")
@EnableJpaRepositories
@EnableJpaAuditing
class App {
    val greeting: String
        get() {
            return "Hello World!"
        }
}

fun main(args: Array<String>) {
  runApplication<App>(*args)
    println(App().greeting)
}
