import React, { useState } from 'react';
import { Card, List, Modal } from 'antd-mobile';
import '../../CSS/SummaryComponent.css';
import { CheckCircleFill, RightOutline } from 'antd-mobile-icons';

const SummaryComponent = ({ totalAmount, shippingFee, discount, coupons, finalAmount, onCouponSelect }) => {
    const [visible, setVisible] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(coupons.length > 0 ? Math.max(...coupons) : 0);

    const showModal = () => setVisible(true);
    const closeModal = () => setVisible(false);
    const handleSelect = (coupon) => {
        setSelectedCoupon(coupon);
        onCouponSelect(coupon); // 调用传递的处理函数更新 selectedCoupon
        closeModal();
    };

    return (
        <Card className="summary-component-card">
            <List>
                <List.Item
                    extra={<div className="align-right">¥{totalAmount.toFixed(2)}</div>}
                    className="align-left"
                >
                    商品金额
                </List.Item>
                <List.Item
                    extra={<div className="align-right">¥{shippingFee.toFixed(2)}</div>}
                    className="align-left"
                >
                    运费
                </List.Item>
                <List.Item
                    extra={<div className="align-right red-text">- ¥{discount.toFixed(2)}</div>}
                    className="align-left"
                >
                    立减
                </List.Item>
                <List.Item
                    extra={
                        <div onClick={showModal} className="coupon-selector align-right">
                            <span className="red-text">{selectedCoupon > 0 ? `- ¥${selectedCoupon.toFixed(2)}` : '无可用优惠券'}</span>
                            <RightOutline />
                        </div>
                    }
                    className="align-left"
                >
                    优惠券
                </List.Item>
                <List.Item
                    extra={<div className="align-right red-text">¥{finalAmount.toFixed(2)}</div>}
                    className="align-left"
                >
                    合计
                </List.Item>
            </List>

            <Modal
                visible={visible}
                onClose={closeModal}
                title="选择优惠券"
                content={
                    <List>
                        {coupons.map((coupon, index) => (
                            <List.Item
                                key={index}
                                onClick={() => handleSelect(coupon)}
                                extra={selectedCoupon === coupon && <CheckCircleFill color="green" />}
                                className="modal-coupon-item"
                            >
                                - ¥{coupon.toFixed(2)}
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
        </Card>
    );
};

export default SummaryComponent;
