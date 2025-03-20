import { Tag } from 'antd';
import NoticeIcon from '../NoticeIcon/index';

const data = [
  {
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'you received 14 new weekly',
    datetime: '2017-08-09',
    type: 'notification',
  },
  {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: 'Qu Nini you recommended has passed the third round of interview',
    datetime: '2017-08-08',
    type: 'notification',
  },
  {
    id: '000000003',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: 'This template can distinguish between multiple notification types',
    datetime: '2017-08-07',
    read: true,
    type: 'notification',
  },
  {
    id: '000000004',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: 'Icons on the left are used to distinguish between different types',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'The content should not exceed two lines，Automatically truncate when exceeded',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'Qu Lili commented on you',
    description: 'Description Description Description Description',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'Zhu Pianyou replied to you',
    description: 'This template is used to remind who interacted with you，On the left is the picture of "who"',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'title',
    description: 'This template is used to remind who interacted with you，On the left is the picture of "who"',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000009',
    title: 'mission name',
    description: 'task needs to be in 2017-01-12 20:00 pre-start',
    extra: 'has not started',
    status: 'todo',
    type: 'event',
  },
  {
    id: '000000010',
    title: 'Third Party Emergency Code Changes',
    description: 'Submitted by Guanlin on 2017-01-06，required in 2017-01-07 completed the code change task before',
    extra: 'due soon',
    status: 'urgent',
    type: 'event',
  },
  {
    id: '000000011',
    title: 'Information Security Exam',
    description: 'Appoint Zhuer to 2017-01-09 Completed the update and published before',
    extra: 'time-consuming 8 sky',
    status: 'doing',
    type: 'event',
  },
  {
    id: '000000012',
    title: 'ABCD version release',
    description: 'Submitted by Guanlin on 2017-01-06，required in 2017-01-07 completed the code change task before',
    extra: 'in progress',
    status: 'processing',
    type: 'event',
  },
];

function onItemClick(item, tabProps) {
  console.log(item, tabProps);
}

function onClear(tabTitle) {
  console.log(tabTitle);
}

function getNoticeData(notices) {

  if (notices.length === 0) {
    return {};
  }

  const newNotices = notices.map(notice => {
    const newNotice = { ...notice };
    // transform id to item key
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      );
    }
    return newNotice;
  });

  return newNotices.reduce((pre, data) => {
    if (!pre[data.type]) {
      pre[data.type] = [];
    }
    pre[data.type].push(data);
    return pre;
  }, {});

}

const noticeData = getNoticeData(data);
const TopHeaderNotices = () => (
  <div
    style={{
      textAlign: 'right',
      height: '64px',
      lineHeight: '64px',
      boxShadow: '0 1px 4px rgba(0,21,41,.12)',
      padding: '0 32px',
      width: '400px',
    }}
  >
    <NoticeIcon className="notice-icon" count={5} onItemClick={onItemClick} onClear={onClear}>
      <NoticeIcon.Tab
        list={noticeData.notification}
        title="notification"
        emptyText="You have viewed all notifications"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
      />
      <NoticeIcon.Tab
        list={noticeData.message}
        title="message"
        emptyText="You have read all messages"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
      />
      <NoticeIcon.Tab
        list={noticeData.event}
        title="event"
        emptyText="you have completed all to-dos"
        emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
      />
    </NoticeIcon>
  </div>
);

export default TopHeaderNotices;
