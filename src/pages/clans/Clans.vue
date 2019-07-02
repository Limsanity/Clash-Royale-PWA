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

    .clan-bar
      display flex
      justify-content space-between
      border solid .02rem
      border-color rgba(gray, 0.5)
      border-left none
      border-right none
      font-size 14px

      .bar-item
        flex 1
        padding .1rem
        margin 0
        text-align center
        border-right solid .02rem
        border-color rgba(gray, 0.5)
        &:nth-last-child(1)
          border-right none

    .clan-list
      font-size 14px
      .clan-list-item
        display flex
        &:nth-child(2n+1)
          background-color rgba(gray, 0.1)
        .clan-list-item-style
          flex 1
          margin 0
          padding .2rem .1rem
          border solid .02rem
          border-color rgba(gray, 0.5)
          border-top none
          border-left none
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          &:nth-last-child(1)
            border-right none
</style>
