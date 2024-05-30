<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">
            <div class="cursor-pointer"><i class="fa-solid fa-x"></i></div>
        </button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CommonModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  