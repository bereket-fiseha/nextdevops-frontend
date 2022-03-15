import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Card, Modal, Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useModalStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "100%",
    maxWidth: 916,
    height: "100%",
    maxHeight: 500,
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    ["@media (max-width:780px)"]: {
      maxWidth: "450px",
    },
  },
  modalHeading: {
    background: "#87dd62",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    fontSize: 30,
  },
  modalContent: {
    padding: "25px",
    ["@media (max-width:780px)"]: {
      fontSize: "12px",
    },
  },
}));

const TermsConditions = ({
  isOpen = true,
  onClose = () => {},
  accept = () => { },
  carrierName = "",
}) => {
  const { t } = useTranslation();
  const classes = useModalStyles();
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        style={getModalStyle()}
        className={classes.paper}
        component={Card}
        borderRadius={2}
        variant="outlined"
      >
        <Box className={classes.modalHeading} height={70} component="div">
          {t("bill lading")}
        </Box>
        <Box className={classes.modalContent}>
          <p id="simple-modal-description">
            B/L {carrierName} RECEIVED by the Carrier in apparent
            good order and condition (unless otherwise stated herein) the total
            number or quantity of Containers or other packages or units
            indicated in the box entitled "Carrier's Receipt", to be carried
            subject to all the terms and conditions hereof from the Place of
            Receipt or Port of Loading to the Port of Discharge or Place of
            Delivery, as applicable.  Delivery of the Goods to the Carrier for
            Carriage hereunder constitutes acceptance by the Merchant (as
            defined hereinafter) <br/>(i) of all the terms and conditions, whether
            printed, stamped or otherwise incorporated on this side and on the
            reverse side of this Bill of lading and the terms and conditions of
            the Carrier's applicable tariff(s) as if they were all signed by the
            Merchant, and <br/>(ii) that any prior representations and/or agreements
            for or in connection with Carriage of the Goods are superseded by
            this Bill of Lading.  If this is a negotiable (To Order/of) Bill of
            Lading, one original Bill of Lading, duly endorsed must be
            surrendered by the Merchant to the Carrier (together with any
            outstanding Freight) in exchange for the Goods or a Delivery Order
            or the pin codes for any applicable Electronic Release System. <br/> If
            this is a non-negotiable (straight) Bill of Lading, or where issued
            as a Sea Waybill, the Carrier shall deliver the Goods or issue a
            Delivery Order or the pin codes for any applicable Electronic
            Release System (after payment of outstanding Freight) to the named
            consignee against the surrender of one original Bill of Lading, or
            in the case of a Sea Waybill, on production of such reasonable proof
            of identify as may be required by the Carrier, or in accordance with
            the national law at the Port of Discharge or Place of Delivery as
            applicable.  IN WITNESS WHEREOF the Carrier or their Agent has
            signed the number of Bills of Lading stated at the top, all of this
            tenor and date, and whenever one original Bill of Lading has been
            surrendered all other Bills of Lading shall be void. <br />
            1. Definitions and Tariff <br/>1.1 Definitions
            "Bill" means this document, whether issued as a Bill of Lading or a
            Sea Waybill, and whether issued in paper or electronic form;
            "Carriage" means the whole or any part of the operations and
            services whatsoever undertaken by the Carrier in respect of the
            Goods covered under this Bill; <br />"Carrier" means Ocean Network Express
            Pte Ltd on whose behalf this Bill has been signed; "Container"
            includes any container (including an open top container), trailer,
            transportable tank, flat rack or pallet or any similar article used
            to consolidate Goods and any ancillary equipment; "Freight" includes
            all charges payable to the Carrier in accordance with the applicable
            Tariff(s) and this Bill, including storage, demurrage and detention;
            <br />"Goods" means the whole or any part of the cargo and any packaging
            received from the Shipper and includes any equipment or Container
            not supplied by or on behalf of the Carrier; "Hague Rules" means the
            provisions of the International Convention for the Unification of
            Certain Rules relating to Bills of Lading signed at Brussels on 25th
            August, 1924 and includes the amendments by the Protocols signed at
            Brussels in 1968, and 1979, but only if such amendments (hereinafter
            collectively called "the Visby Amendments") are compulsorily
            applicable to this Bill and nothing in this Bill shall be construed
            as contractually applying the Visby Amendments; <br />"Holder" means any
            person for the time being in possession of or entitled to this Bill
            by reason of the consignment of Goods or the endorsement of this
            Bill or otherwise; "Merchant" includes the Shipper, Consignee,
            owner, Person owning or entitled to possession of the Goods or of
            this Bill, Receiver, Holder, and anyone acting on behalf of any such
            person, including but not limited to agents, servants, independent
            contractors, non-vessel operating common carriers ("NVOCCs"), and
            freight forwarders; <br />"Person" includes an individual, group, company
            or other entity; "Place of Delivery" means a place so named overleaf
            or any other place where the Carrier has contracted to deliver the
            Goods when such place is other than the Port of Discharge; “Place of
            Receipt” means a place so named overleaf or any other place where
            the Carrier has contracted to receive the Goods, when such place is
            other than the Port of Loading; <br />"Port of Loading" means a port or
            place so named overleaf or any other port or place where the Goods
            are loaded onto the Vessel for Carriage; "Port of Discharge" means a
            port or place so named overleaf or any other port or place where the
            Goods are discharged from the Vessel; <br />"Sub-Contractor" includes
            owners, charterers and operators of the Vessel or any other vessel
            (other than the Carrier), sea, water, rail, road, air or other
            transport operators or carriers, stevedores, terminal operators,
            warehousemen, and any independent contractors or agents employed by
            the Carrier in performance of the Carriage and any subcontractor
            thereof; <br />"US COGSA" means the United States Carriage of Goods by Sea
            Act, 1936; "Vessel" includes the vessel named on the face hereof,
            and any vessel, lighter, barge, ship, watercraft or any other means
            of water transport used in whole or in part for Carriage of Goods
            under this Bill; <br />"Verified Gross Mass" means the combined mass of a
            Container's tare mass and the masses of all packages and cargo items
            including but not limited to pallets, dunnage, other packing
            material and securing materials packed in the Container and verified
            by one of the methods of weighing specified in SOLAS Chapter VI
            Regulation <br />2. "Waterborne Carriage" means carriage by sea or water,
            and includes the period during which the Goods are under the custody
            of the Carrier for the Carriage at the sea/water terminal of the
            Port of Loading or the Port of Discharge, whether or not on board
            the Vessel. <br />1.2 Carrier's Tariff The terms of the
            Carrier's applicable Tariff(s) ("Tariff") are incorporated herein.
            The Merchant's attention is drawn to clause 6 hereof. Copies of the
            relevant provisions of the Tariff(s) are obtainable from the Carrier
            upon request. In the case of inconsistency between this Bill and any
            applicable Tariff, this Bill shall prevail. <br />2. Terms
            and Conditions <br />2.1 The terms and conditions provided
            for in this Bill shall apply in any action by or against the Carrier
            for any loss or damage whatsoever and howsoever occurring (and
            without restricting the generality of the foregoing, including
            delay, late delivery and/or delivery without surrender of this
            Bill), whether the action be founded in contract, bailment or in
            tort. <br />2.2 The terms and conditions of this Bill are
            separable, and if any term or condition is held to be invalid, null
            and void, or unenforceable, that shall not affect in any way the
            validity or enforceability of any other term or condition of this
            Bill. <br />2.3 The terms and conditions of this Bill shall
            govern the relations between the Carrier and the Merchant in respect
            of the Carriage, whether a Bill of Lading is issued or not. <br />
            2.4 If this Bill is accepted by a NVOCC, who has in turn
            made other contracts of carriage with third parties, the said NVOCC
            hereby: (a) undertakes that no claim or allegation in
            respect of the Goods shall be made against the Carrier by any
            Person, other than in accordance with the terms and conditions
            hereof, which imposes or attempts to impose upon the Carrier or any
            vessel, owned or operated by the Carrier or employed in the
            Carriage, any liability whatsoever in connection with the Goods,
            whether or not arising out of negligence on the part of the Carrier,
            and if any such claim or allegation should nevertheless be made, to
            indemnify the Carrier against all consequences thereof (including
            legal fees, expert fees and disbursements), and (b) warrants that all bills of lading or other documents
            recording the contracts of carriage issued by him in respect of the
            Goods shall effectively incorporate and bind his counterparties to
            the terms of this Bill including the law and jurisdiction clause,
            and agrees to defend, hold harmless and indemnify the Carrier, his
            servants, agents and Subcontractors against all consequences of his
            failing to do so. <br />2.5 In no event shall the Carrier be
            liable for any direct or indirect loss of  profit or any
            consequential loss whatsoever. <br />2.6 Where loss or
            damage is caused partly by a cause for which the Carrier is liable,
            the Carrier shall be liable only for the portion of the loss or
            damage proved by the Merchant to have resulted from the cause for
            which the Carrier is liable. The Merchant shall indemnify the
            Carrier (including legal and expert fees and disbursements) when the
            Carrier pays damages in excess of its share of fault. <br />
            2.7 The Carrier does not undertake that the Goods shall
            arrive at the Port of Discharge or Place of Delivery on/at any
            particular date or time or to meet any particular market or use, and
            the Carrier shall in no circumstances be liable for delay or for any
            indirect or special or consequential loss or damage whatsoever
            incurred by the Merchant. <br />3. Carrier's Responsibility 
            <br />3.1 The Carrier shall not be responsible for loss or damage to the Goods occurring before the
            receipt of the Goods by the Carrier or after the delivery of the
            Goods to the Merchant or its designee. The Carrier shall be liable
            for loss or damage to the Goods occurring between the time when he
            receives the Goods and the time of delivery only to the extent set
            out below. <br />3.2 Except for the shipment of Goods to,
            from or through the United States, including its districts,
            territories and possessions, which shall be governed by Clause 26
            below, if the stage of the Carriage during which the loss or damage
            occurred can be proved, the liability of the Carrier shall be
            determined: (a) if the loss or damage is proved to
            have occurred during the Waterborne Carriage, by the Hague Rules,
            Articles 1-8 inclusive, but excluding Article 1(e), (b) 
            where the loss or damage is proved not to have
            occurred during the Waterborne Carriage, by the provisions contained
            in any international convention or national law which provisions,
            (i) cannot be departed from by private contract to
            the detriment of the Merchant; and (ii) would have
            applied if the Merchant had made a separate and direct contract with
            the Carrier in respect of the stage of the Carriage during which the
            loss or damage occurred and had received as evidence thereof any
            document which must be issued in order to make such international
            convention or national law applicable; and (iii) would
            have been applicable if the contract referred to in (ii) above had
            been governed by the internal law of the State where the loss or
            damage occurred. <br />3.3 Except for the shipment of Goods
            to, from or through the United States, including its districts,
            territories and possessions, which shall be governed by Clause 26
            below, if neither Clause <br />3.2(a) or 3.2(b) above applies, or if the
            stage of the Carriage during which the loss or damage occurred
            cannot be determined, the Carrier shall be relieved of liability for
            any loss or damage if such loss or damage was caused by: (i)
            act of God, (ii) act of War, (iii) act of public enemies, (iv) arrest or
            restraint of princes, rulers or people or seizure under legal
            process, (v) quarantine restrictions, (vi) an act or omission of the Merchant, his agent,
            representative or sub-contractor, (vii) compliance with
            instructions of any Person entitled to give them, (viii)
            insufficiency of or defective condition of packing or
            marking, (ix) handling, loading, stowage or unloading
            of the Goods by or on behalf of the Merchant, (x)
            inherent vice of the Goods, (xi) latent
            defects not discoverable by due diligence, (xii) fire,
            unless caused by the actual fault or privity of the Carrier, (xiii)
            strike, lock-out, stoppage or restraint of labour, from
            whatever cause, whether partial or general, (xiv) riots and
            civil commotions, (xv) any cause or event which the
            Carrier could not avoid and the consequences whereof he could not
            prevent by the exercise of reasonable diligence. <br />
            3.4 The burden of proving prima facie that the loss or
            damage was due to one or more of the causes or events specified in
            Clause 3.3 shall rest upon the Carrier, save that if the Carrier
            establishes that the loss or damage could be attributed to one or
            more of the causes or events specified in Clause 3.3 other than
            (vi), (vii), (viii), (ix), (x) or (xv), it shall be presumed that it
            was so caused. The Merchant shall, however, be entitled to prove
            that the loss or damage was not, in fact, caused either wholly or
            partly by one or more of these causes or events. <br />
            3.5 If the Carrier is requested by the Merchant to procure
            carriage by an inland carrier beyond the Place of Delivery (or the
            Port of Discharge if no Place of Delivery is named) such carriage
            shall be procured by the Carrier as agent only to the Merchant and
            the Carrier shall have no liability whatsoever for such carriage or
            the acts or omissions of such inland carrier. <br />
            3.6 Where this Bill is issued as a Sea Waybill, this Bill
            shall have effect subject to the CMI Uniform Rules for Sea Waybills
            which are deemed to be incorporated herein; provided, however that
            if any provisions of such Rules are inconsistent with those of this
            Bill, the latter shall prevail. <br />4. Limitation of Liability <br />
            4.1 Nothing in this Bill shall operate to
            limit or deprive the Carrier of any statutory protection or
            exemption or limitation of liability authorized by any applicable
            laws, statutes or regulations of any country. <br />
            4.2 It is agreed by the Merchant that the Carrier qualifies and shall be
            regarded as a person entitled to limit liability under any
            applicable convention for the Limitation of Liability for Maritime
            Claims notwithstanding that the Carrier may have secured space on
            board the relevant vessel by means of a slot charter, bill of
            lading, waybill or other contract of carriage.  Subject to any law
            compulsorily applicable to the Carriage to the contrary, and save to
            that extent, the fund to which the Carrier may limit its liability
            in respect of all claims arising out of an incident shall be that
            part or proportion of the limitation fund applicable to the actual
            carrier that is available for the Carrier's claims against the
            actual carrier. <br />4.3 If the Hague Rules are applicable
            by national law, the liability of the Carrier shall in no event
            exceed the limit provided in the applicable national law. If the
            Hague Rules are applicable otherwise than by national law, the
            liability of the Carrier shall in no event exceed 100 pounds
            sterling per package or unit. <br />
            4.4 Except as provided in Clauses 3.2(a), 3.2(b) and 27, if Clause 3.3 operates, total
            compensation shall in no circumstances exceed 2 SDRs per kilo of
            gross weight of the Goods lost or damaged (SDR means Special Drawing
            Right as defined by the International Monetary Fund). 
            <br />4.5 The Merchant agrees and acknowledges that the Carrier
            has no knowledge of the value of the Goods and higher compensation
            than that provided for in this Bill may be claimed only when, with
            the consent of the Carrier, (i) for multimodal shipments to or from
            the U.S. where U.S. inland carriage is undertaken, the Merchant
            elects to avoid any liability limitation provided herein by
            prepaying extra freight and opting for full liability by complying
            with the terms in the Carrier's Tariff(s); and (ii) in all other
            cases, the Shipper declares the value of the Goods and requests that
            the Carrier insert the declared value of the Goods in the box marked
            "Declared Value" on the reverse of this Bill, and for which extra
            freight has been paid by the Merchant.  In that case, the amount of
            the declared value shall be substituted for the limits laid down in
            this Bill.  Any partial loss or damage shall be adjusted pro rata
            based on such declared value. <br />
            5. Sub-Contracting <br />
            5.1 The Carrier shall be entitled to subcontract the whole
            or any part of the Carriage on any terms whatsoever, including
            liberty to further sub-contract. <br />
            5.2 The Merchant undertakes that no claim or allegation shall be made against any
            Person who performs or undertakes the Carriage (including all Sub
            Contractors) other than the Carrier, which imposes or attempts to
            impose upon such Person, or any vessel owned by such Person, any
            liability whatsoever in connection with the Goods or the Carriage,
            whether or not arising out of negligence on the part of such Person
            and, if any such claim or allegation should nevertheless be made, to
            indemnify the Carrier against all consequences thereof. <br />
            5.3 Without prejudice to Clause 5.2 such Person (including
            any Subcontractor) shall have the benefit of every right, exemption
            from liability, defence and immunity of whatsoever nature applicable
            to the Carrier or to which the Carrier is entitled herein including
            but not limited to the right to enforce  Clause 25 hereof, as if
            such provisions were expressly for his benefit. In entering into
            this contract, the Carrier, to the extent of these provisions, does
            so not only on his own behalf but also as agent and trustee for such
            Person. <br />
            5.4 The provisions of Clause 5.2, including
            but not limited to the undertakings of the Merchant contained
            therein, shall extend to claims or allegations of whatsoever nature
            against other Persons chartering space on the Vessel. <br />
            5.5 The Merchant further undertakes that no claim or
            allegation in respect of the Goods shall be made against the Carrier
            by any Person, other than in accordance with the terms and
            conditions of this Bill, which imposes or attempts to impose upon
            the Carrier any liability whatsoever in connection with the Goods or
            the Carriage, whether or not arising out of negligence on the part
            of the Carrier and, should any such claim or allegation nevertheless
            be made, to indemnify the Carrier against all consequences thereof.
            <br />6. Freight <br />6.1 Freight shall be deemed
            fully earned on receipt of the Goods by the Carrier, whether the
            Goods are lost or not, and shall be paid and non-returnable in any
            event. <br />6.2 The Merchant acknowledges and accepts the
            stipulations concerning currency in which the Freight is to be paid,
            rate of exchange, devaluation and other contingencies relative to
            Freight in the applicable Tariff(s). <br />6.3 Freight has
            been calculated based on particulars furnished by or on behalf of
            the Merchant. If such particulars are incorrect, it is agreed that a
            sum equal to double the correct Freight less the Freight charged
            shall be payable as liquidated damages to the Carrier, provided that
            the Carrier's Tariff(s) does not stipulate otherwise. The Merchant
            shall indemnify the Carrier for all penalties and legal fees
            resulting from such incorrect particulars being furnished. <br />
            6.4 All Freight shall be paid to the Carrier by the
            Merchant in cash without any set-off, counter-claim, deduction or
            pardon either at or prior to the time agreed for payment or at the
            latest before delivery of the Goods. <br />6.5 The Merchant
            shall be liable to the Carrier for the payment of all Freight and/or
            expenses including but not limited to court costs, legal fees and
            expenses incurred in collecting monies due to the Carrier. Payment
            of the Freight to a freight forwarder, broker or anyone other than
            the Carrier or its authorized agent shall not be deemed payment to
            the Carrier and shall be made at the Merchant's sole risk. <br />
            7. Lien <br />7.1 The Carrier shall have a lien
            on the Goods and any documents relating thereto, which shall survive
            delivery, for all sums payable to the Carrier under this contract
            and for general average contributions, to whomsoever due. The
            Carrier shall also have a lien against the Merchant on the Goods and
            any documents relating thereto for all sums due from the Merchant to
            the Carrier under any other contract. For recovering any sums due,
            the Carrier shall have the right to sell the Goods by public auction
            or private sale, without notice to the Merchant and the Carrier’s
            lien shall extend to cover the cost of recovering any sums due. <br />
            8. Description of Goods <br />8.1 This Bill
            shall be prima facie evidence of the receipt by the Carrier in
            apparent external good order and condition, (except as otherwise
            noted), of the total number of Containers or other packages or units
            enumerated in the box entitled "Carrier's Receipt". <br />
            8.2 No representation is made by the Carrier as to the
            weight, contents, measure, quantity, quality, description,
            condition, marks, numbers or value of the Goods and the Carrier
            shall be under no responsibility whatsoever in respect of such
            description or particulars. <br />8.3 The Merchant warrants
            to the Carrier that the particulars relating to the Goods as set out
            overleaf have been checked by the Merchant on receipt of this Bill
            and that such particulars and any other particulars furnished by or
            on behalf of the Shipper including but not limited to the
            Container’s Verified Gross Mass (“VGM”) are accurate and correct.
            The Merchant also warrants that the Goods are lawful goods and
            contain no contraband, drugs or other illegal substances or
            stowaways, and that the Goods are adequately packed and prepared for
            shipment, and will not cause loss, damage, or expenses to the
            Carrier, the Vessel, or to any other cargo during the Carriage. <br />
            8.4 If any particulars of any Letter of Credit and/or
            Import Licence and/or Sale Contract and/or Invoice or Order Number
            and/or details of any contract to which the Carrier is not a party
            are shown on the face of this Bill, and/or if any particulars are
            inserted in the "Export Reference" and "Final Destination" boxes,
            such particulars are included solely at the request of the Merchant
            for his convenience and reference only. The Merchant acknowledges
            that except when the provisions of Clause 4.5(ii) apply, the value
            of the Goods is unknown to the Carrier, and that the inclusion of
            such particulars shall not be regarded as a declaration of value and
            in no way increase the Carrier's liability under this Bill. The
            Merchant further agrees to indemnify the Carrier against all
            consequences whatsoever of including such particulars in this Bill.
            <br />9. Container Packed by Merchant <br />9.1 If
            the Goods received by the Carrier are in Container(s) packed by or
            on behalf of the Merchant: (a) this Bill is prima
            facie evidence of the receipt only of the number of Container(s) as
            shown herein; and (b) the Merchant warrants that the
            stowage of the Goods in Container(s) and their closing and sealing
            are safe and proper and that the Goods and the Container(s) are
            suitable for Carriage in accordance with the terms hereof including
            Clause 14 and the Carrier’s Tariff(s). For Containers being
            transported by inland rail in the U.S., the Merchant shall properly
            load, block and brace the Goods in accordance with the Association
            of American Railroad (“AAR”) Intermodal Loading Guide for Products
            in Closed Trailers and Containers and notify and require all parties
            involved in the loading of the Goods in the Container(s) to comply
            with these requirements. The AAR Intermodal Loading Guide can be
            obtained from the Carrier or the AAR (https://www.aar.org). In the
            event of the Merchant's breach of said warranties, the Carrier shall
            not be responsible for any loss of or damage to or in connection
            with the Goods or the Carriage resulting from said breach and the
            Merchant shall be liable for loss of or damage to any other
            property, or for personal injury or death or the consequences of any
            other accidents or events whatsoever and shall indemnify the Carrier
            in respect thereof; and (c) the Merchant shall
            inspect the Container(s) when furnished by or on behalf of the
            Carrier, and they shall be deemed to have been accepted by the
            Merchant as being in sound and suitable condition for the Carriage,
            unless he gives notice to the contrary in writing to the Carrier;
            and (d) if the Container(s) are delivered by the
            Carrier with seals intact, such delivery shall be deemed as full and
            complete performance of the Carrier's obligation and the Carrier
            shall not be liable for any loss of or damage to the contents of the
            Container(s). <br />10. Inspection of Goods <br />10.1 The
            Carrier shall be entitled, but under no obligation, to open and/or
            scan any Container or package at any time and to inspect, re-weigh,
            remeasure, revalue or repack the Goods without notice to the
            Merchant. <br />10.2 If pursuant to any of the Carrier’s rights
            under this Bill or if by order of the authorities at any place, a
            Container or package has to be opened and/or seal of a Container
            broken, the Carrier will not be liable for any loss or damage
            incurred as a result of any opening, unpacking, inspection,
            re-weighing, re-measurement, revaluation, or repacking. The Merchant
            shall indemnify the Carrier for the cost of all measures taken as
            above. <br />11. Specialized Carriage <br />11.1 The
            Merchant undertakes not to tender for Carriage any Goods which
            require refrigeration, ventilation or any other special attention
            without giving prior written notice of their nature and temperature
            range to be maintained and/or special attention required. In the
            case of refrigerated, ventilated or any other specialized Container
            packed by or on behalf of the Merchant, the Merchant further
            undertakes that the Goods have been properly packed in the Container
            and that he has checked that its thermostatic, ventilating or any
            other special controls have been properly and exactly set, before
            receipt of the Goods by the Carrier. The Carrier shall not be liable
            for any loss or damage to the Goods arising out of or resulting from
            the Merchant's failure in such obligation and further does not
            guarantee the maintenance of any intended temperature inside the
            Container. <br />11.2 The Carrier shall not be liable for any
            loss or damage to the Goods arising from latent defects,
            derangement, breakdown, defrosting, stoppage of refrigeration,
            ventilating or any other specialized machinery, plant, insulation
            and/or any apparatus of the Container, vessel, conveyance and any
            other facilities, provided that the Carrier shall before and at the
            beginning of the Carriage exercise due diligence to maintain the
            Container supplied to the Carrier in an efficient state. <br />
            11.3 If the Goods have been packed into a refrigerated
            Container by the Carrier and the temperature range requested by the
            Merchant is inserted in this Bill, the Carrier will set the
            thermostatic controls within the requested temperature range, but
            does not guarantee the maintenance of such temperature inside the
            Container. <br />12. Carrier's Container <br />12.1 The
            Merchant shall assume full responsibility for and shall indemnify
            the Carrier against any loss of or damage to the Carrier's
            Container(s) and other equipment(s) which occurs while in the
            possession or control of the Merchant, his agents, servants or
            independent contractors engaged by or on behalf of the Merchant.
            <br />12.2 The Carrier shall in no event be liable for and the
            Merchant shall indemnify and hold the Carrier harmless from and
            against, any loss of or damage to property of other Persons or
            injuries or death to other Persons caused by the Carrier's
            Container(s) or the contents thereof during handling by, or while in
            the possession or control of the Merchant, his agents, servants or
            independent contractors engaged by or on behalf of the Merchant.
            <br />12.3 If Container(s) supplied by or on behalf of the
            Carrier are unpacked at the Merchant's premises, the Merchant is
            responsible for returning the empty Container(s), with interiors
            brushed and clean, to the point or place designated by the Carrier,
            its agents or servants, within the time prescribed in the Carrier's
            applicable Tariff(s).  Should Container(s) not be returned as
            aforesaid within the time prescribed, the Merchant shall be liable
            for any detention, losses and/or expenses which the Carrier may
            incur including but not limited to the cost of cleaning the interior
            of the Container(s). <br />13. Merchant's Responsibility <br />
            13.1 All of the Persons coming within the definition of
            Merchant in Clause 1.1 shall be jointly and severally liable to the
            Carrier for the due fulfillment of all obligations of the Merchant
            in this Bill. <br />13.2 The Merchant shall comply with all
            statutes, ordinances, regulations or requirements of customs, port,
            and any other authorities relative to the Goods, documentation and
            any other matters affecting or in any way relating thereto, and
            shall bear and pay all duties, taxes, fines, imposts, expenses or
            losses incurred or suffered due to any failure to so comply, or due
            to any illegal, incorrect or insufficient marking, numbering or
            addressing of the Goods, and shall indemnify the Carrier in respect
            thereof. <br />13.3 The Merchant shall indemnify, defend and
            hold the Carrier harmless from all consequences of any: (a)
            failure by the Merchant to comply with any provision
            of this Bill, the Carrier's applicable Tariff(s), and/or any
            applicable circulars or contracts, laws or regulations, and/or (b)
            breach of any of the Merchant's representations or
            warranties or undertakings herein. <br />13.4 The Merchant's
            obligation to so indemnify, defend and hold harmless shall include
            reimbursement of all expenses or amounts spent or incurred,
            including legal fees and expenses, penalties or liabilities imposed,
            or loss of profit, directly or indirectly arising from or in
            connection with such failure or breach and shall not be defeated or
            reduced by any negligence on the part of or attributable to the
            Carrier. <br />14. Optional Stowage and Deck Cargo <br />
            14.1 Where the Goods are not already packed into Container(s)
            at the time of receipt, the Carrier shall be at liberty to pack and
            carry them in any type of Container(s). <br />14.2 The Goods
            packed in Containers (other than flats or pallets) by the Carrier or
            the Merchant, may be carried on or under deck without notice to the
            Merchant. All such Goods whether carried on deck or under deck shall
            participate in general average and such Goods (other than live
            animals) shall be deemed to be within the definition of the Goods
            for the purposes of the Hague Rules. <br />14.3 Notwithstanding
            Clause 14.2, Goods which are stated herein to be carried on deck are
            carried without any responsibility whatsoever on the part of the
            Carrier for loss or damage of whatsoever nature arising during the
            Carriage whether caused by the Vessel’s unseaworthiness or the
            Carrier’s negligence or any other cause whatsoever. <br />
            15. Live Animals and Plants <br />15.1 The Carrier shall
            not be responsible for any accident, disease, mortality, loss of or
            damage to live animals, birds, reptiles, fish or plants arising or
            resulting from any cause whatsoever including the Carrier's
            negligence or the Vessel's unseaworthiness, and shall have the
            benefit of all the provisions of this Bill, except those
            inconsistent with the provisions of this Clause. <br />
            16. Carriage Affected by Condition of Goods <br />16.1 If
            it appears or if the Carrier has reasonable grounds to believe at
            any time that, due to their nature or condition, the Goods cannot
            safely or properly be carried or carried further, either at all or
            without incurring additional expense or taking measure(s) in
            relation to the Container or the Goods, the Carrier may without
            notice to the Merchant (but as his agent only) take any measure(s)
            and/or incur any additional expense to carry or to continue the
            Carriage thereof, and/or store them ashore or afloat, under cover or
            in the open at any place, whichever the Carrier, in his absolute
            discretion, considers most appropriate. Furthermore, the Carrier
            shall be entitled with or without notice to the Merchant to abandon
            the Goods whether in store or not, or to effect a sale or disposal
            of the Goods as may be necessary or appropriate. The Carrier's
            liability shall cease upon such abandonment, storage, sale or
            disposal. The Merchant shall indemnify the Carrier against any
            additional legal fees and expenses so incurred. <br />
            17. Modes, Route of Transport <br />17.1 The Carrier may
            at any time and without notice to the Merchant: use any means of
            transport or storage whatsoever; transfer the Goods from one
            conveyance to another including trans‐shipping or carrying the same
            on another Vessel or means of transport other than the Vessel named
            herein; proceed by any route in his discretion (whether or not the
            nearest or most direct or customary or advertised route) and proceed
            to or stay at any place or port whatsoever once or more often, and
            in any order; and/or load and unload the Goods at any place or port
            (whether or not any such port is named herein as the port of loading
            or port of discharge) and store the Goods at any such place or port.
            <br />17.2 The Vessel shall always have liberty to dry dock, go
            to repair yards, shift berths, shift or re-stow the Goods, and take
            in fuel or stores. These liberties may be invoked by the Carrier
            for any purpose whatsoever and anything done in accordance with this
            Clause or any delay arising therefrom shall not be deemed to be a
            breach by the Carrier of the contract evidenced by this Bill or a
            deviation. Should the Carrier be held liable in respect of any such
            action, the Carrier shall be entitled to the full benefit of the
            Carrier's defences. <br />18. Matters Affecting Performance
            (Liberty) <br />18.1 If at any time the Carriage is or is likely
            to be affected by any hindrance, risk, delay, difficulty or
            disadvantage of any kind whatsoever and howsoever arising (even if
            the circumstances giving rise to such hindrance, risk, delay,
            difficulty or disadvantage existed at the time this contract was
            entered into or the Goods were received for the Carriage), the
            Carrier (whether or not the Carriage is commenced) may, without
            prior notice to the Merchant and at its sole discretion either: (a)
            Carry the Goods to the named Place of Delivery by an
            alternative route to that indicated in this Bill or that which is
            usual for the Goods consigned to that Place of Delivery (if the
            Carrier elects to invoke the terms of this Clause 18.1(a), then
            notwithstanding the provisions of Clause 17 hereof, he shall be
            entitled to charge such additional Freight as the Carrier may
            determine); or (b) Suspend the Carriage of the Goods
            and store them ashore or afloat upon the terms of this Bill and
            endeavour to forward them as soon as possible, but the Carrier makes
            no representations as to the maximum period of suspension (if the
            Carrier elects to invoke the terms of this Clause 18.1(b) then he
            shall be entitled to such additional Freight and/or storage charges
            and/or legal fees and expenses as the Carrier may determine); or (c)
            Abandon the Carriage of the Goods and place the Goods
            at the Merchant's disposal at any place or port which the Carrier
            may at his sole discretion deem safe and convenient, whereupon the
            Carrier’s responsibility in respect of such Goods shall cease. The
            Carrier shall nevertheless be entitled to full Freight on the Goods
            received for the Carriage, and the Merchant shall pay any additional
            costs of the Carriage to, and delivery and storage at such place or
            port. If the Carrier elects to use an alternative route under Clause
            18.1(a) or to suspend the Carriage under Clause 18.1(b), this shall
            not prejudice his right subsequently to abandon the Carriage. <br />
            19. Dangerous Goods, Contraband <br />19.1 The Carrier
            undertakes to carry Goods of an explosive, inflammable, radioactive,
            corrosive, damaging, noxious, hazardous, poisonous, injurious or any
            other dangerous nature only upon the Carrier's acceptance of a prior
            written application by the Merchant for Carriage of such Goods,
            which acceptance the Carrier shall not be obliged to give. Such
            application must accurately state the precise nature, name, label
            and classification of Goods as well as the method of rendering them
            innocuous, with the full names, addresses and telephone numbers of
            the Merchant. <br />19.2 The Merchant shall undertake that the
            nature of Goods referred to in 19.1 above is distinctly and
            permanently marked and manifested on the outside of the package(s)
            and Container(s) and shall also undertake to submit the documents or
            certificates required by any applicable statutes or regulations at
            any stage of Carriage or by the Carrier. <br />19.3 The Merchant
            warrants that such Goods are packed in a manner to withstand the
            risks of Carriage having regard to their nature and in compliance
            with all laws, regulations or requirements, which may be applicable
            to the Carriage. <br />19.4 Whenever Goods are perceived or are
            discovered to pose a threat to the Vessel, any other means of
            transport, cargoes, properties or persons, or not to comply with
            19.1 or 19.2 above, or Goods are perceived or found to be contraband
            or prohibited by any laws or regulations of the port of loading,
            discharge or call, or any place or waters during Carriage, the
            Carrier shall be entitled to have such Goods rendered innocuous,
            thrown overboard or discharged and left to the Merchant at any stage
            and place the Carrier may choose, or otherwise disposed of at the
            Carrier's discretion without compensation, and the Merchant shall be
            liable for and indemnify the Carrier against all loss, damage or
            liability including loss of freight, and any claims, liability,
            loss, damage, delay, costs, fines and/or expenses directly or
            indirectly arising out of or resulting from such Goods and all
            resulting actions taken by the Carrier, and shall post any necessary
            bonds or financial guarantees as may be required. <br />
            20. Nuclear Incident and Valuable Goods <br />20.1 The
            Carrier shall not be responsible for any loss or damage to or in
            connection with the Goods arising or resulting from nuclear incident
            occurring at any time, unless caused by the actual fault or privity
            of the Carrier. <br />20.2 The Carrier shall not be liable to
            any extent for any loss of or damage to or in connection with
            platinum, gold, silver, jewellery, precious stones, precious metals,
            radioisotopes, precious chemicals, bullion, specie, currency,
            negotiable instruments, securities, writings, documents, pictures,
            works of art, curios, heirlooms, collections of every nature or any
            other valuable goods whatsoever including Goods having particular
            value only for the Merchant, unless the true nature and value of the
            Goods have been declared in writing by the Merchant before receipt
            of the Goods by the Carrier, and the same is inserted in this Bill
            and ad valorem freight has been fully prepaid. <br />
            21. Notification and Delivery <br />21.1 Any mention in
            this Bill of parties to be notified of the arrival of the Goods is
            solely for information of the Carrier, and failure to give such
            notification shall not involve the Carrier in any liability nor
            relieve the Merchant of any obligation hereunder. <br />21.2 The
            Merchant shall take delivery of the Goods within the free storage
            time provided for in the Carrier's applicable Tariff(s) or
            otherwise. If the Merchant fails to do so, without prejudice to any
            other rights of the Carrier hereunder, the Carrier may without
            notice unload the Goods or part thereof from the Vessel or the
            Container and/or store the Goods or part thereof ashore, afloat, in
            the open or under cover at the sole risk of the Merchant. Such
            storage shall constitute due delivery hereunder, and thereupon all
            liability whatsoever of the Carrier in respect of the Goods or part
            thereof shall cease, and the costs of such unloading or storage (if
            paid or payable by the Carrier or any agent or Sub-Contractor of the
            Carrier) shall immediately on demand be paid by the Merchant to the
            Carrier. <br />21.3 The Merchant's attention is drawn to the
            stipulations regarding detention and demurrage in the Tariff(s). If
            the Goods are unclaimed during a reasonable period not to exceed 45
            days or whenever in the Carrier's opinion the Goods will become
            deteriorated, decayed or worthless, the Carrier may, without
            prejudice to any other rights against the Merchant, at his sole
            discretion and subject to his lien and without any responsibility
            attaching to him, sell, abandon or otherwise dispose of such Goods
            solely at the risk and expense of the Merchant, and apply the
            proceeds of any such sale or disposal in reduction of the sums due
            to the Carrier from the Merchant. <br />21.4 Delivery of the
            Goods under this Bill shall be effected by the Carrier providing to
            the Merchant the Goods or a Delivery Order or the pin codes for any
            Electronic Release System as applicable, and if the Carrier is
            obliged to discharge the Goods into the hands of any customs, port
            or other authority, such discharge shall constitute due delivery of
            the Goods to the Merchant under this bill of lading. <br />
            22. Notice of Claim and Time for Suit <br />22.1 Unless
            notice of loss or damage and the general nature of such loss or
            damage is given in writing to the Carrier at the Place of Delivery
            (or Port of Discharge if no Place of Delivery is named on the
            reverse hereof) before or at the time of delivery of the Goods or,
            if the loss or damage be not apparent, within 3 days after delivery,
            the Goods shall be deemed to have been delivered as described in
            this Bill. <br />22.2 Where the Goods have been or may have been
            lost or damaged during the custody of Sub-Contractors, the Carrier
            shall be discharged from all liability whatsoever in respect of the
            Goods unless the Merchant gives the Carrier notice of loss and
            notice of claim in time for the Carrier to comply with the
            requirements of the Sub-Contractors. It is the Merchant's obligation
            to inquire as to those requirements. The Carrier is not obligated to
            volunteer that information. <br />22.3 In any event, except as
            provided in Clause 22.2, the Carrier shall be discharged from all
            liability whatsoever in respect of the Goods unless suit is brought
            within one year after delivery of the Goods or the date when the
            Goods should have been delivered. <br />23. General Average
            23.1 General average shall be adjusted, stated and settled
            at any port or place at the Carrier's option according to the
            York-Antwerp Rules 1994, and as to matters not provided for by these
            Rules, according to the laws and usages of the port or place of
            adjustment, and in the currency selected by the Carrier. The general
            average statement shall be prepared by adjusters appointed by the
            Carrier. An average agreement or bond and such cash deposit as the
            Carrier may deem sufficient to cover the estimated contribution of
            the Goods and any salvage and special charges thereon and any other
            additional securities as the Carrier may require shall be furnished
            by the Merchant to the Carrier before delivery of the Goods. <br />
            24. Both to Blame Collision Clause and New Jason Clause 24.1
            The Both-To-Blame Collision Clause and New Jason Clause
            published by the Baltic and International Maritime Council (BIMCO),
            copies of which are available upon request, are hereby incorporated
            into this Bill. <br />25. Governing Law and Jurisdiction 25.1
            Subject to Clause 25.2 below, the contract evidenced by or
            contained in this Bill shall be governed by Singapore law except as
            may be otherwise provided for herein. Unless otherwise agreed by the
            Carrier, any action against the Carrier hereunder must be brought
            exclusively before the Singapore High Court. Any action by the
            Carrier to enforce any provision of this Bill may be brought before
            any court of competent jurisdiction at the option of the Carrier.
            25.2 For shipments to or from the United States of America
            (including its districts territories and possessions), the contract
            evidenced by or contained in this Bill shall be governed by U.S law.
            25.3 Where the Goods are subject to adverse or competing
            claims, the Carrier may place the Goods in the custody of a court of
            competent jurisdiction for a determination of ownership and/or right
            to possession at the sole expense of the Merchant, including
            Carrier’s legal fees and disbursements. The Carrier shall have no
            liability to the Merchant arising out of such placement and the
            Merchant consents to the exclusive jurisdiction of such Court. <br />
            26. US Clause Paramount 26.1 If the Carriage
            covered by this Bill includes Carriage to or from a port or place in
            the United States of America, including its districts, territories
            and possessions, this Bill shall be subject to US COGSA, the terms
            of which are incorporated herein and US COGSA shall govern
            throughout the entire Carriage set forth in this Bill (and not just
            Waterborne Carriage) from the time of receipt of the Goods to the
            time of delivery of the goods. If US COGSA so applies, then with
            respect to Goods carried on deck and stated on the face hereof to be
            so carried, with respect to live animals, birds, reptiles, fish,
            shellfish and plants, all risk or loss or damage by perils inherent
            in or incidental to such Carriage shall be borne by the Merchant,
            and in all other respects, the Carrier shall have benefit of the
            provisions of US COGSA, notwithstanding Section 1(c) thereof.
             Neither Clause 3.2(a), (b), the Hamburg Rules nor the Visby
            Amendments shall apply to the Carriage to or from the United States.
            The Carrier shall be entitled to the benefits of the defences and
            limitations in US COGSA, whether or not the loss or damage to the
            Goods occurs at sea. 26.2 For limitation purposes under US
            COGSA, it is agreed that the meaning of the word "package" shall be
            any palletised and/or unitised assemblage of cartons which has been
            palletised and/or unitised for the convenience of the Merchant,
            regardless of whether said pallet or unit is disclosed on the front
            hereof. If US COGSA so applies, neither the Carrier nor the Vessel
            shall, in any event, be or become liable for any loss or damage to
            or in connection with the Goods in an amount exceeding $500.00
            lawful money of the United States per package, or in the case of
            Goods not shipped in packages, per customary freight unit, unless
            the nature and value of the Goods have been declared by the Shipper
            before shipment and inserted in this Bill. <br />27. Hamburg
            Rules 27.1 Notwithstanding the terms of Clause 25 herein
            if proceedings are brought before the courts of a Contracting State
            to the United Nations Convention on the Carriage of Goods by Sea
            1978 (the Hamburg Rules) or the courts of any State whose national
            legislation makes the Hamburg Rules effective and if such courts
            adjudge the Hamburg Rules or such national legislation to be
            compulsorily applicable to this Bill, then in those circumstances
            only shall this Bill take effect subject to the Hamburg Rules or
            such national legislation and any term of this Bill derogating
            therefrom to the detriment of the Merchant shall be void to that
            extent but no further. 27.2 In any event the Carrier shall
            be entitled to contest enforcement of any judgment made in a
            Contracting State to the Hamburg Rules in any proceedings before
            courts in a Non-Contracting State.
          </p>
          <Button
            variant="contained"
            onClick={() => {
              accept(true);
            }}
          >
            Accepted
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsConditions;
