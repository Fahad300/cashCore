import React from 'react';
import { 
    Typography, Form, Input, Button, Select, Checkbox, Radio, 
    DatePicker, InputNumber, Switch, Upload, Space, Card 
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import CodeExample from '../../../../components/common/CodeExample';
import styles from './Forms.module.scss';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const basicFormCode = `import { Form, Input, Button } from 'antd';

const BasicForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};`;

const advancedFormCode = `import { Form, Input, Select, DatePicker, InputNumber, Switch } from 'antd';

const AdvancedForm = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="select" label="Select" rules={[{ required: true }]}>
        <Select>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </Select>
      </Form.Item>

      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="number" label="Number" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="switch" label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
};`;

const validationFormCode = `import { Form, Input } from 'antd';

const ValidationForm = () => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: '\${label} is required!',
    types: {
      email: '\${label} is not a valid email!',
      number: '\${label} is not a valid number!',
    },
    number: {
      range: '\${label} must be between \${min} and \${max}',
    },
  };

  return (
    <Form
      form={form}
      layout="vertical"
      validateMessages={validateMessages}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true },
          { type: 'email' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        rules={[
          { required: true },
          { type: 'number', min: 0, max: 99 }
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};`;

const uploadFormCode = `import { Form, Upload, Button } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const UploadForm = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form layout="vertical">
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="file" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item name="dragger" label="Dragger">
        <Upload.Dragger name="files" action="/upload.do">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Upload.Dragger>
      </Form.Item>
    </Form>
  );
};`;

const Forms = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className={styles.formsPage}>
            <Title level={2}>Forms</Title>
            <Paragraph>
                Form components for collecting, validating, and submitting user input.
                Forms are one of the most important components for collecting user data.
            </Paragraph>

            <CodeExample
                title="Basic Form"
                description="A basic form with validation and submit handling."
                code={basicFormCode}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: 500 }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </CodeExample>

            <CodeExample
                title="Advanced Form Controls"
                description="Examples of different form controls including select, date picker, and switch."
                code={advancedFormCode}
            >
                <Form layout="vertical" style={{ maxWidth: 500 }}>
                    <Form.Item name="select" label="Select" rules={[{ required: true }]}>
                        <Select>
                            <Option value="option1">Option 1</Option>
                            <Option value="option2">Option 2</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="dateRange" label="Date Range">
                        <RangePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="number" label="Number" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="switch" label="Switch" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item name="textarea" label="Text Area">
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </CodeExample>

            <CodeExample
                title="Form Validation"
                description="Examples of form validation rules and custom validation messages."
                code={validationFormCode}
            >
                <Form
                    layout="vertical"
                    style={{ maxWidth: 500 }}
                    validateMessages={{
                        required: '${label} is required!',
                        types: {
                            email: '${label} is not a valid email!',
                            number: '${label} is not a valid number!',
                        },
                        number: {
                            range: '${label} must be between ${min} and ${max}',
                        },
                    }}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true },
                            { type: 'email' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="age"
                        label="Age"
                        rules={[
                            { required: true },
                            { type: 'number', min: 0, max: 99 }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="website"
                        label="Website"
                        rules={[
                            { required: true },
                            { type: 'url', message: 'Please enter a valid URL' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </CodeExample>

            <CodeExample
                title="Upload Form"
                description="Form with file upload capabilities."
                code={uploadFormCode}
            >
                <Form layout="vertical" style={{ maxWidth: 500 }}>
                    <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="file" action="/upload.do" listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="dragger" label="Dragger">
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </CodeExample>
        </div>
    );
};

export default Forms;