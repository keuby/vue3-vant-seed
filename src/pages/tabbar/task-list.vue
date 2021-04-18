<script lang="tsx">
import { range } from 'lodash';
import { defineComponent } from 'vue';
import styled from 'vue3-styled-components';
import TaslListItem from './components/task-list-item';

const Wrapper = styled.div`
  background-color: red;
`;

export default defineComponent({
  name: 'TaskListItem',
  setup() {
    const dataList = range(5).map((i) => ({
      title: `title${i}`,
      content: `content${i}`,
    }));
    return { dataList };
  },
  render() {
    const items = this.dataList.map((data, i) => <TaslListItem data={data} key={i} />);
    return <Wrapper>{items}</Wrapper>;
  },
});
</script>
