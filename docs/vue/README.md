---
date: 2022-2-15 15:10:00
sidebar: false
---

_你好， {{ msg }}_

<RedDiv>

_当前计数为： {{ count }}_

</RedDiv>

<button @click="count++" class="btn">点我！</button>

<script>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)

export default {
  components: {
    RedDiv,
  },

  setup() {
    const msg = 'Markdown 中的 Vue'
    const count = ref(0)

    return {
      msg,
      count,
    }
  }
}
</script>

<style>

.red-div {
  color: red;
}
.btn{
    border: 1px solid #dfdfdf;
    background-color: #fff;
    outline: none;
    padding: 4px 6px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(0,0,0,.05);
}
.btn:active{
    background-color: #eee;
    box-shadow: 0 2px 10px rgba(0,0,0,.05);
}
</style>