import "../Styles/Contact.css";

function Contact() {
  return (
    <>
      <div className="hero">
        <div className="contactUs">
          <h2>Contactează-ne</h2>

          <div className="box">
            <div className="contact info">
              <h3>Adresă</h3>
              <div className="infoBox">
                <div>
                  <p>Adresa: Șoseaua Cotroceni 32, București</p>
                </div>
                <div>
                  <p>Mail: EdeniaGarden@gmail.com</p>
                </div>
                <div>
                  <p>Telefon: 0751489587</p>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="map-section">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.361204791779!2d26.060102176661445!3d44.43723240137013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201dd97d58297%3A0x301135551489fb73!2zR3LEg2RpbmEgQm90YW5pY8SDIOKAnkRpbWl0cmllIEJyw6JuZHrEg-KAnQ!5e1!3m2!1sro!2sro!4v1744142071629!5m2!1sro!2sro"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
