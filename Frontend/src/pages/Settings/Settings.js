import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row,  } from '@themesberg/react-bootstrap';
import { GeneralInfoForm } from "../../components/Forms";
export default () => {
  return (
    <>
   
      <Row>
        <Col xs={12} xl={12} md={12} sm={12} lg={12}>
          <GeneralInfoForm />
        </Col>

        {/* <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select profile photo"
                photo={Profile3}
              />
            </Col>
          </Row>
        </Col> */}
      </Row>
    </>
  );
};
