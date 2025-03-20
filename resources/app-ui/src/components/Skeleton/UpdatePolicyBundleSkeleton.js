import React, {useState, useEffect, useCallback, useRef} from "react";
import {Skeleton, Space, Spin, Card, Row, Col} from "antd";

const UpdatePolicyBundleSkeleton = (props) => {

    const {active} = props;

    return (
        <>

            <Card>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={24}>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8, marginBlockEnd: 28}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>

                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20, height: '100px'}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={24}>
                                <Skeleton.Button
                                    active={active}
                                    style={{
                                        width: '140px',
                                        maxWidth: '200px',
                                        height: '35px',
                                    }}
                                />
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </Card>

        </>
    );
}
export default UpdatePolicyBundleSkeleton;
