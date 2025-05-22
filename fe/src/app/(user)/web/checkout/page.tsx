// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
 
import { AddressForm } from '@/components/checkout/AddressForm';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { Address } from '@/type/schema/CheckoutSchema';
import { cartItems } from '@/data/craft';
import Button from '@/components/common/Button';
import { AddressSelector } from '@/components/checkout/AddressSelectior';
import { addresses } from '@/data/checkout';
import { formatPrice } from '@/lib/priceFormatter';
import { SingleContentWrapper } from '@/components/common/SingleContentWrapper';
 
type PaymentMethod = 'cod' | 'bank' | 'apar';
// type CheckoutStep = 'address' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const router = useRouter();
   
  
  const [addressList, setAddressList] = useState(addresses);
  const [selectedAddressId, setSelectedAddressId] = useState(
    addressList.find(addr => addr.isDefault)?.id || addressList[0]?.id || ''
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [orderNotes, setOrderNotes] = useState('');
  
  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };
  
  const handleAddNewAddress = () => {
    setEditingAddress(undefined);
    setShowAddressForm(true);
  };
  
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };
  
  const handleSaveAddress = (addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      // Update existing address
      setAddressList(prev => 
        prev.map(addr => 
          addr.id === editingAddress.id 
            ? { ...addr, ...addressData } 
            : addressData.isDefault ? { ...addr, isDefault: false } : addr
        )
      );
      if (addressData.isDefault) {
        setSelectedAddressId(editingAddress.id);
      }
    } else {
      // Add new address
      const newAddress = {
        ...addressData,
        id: `addr_${Date.now()}`,
      };
      
      setAddressList(prev => {
        const newList = addressData.isDefault
          ? prev.map(addr => ({ ...addr, isDefault: false }))
          : [...prev];
        
        return [...newList, newAddress];
      });
      
      if (addressData.isDefault) {
        setSelectedAddressId(newAddress.id);
      }
    }
    
    setShowAddressForm(false);
  };
  
  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(undefined);
  };
  
  const handleSubmitOrder = () => {
    // In a real app, this would make an API call to process the order
    alert('Order placed successfully!');
  
    router.push('/thank-you');
  };
  
//   const selectedAddress = addressList.find(addr => addr.id === selectedAddressId);
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">You dont have any items in your cart.</p>
        <Button onClick={() => router.push('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }
  
  return (
    <SingleContentWrapper>
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
            
            {showAddressForm ? (
              <AddressForm 
                address={editingAddress}
                onSave={handleSaveAddress}
                onCancel={handleCancelAddressForm}
              />
            ) : (
              <>
                <AddressSelector
                  addresses={addressList}
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={handleSelectAddress}
                  onAddNewAddress={handleAddNewAddress}
                  onEditAddress={handleEditAddress}
                />
                
                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                />
              </>
            )}
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Info</h2>
            <div>
              <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                id="orderNotes"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Notes about your order, e.g. special notes for delivery"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 mr-4 relative overflow-hidden rounded">
                    <Image 
                      src={item.image || "/api/placeholder/100/100"} 
                      alt={item.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium text-right">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>{formatPrice(100000)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span>Free</span>
              </div>
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(100000)}</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="primary"  
              className="mt-6" 
              onClick={handleSubmitOrder}
              disabled={!selectedAddressId}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </SingleContentWrapper>
  );
}