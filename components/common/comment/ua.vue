<template>
  <small>
    <span class="os">
      <i class="os-icon">
        <svg-icon :name="isOSIconName" />
      </i>
      <span>{{usResult.result.os.name}}</span>
      <span>{{usResult.result.os.version}}</span>
    </span>
    <span class="browser">
      <i class="browser-icon">
        <svg-icon :name="isBrowserIconName" />
      </i>
      <span>{{usResult.result.browser.name}}</span>
      <span>{{usResult.result.browser.major}}</span>
    </span>
  </small>
</template>

<script>
import { usParser } from '@/utils/index';

const osIconsNameMap = {
  'Mac OS': 'mac',
  'Windows': 'windows',
  'Android': 'android',
  'Ubuntu': 'ubuntu',
  'Linux': 'linux',
  'iOS': 'ios',
  'Unix': 'unix'
}

const browersIconsNameMap = {
  'Chrome': 'chrome',
  'Chromium': 'chrome',
  'WeChat': 'wechat',
  'Safari': 'safari',
  'Mobile Safari': 'safari',
  'UCBrowser': 'uc',
  'Maxthon': 'maxthon',
  'Firefox': 'firefox',
  'IE': 'ie',
  'Opera': 'opera',
  'Edge': 'edge'
}

export default {
  name: 'ArtCmtUa',
  props: {
    ua: {
      type: String,
      default: ''
    }
  },
  computed: {
    usResult () {
      return usParser(this.ua);
    },
    isOSIconName () {
      const osName = this.usResult.result.os.name;
      return osName && osIconsNameMap[osName];
    },
    isBrowserIconName () {
      const browserName = this.usResult.result.browser.name;
      return browserName && browersIconsNameMap[browserName];
    }
  }
}
</script>

<style lang="scss" scoped>
.os,
.browser {
  display: inline-flex;
  align-self: center;

  &-icon {
    display: inline-flex;
    margin-right: 0.429rem;

    & > .icon {
      width: 1.25em;
      height: 1.25em;
    }
  }

  & > span:last-child {
    padding-left: 0.429rem;
  }
}

.os {
  margin-right: 0.429rem;
}
</style>
