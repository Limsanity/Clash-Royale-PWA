<template>
  <div class="clans">
    <h1 class="title">Clans</h1>
    <v-data-table
      :headers="headers"
      :items="clanInfo"
      v-if="clanInfo"
      :disable-initial-sort="true"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.role }}</td>
        <td>{{ props.item.rate }}</td>
        <td>{{ props.item.win }}</td>
        <td>{{ props.item.participate }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Clans',
  data () {
    return {
      headers: [
        {
          text: '名称',
          value: 'name',
          sortable: false
        },
        {
          text: '职位',
          value: 'role',
          sortable: false
        },
        {
          text: '胜率',
          value: 'rate'
        },
        {
          text: '胜场',
          value: 'win'
        },
        {
          text: '参与',
          value: 'participate'
        }
      ]
    }
  },
  computed: {
    ...mapState(['clanInfo'])
  }
}
</script>

<style lang="stylus" scoped>
  .clans
    .title
      margin 0
      font-size 20px
</style>
