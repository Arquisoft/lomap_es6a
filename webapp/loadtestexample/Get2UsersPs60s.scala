
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Get2UsersPs60s extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources()
    .acceptHeader("image/avif,image/webp,*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """W/"751-XEMUQzYBN7tH+UYy8L/v76zdkXc"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "*/*",
  		"If-None-Match" -> """W/"9edb68-Vg0zB/vlNGUIYntEEOMxjzZE8os""""
  )
  
  private val headers_2 = Map("If-None-Match" -> """W/"1d188-0y745tgEbgfvHTIziU4fGTsIkvY"""")
  
  private val headers_3 = Map("If-None-Match" -> """W/"119c06-TvSpNUFis8Ea9vfa18vN2rkwiFo"""")
  
  private val headers_4 = Map(
  		"Accept" -> "*/*",
  		"Cache-Control" -> "no-cache",
  		"Content-Type" -> "application/ocsp-request",
  		"Pragma" -> "no-cache"
  )
  
  private val headers_5 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val uri2 = "http://r3.o.lencr.org"

  private val scn = scenario("Get2UsersPs60s")
    .exec(
      http("request_0")
        .get("/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("/static/js/bundle.js")
            .headers(headers_1),
          http("request_2")
            .get("/static/media/icono.09c0a0411923c3de503a.png")
            .headers(headers_2),
          http("request_3")
            .get("/static/media/fotohome14.04cacf15d6b58f3fbf20.png")
            .headers(headers_3)
        )
    )
    .pause(5)
    .exec(
      http("request_4")
        .post(uri2 + "/")
        .headers(headers_4)
        .body(RawFileBody("get2usersps60s/0004_request.dat"))
        .check(bodyBytes.is(RawFileBody("get2usersps60s/0004_response.dat")))
    )
    .pause(1)
    .exec(
      http("request_5")
        .get("/ProfileViewer?code=1f4881605b526fea3e93556ac7adad13&state=a7e51b5c86e545d3a5d0d9690edb016f")
        .headers(headers_5)
        .check(bodyBytes.is(RawFileBody("get2usersps60s/0005_response.html")))
        .resources(
          http("request_6")
            .get("/static/media/icono.09c0a0411923c3de503a.png")
            .headers(headers_2)
        )
    )

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds) randomized)).protocols(httpProtocol)
}
