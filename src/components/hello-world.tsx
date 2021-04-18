import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  render() {
    return <div>{this.msg}</div>;
  },
});
