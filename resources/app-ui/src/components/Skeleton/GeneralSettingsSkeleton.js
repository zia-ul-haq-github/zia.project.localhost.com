import React, {useState, useEffect, useCallback, useRef} from "react";
import {Skeleton, Space, Spin, Card, Row, Col} from "antd";

const GeneralSettingsSkeleton = (props) => {

    const {active} = props;

    return (
        <>

            <Card>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={24}>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{marginBlockEnd: 30}}>
                            <Col span={24}>
                                <Skeleton paragraph={false} title={{width: 130,}} style={{marginBlockStart: 8}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8}}/>
                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8}}/>
                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8}}/>
                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8}}/>
                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={24}>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{marginBlockEnd: 30}}>
                            <Col span={24}>
                                <Skeleton paragraph={false} title={{width: 130,}} style={{marginBlockStart: 8}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8}}/>
                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8}}/>
                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>

                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={2}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockStart: 8}}/>
                            </Col>
                            <Col span={22}>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={2}>
                        <Skeleton.Button
                            active={active}
                            style={{
                                width: '65px',
                                maxWidth: '100px',
                                height: '35px',
                            }}
                        />
                    </Col>

                    <Col span={2}>
                        <Skeleton.Button
                            active={active}
                            style={{
                                width: '65px',
                                maxWidth: '100px',
                                height: '35px',
                            }}
                        />
                    </Col>
                </Row>

            </Card>

        </>
    );
}
export default GeneralSettingsSkeleton;
