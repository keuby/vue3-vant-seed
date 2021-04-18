<script lang="tsx">
import { defineComponent } from 'vue';
import styled from 'vue3-styled-components';

const Wrapper = styled.div`
  height: 50px;
  background-color: red;
`;

export default defineComponent({
  render() {
    return (
      <Wrapper>
        <van-button type="primary">dianwo</van-button>
      </Wrapper>
    );
  },
});
</script>
