import React from 'react';
import { Modal, Typography, Input, QRCode, Button, Space, Select } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import styles from './WalletActions.module.scss';

const { Text, Title } = Typography;

interface DepositModalProps {
    visible: boolean;
    onClose: () => void;
    selectedCoin: {
        coin: string;
        icon: string;
        address: string;
        network: string[];
    } | null;
}

const DepositModal: React.FC<DepositModalProps> = ({ visible, onClose, selectedCoin }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    if (!selectedCoin) return null;

    return (
        <Modal
            title={`Deposit ${selectedCoin.coin}`}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={480}
        >
            <div className={styles.depositModal}>
                <div className={styles.networkSelect}>
                    <Text type="secondary">Select Network</Text>
                    <Select 
                        defaultValue={selectedCoin.network[0]}
                        style={{ width: '100%', marginTop: 8 }}
                    >
                        {selectedCoin.network.map(net => (
                            <Select.Option key={net} value={net}>{net}</Select.Option>
                        ))}
                    </Select>
                </div>

                <div className={styles.qrSection}>
                    <QRCode value={selectedCoin.address} size={200} />
                </div>

                <div className={styles.addressSection}>
                    <Text type="secondary">Deposit Address</Text>
                    <div className={styles.addressBox}>
                        <Input.TextArea 
                            value={selectedCoin.address}
                            readOnly
                            autoSize
                        />
                        <Button 
                            icon={<CopyOutlined />}
                            onClick={() => handleCopy(selectedCoin.address)}
                        />
                    </div>
                </div>

                <div className={styles.warning}>
                    <Text type="warning">
                        • Send only {selectedCoin.coin} to this deposit address
                        <br />
                        • Ensure the network is correct before depositing
                    </Text>
                </div>
            </div>
        </Modal>
    );
};

export default DepositModal; 