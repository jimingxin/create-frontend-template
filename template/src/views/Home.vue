<template>
  <main class="home">
    <section class="hero">
      <p class="tag">Gauss Vue Template</p>
      <h1>Single Page Starter</h1>
      <p class="desc">
        This template keeps the project structure (`stores`, `utils`, `api`, `components`) and ships with JavaScript-only setup.
      </p>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #f5f7fb;
}

.hero {
  width: min(760px, 100%);
  background: #fff;
  border: 1px solid #dce3f1;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(18, 38, 63, 0.08);
}

.tag {
  display: inline-block;
  margin-bottom: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e8efff;
  color: #3156cc;
  font-size: 12px;
}

h1 {
  margin: 0 0 12px;
  font-size: 32px;
  color: #1c2a4a;
}

.desc {
  margin: 0;
  color: #4a5b82;
  line-height: 1.6;
}
</style>
