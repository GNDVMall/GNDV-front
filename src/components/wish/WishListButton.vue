<template>
  <Button :text="buttonText" :clickHandler="toggleWish">
    <i class="fa-solid fa-bookmark"></i>
  </Button>
</template>

<script>
import { instance } from "@/utils/axios";
import Button from "../common/Button/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    itemId: {
      type: Number,
      required: true,
    },
    wishCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isWished: false,
      currentWishCount: this.wishCount,
      loading: true,
    };
  },
  computed: {
    buttonText() {
      return `관심 상품 ${this.currentWishCount}`;
    },
  },
  async mounted() {
    await this.checkWishStatus();
  },
  methods: {
    async checkWishStatus() {
      try {
        console.log("Checking wish status for itemId:", this.itemId);
        const response = await instance.get(
          `/wish/status?itemId=${this.itemId}`
        );
        this.isWished = response.data.isWished;
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      } finally {
        this.loading = false;
      }
    },
    async toggleWish() {
      try {
        if (this.loading) return;
        this.loading = true;
        console.log("Toggling wish for itemId:", this.itemId);
        const response = await instance.post("/wish", {
          itemId: this.itemId,
        });

        if (response.data === "Wish added successfully") {
          this.currentWishCount += 1;
        } else if (response.data === "Wish removed successfully") {
          this.currentWishCount -= 1;
        }

        this.isWished = !this.isWished;
        console.log("Wishlist toggled successfully:", response.data);
      } catch (error) {
        console.error("Error toggling wishlist:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
