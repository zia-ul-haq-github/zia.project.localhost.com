import React, {useState, useEffect, useCallback, useRef} from "react";
import {Skeleton, Space, Spin, Card, Row, Col} from "antd";

// interface IProps {
//   videoId: string;
//   autoPlay?: boolean;
//   title: string;
// }

const UpdateStaffMemberSkeleton = (props) => {

    const {active} = props;

    return (
        <>

            {/*Start - Form*/}
            <Card style={{marginBlockEnd: 15}}>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={6}>
                        <Skeleton.Image
                            active={active}
                            style={{
                                width: '210px',
                                maxWidth: '240px',
                                height: '200px',
                                marginBlockEnd: 10,
                            }}
                        />
                        <Col span={24}>
                            <Skeleton.Button
                                active={active}
                                // size={"default"}
                                // shape={"default"}
                                style={{
                                    width: '140px',
                                    maxWidth: '200px',
                                    height: '35px',
                                    marginLeft: "20px",
                                }}
                            />
                        </Col>
                    </Col>
                    <Col span={18}>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={8}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={8}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={24}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Card>

            <Card style={{marginBlockEnd: 15}}>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={24}>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={8}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={8}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={8}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
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
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={12}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
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
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={12}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Card>

            <Card>

                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    <Col span={13}>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={20}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={4} style={{marginTop: 50}}>
                                <Skeleton.Button
                                    active={active}
                                    // size={"default"}
                                    // shape={"default"}
                                    // style={{
                                    //     width: '10px',
                                    //     maxWidth: '60px',
                                    //     height: '35px',
                                    //     // marginLeft: "20px",
                                    // }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={10}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={10}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={4} style={{marginTop: 5}}>
                                <Skeleton.Button
                                    active={active}
                                    // size={"default"}
                                    // shape={"default"}
                                    // style={{
                                    //     width: '10px',
                                    //     maxWidth: '60px',
                                    //     height: '35px',
                                    //     // marginLeft: "20px",
                                    // }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={24}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                            <Col span={12}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                            <Col span={12}>
                                <Skeleton paragraph={false} title={{width: 80,}} style={{marginBlockEnd: 5}}/>
                                <Skeleton.Input active={active} size={'default'} block={true}
                                                style={{marginBlockEnd: 20}}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Card>
            {/*End - Form*/}

        </>
    );
}
export default UpdateStaffMemberSkeleton;
