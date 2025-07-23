<template>
  <nav class="pagination-container">
    <!-- Botão anterior -->
    <button
      class="page-btn"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      «
    </button>

    <!-- Primeira página -->
    <button
      v-if="showFirst"
      class="page-btn"
      @click="goToPage(1)"
      :class="{ active: currentPage === 1 }"
    >
      1
    </button>

    <!-- Reticências antes -->
    <span v-if="showLeftDots" class="dots">...</span>

    <!-- Páginas intermediárias -->
    <button
      v-for="page in middlePages"
      :key="page"
      class="page-btn"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>

    <!-- Reticências depois -->
    <span v-if="showRightDots" class="dots">...</span>

    <!-- Última página -->
    <button
      v-if="showLast"
      class="page-btn"
      @click="goToPage(totalPages)"
      :class="{ active: currentPage === totalPages }"
    >
      {{ totalPages }}
    </button>

    <!-- Botão próximo -->
    <button
      class="page-btn"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      »
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  totalPages: number;
  modelValue: number; // Página atual
  maxVisible?: number; // Quantas páginas mostrar no meio (default 5)
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", page: number): void;
  (e: "page-changed", page: number): void;
}>();

const currentPage = computed(() => props.modelValue);
const maxVisible = props.maxVisible ?? 5;

function goToPage(page: number) {
  if (page < 1 || page > props.totalPages) return;
  emit("update:modelValue", page);
  emit("page-changed", page); // Evento para buscar no backend
}

// Calcular páginas do meio
const middlePages = computed(() => {
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(currentPage.value - half, 2);
  let end = Math.min(start + maxVisible - 1, props.totalPages - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(end - maxVisible + 1, 2);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const showFirst = computed(() => currentPage.value > 1);
const showLast = computed(() => currentPage.value < props.totalPages);
const showLeftDots = computed(() => middlePages.value[0] > 2);
const showRightDots = computed(
  () => middlePages.value[middlePages.value.length - 1] < props.totalPages - 1
);
</script>

<style scoped>
.pagination-container {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #f9f9f9;
  cursor: pointer;
  border-radius: 4px;
  min-width: 36px;
}

.page-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.page-btn:disabled {
  background: #e9e9e9;
  cursor: not-allowed;
}

.dots {
  padding: 0 4px;
}
</style>
