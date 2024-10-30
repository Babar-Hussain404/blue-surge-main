const ContactMap = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        position: "relative",
        marginTop: "60px",
      }}
    >
      <address>Blue Surge (Pvt) Ltd</address>
      <div style={{ width: "100%", height: "100%" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13309.25301428919!2d73.0811354!3d33.4932262!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df8d0a32f64e2b%3A0x685b5c29b590b540!2sBlue%20Surge%20(Pvt)%20Ltd!5e0!3m2!1sen!2s!4v1713522355587!5m2!1sen!2s"
          style={{
            border: "0",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
          }}
          width="600"
          height="450"
          allowFullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
