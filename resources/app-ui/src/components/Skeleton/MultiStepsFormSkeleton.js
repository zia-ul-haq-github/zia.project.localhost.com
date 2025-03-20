import React, {useState, useEffect, useCallback, useRef} from "react";
import {Skeleton, Space, Spin, Card, Row, Col} from "antd";

// interface IProps {
//   videoId: string;
//   autoPlay?: boolean;
//   title: string;
// }

const MultiStepsFormSkeleton = (props) => {

  const {active} = props;

  return (
    <>

      {/* Start - Page Header*/}
      <div
        style={{
          marginBlockEnd: 16,
          textAlign: 'center'
        }}
      >
        <Space align="center">
          <Skeleton.Avatar active={active} size='large' shape='circle'/>
          <Skeleton
            paragraph={false}
            title={{
              width: 250,
            }}
          />
          <Skeleton.Avatar active={active} size='large' shape='circle'/>
          <Skeleton
            paragraph={false}
            title={{
              width: 250,
            }}
          />
          <Skeleton.Avatar active={active} size='large' shape='circle'/>
          <Skeleton
            paragraph={false}
            title={{
              width: 250,
            }}
          />
          <Skeleton.Avatar active={active} size='large' shape='circle'/>
        </Space>
      </div>
      {/* End - Page Header*/}

      {/*Start - Form*/}
      <Card style={{marginBlockEnd: 15}}>

        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col span={8}>
            <Skeleton.Image
              active={active}
              style={{
                width: '270px',
                maxWidth: '300px',
                height: '150px',
                marginBlockEnd: 10,
              }}
            />
            <Col span={24} style={{'text-align': 'center'}}>
              <Skeleton.Button
                active={active}
                // size={"default"}
                // shape={"default"}
                style={{
                  width: '140px',
                  maxWidth: '200px',
                  height: '35px',
                  marginRight: "30px",
                  marginBlockEnd: 10,
                }}
              />
            </Col>
          </Col>
          <Col span={16}>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col span={12}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
              <Col span={12}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
            </Row>
          </Col>
        </Row>

      </Card>

      <Card style={{marginBlockEnd: 15}}>

        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col span={24}>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col span={12}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
              <Col span={12}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
            </Row>
          </Col>
        </Row>

      </Card>

      <Card>

        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col span={24}>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col span={12}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
              <Col span={12}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
            </Row>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col span={8}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
              <Col span={8}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
              <Col span={8}>
                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                <Skeleton.Input active={active} size={'default'} block={true} style={{marginBlockEnd: 20}}/>
              </Col>
            </Row>
          </Col>
        </Row>

      </Card>
      {/*End - Form*/}

    </>
  );
}
export default MultiStepsFormSkeleton;
