import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stars_green from "../assets/imgs/Stars_green.svg";
import rightarrow from "../assets/imgs/suggestioncarousel/rightarrow.svg";
import Left_Black from "../assets/imgs/suggestioncarousel/Left_Black.svg";
import Right_Green from "../assets/imgs/suggestioncarousel/Right_Green.svg";

const MarketPlace = () => {
  const name = useSelector((state) => state.showName);
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const [product, setProduct] = useState([
    {
      img: "https://s3-alpha-sig.figma.com/img/847d/f3f3/b4caa9db000527b20feff386f0cdb1ca?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F0sPwVtfeWayd1et2j3fF2jtpW004wefI5TOnAEZScpgCyB0l7zo2vI0WsXQRQOS1-sOe9Wd63wnZmKGK2OC62OWlCSsn~OuoD~Oz3hfD98zXdFxw6lvC05BphSRVBRxvk5UsV2Po9Y71xQuZlNWvXiSEXDhA79-u7V-hu5nDxHJlPGqEAhY6bzeyqeB7nqo8zTp--9UiOfTMZPXsvqSV8UW77XcWveu6nKG2e~DX5Q~e64w3ucVvXu7T6xP8HkFSEOzq77EdAsPUU8EM1rSravNZ3mgwmrNAO83AKe-YsPsng2xUSUBmTdAQkpIOaUGUD3w7vwkJfUiWVA~bSMcDw__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/a664/401d/1a66a948abc41945e122bcdd80a950df?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MUEItIaGxNj7vIH2C4beU5Vch2cAvyto94k1Gbqo6dqQfialES3S85SfqrZ-4A~KOSCnsxqVWj-d0DsPyEDOEiA5lAR78z42-cDYU09tYQBnsyL4t4McrKX1KXNUTU8XXGRHxlBtkKVXs43rhUU-S5ncZJaT8Df96r2qAdyXwMXH59T5lOfanCr0mZTJ-uNz~GdY296IiLCL-TPtPWVKImMXZL-qsTRIHIlF0iZ-2KWOyvdhMT-bQKRz7Mhk9K5ZTn4cvPTsyFsyGKUcbsdrHMzB4ricPf-d873oWHOeKZUK4DfZhiz1sI4OWWJBOIMRifBolF65HuwBPOmed8DITQ__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/458f/41b5/0c991462bc630d8699f22536c47aca8f?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KjhTrEuoBG6vVzdu6wMcUhAn6XSaUVcRZEVrFN2Wy4DQrqT~z-J2MnKwqFR6khgPkr6FSWkFGXevZ5HbkPTRxgJaa~bqitWKXqYafbEFcbDd8Cs1YFn0aM~47Rk8DgG9HuXjbZiYBAzn6~PZcWUxIm0U4DYRi9fT37hrvZOZXSN7V6v3oKRc32fwHbd8hnd-LDQ1ZmpKcl49tvF5EJs-7zId7eMZkER9AtCEm0nYDsR3We~UDVGMVs-C9CDskFwxaYIHzjeOLZokSGqIK9eyLEpHZzynmOFWUsbStk6DyCSAJ~LtSccp-aJZFr6sY4j4BOzi8n5EqKM5nsDPRD42UQ__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/c48f/1b0d/f6ed9d9404339c98e6a94b2274c97ba9?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RF~jnOODVqQrlkdHGJgswX8LUNqCH7xkdFqCrf8itgmauLSbNHUxdP9R8WgtLePeK-0DKA5ENxvvn-EB3hmByRi2Iy6O8Wj4y7lmDGvRXs1zuZM8RksAqH3dpM85tDFdCauqOC8iPggxbZVu-o4qYR3~1aTazX2Tnoe3m0CE4vLxIKsPrPPYuKh9QrUU0WuQdBUsqyTXG3G6ihfqaqvSs8ef8HJKx6d-HXmFx67yPJlWxslkoUhN1jEursyZ8inSnlANirp5eJSX~qSiLvD8BEWXXRsSj~ejo0eKCQjVc79dM8pZsXyXbEwV4Uq4Yhh62vPEtIlmV~t3qsGF0AaGsQ__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/847d/f3f3/b4caa9db000527b20feff386f0cdb1ca?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F0sPwVtfeWayd1et2j3fF2jtpW004wefI5TOnAEZScpgCyB0l7zo2vI0WsXQRQOS1-sOe9Wd63wnZmKGK2OC62OWlCSsn~OuoD~Oz3hfD98zXdFxw6lvC05BphSRVBRxvk5UsV2Po9Y71xQuZlNWvXiSEXDhA79-u7V-hu5nDxHJlPGqEAhY6bzeyqeB7nqo8zTp--9UiOfTMZPXsvqSV8UW77XcWveu6nKG2e~DX5Q~e64w3ucVvXu7T6xP8HkFSEOzq77EdAsPUU8EM1rSravNZ3mgwmrNAO83AKe-YsPsng2xUSUBmTdAQkpIOaUGUD3w7vwkJfUiWVA~bSMcDw__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/a664/401d/1a66a948abc41945e122bcdd80a950df?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MUEItIaGxNj7vIH2C4beU5Vch2cAvyto94k1Gbqo6dqQfialES3S85SfqrZ-4A~KOSCnsxqVWj-d0DsPyEDOEiA5lAR78z42-cDYU09tYQBnsyL4t4McrKX1KXNUTU8XXGRHxlBtkKVXs43rhUU-S5ncZJaT8Df96r2qAdyXwMXH59T5lOfanCr0mZTJ-uNz~GdY296IiLCL-TPtPWVKImMXZL-qsTRIHIlF0iZ-2KWOyvdhMT-bQKRz7Mhk9K5ZTn4cvPTsyFsyGKUcbsdrHMzB4ricPf-d873oWHOeKZUK4DfZhiz1sI4OWWJBOIMRifBolF65HuwBPOmed8DITQ__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/458f/41b5/0c991462bc630d8699f22536c47aca8f?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KjhTrEuoBG6vVzdu6wMcUhAn6XSaUVcRZEVrFN2Wy4DQrqT~z-J2MnKwqFR6khgPkr6FSWkFGXevZ5HbkPTRxgJaa~bqitWKXqYafbEFcbDd8Cs1YFn0aM~47Rk8DgG9HuXjbZiYBAzn6~PZcWUxIm0U4DYRi9fT37hrvZOZXSN7V6v3oKRc32fwHbd8hnd-LDQ1ZmpKcl49tvF5EJs-7zId7eMZkER9AtCEm0nYDsR3We~UDVGMVs-C9CDskFwxaYIHzjeOLZokSGqIK9eyLEpHZzynmOFWUsbStk6DyCSAJ~LtSccp-aJZFr6sY4j4BOzi8n5EqKM5nsDPRD42UQ__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/c48f/1b0d/f6ed9d9404339c98e6a94b2274c97ba9?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RF~jnOODVqQrlkdHGJgswX8LUNqCH7xkdFqCrf8itgmauLSbNHUxdP9R8WgtLePeK-0DKA5ENxvvn-EB3hmByRi2Iy6O8Wj4y7lmDGvRXs1zuZM8RksAqH3dpM85tDFdCauqOC8iPggxbZVu-o4qYR3~1aTazX2Tnoe3m0CE4vLxIKsPrPPYuKh9QrUU0WuQdBUsqyTXG3G6ihfqaqvSs8ef8HJKx6d-HXmFx67yPJlWxslkoUhN1jEursyZ8inSnlANirp5eJSX~qSiLvD8BEWXXRsSj~ejo0eKCQjVc79dM8pZsXyXbEwV4Uq4Yhh62vPEtIlmV~t3qsGF0AaGsQ__",
      img2: "https://s3-alpha-sig.figma.com/img/3151/f6aa/16f98b1ec4ff69051ed4080672a5fd11?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INQz8dSKELYqaG2vmFVOihKFHP7hglM5ifDEiMhd58fn2-~mN3u6ELDnxll7hfwNeyuB2ymqrQJ0ixzjWLlPH0um6iIXB2NirZBQKHEzGF9KDZFdwk~Zqm2lMddfFgL1Ar~mz2nvuET-8oaMF1XUsO-8gNZRgSaUqnr3J7gUOFw~2Y~5SWzzv4sjOCQZVvE~0xeV6KXc8691TiMMvHnFRzfkIut9LnqfaO5PX~vEYtvgIao4t-wqWcH2pHmaqKi59AF91XJDnJwz9bY~25di6JRl1uj1-Io-F9ZYwEKzHm7J~Kn1XhpqYTc2uwV-JqcAoNlZa2h2f~SWZMqDhRLVjA__",
      article: "Seeds Vendor",
      articleName: "Pumpkin Seeds",
      price: "$ 600",
    },
  ]);
  return (
    <>
      <div id="page-content" style={{ marginTop: "40PX" }}>
        <div className="Marketplace_Topbar">
          <span className="Marketplace_Logo_Name">Market</span>

          <form
            action="page_ready_search_results.html"
            className="navbar-form navbar-left"
          >
            <div className="form-group">
              <input
                type="text"
                className="navbar-form-input Marketplace_searchbar"
                placeholder="Search for your keywords.."
              />
            </div>
          </form>
        </div>
        <div className="marketplace_Wegrow">
          <div className="marketplace_Wegrow_text_Container">
            <span className="marketplace_Wegrow_Together">Together</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="marketplace_Wegrow_WeGrow">We Grow</span>{" "}
              <span className="marketplace_Wegrow_Coma">,</span>{" "}
              <span className="marketplace_Wegrow_Field">Field by Field</span>
            </div>
          </div>
        </div>
        <div className="Markitplace_Section_Name">Seed Vendors</div>
        <div className="row ">
          {product.map((product, index) => {
            return (
              <>
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <div className="widget Market_Product_Card">
                    <div className="widget-extra-full" style={{ padding: "0" }}>
                      <div
                        id={`widget-carouse${index}`}
                        className="carousel slide remove-margin "
                      >
                        <div className="carousel-inner">
                          <div
                            className="active item"
                            style={{ width: "100%" }}
                          >
                            <img
                              src={product.img}
                              alt="image"
                              className="Market_Priduct_IMG"
                            />
                          </div>
                          <div className="item">
                            <img
                              src={product.img2}
                              alt="image"
                              className="Market_Priduct_IMG"
                            />
                          </div>
                        </div>
                        {/* END Wrapper for slides */}
                        {/* Controls */}
                        <a
                          className="left carousel-control no-hover"
                          href={`#widget-carouse${index}`}
                          data-slide="prev"
                        >
                          <span>
                            <img
                              src={Left_Black}
                              className="Market_Slider_Arrow"
                            />
                          </span>
                        </a>
                        <a
                          className="right carousel-control no-hover"
                          href={`#widget-carouse${index}`}
                          data-slide="next"
                        >
                          <span>
                            <img
                              src={Right_Green}
                              className="Market_Slider_Arrow"
                            />
                          </span>
                        </a>
                        {/* END Controls */}
                      </div>
                      {/* END Carousel */}
                    </div>
                    <div
                      className="row"
                      style={{
                        display: "flex",
                        alignItems: "end",
                        padding: "10px",
                      }}
                    >
                      <div className="widget-simple Market_Product_Info col-6">
                        <div className="Market_Article_Name">
                          {product.article}
                        </div>
                        <div className="Market_Product_Name">
                          {product.articleName}
                        </div>
                        <img
                          src={Stars_green}
                          alt=""
                          style={{ height: "18.01px" }}
                        />
                      </div>
                      <div className="Market_Product_Price_Container">
                        <button className="Market_Price_BTN">
                          <span className="Market_Product_Price">
                            {product.price}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* END Active Theme Color Widget with Carousel Alternative */}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
