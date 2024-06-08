import React, { useState } from 'react';
import { List, Modal, Space } from 'antd-mobile';
import { EditFill, CheckCircleFill } from 'antd-mobile-icons';
import '../../CSS/AddressSelector.css';

function AddressSelector({ addresses, onSelectAddress }) {
  const [visible, setVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  const showModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const handleSelect = (address) => {
    setSelectedAddress(address);
    closeModal();
    onSelectAddress(address); // 回调传递所选地址
  };

  return (
    <div>
      <List>
        <List.Item
          extra={<EditFill className="edit-icon" />}
          arrow={false}
          onClick={showModal}
          className="address-item"
        >
          <Space direction="vertical" size="small">
            <span className="address-details">{selectedAddress.address}</span>
            <div className="name-phone">
              <span className="address-name">{selectedAddress.name}</span>
              <span className="address-phone">{selectedAddress.phone}</span>
            </div>
          </Space>
        </List.Item>
      </List>
      
      <Modal
        visible={visible}
        onMaskClick={closeModal}
        title="收货地址"
        content={
          <List>
            {addresses.map((address, index) => (
              <List.Item
                key={index}
                onClick={() => handleSelect(address)}
                extra={selectedAddress === address && <CheckCircleFill color="green" />}
                className="modal-address-item"
              >
                <Space direction="vertical" size="small">
                  <span className="address-details">{address.address}</span>
                  <div className="name-phone">
                    <span className="address-name">{address.name}</span>
                    <span className="address-phone">{address.phone}</span>
                  </div>
                </Space>
              </List.Item>
            ))}
          </List>
        }
        actions={[
          {
            key: 'cancel',
            text: '取消',
            onClick: closeModal,
          },
        ]}
      />
    </div>
  );
}

export default AddressSelector;
