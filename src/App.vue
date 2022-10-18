<script setup></script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <template #default>
          <div>
            <component :is="Component"></component>
          </div>
        </template>
        <template #fallback>
          <div>Loading...</div>
        </template>
      </suspense>
    </router-view>
  </div>
</template>

<style scoped>
.loading {
  font-size: 48px;
}

.wrapper {
  text-align: center;
}
</style>
