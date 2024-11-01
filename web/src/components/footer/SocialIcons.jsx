import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import facebook from "../../assets/icons/facebook.png";
import insta from "../../assets/icons/insta.png";
import linkedin from "../../assets/icons/linkedin.png";
import utube from "../../assets/icons/utube.png";
import { mailData } from '../../redux/action';
const SocialIcons = () => {
  const dipatch =useDispatch()
  const[socialLinks,setSocilaLinks] = useState({})
  const[socialLoading,setSocilaLoading] = useState(true)
      const getProductsData = async (page) => {
        setSocilaLoading(true)
      try {
        const response = await axios.get(`https://web.bluesurge.com.pk/icons`);
        setSocilaLinks(response.data.icons);
        dipatch(mailData(response.data.icons.mail))
        setSocilaLoading(false)
      } catch (error) {
        console.log("Error fetching:", error);
        setSocilaLoading(false)
      }
    };
    useEffect(() => {
      if(socialLoading)
        getProductsData();
      
    }, [socialLoading]);
  return (
    <>
    {socialLinks.fackbook && (
       <a
        href={socialLinks.fackbook || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="icons_footer_cls icons_footer_cls_facebook"
      >
        <img src={facebook} alt="Facebook" />
      </a>)}
      {socialLinks.linkedIn && (
      <a
        href={socialLinks.linkedIn || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="icons_footer_cls icons_footer_cls_linkedin"
      >
        <img src={linkedin} alt="LinkedIn" />
      </a>)}
      {socialLinks.youtube && (
      <a
        href={socialLinks.youtube || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="icons_footer_cls icons_footer_cls_youtube"
      >
        <img src={utube} alt="YouTube" />
      </a>)}
      {socialLinks.twitter && (
      <a
        href={socialLinks.twitter || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="icons_footer_cls icons_footer_cls_instagram"
      >
        <img src={insta} alt="twitter" />
      </a>)}
      {socialLinks.instagram && (
      <a
        href={socialLinks.instagram || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className=" fs-1 text-light"
      >
        <i className='fa fa-instagram'></i>
      </a>)}
    </>
  );
};

export default SocialIcons;
