
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class GetMap extends Simulation {

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
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_14 = Map(
  		"Accept" -> "*/*",
  		"Cache-Control" -> "no-cache",
  		"Content-Type" -> "application/ocsp-request",
  		"Pragma" -> "no-cache"
  )
  
  private val uri1 = "http://status.geotrust.com"

  private val scn = scenario("GetMap")
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
    .pause(2)
    .exec(
      http("request_4")
        .get("/ProfileViewer?code=f43fc6b0514dd06013ff27c9cca5a826&state=0a2bb855eb834bf2967d9144a0fdd2ba")
        .headers(headers_4)
        .check(bodyBytes.is(RawFileBody("getmap/0004_response.html")))
        .resources(
          http("request_5")
            .get("/static/media/icono.09c0a0411923c3de503a.png")
            .headers(headers_2)
        )
    )
    .pause(7)
    .exec(
      http("request_6")
        .get("/mapa")
        .headers(headers_4)
        .check(bodyBytes.is(RawFileBody("getmap/0006_response.html")))
        .resources(
          http("request_7")
            .get("/static/media/icono.09c0a0411923c3de503a.png")
            .headers(headers_2),
          http("request_8")
            .get("/static/media/bar.496899a504eb680aaf8b.png")
            .check(bodyBytes.is(RawFileBody("getmap/0008_response.png"))),
          http("request_9")
            .get("/static/media/interrogacion.8423696c61519106a08c.png")
            .check(bodyBytes.is(RawFileBody("getmap/0009_response.png"))),
          http("request_10")
            .get("/static/media/gasolinera.acfd27002488d24977b1.png")
            .check(bodyBytes.is(RawFileBody("getmap/0010_response.png"))),
          http("request_11")
            .get("/static/media/tienda.31ee7aba5532286798c2.png")
            .check(bodyBytes.is(RawFileBody("getmap/0011_response.png"))),
          http("request_12")
            .get("/static/media/paisaje.68d598cffef8d9d728ef.png")
            .check(bodyBytes.is(RawFileBody("getmap/0012_response.png"))),
          http("request_13")
            .get("/static/media/monumento.f505f99d0176c9d181ee.png")
            .check(bodyBytes.is(RawFileBody("getmap/0013_response.png")))
        )
    )
    .pause(1)
    .exec(
      http("request_14")
        .post(uri1 + "/")
        .headers(headers_14)
        .body(RawFileBody("getmap/0014_request.dat"))
        .check(bodyBytes.is(RawFileBody("getmap/0014_response.dat")))
        .resources(
          http("request_15")
            .post(uri1 + "/")
            .headers(headers_14)
            .body(RawFileBody("getmap/0015_request.dat"))
            .check(bodyBytes.is(RawFileBody("getmap/0015_response.dat")))
        )
    )

	setUp(scn.inject(constantUsersPerSec(3).during(15))).protocols(httpProtocol)
}
