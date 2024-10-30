import React from "react";

const Footer = () => {
  return (
    <footer className="clearfix">
      <div className="pull-right">
        Developed <i className="fa fa-heart text-danger" /> by{" "}
        <a href="https://infinityloops.site" target="_blank">
          Infinity Loop
        </a>
      </div>
      <div className="pull-left">
        <span id="year-copy" /> ©{" "}
        <a href="https://bluesurge.com.pk/" target="_blank">
          Blue Surge
        </a>
      </div>
    </footer>
  );
};

export default Footer;
