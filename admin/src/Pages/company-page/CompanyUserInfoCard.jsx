import React from "react";
import sendGreen from "../../assets/imgs/post/sendpost/sendgreen.svg";

const CompanyUserInfoCard = () => {
  return (
    <div class="widget Profile_User_Info_Card">
              <div class="widget-advanced">
                {/* <!-- Widget Header --> */}
                <div
                  className="widget-header text-center"
                  style={{ padding: "0%" }}
                >
                  {/* Background IMG */}
                  <div
                    className="Profile_User_Back_IMG"
                    style={{
                      backgroundImage: `url('https://s3-alpha-sig.figma.com/img/43e0/a5ac/00f41369f0b1febfc8ea515d374a983b?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d1ag3UAabbQDgk9K8H2qPa3eHRQm-lD~orQR71e9Sk25EnWVgjF3jwb2cPL18Z4xmBthjgfafFATug4f7gPE6lkFbpMj3eqnhvI~1jWF97oopOzImQLC6l616QEaw7FM~n1qz2gna1kKb6BEBuoLPdwroR7Yu3m1i-~TB5cv1Q55Vnple7PCDMKqOW5aknyJ501szdW~FaC~2my2uZvujGax6upeUycnB5AIbK4BpE~ogJ0NduCPIMPJM5Tz2CNkLRmdezbEyOQ2xHkYDy469~vgRHUNuVpvxZOaF814RZCSCYfykI9d4wpkX1lCFtWETHCYmrHooA~NXXyjPQRo3Q__')`,
                    }}
                  ></div>
                </div>
                {/* Background IMG End */}
                {/* <!-- END Widget Header --> */}

                {/* <!-- Widget Main --> */}
                <div class="widget-main User_info">
                  <a
                    href="page_ready_user_profile.html"
                    class="widget-image-container animation-hatch pull-left position_home_left_img img_circle_border User_Prifile_img Profile_user_img_Container"
                  >
                    <img
                      // img/placeholders/avatars/avatar2.jpg
                      src="https://s3-alpha-sig.figma.com/img/0d23/5692/e735a28fd34c9306c227064033c1b8fc?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GtxB7JF7yhfuvMOFrlg4Bq4PQCqaMT-a7JQShvzJX5qnFeFr1qa0y8YMSaikCh5380BYWsW5SWUX8EuTgHzpDDXtmMPWwhCs4pMXP5TXc0gOia4tiK8TTlBdRwymeLON960QCBabvH5AXv-OPDSeMV66mRzzSRbZ6G0TNc8uRmUhqLZ9kSlip4aN8ZK8DHMI8AOcSFoIBEm2AwOnbUZmRZnh2VWOWSbHEmvWl0Mw0HkM6k3EvFG-O2M3ZzhEvLCyI7ZX0gm3bTX3by3dxe5LYd0OMZJ2FsnaG6z2DEwaT~MiJp~9Tjm8117-bj5Xi5GM42SHpniKfCdisHqr75UbXw__"
                      alt="avatar"
                      class="widget-image img-circle Profile_User_Img"
                    />
                  </a>

                  <div className="User_Contant">
                    <div className="User_Profile_Name_Section">
                      <div>
                        <span className="User_Profile_Name">
                          Muhammad Tauheed
                        </span>
                      </div>
                      <span>
                        <img src={sendGreen} /> Lahore District, Punjab,
                        Pakistan
                      </span>
                    </div>
                    <p className="Normal_Text">
                      Farmer, Seed Vendor, Transport Vendors{" "}
                    </p>

                    <p
                      className="Normal_Text"
                      style={{ wordWrap: "break-word" }}
                    >
                      As a Farmer, 80+ projects in agricultural field, I am
                      eager to leverage my skills and expertise in agricultural
                      world.
                    </p>

                    <div className="Profile_Contact_BTN">
                      <button className="Profile_Contact_Info">
                        Message
                      </button>
                      <button className="Profile_Followers_Info">
                        1,043 Followers
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- END Widget Main --> */}
              </div>
            </div>
  )
}

export default CompanyUserInfoCard