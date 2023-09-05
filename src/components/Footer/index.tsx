import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'LUOYINGDEHUIHEN出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'LUOYINGDEHUIHEN',
          title: '落樱的悔恨',
          href: 'https://github.com/1ranxu',
          blankTarget: true,//true表示打开新的页面，false表示在当前页面跳转
        },
        {
          key: 'github',
          title: <><GithubOutlined />1ranxu</>,
          href: 'https://github.com/1ranxu',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
