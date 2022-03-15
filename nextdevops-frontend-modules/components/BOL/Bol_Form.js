import React from "react";
import { useTranslation } from "react-i18next";
const FormBol = ({
  carrierDetails = {},
  shipperDetails = {},
  gridData,
  isShipper,
  sumUpField
}) => {
  const {t} = useTranslation();
  return (
    <div id="loadhitch-bol-form" align="center">
      <table
        border={0}
        cellPadding={0}
        cellSpacing={0}
        width={200}
        style={{
          borderCollapse: "collapse",
          tableLayout: "fixed",
          fontSize: 10,
        }}
      >
        <colgroup>
          <col
            span={2}
            style={{
              width: "60px",
            }}
          />
          <col
            style={{
              width: "70px",
            }}
          />
          <col
            style={{
              width: "63px",
            }}
          />
          <col
            style={{
              width: "60px",
            }}
          />
          <col
            width={57}
            style={{
              width: "60px",
            }}
          />
          <col
            style={{
              width: "30px",
            }}
          />
          <col
            style={{
              width: "70px",
            }}
          />
          <col
            style={{
              width: "49px",
            }}
          />
          <col
            style={{
              width: "48px",
            }}
          />
          <col style={{ width: "41px" }} />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <span
                style={{
                  float: "left",
                  width: "271px",
                  height: "68px",
                }}
              >
                <h1>{shipperDetails?.consignee_firstName || "Carrier Name"}</h1>
              </span>
            </td>
          </tr>
          <tr
            height={12}
            style={{ msoHeightSource: "userset", height: "9.75px" }}
          >
            <td height={12} style={{ height: "9.75px" }}>
              &nbsp;
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td />
            <td />
            <td />
            <td />
          </tr>
          <tr
            height={21}
            style={{ msoHeightSource: "userset", height: "16.5px" }}
          >
            <td
              colSpan={5}
              height={21}
              style={{
                borderRight: "1px solid black",
                height: "16.5px",
                textAlign: "left",
                fontSize: 12,
                borderLeft: "1px solid black",
                borderTop: "1px solid black",
              }}
            >
              {t("lodhitech load")} #<span style={{ msoSpacerun: "yes" }}>&nbsp;</span>
            </td>
            <td
              colSpan={5}
              style={{
                borderRight: "1px solid black",
                height: "16.5px",
                textAlign: "left",
                fontSize: 12,
                borderLeft: "1px solid black",
                borderTop: "1px solid black",
              }}
            >
              `${t("customer PO number")}:`
            </td>
            <td />
          </tr>
          <tr height={20} style={{ height: "15px" }}>
            <td
              colSpan={5}
              height={20}
              style={{
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                height: "15px",
                color: "white",
                textAlign: "center",
                background: "black",
              }}
            >
              {t("shipper")}
            </td>
            <td
              colSpan={5}
              style={{
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                height: "15px",
                color: "white",
                textAlign: "center",
                background: "black",
              }}
            >
              {t("consignee")}
            </td>
            <td />
          </tr>
          <tr
            height={32}
            style={{ msoHeightSource: "userset", height: "24px" }}
          >
            <td
              colSpan={3}
              height={32}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {shipperDetails.shipper_firstName}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {shipperDetails.phone}
            </td>
            <td
              colSpan={3}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {shipperDetails.consignee}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {shipperDetails.phone}
            </td>
            <td />
          </tr>
          <tr
            height={9}
            style={{ msoHeightSource: "userset", height: "7.5px" }}
          >
            <td
              colSpan={3}
              height={9}
              style={{
                height: "7.5px",
                textAlign: "center",
                borderLeft: "1px solid black",
              }}
            >
              {t("shippers name")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("telephone")}
            </td>
            <td
              colSpan={3}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("consignee name")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("telephone")}
            </td>
            <td />
          </tr>
          <tr
            height={28}
            style={{ msoHeightSource: "userset", height: "21.75px" }}
          >
            <td
              colSpan={5}
              height={28}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {shipperDetails.shipper_address1}
            </td>
            <td
              colSpan={5}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {shipperDetails.consignee_address1}
            </td>
            <td />
          </tr>
          <tr
            height={9}
            style={{ msoHeightSource: "userset", height: "7.5px" }}
          >
            <td
              colSpan={5}
              height={9}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("shippers address")}
            </td>
            <td
              colSpan={5}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
                borderLeft: "none",
              }}
            >
              {t("consignee address")}
            </td>
            <td />
          </tr>
          <tr
            height={24}
            style={{ msoHeightSource: "userset", height: "18px" }}
          >
            <td
              colSpan={3}
              height={24}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
                height: "18px",
              }}
            >
              {shipperDetails.email}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {shipperDetails.firstName}
            </td>
            <td
              colSpan={3}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {shipperDetails.email}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {shipperDetails.consignee_firstName}
            </td>
            <td />
          </tr>
          <tr
            height={9}
            style={{ msoHeightSource: "userset", height: "7.5px" }}
          >
            <td
              colSpan={3}
              height={9}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("shippers email address")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("contacts name")}
            </td>
            <td
              colSpan={3}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("consignee email address")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("contacts name")}
            </td>
            <td />
          </tr>
          <tr
            height={29}
            style={{ msoHeightSource: "userset", height: "22.5px" }}
          >
            <td
              colSpan={2}
              height={29}
              style={{
                height: "22.5px",
                textAlign: "center",
                border: "1px solid black",
              }}
            >
              {shipperDetails.shipper_city}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontSize: 14,
                borderTop: "none",
                borderLeft: "none",
              }}
            >
              {shipperDetails.shipper_zip}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontSize: 14,
                borderTop: "none",
                borderLeft: "none",
              }}
            >
              {shipperDetails.state}
            </td>
            <td
              style={{
                border: "1px solid black",
                fontSize: 14,
                borderTop: "none",
                borderLeft: "none",
              }}
            >
              {shipperDetails.shipper_country}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {shipperDetails.consignee_city}
            </td>
            <td
              style={{
                borderTop: "none",
                borderLeft: "none",
                border: "1px solid black",
              }}
            >
              {carrierDetails.consignee_postal}
            </td>
            <td
              style={{
                borderTop: "none",
                borderLeft: "none",
                border: "1px solid black",
              }}
            >
              {carrierDetails.consignee_state}
            </td>
            <td
              style={{
                borderTop: "none",
                borderLeft: "none",
                border: "1px solid black",
              }}
            >
              {carrierDetails.consignee_country}
            </td>
            <td />
          </tr>
          <tr
            height={12}
            style={{ msoHeightSource: "userset", height: "9.75px" }}
          >
            <td
              colSpan={2}
              height={12}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              CITY
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("postal code")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("province")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("country")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
                borderLeft: "none",
              }}
            >
              {t("city")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
                borderTop: "none",
                borderLeft: "none",
              }}
            >
              {t("postal code")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
                borderTop: "none",
                borderLeft: "none",
              }}
            >
              {t("province")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
                borderTop: "none",
                borderLeft: "none",
              }}
            >
              {t("country")}
            </td>
            <td />
          </tr>
          <tr
            height={20}
            style={{ msoHeightSource: "userset", height: "15.75px" }}
          >
            <td
              colSpan={5}
              height={20}
              style={{
                borderRight: "1px solid black",
                color: "white",
                background: "black",
                textAlign: "center",
                textDecoration: "underline",
                fontWeight: 700,
              }}
            >
              {t("freight charges bill")}
            </td>
            <td
              colSpan={5}
              style={{
                borderRight: "1px solid black",
                color: "white",
                background: "black",
                textAlign: "center",
                textDecoration: "underline",
                fontWeight: 700,
              }}
            >
              {t("special handling")}
            </td>
            <td />
          </tr>
          <tr
            height={17}
            style={{ msoHeightSource: "userset", height: "13.5px" }}
          >
            <td
              colSpan={5}
              rowSpan={2}
              height={22}
              style={{
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
                height: "18px",
                fontSize: 10,
                textAlign: "center",
                borderLeft: "1px solid black",
                borderTop: "1px solid black",
              }}
            >
              {t("same as shipper")}
              <span style={{ msoSpacerun: "yes" }}>&nbsp;&nbsp; </span>[
              <span style={{ msoSpacerun: "yes" }}>&nbsp; </span>]
              <span style={{ msoSpacerun: "yes" }}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
              {t("same as consignee")}
              <span style={{ msoSpacerun: "yes" }}>&nbsp;&nbsp; </span>[
              <span style={{ msoSpacerun: "yes" }}>&nbsp; </span>]
            </td>
            <td
              colSpan={5}
              rowSpan={10}
              style={{
                textAlign: "left",
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            />
            <td />
          </tr>
          <tr
            height={5}
            style={{ msoHeightSource: "userset", height: "4.5px" }}
          >
            <td height={5} style={{ height: "4.5px" }} />
          </tr>
          <tr
            height={24}
            style={{ msoHeightSource: "userset", height: "18px" }}
          >
            <td
              colSpan={3}
              height={24}
              style={{
                height: "18px",
                textAlign: "center",
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
                borderLeft: "1px solid black",
                borderTop: "1px solid black",
              }}
            >
              {isShipper ? shipperDetails.bill_to : carrierDetails.bill_to}
            </td>
            <td
              colSpan={2}
              style={{
                height: "18px",
                textAlign: "center",
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
                borderLeft: "1px solid black",
                borderTop: "1px solid black",
              }}
            >
              {isShipper
                ? shipperDetails.bill_telephone
                : carrierDetails.bill_telephone}
            </td>
            <td />
          </tr>
          <tr
            height={9}
            style={{ msoHeightSource: "userset", height: "7.5px" }}
          >
            <td
              colSpan={3}
              height={9}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("bill to name")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("telephone")}
            </td>
            <td />
          </tr>
          <tr height={20} style={{ height: "15px" }}>
            <td
              colSpan={5}
              height={20}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {isShipper
                ? shipperDetails.bill_address1
                : carrierDetails.bill_address1}
            </td>
            <td />
          </tr>
          <tr
            height={13}
            style={{ msoHeightSource: "userset", height: "11px" }}
          >
            <td
              colSpan={5}
              height={13}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("bill to address")}
            </td>
            <td />
          </tr>
          <tr
            height={23}
            style={{ msoHeightSource: "userset", height: "17.25px" }}
          >
            <td
              colSpan={3}
              height={23}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {isShipper
                ? shipperDetails.bill_address2
                : carrierDetails.bill_address2}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {isShipper ? shipperDetails.bill_to : carrierDetails.bill_to}
            </td>
            <td />
          </tr>
          <tr
            height={11}
            style={{ msoHeightSource: "userset", height: "8.25px" }}
          >
            <td
              colSpan={3}
              height={11}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("bill to email address")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              {t("contacts name")}
            </td>
            <td />
          </tr>
          <tr height={20} style={{ height: "15px" }}>
            <td
              colSpan={2}
              height={20}
              style={{
                border: "1px solid black",
                height: "24px",
                fontSize: 14,
                textAlign: "center",
              }}
            >
              {isShipper ? shipperDetails.bill_city : carrierDetails.bill_city}
            </td>
            <td
              style={{
                borderTop: "none",
                borderLeft: "none",
                border: "1px solid black",
              }}
            >
              {isShipper
                ? shipperDetails.bill_postal_code
                : carrierDetails.bill_postal_code}
            </td>
            <td
              style={{
                borderTop: "none",
                borderLeft: "none",
                border: "1px solid black",
              }}
            >
              {isShipper
                ? shipperDetails.bill_province
                : carrierDetails.bill_province}
            </td>
            <td
              style={{
                borderTop: "none",
                borderLeft: "none",
                border: "1px solid black",
              }}
            >
              {isShipper
                ? shipperDetails.bill_country
                : carrierDetails.bill_country}
            </td>
            <td />
          </tr>
          <tr
            height={15}
            style={{ msoHeightSource: "userset", height: "11.25px" }}
          >
            <td
              colSpan={2}
              height={15}
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("city")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("postal code")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("province")}
            </td>
            <td
              style={{
                border: "1px solid black",
                textAlign: "center",
                fontSize: 10,
              }}
            >
              {t("country")}
            </td>
            <td />
          </tr>
          <tr height={20} style={{ height: "15px" }}>
            <td
              colSpan={10}
              rowSpan={2}
              height={41}
              style={{
                height: "31px",
                background: "black",
                color: "white",
                textAlign: "center",
              }}
            >
              {t("shipment/freight info")}
            </td>
            <td />
          </tr>
          <tr height={21} style={{ height: "16px" }}>
            <td height={21} style={{ height: "16px" }} />
          </tr>
          <tr height={20} style={{ height: "15px" }}>
            <td
              rowSpan={2}
              height={40}
              style={{
                height: "30px",
                textAlign: "center",
                borderLeft: "1px solid #000",
              }}
            >
              No. OF Pcs.
            </td>
            <td
              colSpan={5}
              rowSpan={2}
              style={{
                borderRight: "1px solid black",
                borderLeft: "1px solid black",
                textAlign: "center",
              }}
            >
              {t("description of goods")}
            </td>
            <td
              colSpan={2}
              style={{
                borderRight: "1px solid black",
                borderLeft: "none",
                textAlign: "center",
              }}
            >
              {t("dimensions")}
            </td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "center",
                borderRight: "1px solid black",
                borderLeft: "none",
                borderBottom: "none",
              }}
            >
              {t("weight")}
            </td>
            <td />
          </tr>
          <tr height={20} style={{ height: "15px" }}>
            <td
              colSpan={2}
              height={20}
              style={{
                borderRight: "1px solid black",
                height: "15px",
                borderLeft: "none",
                textAlign: "center",
              }}
            >
              LxWxH
              <span style={{ msoSpacerun: "yes" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
              <font
                style={{
                  color: "black",
                  fontSize: "8px",
                  fontWeight: "400",
                  fontStyle: "normal",
                  textDecoration: "none",
                  fontFamily: "Calibri, sans-serif",
                  msoFontCharset: "0",
                }}
              >
                <span style={{ msoSpacerun: "yes" }}>&nbsp;</span>in [
                <span style={{ msoSpacerun: "yes" }}>&nbsp; </span>]
                <span style={{ msoSpacerun: "yes" }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                </span>
                ft<span style={{ msoSpacerun: "yes" }}>&nbsp; </span>[
                <span style={{ msoSpacerun: "yes" }}>&nbsp; </span>]
              </font>
            </td>
            <td
              colSpan={2}
              style={{
                borderRight: "1px solid black",
                borderLeft: "none",
                textAlign: "center",
              }}
            >
              lbs<span style={{ msoSpacerun: "yes" }}>&nbsp; </span>[
              <span style={{ msoSpacerun: "yes" }}>&nbsp; </span>]
              <span style={{ msoSpacerun: "yes" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
              kgs<span style={{ msoSpacerun: "yes" }}>&nbsp; </span>[
              <span style={{ msoSpacerun: "yes" }}>&nbsp; </span>]
            </td>
            <td />
          </tr>
          {gridData.map((val, index) => (
            <tr key={index} height={20} style={{ height: "15px" }}>
              <td
                height={20}
                style={{ height: "15px", border: "1px solid black" }}
              >
                {val.counts}
              </td>
              <td
                colSpan={5}
                style={{ border: "1px solid black", textAlign: "left" }}
              >
                {val.itemDescription}
              </td>
              <td
                colSpan={2}
                style={{ border: "1px solid black", textAlign: "left" }}
              >
                {val.height * val.width}
              </td>
              <td
                colSpan={2}
                style={{ border: "1px solid black", textAlign: "left" }}
              >
                {val.totalWeight}
              </td>
              <td />
            </tr>
          ))}

  {/* ----------------------------------------------------- */}
      <tr height={20} style={{ height: "15px" }}>
            <td height={20} style={{ height: "15px" }} />
          </tr>
          <tr height={4} style={{ msoHeightSource: "userset", height: "3px" }}>
            <td height={4} style={{ height: "3px" }} />
          </tr>

          <tr
            height={16}
            style={{ msoHeightSource: "userset", height: "12px" }}
          >
            <td colSpan={10} height={16} style={{ height: "12px" }}>
              &nbsp;
            </td>
            <td />
          </tr>

          <tr
            height={16}
            style={{ msoHeightSource: "userset", height: "12.75px" }}
          >
            <td
              colSpan={1}
              rowSpan={1}
              
            >
              <u style={{ msoIgnore: "visibility" }}>
              {sumUpField.totalAmt }
              </u>
            </td>
            <td
              rowSpan={1}
              style={{
                textAlign: "center",
              }}
            >
              &nbsp;
            </td>
            <td
              colSpan={1}
              rowSpan={1}
              
            >
              <u style={{ width: "5rem", msoIgnore: "visibility" }}>
              { sumUpField.subTotal }
              </u>
            </td>

            <td
              rowSpan={1}
              style={{
                textAlign: "center",
              }}
            >
              &nbsp;
            </td>
            <td
              colSpan={1}
              rowSpan={1}
              
            >
              <u style={{ width: "5rem", msoIgnore: "visibility" }}>
              { sumUpField.tax }
              </u>
            </td>
            <td />
          </tr>

          <tr height={21} style={{ height: "16px" }}>
            <td
              height={21}
              style={{
                fontSize: 10,
              }}
            >
              {t("total")}
            </td>
            <td
              style={{
                textAlign: "right",
                fontSize: 10,
              }}
            >
              subTotal
            </td>
            <td
              style={{
                textAlign: "right",
                fontSize: 10,
              }}
            >
              Tax
            </td>
            <td />
          </tr>
    {/* ------------------------------------------------ */}
          <tr height={20} style={{ height: "15px" }}>
            <td height={20} style={{ height: "15px" }} />
          </tr>
          <tr height={4} style={{ msoHeightSource: "userset", height: "3px" }}>
            <td height={4} style={{ height: "3px" }} />
          </tr>

          <tr
            height={16}
            style={{ msoHeightSource: "userset", height: "12px" }}
          >
            <td colSpan={10} height={16} style={{ height: "12px" }}>
              &nbsp;
            </td>
            <td />
          </tr>

          <tr
            height={16}
            style={{ msoHeightSource: "userset", height: "12.75px" }}
          >
            <td
              height={16}
              style={{
                fontSize: 10,
              }}
            >
              {t("shippers")}
            </td>
            <td
              colSpan={3}
              rowSpan={3}
              style={{
                border: "1px solid black",
                borderBottom: "1px solid black",
                borderTop: "1px solid black",
                borderRight: "1px solid black",
              }}
            >
              <u style={{ msoIgnore: "visibility" }}>
              {shipperDetails?.signature && <img style={{ width: 200, height: 100 }} src={shipperDetails?.signature}
                  alt="signature" />}
              </u>
            </td>
            <td
              style={{
                textAlign: "right",
                fontSize: 10,
              }}
            >
              {t("carriers")}
            </td>
            <td
              colSpan={3}
              rowSpan={3}
              style={{
                border: "1px solid black",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
              }}
            >
              <u style={{ width: "5rem", msoIgnore: "visibility" }}>
              {carrierDetails?.signature && <img style={{ width: 200, height: 100 }} src={carrierDetails?.signature}
                  alt="signature" />}
              </u>
            </td>

            <td
              rowSpan={2}
              style={{
                textAlign: "center",
              }}
            >
              &nbsp;
            </td>
            <td />
          </tr>

          <tr height={21} style={{ height: "16px" }}>
            <td
              height={21}
              style={{
                fontSize: 10,
              }}
            >
              {t("signature")}
            </td>
            <td
              style={{
                textAlign: "right",
                fontSize: 10,
              }}
            >
              {t("signature")}
            </td>
            <td />
          </tr>

          <tr height={21} style={{ height: "16px" }}>
            <td
              height={21}
              style={{
                fontSize: 10,
              }}
            ></td>
            <td
              style={{
                textAlign: "right",
                fontSize: 10,
              }}
            ></td>
            <td />
          </tr>
          <tr
            height={16}
            style={{ msoHeightSource: "userset", height: "12.75px" }}
          >
            <td
              style={{
                textAlign: "right",
                fontSize: 10,
              }}
            >
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </td>
            <td colSpan={3} rowSpan={3}>
              <p>
                This is to certify that the above-named materials are properly
                classified, described, packaged, marked and labeled, and are in
                proper condition for transportation according to the applicable
                regulations of the Department of Transportation{" "}
              </p>
            </td>

            <td
              style={{
                textAlign: "right",
                fontSize: 10,
              }}
            >
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </td>
            <td colSpan={3} rowSpan={3}>
              <p>
                This is to certify that the above-named materials are properly
                classified, described, packaged, marked and labeled, and are in
                proper condition for transportation according to the applicable
                regulations of the Department of Transportation{" "}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormBol;
