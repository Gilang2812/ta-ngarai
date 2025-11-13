"use client";

import { ShippingMethodSelector } from "@/components/checkout/ShippingMethodSelector";
import Button from "@/components/common/Button";
import { AddressSection } from "@/components/checkout/AddressSection";
import { formatPrice } from "@/lib/priceFormatter";
import { SingleContentWrapper } from "@/components/common/SingleContentWrapper";
import { useCheckout } from "@/hooks/useCheckout";
import CheckoutSkeletonLoader from "@/components/loading/CheckoutSkeletonLoader";
import Link from "next/link";
import { useFormik } from "formik";
import { cornerAlert, cornerError, showLoadingAlert } from "@/utils/AlertUtils";
import { useEffect } from "react";
import { createShippingStoreBody } from "@/lib/createShippingStoreBody";
import { useCompleteCheckout } from "@/features/web/checkout/useCompleteCheckout";
import { useRouter } from "next/navigation";
// import { useUpdateStatus } from "@/features/web/checkout/useUpdateStatus";

export default function CheckoutPage() {
  const {
    checkout,
    checkoutLoading,
    editingAddress,
    handleSaveAddress,
    handleCancelAddressForm,
    selectedAddress,
    handleSelectAddress,
    handleAddNewAddress,
    handleEditAddress,
    showAddressForm,
    addressInitialValues,
    isPending,
    shippingMethods,
    itemShipping,
    setItemShipping,
    setShippingMethods,
    groupedItems,
  } = useCheckout();
  const router = useRouter();
  const subTotal = groupedItems
    .flat()
    .reduce((acc, item) => acc + item?.detailCraft?.price * item?.jumlah, 0);
  const total_shipping_cost = itemShipping?.reduce(
    (acc, item) => acc + item?.price,
    0
  );

  const total = subTotal + (total_shipping_cost || 0);
  // const { mutateAsync: updateStatus, isPending: updatingStatus } =
  //   useUpdateStatus({
  //     onSuccess: () => {
  //       cornerAlert("Checkout status updated successfully");
  //     },
  //   });

  const { mutate: checkoutOrder, isPending: checkoutPending } =
    useCompleteCheckout({
      onSuccess: async (data) => {
        cornerAlert("Order placed successfully");
        const paymentData = data as { token: string; shippings: number[] };
        window.snap.pay(paymentData.token, {
          onSuccess: async (result) => {
            cornerAlert("Payment success:" + result.order_id);

            router.push("./cart?tab=craft&status=success");
          },
          onPending: async (result) => {
            cornerAlert("Payment pending:" + result.order_id);

            router.push("./reservation?tab=craft&status=pending");
          },
          onError: async (result) => {
            cornerError("Payment error:" + result.order_id);
            cornerError("Payment failed, please try again");
            router.push("./reservation?tab=craft&status=error");
          },
          onClose: async () => {
            cornerAlert("Payment closed");
            router.push("./reservation?tab=craft&status=closed");
          },
        });
      },
    });

  useEffect(() => {
    if (checkoutPending || isPending) {
      showLoadingAlert();
    }
  }, [isPending, checkoutPending]);

  const formikOrder = useFormik({
    initialValues: {
      checkout_id: "",
      total_shipping_cost: 0,
      sub_total: 0,
      total: 0,
      items: [],
      item_details: [],
      shippings: [],
    },
    onSubmit: () => {
      if (groupedItems.length !== itemShipping.filter((i) => i).length) {
        return cornerError("Please select shipping method for all items");
      }
      const itemDetails = [
        ...groupedItems.flat().map((item) => ({
          id: `${item.id_souvenir_place}-${item?.craft_variant_id}`,
          name: `${item?.detailCraft?.variant?.craft?.name} - ${item?.detailCraft?.variant?.name}`,
          price: item?.detailCraft?.price,
          quantity: item?.jumlah,
        })),
        {
          id: "shipping",
          name: "Shipping Cost",
          price: itemShipping.reduce(
            (acc, curr) => acc + (curr?.price || 0),
            0
          ),
          quantity: 1,
        },
      ];
      checkoutOrder({
        checkout_id: checkout?.id,
        total_shipping_cost: total_shipping_cost,
        sub_total: subTotal,
        total: total,
        items: groupedItems.flat(),
        item_details: itemDetails,
        shippings: createShippingStoreBody({
          groupedItems,
          checkout,
          itemShipping,
          selectedAddress,
        }),
      });
    },
  });

  const handleNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const prevItemLength = groupedItems.slice(0, index)?.flat().length ?? 0;

    groupedItems[index].forEach((item, groupIndex) => {
      formikOrder.setFieldValue(
        `items[${prevItemLength + groupIndex}].note`,
        event.target.value
      );
    });
  };

  if (checkoutLoading && !checkout) return <CheckoutSkeletonLoader />;
  if (checkout && checkout?.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-6">You dont have any items in your cart.</p>
        <Link href="/products">Browse Products</Link>
      </div>
    );
  }

  return (
    checkout && (
      <SingleContentWrapper>
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border space-y-4 border-gray-200 p-6 mb-6">


              <h2 className="text-xl font-semibold mb-6">
                Billing Information
              </h2>
              {selectedAddress && (
                <AddressSection
                  editingAddress={editingAddress}
                  handleSaveAddress={handleSaveAddress}
                  handleCancelAddressForm={handleCancelAddressForm}
                  addresses={
                    checkout?.shippingAddress.addressCustomer.addresses
                  }
                  isPending={isPending}
                  addressInitialValues={addressInitialValues}
                  selectedAddress={selectedAddress}
                  onSelectAddress={handleSelectAddress}
                  onAddNewAddress={handleAddNewAddress}
                  onEditAddress={handleEditAddress}
                  showAddressForm={showAddressForm}
                />
              )}
              {selectedAddress && (
                <ShippingMethodSelector
                  shippingMethods={shippingMethods}
                  groupedItems={groupedItems}
                  selectedAddressId={selectedAddress.destination_id}
                  itemShipping={itemShipping}
                  setItemShipping={setItemShipping}
                  setShippingMethods={setShippingMethods}
                  handleNoteChange={handleNoteChange}
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6 space-y-6">

              <form onSubmit={formikOrder.handleSubmit}>
                <h2 className="text-lg font-semibold  py-4 border-t">
                  Order Summary
                </h2>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatPrice(subTotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span>{formatPrice(total_shipping_cost)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="mt-6"
                  type="submit"
                  disabled={!selectedAddress}
                >
                  Place Order
                </Button>
              </form>
            </div>
          </div>
        </div>
      </SingleContentWrapper>
    )
  );
}
