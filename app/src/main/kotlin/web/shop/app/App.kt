package web.shop.app
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication(exclude =  [DataSourceAutoConfiguration::class])
@ComponentScan("com.delivery.request")
@EntityScan("com.delivery.domain")
@EnableJpaRepositories("com.delivery.repository")
//@EnableJpaAuditing
class App: SpringBootServletInitializer() {
    val greeting: String
        get() {
            return "Hello World!"
        }
}

fun main(args: Array<String>) {
  runApplication<App>(*args)
    println(App().greeting)
}
