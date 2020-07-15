import React from 'react';
import { Card, Typography } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Photo.less';

const CodePreview: React.FC<{}> = ({ children }) => (
  <pre
    style={{
      background: '#f2f4f5',
      padding: '12px 20px',
      margin: '12px 0',
    }}
  >
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <Card>
      <img className={styles.logo} src={"images/timor.png"} />
      <img className={styles.logo} src={"images/timor2.png"} />
    </Card>
  </PageHeaderWrapper>
);
