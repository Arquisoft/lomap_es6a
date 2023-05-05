
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Limit extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://r3.o.lencr.org")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """W/"751-XEMUQzYBN7tH+UYy8L/v76zdkXc"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map("If-None-Match" -> """W/"9edb68-Vg0zB/vlNGUIYntEEOMxjzZE8os"""")
  
  private val headers_2 = Map("Accept" -> "image/avif,image/webp,*/*")
  
  private val headers_3 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-None-Match" -> """W/"119c06-TvSpNUFis8Ea9vfa18vN2rkwiFo""""
  )
  
  private val headers_4 = Map(
  		"Cache-Control" -> "no-cache",
  		"Content-Type" -> "application/ocsp-request",
  		"Pragma" -> "no-cache"
  )
  
  private val headers_6 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_8 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-None-Match" -> """W/"1d188-0y745tgEbgfvHTIziU4fGTsIkvY""""
  )
  
  private val uri1 = "http://localhost:3000"
  
  private val uri3 = "http://ocsp.pki.goog/gts1c3"

  private val scn = scenario("Limit")
    .exec(
      http("request_0")
        .get(uri1 + "/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get(uri1 + "/static/js/bundle.js")
            .headers(headers_1),
          http("request_2")
            .get(uri1 + "/static/media/icono.09c0a0411923c3de503a.png")
            .headers(headers_2),
          http("request_3")
            .get(uri1 + "/static/media/fotohome14.04cacf15d6b58f3fbf20.png")
            .headers(headers_3),
          http("request_4")
            .post(uri3)
            .headers(headers_4)
            .body(RawFileBody("limit/0004_request.dat"))
        )
    )
    .pause(1)
    .exec(
      http("request_5")
        .post("/")
        .headers(headers_4)
        .body(RawFileBody("limit/0005_request.dat"))
        .resources(
          http("request_6")
            .get(uri1 + "/ProfileViewer?code=952c1a8384d1ccfa8780d2f4e1b2afca&state=60edac2c53444228b15bb645d9ca484a")
            .headers(headers_6),
          http("request_7")
            .get(uri1 + "/static/js/bundle.js")
            .headers(headers_1),
          http("request_8")
            .get(uri1 + "/static/media/icono.09c0a0411923c3de503a.png")
            .headers(headers_8)
        )
    )

	setUp(scn.inject(rampUsers(2500) during(60 seconds))).protocols(httpProtocol)
}
