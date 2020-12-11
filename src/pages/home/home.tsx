import React from 'react';
import './home.less';
import 'antd/dist/antd.css';
import { Layout, Menu, Table, Space, Dropdown, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import Icon, { CaretDownOutlined } from '@ant-design/icons';
// import {ReactComponent as HomeIcon} from '../../assets/icon-home-white.svg';
import WalletIcon from '../../assets/icon-wallet-grey.svg';
import IconHome from '../../svg/IconHome';
import IconSend from '../../svg/IconSend';
import IconReceive from '../../svg/IconReceive';
import IconAddress from '../../svg/IconAddress';

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const totalBalance = '500,000';
const stakedBalance = '250,000';

const TransactionColumns = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'txhash',
    key: 'txhash',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
];

const TransactionData = [
  {
    key: '1',
    index: '1',
    txhash: '0x0edbd6…e0470dc1',
    amount: '500, 000',
    time: '31/12/2020 23:59:59',
  },
  {
    key: '2',
    index: '2',
    txhash: '0x7a53b75…8104be15',
    amount: '500, 000',
    time: '31/12/2020 23:59:59',
  },
  {
    key: '3',
    index: '3',
    txhash: '0x7a53b75…8104be15',
    amount: '500, 000',
    time: '31/12/2020 23:59:59',
  },
];

const StakingColumns = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Deposit Stake</a>
        <a>Unbond Stake</a>
      </Space>
    ),
  },
];

const StakingData = [
  {
    key: '1',
    index: '1',
    address: 'tcro1reyshfdygf7673xm9p8v0xvtd96m6cd6dzswyj',
    amount: '500, 000',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    index: '2',
    address: 'tcro1uevms2nv4f2dhvm5u7sgus2yncgh7gdwn6urwe',
    amount: '300, 000',
    tags: ['loser'],
  },
  {
    key: '3',
    index: '3',
    address: 'tcro1uvvmzes9kazpkt359exm67qqj384l7c74mjgrr',
    amount: '100, 000',
    tags: ['cool', 'teacher'],
  },
];

const walletMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/create">Create Wallet</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/restore">Restore Wallet</Link>
    </Menu.Item>
    <Menu.Item>Wallet List</Menu.Item>
  </Menu>
);

const HomeMenu = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<Icon component={IconHome} />}>
        Home
      </Menu.Item>
      <Menu.Item key="2" icon={<Icon component={IconAddress} />}>
        Address
      </Menu.Item>
      <Menu.Item key="3" icon={<Icon component={IconSend} />}>
        Send
      </Menu.Item>
      <Menu.Item key="4" icon={<Icon component={IconReceive} />}>
        Receive
      </Menu.Item>
    </Menu>
  );
};

function HomePage() {
  return (
    <main className="home-page">
      <Layout>
        <Sider>
          <div className="logo" />
          <div className="version">SAMPLE WALLET v0.0.1</div>
          <HomeMenu />
          <Dropdown
            overlay={walletMenu}
            placement="topCenter"
            className="wallet-selection"
            arrow
            trigger={['click']}
          >
            <div>
              <img src={WalletIcon} alt="walletIcon" /> Wallet - Test 1
              <CaretDownOutlined />
            </div>
          </Dropdown>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">Welcome Back!</Header>
          <Content>
            <div className="site-layout-background balance-container">
              <div className="balance">
                <div className="title">TOTAL BALANCE</div>
                <div className="quantity">{totalBalance} CRO</div>
              </div>
              <div className="balance">
                <div className="title">STAKED BALANCE</div>
                <div className="quantity">{stakedBalance} CRO</div>
              </div>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Transactions" key="1">
                <Table columns={TransactionColumns} dataSource={TransactionData} />
              </TabPane>
              <TabPane tab="Staking" key="2">
                <Table columns={StakingColumns} dataSource={StakingData} />
              </TabPane>
            </Tabs>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </main>
  );
}

export default HomePage;