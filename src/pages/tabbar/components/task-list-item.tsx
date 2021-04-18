import { defineComponent, PropType } from '@vue/runtime-core';

export interface ItemData {
  title: string;
  content: string;
}

export default defineComponent({
  name: 'TaskListItem',
  props: {
    data: Object as PropType<ItemData>,
  },
  render() {
    return (
      <div class="w-full px-5 py-3">
        <div>title: {this.data.title}</div>
        <div class="mt-3">content: {this.data.content}</div>
      </div>
    );
  },
});
