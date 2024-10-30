import React, { useState } from "react";
import User_Blocked_Green from "../../../assets/imgs/Company Settings/User_Blocked_Green.svg";
import UnBlockModal from "./UnBlockModal";

const CompanyBlocked = () => {
  const blockedProfile = [
    {
      img: "https://s3-alpha-sig.figma.com/img/479d/a99f/0009d605e6ac6b8e537d3ccba6dfb1b3?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TTP1CPPH7oeBLIxoRUk82APMRqyZPPNF-X~GQhqz3dPN4K0irGUJHCBZnYfLMB7HGFU-cjyy9wH3YIZ3YjGJwiu1WbpYbv26FJFrZDuPBaULv0r0Pe6txZFbYubzG4wl~h68eLKD~xDnXEFbgtDYXx~qm5DdUMQTnkVw83HmDhZOCwgQEsOsgf~nxf0kVwS7MNYk3WIDWZeLv-nVG0ilzrnL6KTxmDWAlBlafK9-cbYevJ7yOXtxLAJveQBBQ50m4XvlRH~aq1FbXGFMixG-OwCRfLSsXfAy-wslz00hVA5VjhCRkSTt~D8XGFJ2HmBquCab5wdO7DkQlqyk5sT0hA__",
      title: "Farmer",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/2b43/cae2/8e933c836b2792d31030d21cf4780c59?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lztwi8hSz3rvZGGi-ejrhfjssu7Lya7I1eqAldUTrUCCa0wSujbwtvgpgJx~lhLijJf5qVGlfnpk3q6pTNmvUjDstYIBfMlVpLFIBLnBxriFju0wn8XWl9h9Jj5EtuxZjtyC7uAR~liRAuGyRIc75u9mOwQZI74W8xuTV72xPg3snbF-x7~~e1UjXxjmVhgLeHAvOqp9V6E~pogpOcWRMYzzdG7upKAPY9eq1nU28bdMdiVS4uPMFL4d8peN5nRWcEBnUIZF-3UP3E9CFAEJ-gcKayzAUI2FRInNPkGdrjFkPZo5Nbuk~8los4kCB4mekU0KrwGnRxFMMMOHuOhKuA__",
      title: "Hammad",
    },
  ];

  const blockedCompany = [
    {
      img: "https://s3-alpha-sig.figma.com/img/ab82/d4dc/6e0965d7d31ee98005f9a957ac64cf0d?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XigCcHfko54k648mErT66TIoAx6ShyPFG7WU7RXU4QEcnDAy7bkQD9QYypbWpXSKdqzoZjAfIljTRJRLzVF4zkw4TdumxiaZWAc1kxsFvl1Dg36oncb2Xm6UlVtphxzhNJbDYkCSbf8Taq-K24aSLR1cVYZrRnKAWvtaKJxbgqEJT4Qg54C~QE0ld~JShFfbpaL0wI1HiE9fNyFi1MDw3fFn8vyceDCWMjfxtv6Erg2PDomGgs4qQw39AETDu0b-pkFtXXfzsH55lT7yXDhsizJQa~Shs-4bHTbiEG6Zq3m3YSarsUQYBm6oMahSg0bpL3AvpBRsiCN50ucySHQYMQ__",
      title: "Tom Craez",
    },
    {
      img: "https://s3-alpha-sig.figma.com/img/b111/b33f/148e754300cd4f5487f00376dcd9cc60?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EVChOCl6McIfX6~K-dv~la7-k5aF5afqtG456EgWHpWm0eYCf-aaLm-z6YhhG09-vAeu5a8K02ziMW1pFt6isvA46RvCf6ILm1ef~0TBQiAk2aMCe3~5l~K407l4YuIAYy5REyOX4l4OF3arX7tQX9vDd5WnavEOqi9HMw8iiXBW81mftf2fLPo6LFqtL4aCm3fsay9hJpy3vuC995LbsVAFNjj-lrUj2i5IwZP~FE62N0e-7FcqFSrlriCBQ0eSoxXHuRsrEiQsuYcn8ajgCcy71GOYyP-9GIzBp03v9DvNCID9Wdlauf80H23BqnX27CRiz82ivv7gDqZzmsRDMg__",
      title: "Javed Imran - C.E.O",
    },
  ];
  return (
    <>
      <form className="col-lg-9">
        <div className="company_Security_name_container">
          <img src={User_Blocked_Green} alt="" />
          <span>Blocked</span>
        </div>

        <div className="company_security_Container">
          <span className="Heading">
            You can block people anytime from their profiles.
          </span>
          <div className="NO_blacked_People_coltainer">
            <span className="havent_blocked">You haven't blocked anyone</span>
          </div>

          <span className="Heading">
            You can block people anytime from their profiles.
          </span>
          <div className="NO_blacked_People_coltainer">
            <span className="havent_blocked">You haven't blocked anyone</span>
          </div>
        </div>

        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        <div
          className="company_security_Container"
          style={{ marginTop: "20px" }}
        >
          <span className="Heading">
            You can block people anytime from their profiles.
          </span>
          <div className="blacked_People_coltainer">
            {blockedProfile.map((blockedProfile, index) => {
              return (
                <>
                  <div className="follow_widget_right_modal  center_top_profile">
                    <div className="follow_widget_right_full">
                      <a
                        href="/"
                        style={{ display: "flex", alignItems: "end" }}
                      >
                        <img
                          src={blockedProfile.img}
                          alt="avatar"
                          className="follow_widget_right    img_circle_border"
                          style={{ height: "60px", width: "60px" }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <strong>{blockedProfile.title}</strong>
                          <strong className="Blocked_info">
                            {blockedProfile.title}
                          </strong>
                        </div>
                      </a>
                      <div
                        style={{ marginTop: "-4rem" }}
                        className="text-right"
                      >
                        {/* <button className="follow_btn_right Unblock">
                          <small>Unblock</small>
                        </button> */}
                        <a
                          href="#modal-terms-unblock"
                          data-toggle="modal"
                          className=" follow_btn_right Unblock"
                        >
                          <button className="follow_btn_right Unblock">
                            <small>Unblock</small>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <span className="Heading">
            You can block people anytime from their profiles.
          </span>
          <div className="blacked_People_coltainer">
            {blockedCompany.map((blockedCompany, index) => {
              return (
                <>
                  <div className="follow_widget_right_modal  center_top_profile">
                    <div className="follow_widget_right_full">
                      <a
                        href="/"
                        style={{ display: "flex", alignItems: "end" }}
                      >
                        <img
                          src={blockedCompany.img}
                          alt="avatar"
                          className="follow_widget_right    img_circle_border"
                          style={{ height: "60px", width: "60px" }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <strong>{blockedCompany.title}</strong>
                          <strong className="Blocked_info">
                            {blockedCompany.title}
                          </strong>
                        </div>
                      </a>
                      <div
                        style={{ marginTop: "-4rem" }}
                        className="text-right"
                      >
                        <a
                          href="#modal-terms-unblock"
                          data-toggle="modal"
                          className=" follow_btn_right Unblock"
                        >
                          <button className="follow_btn_right Unblock">
                            <small>Unblock</small>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </form>
      <UnBlockModal/>
    </>
  );
};

export default CompanyBlocked;
