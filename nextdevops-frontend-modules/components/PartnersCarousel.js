import React, { Component } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '../styles/Partner.module.css';

const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: false,
    smartSpeed: 2000,
    margin: 30,
    autoplayHoverPause: true,
    autoplay: false,
    responsive: {
        0: {
            items: 2
        },
        576: {
            items: 3
        },
        768: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
}

class PartnersCarousel extends Component {

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
        return (
            <div className={styles.partner_section}>
                <div className="container">
                    {this.state.display ? <OwlCarousel 
                    className="partner-slider owl-carousel owl-theme"
                        {...options}
                    >
                        <div className="partner-item">
                            <Link href="#">
                                <a>
                                    <img src={require("../image/partnar/1.svg")} alt="partner" />
                                </a>
                            </Link>
                        </div>

                        <div className="partner-item">
                            <Link href="#">
                                <a>
                                    <img src={require("../image/partnar/2.svg")} alt="partner" />
                                </a>
                            </Link>
                        </div>

                        <div className="partner-item">
                            <Link href="#">
                                <a>
                                    <img src={require("../image/partnar/3.svg")} alt="partner" />
                                </a>
                            </Link>
                        </div>

                        <div className="partner-item">
                            <Link href="#">
                                <a>
                                    <img src={require("../image/partnar/4.svg")} alt="partner" />
                                </a>
                            </Link>
                        </div>

                        <div className="partner-item">
                            <Link href="#">
                                <a>
                                    <img src={require("../image/partnar/5.svg")} alt="partner" />
                                </a>
                            </Link>
                        </div>

                        <div className="partner-item">
                            <Link href="#">
                                <a>
                                    <img src={require("../image/partnar/3.svg")} alt="partner" />
                                </a>
                            </Link>
                        </div>
                    </OwlCarousel> : ''}
                </div>
            </div>
        );
    }
}

export default PartnersCarousel;