import React, { useState } from "react";
import { Link } from "react-router-dom";
import editsuggestions from "../../assets/imgs/suggestioncarousel/editsuggestions.svg";

const You_might_like_Pages = () => {
  const [data, setData] = useState([
    {
      img:"https://s3-alpha-sig.figma.com/img/37c4/1a2c/6a7a0b8860fe72463462881dbf4de905?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=djDs17Hbe4tTt~GqH7UK4V5ZYpVQ4oL80Gd~-DDhmbu4DCwnU3gtHf~86dN7KdhK05428ZGnmwGi-zGoj9GBMgTxGBXcW31OgVVrD41WSUvJ69BVMJ5VKozkTYkGH0kOAZ50AXl71elUJaDJpio7-VBUzI68F49QLwDoBBYgTl7HpJI1qEcFQWn61AVDqWXVoaeDufcHorQFzdW4ZssSEKR33E46sho4L66RGqufMLz4W7iSy7gLEzD-raHrRIQbHMDFO1AGk53W-LPvo7gJBRBojSA6-Qae3mkrx5fKnzlxQ5uRQv5O9vm-ubg~whZrKS-tp-UAFZYgfxJaxeDEGw__",
      name:"Asif Ali"
    },
    {
      img:"https://s3-alpha-sig.figma.com/img/37c4/1a2c/6a7a0b8860fe72463462881dbf4de905?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=djDs17Hbe4tTt~GqH7UK4V5ZYpVQ4oL80Gd~-DDhmbu4DCwnU3gtHf~86dN7KdhK05428ZGnmwGi-zGoj9GBMgTxGBXcW31OgVVrD41WSUvJ69BVMJ5VKozkTYkGH0kOAZ50AXl71elUJaDJpio7-VBUzI68F49QLwDoBBYgTl7HpJI1qEcFQWn61AVDqWXVoaeDufcHorQFzdW4ZssSEKR33E46sho4L66RGqufMLz4W7iSy7gLEzD-raHrRIQbHMDFO1AGk53W-LPvo7gJBRBojSA6-Qae3mkrx5fKnzlxQ5uRQv5O9vm-ubg~whZrKS-tp-UAFZYgfxJaxeDEGw__",
      name:"Asif Ali"
    },
    {
      img:"https://s3-alpha-sig.figma.com/img/37c4/1a2c/6a7a0b8860fe72463462881dbf4de905?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=djDs17Hbe4tTt~GqH7UK4V5ZYpVQ4oL80Gd~-DDhmbu4DCwnU3gtHf~86dN7KdhK05428ZGnmwGi-zGoj9GBMgTxGBXcW31OgVVrD41WSUvJ69BVMJ5VKozkTYkGH0kOAZ50AXl71elUJaDJpio7-VBUzI68F49QLwDoBBYgTl7HpJI1qEcFQWn61AVDqWXVoaeDufcHorQFzdW4ZssSEKR33E46sho4L66RGqufMLz4W7iSy7gLEzD-raHrRIQbHMDFO1AGk53W-LPvo7gJBRBojSA6-Qae3mkrx5fKnzlxQ5uRQv5O9vm-ubg~whZrKS-tp-UAFZYgfxJaxeDEGw__",
      name:"Asif Ali"
    },
    {
      img:"https://s3-alpha-sig.figma.com/img/37c4/1a2c/6a7a0b8860fe72463462881dbf4de905?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=djDs17Hbe4tTt~GqH7UK4V5ZYpVQ4oL80Gd~-DDhmbu4DCwnU3gtHf~86dN7KdhK05428ZGnmwGi-zGoj9GBMgTxGBXcW31OgVVrD41WSUvJ69BVMJ5VKozkTYkGH0kOAZ50AXl71elUJaDJpio7-VBUzI68F49QLwDoBBYgTl7HpJI1qEcFQWn61AVDqWXVoaeDufcHorQFzdW4ZssSEKR33E46sho4L66RGqufMLz4W7iSy7gLEzD-raHrRIQbHMDFO1AGk53W-LPvo7gJBRBojSA6-Qae3mkrx5fKnzlxQ5uRQv5O9vm-ubg~whZrKS-tp-UAFZYgfxJaxeDEGw__",
      name:"Asif Ali"
    },

  ]);
  return (
    <>
      <div className="Profile_likePages_Container">
        <div className="Profile_likePages_Topbar">
          <span className="Profile_likePages_Name">
            You might like Pages for you
          </span>
          <div style={{ cursor: "pointer" }}>
            <img src={editsuggestions} alt="" />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {data.map((data, index) => {
            return (
              <>
                <div
                  className="widget position_home_left"
                  style={{
                    marginTop: "40px",
                    border: "0.97px solid var(--div_boarder, #D9DDE7)",
                    borderRadius: "19.969px",
                  }}
                >
                  <div className="widget-simple">
                    <a href="/">
                      <img
                        src={data.img}
                        alt="avatar"
                        className="widget-image img-circle pull-left position_home_left_img img_circle_border"
                      />
                    </a>
                    <h4 className="widget-content text-right">
                      <a href="/" className="">
                        <strong>{data.name}</strong>
                      </a>
                      <small>Wholesaler</small>
                    </h4>
                  </div>
                  <div className="widget-extra ">
                    <div className="row text-center">
                      <div className="col-xs-4 ">
                        <h3 className="">
                          <small>Followers</small>
                          <br />
                          <strong>10</strong>
                        </h3>
                      </div>
                      <div className="col-xs-4">
                        <h3 className="">
                          <small>Projects</small>
                          <br />
                          <strong>9</strong>
                        </h3>
                      </div>
                      <div className="col-xs-4">
                        <h3 className=" ">
                          <small>Sales</small>
                          <br />
                          <strong>15</strong>
                        </h3>
                      </div>
                    </div>
                    <div className="row text-center">
                      <div className="col-xs-6">
                        <button className="position_home_left_followbtn">
                          Follow
                        </button>
                      </div>
                      <div className="col-xs-6">
                        <button className="position_home_left_cancelbtn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className="suggestion_footer1">
          <div className="suggestion_footer">
            <Link to={`/discover-people`}>See All</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default You_might_like_Pages;
