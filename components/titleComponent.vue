<template>
  <div>
    <h1>
      <slot></slot>
    </h1>
    <div class="divider mb-3"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.divider {
    width: 100%;
    background-color: #f5c518;
    height: 1px;
    border-radius: 10px;
}
h1{
    color: #f5c518;
}
</style>
