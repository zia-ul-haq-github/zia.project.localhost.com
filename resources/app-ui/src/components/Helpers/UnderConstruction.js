import React from 'react';
import {PageContainer} from "@ant-design/pro-components";
import UnderConstructionIcon01 from "../../../public/icons/under-construction-01.svg";
import { Col, Row, Icon } from 'antd';

const UnderConstructionIcon = () => {
  return (
    <img src={UnderConstructionIcon01}/>
  );
};

const UnderConstruction = () => {

  return(
    <PageContainer>

      <Row>
        <Col span={12}>
          <div
            style={{
              'font-size': '21px',
              'line-height': '42px',
              'color': '#6e6e6e',
              'padding': '35px 0px 0px 0px',
            }}
          >
            <h1>We're Sorry!</h1>
            This screen is currently under construction.
            We apologise for any inconvenience caused. We are working diligently to bring you an enhanced experience.
            Please check back soon for updates and exciting new features!
            Thank you for your patience. <br/>
            - The Web App Team
          </div>
        </Col>
        <Col span={12}>
          <img src={UnderConstructionIcon01} />
        </Col>
      </Row>

    </PageContainer>
  );

};

export default UnderConstruction;
