<template>
  <div class="cmt-main">
    <div class="cmt-head">
      <form class="head-form">
        <div class="field-head">
          <div class="control has-icons-left">
            <input class="input"
                   type="text"
                   placeholder="用户*" />
            <span class="icons">
              <svg-icon class="me"
                        name="me" />
            </span>
          </div>
          <div class="control has-icons-left">
            <input class="input"
                   type="text"
                   placeholder="邮件*" />
            <span class="icons">
              <svg-icon class="email"
                        name="email-hili" />
            </span>
          </div>
          <div class="control has-icons-left">
            <input class="input"
                   type="text"
                   placeholder="网址" />
            <span class="icons">
              <svg-icon class="globe"
                        name="globe" />
            </span>
          </div>
        </div>
        <div class="field-body">
          <div class="markdown">
            <div class="markdown-editor"
                 ref="markdown"
                 contenteditable="true"
                 placeholder="输入评论..."
                 @keyup=changeCommentCont($event)
                 @focus=changeCommentCont($event)>
            </div>
            <div class="markdown-tools">
              <span class="emoji"
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
                <button class="btn is-grey"
                        @click="submitComment">
                  提交
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="cmt-list">
      左边: 共有1评论 ,右边: 最新,最热
    </div>
  </div>
</template>

<script>

export default {
  name: 'ArtCmt',
  data () {
    return {
      isActive: false,
      // 编辑器相关
      cmtContHtml: '',
      cmtContText: '',
      // emojis 表情
      emojis: ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻']
    }
  },
  methods: {
    // 编辑器相关
    changeCommentCont () {
      const html = this.$refs.markdown.innerHTML;
      const text = this.$refs.markdown.textContent;
      if (!Object.is(html, this.cmtContHtml)) {
        this.cmtContHtml = html
      }
      if (!Object.is(text, this.cmtContText)) {
        this.cmtContText = text
      }
    },
    updateCommentCont ({ start = "", end = "" }) {
      if (!start && !end) return false;
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
    submitComment () {

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
          .field-body {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 0.714rem;
          }
          & .control {
            flex: 1 0 0;
            font-size: 1rem;
            position: relative;
            margin-right: 0.714rem;

            &.has-icons-left {
              .input {
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

              .icons {
                position: absolute;
                left: 0;
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
                  font-size: 0.5rem;
                }
              }
            }
          }
          & .control:last-of-type {
            margin-right: 0;
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
              outline: none;
              overflow-y: auto;
              overflow-x: hidden;
              border-radius: 0.143rem;
              background-color: $form-bg-color;
              padding-bottom: calc(0.5em - 1px);
              padding-left: calc(0.75em - 1px);
              padding-right: calc(0.75em - 1px);
              padding-top: calc(0.5em - 1px);
              border: 0.071rem solid transparent;

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
                flex: 0 0 0;
                display: inline-flex;
                height: 2em;
                padding: 0 0.714rem;
                align-items: center;

                .emoji-icon,
                .image-icon,
                .link-icon,
                .code-icon {
                  font-size: 0.5rem;
                }
              }

              .emoji {
                position: relative;

                &-box {
                  position: absolute;
                  left: 0;
                  bottom: 2em;
                  background-color: #fafafab3;

                  .emoji-list {
                    display: flex;
                    height: 8em;
                    width: 28em;
                    list-style: none;
                    flex-wrap: wrap;
                    flex-direction: row;
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

              .emoji:hover,
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
  }
}
</style>
