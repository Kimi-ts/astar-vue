<template>
    <div class="grid">
        <div class="parent">
            <div v-for="(value,item) in grid" :key="item.key" class="child">
                <div class="item">
                    <button class="value" v-bind:class="{start : item == localStart, finish: item == localFinish, busy: value.isBusy }" v-bind:style="{backgroundColor: value.color}" @click="setPoint(item)">
                        {{item}}
                    </button>
                    <span class="weight">{{value.weight}}</span>
                    <div>
                        {{value.neibs}}
                    </div>
                </div>
            </div>
        </div>
        <div>
        <div>
            <button @click="reset">Reset</button>
        </div>
        <div>
            enter start: 
            <input type="text" v-model="localStart">
        </div>
        <div>
            enter finish: 
            <input type="text" v-model="localFinish">
        </div>
        <div>
            enter wall: 
            <input type="text" v-model="localWall">
            <button @click = "addWall">Add wall</button>
        </div>
        <div>
            remove wall:
            <input type="text" v-model="removeLocalWall">
            <button @click = "removeWall">Remove wall</button>
        </div>
        <div>
            <button @click ="run">Run</button>
        </div>
        </div>
    </div>
</template>

<script>

import getRandomNumber from '../randomGenerator'
import gridColours from '../gridColours'

export default {
  name: 'Grid',
  data: function() {
      return {
                localStart: "0",
                localFinish: "0",
                localWall: "0",
                removeLocalWall: "0",
                grid: this.$store.state.grid,
                newItems: 3,
                colors: gridColours()
      }
  },
  methods:{
      run: function(){
          this.$store.commit("resetWeight");
          this.$store.commit("setStart", this.localStart);
          this.$store.commit("setFinish", this.localFinish);
          this.$store.commit("applyWeights");

          if (this.grid[this.localFinish] && this.grid[this.localFinish].weight != 0){
              var payload = {
                  item: this.localFinish,
                  color: this.grid[this.localStart].color
              }
              this.$store.commit("setBusyItem", payload);
              this.$store.commit("removeBusyItem", this.localStart);
              this.localStart = "0";
              this.localFinish = "0"
          }
          else{
              this.localFinish = "0";
          }
      },
      reset: function(){
          this.$store.commit("initGrid");
          this.localStart = "0";
          this.localFinish = "0";
      },
      addWall: function(){
          var number = getRandomNumber(0, this.colors.length-1);
          var color = this.colors[number].color;
          var payload = {
              item: this.localWall,
              color: color
          }
          this.$store.commit("setBusyItem", payload );
      },
      removeWall: function(){
          this.$store.commit("removeBusyItem", this.removeLocalWall);
      },
      setPoint(data){
        if (this.grid[data].isBusy){
            this.setStartItem(data);
        }
        else{
            if (this.localStart != "0" && !this.grid[data].isBusy){
                this.setFinishItem(data);
                this.run();
            }
        }
      },
      setStartItem(data){
          this.localStart = data;
      },
      setFinishItem(data){
          this.localFinish = data;
      }
  }
}
</script>

<style scoped lang="less">
    .parent{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .child{

    }

    .item{
    }
    .value{
        font-size: 200%;
        border-radius: 50%;
        &.busy{
            background-color: lightblue;
        }
        &.start{
            background-color: bisque;
        }
        &.finish{
            background-color: yellow;
        }
    }
    .weight{
        vertical-align: top;   
    }
</style>
