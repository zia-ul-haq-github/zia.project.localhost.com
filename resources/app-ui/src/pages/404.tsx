import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const NoFoundPage: React.FC = () => (
  <PageContainer
    // content={intl.formatMessage({
    //   id: 'pages.admin.subPage.title',
    //   defaultMessage: 'This page can only be viewed by admin',
    // })}
  >
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  />
  </PageContainer>
);

export default NoFoundPage;
