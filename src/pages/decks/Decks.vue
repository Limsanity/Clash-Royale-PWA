<template>
  <div class="decks">
    <button class="add-btn" @click="handleAddClick">增加</button>
    <div class="decks-wrapper">
      <div class="decks-list" v-for="(item, index) in decksList" :key="item.deckID">
        <img v-lazy v-for="(item) in item.deck" :key="item.id" :data-src="loadImg('cards', item.key)" class="decks-item">
        <div class="button">
          <span class="item delete iconfont" @click="deleteDeck(index)">&#xe612;</span>
          <a class="copy-link" :href="handleCopyClick(index)">
            <span class="item external iconfont">&#xe617;</span>
          </a>
        </div>
      </div>
    </div>
    <add-deck v-show="showAddDeck" class="add-deck" @done="handleDone"></add-deck>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  addToObjectStore
} from '@/utils/indexDB.js'
import axios from 'axios'
import AddDeck from './components/AddDecks'
import loadImg from '@/mixins/loadImg'
import {
  disableBodyScroll,
  enableBodyScroll
} from 'body-scroll-lock'
export default {
  name: 'Decks',
  mixins: [loadImg],
  components: {
    AddDeck
  },
  data () {
    return {
      decksList: [],
      showAddDeck: false
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    fetchData () {
      this.decksList = []
      axios.get('/api/deck')
        .then(res => {
          const { success, data } = res.data
          if (success) {
            data.forEach(item => {
              const deck = []
              for (let i = 1; i <= 8; i++) {
                let card = {
                  id: item['card' + i + 'ID'],
                  key: item['card' + i + 'Key']
                }
                deck.push(card)
              }
              this.decksList.push({
                deckID: item.deckID,
                deck
              })
            })
          } else {
            alert(data)
          }
        })
    },
    handleCopyClick (index) {
      let href = 'clashroyale://copyDeck?deck='
      const deck = this.decksList[index].deck
      deck.forEach(item => {
        href += item.id + ';'
      })
      href = href.substring(0, href.length - 1)
      return href
    },
    handleDone (deck) {
      this.showAddDeck = false
      enableBodyScroll(document.querySelector('.add-deck .wrapper'))
      if (deck) {
        this.decksList.push({
          deckID: this.decksList.length + 1,
          deck
        })
        if ('SyncManager' in window) {
          addToObjectStore('deck', {
            deck
          }).then(() => this.triggerSync())
        } else {
          axios.post('/api/deck', deck, {
            headers: {
              'Authorization': 'Bearer ' + this.auth.token
            }
          })
            .then(res => {
              const { success, data } = res.data
              if (success) {
                console.log(deck)
              } else {
                alert(data)
              }
            })
        }
      }
    },
    handleAddClick () {
      this.showAddDeck = true
      disableBodyScroll(document.querySelector('.add-deck .wrapper'))
    },
    deleteDeck (index) {
      axios.delete(
        `/api/deck/${this.decksList[index].deckID}`)
        .then(res => {
          if (res.data.success) {
            this.decksList.splice(index, 1)
          }
        })
    },
    triggerSync () {
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('send-deck')
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="stylus" scoped>
  .decks
    padding .266667rem
    border .026667rem solid
    border-top 0
    border-color #d4d4d5
    border-radius 0 0 .16rem .16rem
    background-color #fff

    .add-btn
      width 2.666667rem
      height 1.066667rem
      color white
      font-size 16px
      font-weight bold
      background-color #2185d0
      border-radius .133333rem
      border-style none
      outline none

    .decks-wrapper
      margin-top .266667rem
      .decks-list
        display flex
        justify-content space-between
        flex-wrap wrap

        .decks-item
          width 1.92rem
          height 2.32rem

        .button
          display flex
          margin 5px 0;
          .item
            display inline-block
            position relative
            width 1.12rem
            height 1.12rem
            margin-left .2rem
            line-height 1.12rem
            text-align center
            border solid .053333rem
            border-radius 50%
            font-size 20px
          .delete
            color #e03997
            border-color #e03997
            margin-right .266667rem
          .external
            color #1296db
            border-color #1296db
          .copy-link
            display flex
            text-decoration none
</style>
