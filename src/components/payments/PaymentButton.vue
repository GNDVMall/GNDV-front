<template>
  <Button :text="'안전 거래'" :type="'green'" :clickHandler="handlePayment">
    <i class="fa-solid fa-money-check-dollar"></i>
  </Button>
</template>

<script>
import { instance } from "@/utils/axios.js";
import { loadIamportScript } from "@/utils/importIamport";
import Button from "@/components/common/Button/Button.vue";

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
  },
  setup(props, { emit }) {
    const createOrder = async () => {
      try {
        const res = await instance.post("/order", {
          product_id: props.productId,
          price: props.price,
          item_name: props.itemName,
        });
        if (res.data.status === "OK") {
          return res.data.data;
        } else {
          console.error("Failed to create order", res.data);
          throw new Error("Order creation failed");
        }
      } catch (error) {
        console.error("Error creating order", error);
        throw error;
      }
    };

    const handlePayment = async () => {
      try {
        await loadIamportScript();
        const orderData = await createOrder();

        const { IMP } = window;
        IMP.init("imp03075617"); // 아임포트 상점 식별코드로 교체하세요

        IMP.request_pay(
          {
            pg: "html5_inicis.INIpayTest", // 사용할 PG사
            pay_method: "card", // 결제 수단
            merchant_uid: orderData.order_uid, // 상점에서 생성한 고유 주문번호
            name: props.itemName, // 주문명
            amount: props.price, // 결제 금액
            buyer_email: "user@example.com", // 예시 데이터
            buyer_name: "구매자 이름", // 예시 데이터
            buyer_tel: "010-1234-5678", // 예시 데이터
            buyer_addr: "서울특별시 강남구 삼성동", // 예시 데이터
            buyer_postcode: "123-456", // 예시 데이터
          },
          (rsp) => {
            if (rsp.success) {
              console.log("Payment succeeded", rsp);
              emit("paymentSuccess", {
                order_uid: orderData.order_uid,
                payment_uid: rsp.imp_uid,
                status: "PAID", // 예시 상태
              });
            } else {
              console.error("Payment failed", rsp);
            }
          }
        );
      } catch (error) {
        console.error("Error during payment process", error);
      }
    };

    return {
      handlePayment,
    };
  },
};
</script>

<style scoped>
/* Tailwind CSS classes are used for styling */
</style>
