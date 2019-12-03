<template>
  <div class="main-wrap">
    <header class="header">
      <div class="container">
        <div class="card">
          <div class="card-image"
               style="background-color: red">1</div>
        </div>
        <div class="card">
          <div class="card-image"
               style="background-color: blue">2</div>
        </div>
        <div class="card">
          <div class="card-image"
               style="background-color: yellow">3</div>
        </div>
        <div class="card">
          <div class="card-image"
               style="background-color: green">4</div>
        </div>
      </div>
    </header>
    <section class="section">
      <div class="container">
        <div class="media">
          <div class="media-left">
            <figure class="image">
              <img src="https://dummyimage.com/240x140/000/fff"
                   alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content"></div>
            <div class="level">
              <div class="level-left"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  layout: 'main'
};
</script>

<style lang="scss" scoped>
.main-wrap {
  width: 760px;
  min-width: 760px;

  .header {
    & > .container {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
    }

    .card {
      width: 180px;
      height: 100%;

      &-image {
        height: 125px;
        padding: 1.25rem;
      }
    }
  }

  .section {
    color: #fff;
    background-color: red;
  }
}
</style>
