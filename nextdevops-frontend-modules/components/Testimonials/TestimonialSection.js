import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));
import { withTranslation } from 'react-i18next';

const options = {
    loop: true,
    nav: false,
    dots: true,
    smartSpeed: 2000,
    margin: 30,
    autoplayHoverPause: true,
    autoplay: true,
    responsive: {
        0: {
            items: 1
        },
        576: {
            items: 1
        },
        768: {
            items: 2
        },
        1200: {
            items: 2
        }
    }
}

class TestimonialSection extends Component {

    _isMounted = false;
    state = {
        display:false
    }
    componentDidMount(){ 
        this._isMounted = true;
        this.setState({ display: true }) 
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { t } = this.props;
        return (
            <section className="testimonial-section ptb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="testimonial-content-area">
                                <h3>{t("clients said")}</h3>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            {this.state.display ? <OwlCarousel 
                            className="testimonial-slides owl-carousel owl-theme"
                                {...options}
                            >
                                <div className="testimonial-single-item">
                                    <div className="testimonial-image">
                                        <img src={require("../../image/team/1.jpg")} alt="image" />
                                    </div>
                                    <div className="testimonial-content-text">
                                        <h3>R.Mortein</h3>
                                        <span>{t("Product Manager")}</span>
                                        <div className="icon">
                                            <i className="flaticon-quote"></i>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse  gravida.</p>
                                    </div>
                                </div>

                                <div className="testimonial-single-item">
                                    <div className="testimonial-image">
                                        <img src={require("../../image/team/2.jpg")} alt="image" />
                                    </div>
                                    <div className="testimonial-content-text">
                                        <h3>Edward Bold</h3>
                                        <span>{t("ceo & founder")}</span>
                                        <div className="icon">
                                            <i className="flaticon-quote"></i>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse  gravida.</p>
                                    </div>
                                </div> 

                                <div className="testimonial-single-item">
                                    <div className="testimonial-image">
                                        <img src={require("../../image/team/3.jpg")} alt="image" />
                                    </div>
                                    <div className="testimonial-content-text">
                                        <h3>Mahindra jhon</h3>
                                        <span>{t("Ceo & Sustainable designer")}</span>
                                        <div className="icon">
                                            <i className="flaticon-quote"></i>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse  gravida.</p>
                                    </div>
                                </div> 

                                <div className="testimonial-single-item">
                                    <div className="testimonial-image">
                                        <img src={require("../../image/team/2.jpg")} alt="image" />
                                    </div>
                                    <div className="testimonial-content-text">
                                        <h3>Lee Munroe</h3>
                                        <span>{t("Underwriter")}</span>
                                        <div className="icon">
                                            <i className="flaticon-quote"></i>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse  gravida.</p>
                                    </div>
                                </div>

                                <div className="testimonial-single-item">
                                    <div className="testimonial-image">
                                        <img src={require("../../image/team/3.jpg")} alt="image" />
                                    </div>
                                    <div className="testimonial-content-text">
                                        <h3>Meg Lanning</h3>
                                        <span>{t("Agent Manager")}</span>
                                        <div className="icon">
                                            <i className="flaticon-quote"></i>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse  gravida.</p>
                                    </div>
                                </div>
                            </OwlCarousel> : ''}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withTranslation()(TestimonialSection);