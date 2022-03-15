import React from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import SingleSeviceCard from './SingleSeviceCard';


const bgColors = ["faddd4", "cafbf1", "ddd5fb", "fcdeee", "c5ebf9", "f8fbd5"];

const Services = ({ ServiceSectionName, ServiceTitle}) => {
    return (
        <section className="services-section pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span>{ServiceSectionName}</span>
                    <h3>{ServiceTitle}</h3>
                </div>

                <div className="row">

                    {bgColors.map((item, key) => (
                        <SingleSeviceCard key={key} bgColor={item} icon={faHeart} />
                    ))
                    }

                </div>
            </div>
        </section>
    );
}

export default Services;