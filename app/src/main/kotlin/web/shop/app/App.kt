package web.shop.app
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication

@SpringBootApplication(exclude =  [DataSourceAutoConfiguration::class])
//@EnableJpaAuditing
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
