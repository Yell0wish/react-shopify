import React, { useState } from 'react';
import { Button, Card, Input, List, Modal, Toast } from 'antd-mobile';
import { EditFill, AddOutline, DeleteOutline } from 'antd-mobile-icons';
import '../CSS/AddressPage.css';
import userService from '../Services/UserSerive'

const AddressPage = () => {
    const [addresses, setAddresses] = useState(userService.getAddresses());
    const [visible, setVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [form, setForm] = useState({ name: '', phone: '', address: '' });

    const handleAdd = () => {
        setForm({ name: '', phone: '', address: '' });
        setEditingIndex(-1);
        setVisible(true);
    };

    const handleEdit = (index) => {
        setForm(addresses[index]);
        setEditingIndex(index);
        setVisible(true);
    };

    const handleDelete = (index) => {
        const newAddresses = addresses.filter((_, i) => i !== index);
        userService.user.addresses = newAddresses;
        userService.saveUser();
        setAddresses(newAddresses);
        Toast.show({
            content: '地址已删除',
            duration: 2000,
        });
    };

    const handleSave = () => {
        const newAddresses = [...addresses];
        if (editingIndex === -1) {
            newAddresses.push(form);
            Toast.show({
                content: '地址已添加',
                duration: 2000,
            });
        } else {
            newAddresses[editingIndex] = form;
            Toast.show({
                content: '地址已更新',
                duration: 2000,
            });
        }
        userService.user.addresses = newAddresses;
        userService.saveUser();
        setAddresses(newAddresses);
        setVisible(false);
    };

    return (
        <div className="address-page">
            <h1 className='address-title'>地址管理</h1>
            <List>
                {addresses.map((address, index) => (
                    <Card key={index} className="address-card">
                        <div className="address-info">
                            <div className="address-detail">{address.address}</div>
                            <div className="address-name-phone">
                                <span>{address.name}</span>
                                <span className="phone">{address.phone}</span>
                                <DeleteOutline className="delete-icon" onClick={() => handleDelete(index)} />
                            </div>
                        </div>
                        <EditFill className="edit-icon" onClick={() => handleEdit(index)} />
                    </Card>
                ))}
            </List>
            <div className="add-address-fixed">
                <Button onClick={handleAdd} block shape="rounded"  icon={<AddOutline />} className="add-address-button">
                    新建收货地址
                </Button>
            </div>
            <Modal
                visible={visible}
                title={editingIndex === -1 ? '添加地址' : '编辑地址'}
                closeOnAction
                onClose={() => setVisible(false)}
                actions={[
                    {
                        key: 'cancel',
                        text: '取消',
                        onClick: () => setVisible(false),
                    },
                    {
                        key: 'save',
                        text: '保存',
                        onClick: handleSave,
                    },
                ]}
                content={
                    <div>
                        <div className="form-item">
                            <label>姓名</label>
                            <Input value={form.name} onChange={(val) => setForm({ ...form, name: val })} />
                        </div>
                        <div className="form-item">
                            <label>电话</label>
                            <Input value={form.phone} onChange={(val) => setForm({ ...form, phone: val })} />
                        </div>
                        <div className="form-item">
                            <label>地址</label>
                            <Input value={form.address} onChange={(val) => setForm({ ...form, address: val })} />
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default AddressPage;
