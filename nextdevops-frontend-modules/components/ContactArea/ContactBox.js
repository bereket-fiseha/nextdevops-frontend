import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ContactBox = ({icon, boxTitle, content}) => {
    return (
        <div className="col-lg-4 col-md-12">
            <div className="contact-box">
                <div className="icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div className="content">
                    <h4>{boxTitle}</h4>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactBox
