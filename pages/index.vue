<template>
  <div class="main-wrap">
    <header class="header">
      <div class="container">
        <div class="card">
          <div class="card-image"
               style="background-color: red">
            <nuxt-link to="/#"
                       no-prefetch>1</nuxt-link>
          </div>
        </div>
        <div class="card">
          <div class="card-image"
               style="background-color: blue">
            <nuxt-link to="/#"
                       no-prefetch>2</nuxt-link>
          </div>
        </div>
        <div class="card">
          <div class="card-image"
               style="background-color: yellow">
            <nuxt-link to="/#"
                       no-prefetch>3</nuxt-link>
          </div>
        </div>
        <div class="card">
          <div class="card-image"
               style="background-color: green">
            <nuxt-link to="/#"
                       no-prefetch>4</nuxt-link>
          </div>
        </div>
      </div>
    </header>
    <section class="section">
      <div class="container">
        <div class="media"
             style="background-color: #b4127c">
          <div class="media-left">
            <figure class="image">
              <img src="https://dummyimage.com/240x140/000/fff"
                   alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <a class="media-head">标题</a>
            <div class="content">列表内容</div>
            <div class="level">
              <div class="level-left">
                <time>11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
        <div class="media"
             style="background-color: #51a663">
          <div class="media-left">
            <figure class="image">
              <img src="https://dummyimage.com/240x140/000/fff"
                   alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <a class="media-head">标题</a>
            <div class="content">列表内容</div>
            <div class="level">
              <div class="level-left">
                <time>11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
        <div class="media"
             style="background-color: #69d7ac">
          <div class="media-left">
            <figure class="image">
              <img src="https://dummyimage.com/240x140/000/fff"
                   alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <a class="media-head">标题</a>
            <div class="content">列表内容</div>
            <div class="level">
              <div class="level-left">
                <time>11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
        <div class="media"
             style="background-color: #0d6785">
          <div class="media-left">
            <figure class="image">
              <img src="https://dummyimage.com/240x140/000/fff"
                   alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <a class="media-head">标题</a>
            <div class="content">列表内容</div>
            <div class="level">
              <div class="level-left">
                <time>11:09 PM - 1 Jan 2016</time>
              </div>
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
  data () {
    return {
      catgList: [
        { id: 1, link: '01', catg: '我思我在' },
        { id: 2, link: '02', catg: '技术心得' },
        { id: 3, link: '03', catg: '开卷益处' },
        { id: 4, link: '04', catg: '诗与远方' }
      ]
    }
  }
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

    & > .container {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: flex-start;
    }

    .media {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      &-left {
        flex-grow: 0;
        flex-shrink: 0;
      }

      &-content {
        flex-grow: 1;
        flex-shrink: 0;
        // 暂时
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
      }
    }
  }
}
</style>
