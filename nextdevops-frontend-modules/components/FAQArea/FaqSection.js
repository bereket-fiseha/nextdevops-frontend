import React from 'react';
import { Accordion } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import FAQItem from './FAQItem';
import { useTranslation } from 'react-i18next';


const QnA = [
    {
        Question: 'What harsh truths do you prefer to ignore?',
        Answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
    },
    {
        Question: 'Is free will real or just an illusion?',
        Answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
    },
    {
        Question: 'Does the price go up as my team gets larger?',
        Answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
    },
    {
        Question: 'How long does it take for equipment to be delivered?',
        Answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
    },
    {
        Question: 'I’m a developer, how do I become a Glass Partner?',
        Answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.'
    }
]

const FaqSection = () => {
    const { t } = useTranslation();

    return (
        <section className="faq-section">
            <div className="container">

                <div className="faq-area-content">
                    <h3>{t('faq page title')}</h3>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="faq-accordion">
                            <Accordion>
                                {
                                    QnA.map((item, key) => (
                                        <FAQItem key={key} question={item.Question} answer={item.Answer} />
                                    ))
                                }
                            </Accordion>
                        </div>
                    </div>

                    <div className="col-lg-6 d-none d-md-block d-lg-block d-xl-block">
                        <div className="faq-image">
                            <img src={require("../../image/faq-image.png")} alt="image" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default FaqSection;