import React, { Component } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faInstagram, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';
import ContactBox from './ContactBox';
import { useTranslation } from 'react-i18next';

const contactBoxData = [
    {
        icon: faPhone,
        boxTitle: "Phone / Fax",
        content: "+1 (234) 567-8910"
    },
    {
        icon: faEnvelope,
        boxTitle: "Email",
        content: "hello@example.com"
    },
    {
        icon: faLocationArrow,
        boxTitle: "Location",
        content: "123 Street Name, State, 1234"
    }
]

const ContactContent = () => {
        const { t } = useTranslation();
        return (
            <section className="contact-area">
                <div className="container">
                    <div className="row">
                        {
                            contactBoxData.map((item, key) => <ContactBox
                                key={key}
                                icon={item.icon}
                                boxTitle={item.boxTitle}
                                content={item.content}
                            />)
                        }


                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="contact-text">
                                <h3>{t('contact page get in touch')}</h3>
                                <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam tempus magna vel turpis pharetra dictum.</p>
                                <p>Sed blandit tempus purus, sed sodales leo rutrum vel. Nam vulputate ipsum ac est congue, eget commodo magna lobortis.</p>

                                <ul className="social-links">
                                    <li>
                                        <Link href="#">
                                            <a>
                                                <FontAwesomeIcon icon={faFacebook} />
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>
                                                <FontAwesomeIcon icon={faTwitter} />
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>
                                                <FontAwesomeIcon icon={faInstagram} />
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>
                                                <FontAwesomeIcon icon={faLinkedin} />
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>
                                                <FontAwesomeIcon icon={faPinterest} />
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <form id="contactForm">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-lg-6 col-md-12" style={{ padding: 0, paddingRight: '16px' }}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12" style={{ padding: 0 }}>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Subject" />
                                </div>

                                <div className="form-group">
                                    <textarea name="message" className="form-control" placeholder="Your Message"></textarea>
                                </div>

                                <div className="send-btn">
                                    <button type="submit" className="send-btn-one">{t('contact page form button')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
}

export default ContactContent;