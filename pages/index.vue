<template>
  <div class="main-wrap">
    <header class="header">
      <div class="container">
        <div class="card"
             v-for="(item,index) in catgList"
             :key="index">
          <div class="card-wrap">
            <nuxt-link class="card-link"
                       to="/#"
                       no-prefetch>
              <img class="card-img"
                   :src="item.link"
                   alt="item.name" />
              <div class="card-item">
                <i class="card-icon">
                  <svg-icon :name="item.icon" /></i>
                <span class="card-title">{{item.catg}}</span>
              </div>
            </nuxt-link>
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
        { id: 1, name: 'code', icon: 'code', link: '//static.ikmoons.com/code.jpg', catg: '码不停蹄' },
        { id: 2, name: 'book', icon: 'book', link: '//static.ikmoons.com/book.jpg', catg: '开卷益处' },
        { id: 3, name: 'gear', icon: 'gear', link: '//static.ikmoons.com/gear.jpg', catg: '技术心得' },
        { id: 4, name: 'travel', icon: 'travel', link: '//static.ikmoons.com/travel.jpg', catg: '诗与远方' }
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

      &-wrap {
        overflow: hidden;
        border-radius: $radius-size;
        height: 118px;

        .card-link {
          position: relative;
          display: inline-block;

          .card-img {
            width: 180px;
          }
          .card-item {
            position: absolute;
            left: 35%;
            bottom: 14%;
            text-align: center;

            .card-icon {
              display: block;
            }
            .card-title {
              margin: 1rem 0;
              color: $primary-color-text;
              display: inline-block;
            }
          }
        }
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
