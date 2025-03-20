import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined, ExclamationCircleFilled
} from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProTable,
  ProCard,
  StatisticCard
} from '@ant-design/pro-components';
import {FormattedMessage, useIntl, request, history} from '@umijs/max';
import {
  Button, Divider, message, Statistic
} from 'antd';
import React, {useState} from 'react';
import RcResizeObserver from 'rc-resize-observer';



const Dashboard = () => {

  const { Statistic, Divider } = StatisticCard;

  const [responsive, setResponsive] = useState(false);

  return (
  <RcResizeObserver
    key="resize-observer"
    onResize={(offset) => {
      setResponsive(offset.width < 596);
    }}
  >

      <StatisticCard.Group direction={responsive ? 'column' : 'row'}
        style={{
          marginBlockEnd: 20,
        }}
      >
        <StatisticCard
          statistic={{
            title: 'Total Tutors',
            value: 30,
          }}
          chart={
            <img
              src="https://wowtheme7.com/tf/eduall/demo/assets/images/icons/specialist-icon9.png"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Total Students',
            value: 20,
            description: <Statistic title="Percent" value="61.5%" />,
          }}
          chart={
            <img
              src="https://wowtheme7.com/tf/eduall/demo/assets/images/icons/work-process-icon1.png"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Category List',
            value: 180,
            description: <Statistic title="Percent" value="38.5%" />,
          }}
          chart={
            <img
              src="https://wowtheme7.com/tf/eduall/demo/assets/images/icons/specialist-icon2.png"
              alt="百分比"
              width="100%"
            />
          }
          chartPlacement="left"
        />
      </StatisticCard.Group>

      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: 'Total Fee Vouchers',
            value: 5,
            suffix: '/ 100',
          }}
          chart={
            <img
              src="https://cdn-icons-png.freepik.com/512/9541/9541630.png"
              alt="直方图"
              width="100%"
              height="60px"
            />
          }
          chartPlacement="left"
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Total Revenue',
            value: '$' + 23000,
          }}
          chart={
            <img
              src="https://wowtheme7.com/tf/eduall/demo/assets/images/icons/specialist-icon10.png"
              alt="直方图"
              width="100%"
            />
          }
          chartPlacement="left"
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: 'Recent Registrations',
            value: 8,
          }}
          chart={
            <img
              src="https://cdn-icons-png.freepik.com/512/17385/17385172.png?ga=GA1.1.1852088978.1739381555"
              alt="直方图"
              width="100%"
              height="60px"
            />
          }
          chartPlacement="left"
        />
      </StatisticCard.Group>

  {/* <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}>
      <ProCard>
        <Statistic title="今日UV" value={79.0} precision={2} />
      </ProCard>
      <Divider type={responsive ? 'horizontal' : 'vertical'} />
      <ProCard>
        <Statistic title="冻结金额" value={112893.0} precision={2} />
      </ProCard>
      <Divider type={responsive ? 'horizontal' : 'vertical'} />
      <ProCard>
        <Statistic title="信息完整度" value={93} suffix="/ 100" />
      </ProCard>
      <Divider type={responsive ? 'horizontal' : 'vertical'} />
      <ProCard>
        <Statistic title="冻结金额" value={112893.0} />
      </ProCard>
    </ProCard.Group>  */}

    </RcResizeObserver>
  );

};

export default Dashboard;
