<script lang="tsx">
import { Tabbar, TabbarItem } from 'vant';
import { defineComponent, ref } from 'vue';
import { RouterView } from 'vue-router';
import styled from 'vue3-styled-components';

const Wrapper = styled.div`
  background-color: aqua;
`;

export default defineComponent({
  setup() {
    const active = ref(0);
    return { active };
  },
  render() {
    return (
      <Wrapper class="w-full h-full">
        <div class="w-full" style="height: calc(100% - 50px)">
          <RouterView></RouterView>
        </div>
        <Tabbar v-model={[this.active]}>
          <TabbarItem icon="home-o">标签</TabbarItem>
          <TabbarItem icon="search">标签</TabbarItem>
          <TabbarItem icon="friends-o">标签</TabbarItem>
          <TabbarItem icon="setting-o">标签</TabbarItem>
        </Tabbar>
      </Wrapper>
    );
  },
});
</script>
