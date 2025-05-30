import Image from 'next/image'
import "../../assets/Style/index.css";
import Link from 'next/link';
import logoImg from "../../assets/images/f_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faIndustry } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
  return (
   
   <footer>

        <div className="secondFooter">
          <div className="customContainer">
            <div className="allLinks">
              <div className="row">
                <div className="col-md-4">

                  <Link href="/">
                    <Image src={logoImg} alt="Full on travel" className="siteLogo" priority />
                  </Link>
                  <div className="subscribe-box">
                    <h6>Keep travelling all year round!</h6>
                    <p>Subscribe to our newsletter to find travel inspiration in your inbox.</p>
                   
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="quickLinks">
                        <h6>Fullontravel</h6>
                        <ul>
                          <li>
                            <Link className="links" href="/careers">
                              <span>Careers</span>
                            </Link>
                          </li>
                          <li>
                            <Link className="links" href="/about-us">
                              <span>About Us</span>
                            </Link>
                          </li>
                          {/* <li>
                            <Link className="links" href="">
                              <span>FAQs</span>
                            </Link>
                          </li> */}
                          <li>
                            <Link className="links" href={"/blogs"}>
                              <span>Blogs</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="quickLinks">
                        <h6>Policies</h6>
                        <ul>
                          <li>
                            <Link className="links" href="/terms-and-conditions">
                              <span>Terms & Conditions</span>
                            </Link>
                          </li>
                          <li>
                            <Link className="links" href="/privacy-policies">
                              <span>Privacy Policies</span>
                            </Link>
                          </li>
                          <li>
                            <Link className="links" href="/cancellation-policies">
                              <span>Cancellation Policies</span>
                            </Link>
                          </li>
                          <li>
                            <Link className="links" href="/copyright-policies">
                              <span>Copyright Policies</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="quickLinks">
                        <h6>For Agents</h6>
                        <ul>
                          <li>
                            <Link className="links" href="/become-a-sales-partner">
                              <span>Become our sales partner</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="quickLinks">
                        <h6>Contact Info</h6>
                        <ul>
                          <li>
                            <Link className="links" href="mailto:info@fullontravel.com?subject=Inquiry&body=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services.">
                              <div className="icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                              <span>Email: info@fullontravel.com</span>
                            </Link>
                          </li>
                          <li>
                            <Link className="links" href="tel:+918076083704">
                              <div className="icon"><FontAwesomeIcon icon={faPhone} /></div>
                              <span>Phone: +91-8076083704</span>
                            </Link>
                          </li>
                          <li>
                            <Link className="links" href="">
                              <div className="icon"><FontAwesomeIcon icon={faIndustry} /></div>
                              <span>Address: Unit 759, 7th Floor, JMD Megapolis, Sector 48, Gurgaon</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="quickLinks">
                        <h6>Follow Us On</h6>
                        <div className="socialLinks">
                          <Link href="https://www.facebook.com/profile.php/?id=61572513106083" className="facebook"> <i className="fa-brands fa-facebook-f"></i> </Link>
                          <Link href="https://www.linkedin.com/company/105653058/admin/dashboard/" className="linkedin"> <i className="fa-brands fa-linkedin"></i> </Link>
                          <Link href="https://www.instagram.com/fullontravelstories" className="instagram"> <i className="fa-brands fa-instagram"></i> </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="desclaimer">
              <p className="">
                <span>*Caution: Beware of Fake Promotions or Offers</span>
                *Please do not believe or engage with any promotional emails, SMS or Web-link which ask you to click on a link and fill in your details. All FullOnTravel authorized email communications are delivered from domain
                <strong> info@fullontravel.com</strong>. *FullOnTravel bears no liability or responsibility whatsoever for any communication which is fraudulent or misleading in nature and not received from registered domain.
              </p>
            </div>
            <div className="termSection">
              <div className="row">
                <div className="col-12 col-md-7 col-lg-8">
                  <p className="copyRight">© 2025 - FullOnTravel. All Rights Reserved.</p>
                </div>
                <div className="col-12 col-md-5 col-lg-4">
                  <ul className="policys">
                    {/* <li><Link href="">Privacy Policy</Link></li>
                    <li><Link href="">Terms & Conditions</Link></li> */}
                    {/* <li><Link href="">Site Map</Link></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}
