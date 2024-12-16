import React from 'react';
import { Typography, Button, Space, Tooltip } from 'antd';
import {
    SearchOutlined,
    DownloadOutlined,
    PoweroffOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import CodeExample from '../../../../components/common/CodeExample';
import styles from './Buttons.module.scss';

const { Title, Paragraph } = Typography;

const buttonTypesCode = `import { Button } from 'antd';

const MyComponent = () => (
  <Space>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="link">Link</Button>
  </Space>
);`;

const buttonSizesCode = `import { Button } from 'antd';

const MyComponent = () => (
  <Space>
    <Button type="primary" size="large">Large</Button>
    <Button type="primary">Default</Button>
    <Button type="primary" size="small">Small</Button>
  </Space>
);`;

const iconButtonsCode = `import { Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

const MyComponent = () => (
  <Space>
    <Button type="primary" icon={<SearchOutlined />}>
      Search
    </Button>
    <Button icon={<DownloadOutlined />}>
      Download
    </Button>
    <Button type="primary" shape="circle" icon={<SearchOutlined />} />
    <Button type="primary" shape="round" icon={<DownloadOutlined />}>
      Download
    </Button>
  </Space>
);`;

const loadingButtonsCode = `import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const MyComponent = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Space>
      <Button type="primary" loading>Loading</Button>
      <Button type="primary" loading={loading} onClick={handleClick}>
        Click me!
      </Button>
      <Button type="primary" icon={<PoweroffOutlined />} loading={loading} onClick={handleClick}>
        Click me!
      </Button>
    </Space>
  );
};`;

const buttonGroupsCode = `import { Button, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const MyComponent = () => (
  <Space>
    <Button.Group>
      <Tooltip title="Add">
        <Button icon={<PlusOutlined />} />
      </Tooltip>
      <Tooltip title="Delete">
        <Button icon={<DeleteOutlined />} />
      </Tooltip>
    </Button.Group>
    <Button.Group>
      <Button>Cancel</Button>
      <Button type="primary">Submit</Button>
    </Button.Group>
  </Space>
);`;

const Buttons = () => {
    const [loadingStates, setLoadingStates] = React.useState({
        button1: false,
        button2: false,
    });

    const handleLoadingClick = (buttonKey: keyof typeof loadingStates) => {
        setLoadingStates(prev => ({ ...prev, [buttonKey]: true }));
        setTimeout(() => {
            setLoadingStates(prev => ({ ...prev, [buttonKey]: false }));
        }, 2000);
    };

    return (
        <div className={styles.buttonsPage}>
            <Title level={2}>Buttons</Title>
            <Paragraph>
                Buttons allow users to take actions and make choices with a single tap.
                They communicate actions that users can take and are typically placed
                throughout your interface.
            </Paragraph>

            <CodeExample
                title="Button Types"
                description="There are primary, default, dashed, text and link button types."
                code={buttonTypesCode}
            >
                <Space>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="text">Text</Button>
                    <Button type="link">Link</Button>
                </Space>
            </CodeExample>

            <CodeExample
                title="Button Sizes"
                description="Buttons come in three sizes: large, default and small."
                code={buttonSizesCode}
            >
                <Space>
                    <Button type="primary" size="large">Large</Button>
                    <Button type="primary">Default</Button>
                    <Button type="primary" size="small">Small</Button>
                </Space>
            </CodeExample>

            <CodeExample
                title="Icon Buttons"
                description="Buttons can contain icons to help identify actions."
                code={iconButtonsCode}
            >
                <Space wrap>
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Button icon={<DownloadOutlined />}>
                        Download
                    </Button>
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                    <Button type="primary" shape="round" icon={<DownloadOutlined />}>
                        Download
                    </Button>
                </Space>
            </CodeExample>

            <CodeExample
                title="Loading Buttons"
                description="A loading indicator can be added to a button to show loading state."
                code={loadingButtonsCode}
            >
                <Space wrap>
                    <Button type="primary" loading>Loading</Button>
                    <Button
                        type="primary"
                        loading={loadingStates.button1}
                        onClick={() => handleLoadingClick('button1')}
                    >
                        Click me!
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        loading={loadingStates.button2}
                        onClick={() => handleLoadingClick('button2')}
                    >
                        Click me!
                    </Button>
                </Space>
            </CodeExample>

            <CodeExample
                title="Button Groups"
                description="Multiple buttons can be grouped together."
                code={buttonGroupsCode}
            >
                <Space direction="vertical">
                    <Button.Group>
                        <Tooltip title="Add">
                            <Button icon={<PlusOutlined />} />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button icon={<DeleteOutlined />} />
                        </Tooltip>
                    </Button.Group>
                    <Button.Group>
                        <Button>Cancel</Button>
                        <Button type="primary">Submit</Button>
                    </Button.Group>
                </Space>
            </CodeExample>
        </div>
    );
};

export default Buttons;