<template>
  <div class="cmt-main">
    <div class="cmt-head">
      <form ref="commentform"
            class="head-form"
            :data-id="replyId"
            :data-uid="subReplyId"
            v-model="form">
        <div :class="[isMobile? 'mobile-head':'field-head']">
          <div class="control has-icons-left">
            <input class="input"
                   type="text"
                   v-model="form.name"
                   placeholder="用户*" />
            <span class="icons">
              <svg-icon class="me"
                        name="me" />
            </span>
          </div>
          <div class="control has-icons-left">
            <input class="input"
                   type="text"
                   v-model="form.email"
                   placeholder="邮件*" />
            <span class="icons">
              <svg-icon class="email"
                        name="email-hili" />
            </span>
          </div>
          <div class="control has-icons-left">
            <input class="input"
                   type="text"
                   v-model="form.site"
                   placeholder="网址" />
            <span class="icons">
              <svg-icon class="globe"
                        name="globe" />
            </span>
          </div>
        </div>
        <div v-if="isReplyActive"
             class="field-reply">
          <div class="reply-head">
            回复:&nbsp;<strong>@{{replyName}}</strong>
          </div>
          <i class="reply-icons"
             @click="onCloseBox">
            <svg-icon name="close" />
          </i>
        </div>
        <div class="field-body">
          <div class="markdown">
            <div class="markdown-editor"
                 ref="markdown"
                 contenteditable="true"
                 placeholder="输入评论..."
                 @keyup="changeCommentCont($event)"
                 @focus="changeCommentCont($event)">
            </div>
            <div class="markdown-tools">
              <span :class="[isMobile?'mobile-emoji' : 'emoji']"
                    title="emoji"
                    @click.stop.prevent="isActive = !isActive">
                <i class="emoji-icon">
                  <svg-icon name="emoji" />
                </i>
                <div class="emoji-box"
                     v-show="isActive">
                  <ul class="emoji-list">
                    <li class="emoji-item"
                        v-for="(item,index) in emojis"
                        :key="index"
                        @click="insertEmojis(item)"
                        v-text="item"></li>
                  </ul>
                </div>
              </span>
              <span class="image"
                    title="images"
                    @click.stop.prevent="insertCont('image')">
                <i class="image-icon">
                  <svg-icon name="image" />
                </i>
              </span>
              <span class="link"
                    title="link"
                    @click.stop.prevent="insertCont('link')">
                <i class="link-icon">
                  <svg-icon name="link" />
                </i>
              </span>
              <span class="code"
                    title="code"
                    @click.stop.prevent="insertCont('code')">
                <i class="code-icon">
                  <svg-icon name="code-small" />
                </i>
              </span>
              <span class="sub-left">
                <button type="submit"
                        class="btn is-grey"
                        @click="submitComment($event)">
                  提交
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="cmt-list">
      <div class="list-head">
        <div class="head-left">共有&nbsp;{{listLen}}&nbsp;条评论</div>
        <!-- TODO：暂时开发评论最新和最热 -->
        <!-- <div class="head-right">最新|最热</div> -->
      </div>
      <div v-if="list.length === 0"
           class="list-noMedia">🙂暂无评论</div>
      <div v-else
           ref="reply"
           class="list-media"
           v-for="(item,index) in list"
           :key="index">
        <figure class="media-left">
          <img class="left-image"
               :src="item.from_avatar"
               alt="avatar" />
        </figure>
        <div class="media-content">
          <span class="head">
            <strong class="name">
              <a :href='item.from_webSite == "" ? "#": item.from_webSite'
                 v-text="item.from_user"></a></strong>
            <span class="right">
              <small class="location"
                     v-if="item.from_locate !== null">
                <span>{{item.from_locate.country}}</span>
                <span v-if="item.from_locate.country && item.from_locate.city">&nbsp;-&nbsp;</span>
                <span>{{item.from_locate.city}}</span>
              </small>
              <comment-ua v-if="!isMobile"
                          class="ua"
                          :ua="item.from_ua"></comment-ua>
            </span>
          </span>
          <div class="content"
               v-html="$md.render(item.from_content)"></div>
          <nav class="level">
            <div class="level-left">
              <a class="level-item"
                 :class="[isLikedComment(item.id,'comment')?'isliked':'']"
                 @click.stop="likeArtComment(item.id,'comment')">
                <i class="like-icon">
                  <svg-icon name="like" />
                </i>
                <span class="like-text">{{item.like}}</span>
              </a>
              <a class="level-item"
                 @click.stop="onReplyComment(item)">
                <i class="huifu-icon">
                  <svg-icon name="huifu" />
                </i>
                <span>回复</span>
              </a>
            </div>
            <div class="level-right">
              <span class="right-time">{{getCmdDate(item.from_date)}}</span>
            </div>
          </nav>
          <div v-if="item.replys.lenght !== 0"
               class="sub-comment-list">
            <div class="sub-item"
                 ref="subReply"
                 v-for="(subItem,subIndex) in item.replys"
                 :key="subIndex">
              <figure class="item-left">
                <img class="left-image"
                     :src="subItem.from_avatar" />
              </figure>
              <div class="item-content">
                <span class="head">
                  <strong class="name">
                    <a :href='subItem.from_webSite == "" ? "#": subItem.from_webSite'
                       v-text="subItem.from_user"
                       target="_blank"></a>
                  </strong>
                  <span class="right">
                    <small class="location"
                           v-if="subItem.from_locate !== null">
                      <span>{{subItem.from_locate.country}}</span>
                      <span v-if="subItem.from_locate.country && subItem.from_locate.city">&nbsp;-&nbsp;</span>
                      <span>{{subItem.from_locate.city}}</span>
                    </small>
                    <comment-ua v-if="!isMobile"
                                class="ua"
                                :ua="subItem.from_ua"></comment-ua>
                  </span>
                </span>
                <span class="aite"
                      :id="subItem.to_id"
                      v-if="subItem.to_user">回复&nbsp;<strong>@{{subItem.to_user}}:</strong></span>
                <div class="content"
                     v-html="$md.render(subItem.from_content)"></div>
                <nav class="level">
                  <div class="level-left">
                    <a class="level-item"
                       :class="[isLikedComment(subItem.id, 'reply')?'isliked':'']"
                       @click.stop="likeArtComment(subItem.id,'reply')">
                      <i class="like-icon">
                        <svg-icon name="like" />
                      </i>
                      <span class="like-text">{{subItem.like}}</span>
                    </a>
                    <a class="level-item"
                       @click.stop="onSubReplyComment(item.id, subItem)">
                      <i class="huifu-icon">
                        <svg-icon name="huifu" />
                      </i>
                      <span>回复</span>
                    </a>
                  </div>
                  <div class="level-right">
                    <span class="right-time">{{getCmdDate(subItem.from_date)}}</span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CommentUa from './ua';
import { mixin, DateBefore } from '@/utils/index';
import { localLikeHistory } from '@/service/storage';

export default {
  name: 'ArtCmt',
  components: {
    CommentUa
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    listLen: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isActive: false,
      isReplyActive: false,
      // 回复ID
      replyId: '',
      // 子回复ID
      subReplyId: '',
      // 回复昵称
      replyName: '',
      // 用户信息
      form: {
        name: '',
        email: '',
        site: ''
      },
      // 编辑器相关
      cmtContHtml: '',
      cmtContText: '',
      // emojis 表情
      emojis: ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻'],
      regexs: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
        url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
      }
    }
  },
  mixins: [mixin],
  computed: {
    ...mapState({
      isMobile: state => state.global.isMobile
    }),
    getCmdDate () {
      return param => {
        return DateBefore(param);
      }
    },
    isLikedComment () {
      return function (id, type) {
        if (type === 'comment') {
          return this.$parent.$data.likeHistory.comment.includes(id);
        } else if (type === 'reply') {
          return this.$parent.$data.likeHistory.reply.includes(id);
        }
      }
    }
  },
  // TODO：有存在Bug待处理
  // activated () {
  //   this.initUserLikeCmt();
  // },
  mounted () {
    this.initUserLikeCmt();
  },
  methods: {
    // 初始化用户点赞评论历史
    initUserLikeCmt () {
      const likeHistorys = localLikeHistory.get();
      !likeHistorys ? localLikeHistory.set(this.$parent.$data.likeHistory) : (this.$parent.$data.likeHistory = likeHistorys)
    },
    // 编辑器相关
    changeCommentCont () {
      const html = this.$refs.markdown.innerHTML;
      const text = this.$refs.markdown.innerText;
      if (!Object.is(html, this.cmtContHtml)) {
        this.cmtContHtml = html
      }
      if (!Object.is(text, this.cmtContText)) {
        this.cmtContText = text
      }
    },
    // 更新评价内容方法
    updateCommentCont ({ start = "", end = "" }) {
      if (!start && !end) return;
      const seletedText = (window.getSelection || document.getSelection)().toString();
      const currentText = this.$refs.markdown.innerText;
      if (seletedText) {
        const newText = currentText.replace(seletedText, start + seletedText + end);
        this.$refs.markdown.innerText = newText
      } else {
        this.$refs.markdown.innerText = this.$refs.markdown.innerText += (start + end)
        this.$refs.markdown.scrollTop = this.$refs.markdown.scrollHeight
      }
      this.changeCommentCont();
    },
    // 插入图像，链接，代码类型方法
    insertCont (type) {
      const contents = {
        image: {
          start: `![`,
          end: `](https://)`
        },
        link: {
          start: `[`,
          end: `](https://)`
        },
        code: {
          start: "\n```javascript\n",
          end: "\n```\n"
        }
      }
      this.updateCommentCont(contents[type])
    },
    // 插入emojis表情
    insertEmojis (emoji) {
      this.updateCommentCont({ end: emoji })
    },
    // 提交评论方法
    submitComment (e) {
      // 为了使用原生表单拦截
      e.preventDefault();
      const lineOverflow = this.cmtContText.split('\n').length;
      const lengthOverflow = this.cmtContText.length;
      if (!this.form.name) {
        return this.$toast.error('你的名字?');
      } else if (!this.form.email) {
        return this.$toast.error('你的邮箱?');
      } else if (!this.regexs.email.test(this.form.email)) {
        return this.$toast.error('邮箱不合法');
      } else if (this.form.site && !this.regexs.url.test(this.form.site)) {
        return this.$toast.error('网址不合法');
      } else if (!this.cmtContText || !this.cmtContText.replace(/\s/g, '')) {
        return this.$toast.error('内容不得空');
      } else if (lineOverflow > 36 || lengthOverflow > 2000) {
        return this.$toast.error('内容不得超出2000字且36行');
      }

      const byReplyId = this.$refs.commentform.dataset.id;
      const bySubReplyId = this.$refs.commentform.dataset.uid;

      const param = {
        id: this.$route.params.id,
        replyId: byReplyId,
        subReplyId: bySubReplyId,
        name: this.form.name,
        email: this.form.email,
        site: this.form.site,
        content: this.cmtContText
      }
      this.$store.dispatch('articles/submitComment', param);
      this.clearCommentCont();
    },
    // 清除评论方法
    clearCommentCont () {
      this.cmtContHtml = "";
      this.$refs.markdown.innerHTML = this.cmtContHtml;
      this.changeCommentCont();
    },
    // 回复评价方法
    onReplyComment (e) {
      this.isReplyActive = true;
      this.subReplyId = '';
      this.replyId = e.id;
      this.replyName = e.from_user;
      this.resueScrollTo();
    },
    // 子回复评价方法
    onSubReplyComment (elem, subElem) {
      this.isReplyActive = true;
      this.replyId = elem;
      this.subReplyId = subElem.id
      this.replyName = subElem.from_user;
      this.resueScrollTo();
    },
    // 关闭方法
    onCloseBox () {
      this.replyName = '';
      this.replyId = '';
      this.subReplyId = '';
      this.isReplyActive = false;
    },
    // 可利用滚动顶部方法
    resueScrollTo () {
      const elementPosition = this.$parent.$refs.artMain.offsetHeight;
      const headerOffset = 20;
      const offsetPosition = elementPosition + headerOffset;
      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      } catch (err) {
        if (err instanceof TypeError) {
          window.scroll(0, offsetPosition)
        } else {
          throw err
        }
      }
    },
    // 点赞评论方法
    likeArtComment (elem, type) {
      const likedComment = this.isLikedComment(elem, type);
      if (likedComment) {
        this.$toast.info('你已点赞过!');
        return false;
      }
      this.$parent.$emit('likeArtComment', [elem, type]);
    }
  }
}
</script>

<style lang="scss" scoped>
.cmt {
  &-main {
    margin-top: 1rem;
    padding: 0.857rem;

    .cmt-head {
      .head {
        &-form {
          .field-head,
          .field-reply,
          .field-body {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.714rem;
          }

          .field-reply {
            align-items: center;
            border-radius: 0.143rem;
            background-color: $form-bg-color;
            padding-top: calc(0.5em - 1px);
            padding-bottom: calc(0.5em - 1px);
            padding-left: calc(0.75em - 1px);
            padding-right: calc(0.75em - 1px);
            border: 0.071rem solid transparent;

            .reply {
              &-head {
                & > strong {
                  display: inline-flex;
                }
              }

              &-icons {
                display: inline-flex;
                cursor: pointer;
                align-self: center;
                & > .icon {
                  width: 1em;
                  height: 1em;
                }
              }
            }
          }

          & .control {
            flex: 1 0 0;
            font-size: 1rem;
            position: relative;
            margin-right: 0.714rem;

            &.has-icons-left {
              & > .input {
                width: 100%;
                box-shadow: none;
                font-size: 1rem;
                height: 2.5em;
                line-height: 1.5em;
                border-radius: 0.143rem;
                background-color: $form-bg-color;
                padding-bottom: calc(0.5em - 1px);
                padding-left: calc(2em - 1px);
                padding-right: calc(0.75em - 1px);
                padding-top: calc(0.5em - 1px);
                border: 0.071rem solid transparent;
              }

              .input:focus ~ .icons,
              .input:hover ~ .icons {
                .me,
                .email,
                .globe {
                  color: $accent-color;
                }
              }

              & > .icons {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 2em;
                height: 2.5em;
                pointer-events: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;

                .me,
                .email,
                .globe {
                  color: $form-icon-color;
                  width: 1.05em;
                  height: 1.05em;
                }
              }
            }
          }
          & .control:last-of-type {
            margin-right: 0;
          }

          // 移动端样式
          .mobile-head {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 0.714rem;

            & .control {
              margin-right: 0;
              margin-bottom: 0.714rem;

              &:last-of-type {
                margin-bottom: 0;
              }
            }
          }

          .markdown {
            flex: 1 0 0;
            font-size: 1rem;
            overflow: hidden;

            .markdown-editor {
              width: 100%;
              height: 8em;
              min-height: 6em;
              max-height: 8em;
              outline: 0;
              overflow-y: auto;
              overflow-x: hidden;
              border-radius: 0.143rem;
              background-color: $form-bg-color;
              padding-bottom: calc(0.5em - 1px);
              padding-left: calc(0.75em - 1px);
              padding-right: calc(0.75em - 1px);
              padding-top: calc(0.5em - 1px);
              border: 0.071rem solid transparent;
              overflow-wrap: break-word;

              &:empty:before {
                content: attr(placeholder);
              }
              &:not(:focus) {
                content: none;
              }
            }
            .markdown-tools {
              display: flex;
              align-items: center;
              width: 100%;
              height: 2em;
              background-color: $form-iconTools-color;

              .emoji,
              .image,
              .link,
              .code {
                display: inline-flex;
                height: 2em;
                padding: 0 0.714rem;
                align-items: center;

                .emoji-icon,
                .image-icon,
                .link-icon,
                .code-icon {
                  font-size: 0.8em;

                  & > .icon {
                    width: 1.25em;
                    height: 1.25em;
                  }
                }
              }

              .emoji {
                position: relative;

                &-box {
                  position: absolute;
                  left: 0;
                  bottom: 2em;
                  background-color: $form-bgBox-color;

                  .emoji-list {
                    display: flex;
                    height: 8em;
                    width: 28em;
                    list-style: none;
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    overflow-y: auto;
                    overflow-x: hidden;

                    .emoji-item {
                      flex: 0 0 2em;
                      height: 2em;
                      line-height: 2em;
                      font-size: 1.125em;
                      text-align: center;
                    }
                  }
                }
              }

              // 移动端表情emoji
              .mobile-emoji {
                position: relative;
                display: inline-flex;
                height: 2em;
                padding: 0 0.714rem;
                align-items: center;

                .emoji {
                  &-icon {
                    font-size: 0.8em;

                    & > .icon {
                      width: 1.25em;
                      height: 1.25em;
                    }
                  }

                  &-box {
                    .emoji-list {
                      width: 21em;
                    }
                  }
                }
              }

              .emoji:hover,
              .mobile-emoji:hover,
              .image:hover,
              .link:hover,
              .code:hover {
                cursor: pointer;
                background-color: $accent-color;
              }

              .sub-left {
                display: inline-flex;
                flex: 1 0 0;
                justify-content: flex-end;

                & > .btn {
                  margin: 0;
                  width: 6em;
                  height: 2em;
                  border: 0.071rem solid transparent;
                }
              }
            }
          }
        }
      }
    }

    .cmt-list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .list {
        &-head {
          flex: 0 0 2em;
          line-height: 2em;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          border-bottom: 0.071rem solid #dcdfe6;

          .head-left {
            flex: 1 0 0;
          }
          .head-right {
            flex: 1 0 0;
            text-align: right;
          }
        }

        &-media {
          flex: 1 0;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          padding: 0.429rem 0;

          .media-left {
            margin: 0.286rem 0.429rem 0 0;

            .left-image {
              width: 3em;
              height: 3em;
              border-radius: 50%;
            }
          }

          .media-content {
            width: 17em;
            border-bottom: 0.071rem dashed #dcdfe6;
          }

          .media-content,
          .item-content {
            flex: 1 0;
            display: flex;
            overflow: hidden;
            flex-direction: column;
            justify-content: flex-start;

            .head {
              padding: 0.286rem 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;

              .name {
                flex: 1 0;
              }

              .right {
                display: inline-flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;

                .location {
                  display: inline-flex;
                  align-self: center;
                  margin-right: 0.429rem;
                }

                .ua {
                  display: inline-flex;
                  flex-direction: row;
                  align-items: center;
                }
              }
            }
            .content {
              padding-bottom: 0.571rem;
            }
            .level {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;

              &-left {
                flex: 1 0;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;

                .level-item {
                  display: inline-flex;
                  cursor: pointer;
                  align-self: center;

                  .like-icon,
                  .huifu-icon {
                    padding-right: 0.286rem;

                    & > .icon {
                      width: 1em;
                      height: 1em;
                    }
                  }
                }

                // 已点赞样式
                .isliked {
                  .like-icon {
                    & > .icon {
                      color: var(--green);
                    }
                  }
                  .like-text {
                    color: var(--green);
                  }
                }

                .level-item:not(:last-of-type) {
                  margin-right: 0.571rem;
                }
              }
              &-right {
                display: inline-block;
              }
            }

            // 评论者列表
            .sub-comment-list {
              margin: 0.429rem 0;

              .sub-item {
                display: flex;
                padding: 0.286rem;
                flex-direction: row;
                border-radius: 0.143rem;
                justify-content: flex-start;
                background-color: $form-sub-Color;

                .item-left {
                  margin: 0.286rem 0.429rem 0 0;

                  .left-image {
                    width: 3em;
                    height: 3em;
                    border-radius: 50%;
                  }
                }
              }
              .sub-item:not(:last-of-type) {
                margin-bottom: 0.429rem;
              }
            }
          }
        }

        &-noMedia {
          padding: 2em;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
