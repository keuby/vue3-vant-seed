<script lang="tsx">
import { defineComponent } from 'vue';
import TaslListItem, { ItemData } from './components/task-list-item';
import { List, PullRefresh } from 'vant';
import { useLoadMore } from 'vue-request';
import { range } from 'lodash';

interface Pagination {
  current: number;
  totalPages: number;
  list: ItemData[];
}

interface ServiceParam {
  data: Pagination;
  dataList: ItemData[];
}

function getListData(r: ServiceParam) {
  const current = (r?.data?.current ?? 0) + 1;
  return new Promise<Pagination>((resolve) => {
    setTimeout(() => {
      resolve({
        current,
        totalPages: 10,
        list: range(40).map((i) => ({
          title: `title${current * 10 + i}`,
          content: `content${current * 10 + i}`,
        })),
      });
    }, 50000);
  });
}

export default defineComponent({
  name: 'TaskListItem',
  setup() {
    return useLoadMore(getListData, {
      listKey: 'list',
      isNoMore: (d) => d?.current >= d?.totalPages,
    });
  },
  render() {
    const items = this.dataList.map((data, i) => <TaslListItem data={data} key={i} />);
    console.log(this.loadingMore, this.loading);
    return (
      <div class="h-full overflow-y-auto">
        <PullRefresh v-model={[this.loading]} onRefresh={this.reload}>
          <div style="min-height: 50px">
            <List
              v-model={[this.loadingMore, 'loading']}
              onLoad={this.loadMore}
              finished={this.noMore}
            >
              {items}
            </List>
          </div>
        </PullRefresh>
      </div>
    );
  },
});
</script>
