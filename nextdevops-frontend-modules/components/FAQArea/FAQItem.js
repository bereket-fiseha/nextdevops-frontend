import React from 'react';
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';

const FAQItem = ({question, answer}) => {
    return (
        <AccordionItem>
        <AccordionItemHeading>
            <AccordionItemButton>
                {question}
            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
            <p>
                {answer}
            </p>
        </AccordionItemPanel>
    </AccordionItem>
    )
}

export default FAQItem
