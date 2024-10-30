

import React from "react";

const ShowAllImgs = ({ postImages }) => {
  return (
    <>
      

      <div className="widget">
       
        <div className="widget-extra-full themed-background-light">
          {/* Carousel */}
          <div id="widget-carousel1" className="carousel slide remove-margin">
            {/* Wrapper for slides */}
            <div className="carousel-inner">
              {postImages &&
                postImages.photos &&
                postImages.photos.map((post, index) => {
                  return (
                    <div
                      className={index === 0 ? "active item" : "item"}
                      key={index}
                    >
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}/${post.url}`}
                        alt="image"
                      />
                    </div>
                  );
                })}
            </div>
            <a
              className="left carousel-control"
              href="#widget-carousel1"
              data-slide="prev"
            >
              <span>
                <i className="fa fa-chevron-left" />
              </span>
            </a>
            <a
              className="right carousel-control"
              href="#widget-carousel1"
              data-slide="next"
            >
              <span>
                <i className="fa fa-chevron-right" />
              </span>
            </a>
            {/* END Controls */}
          </div>
          {/* END Carousel */}
        </div>
      </div>
    </>
  );
};

export default ShowAllImgs;
