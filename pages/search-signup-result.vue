<template>
  <div>
    <h1>六角报名查询</h1>
    {{ result }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData(){
    let { data } = await axios.post('https://www.thef2e.com/api/isSignUp', {
      "email": "hexscholl@test.com"
    });
    return {
      result: data
    }
  }
}
</script>
