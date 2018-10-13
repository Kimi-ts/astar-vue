<template>
    <div class="grid">
        <div class="parent">
            <div v-for="(value,item) in grid" :key="item.key" class="child">
                <div class="item" v-bind:class="{busy: value.isBusy}">
                    <span class="value" v-bind:class="{start : item == localStart, finish: item == localFinish }">
                        {{item}}
                    </span>
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
            <button @click ="run">Run</button>
        </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Grid',
  data: function() {
      return {
                localStart: "0",
                localFinish: "0",
                localWall: "0",
                grid: this.$store.state.grid,
      }
  },
  methods:{
      run: function(){
          this.$store.commit("resetWeight");
          this.$store.commit("setStart", this.localStart);
          this.$store.commit("setFinish", this.localFinish);
          this.$store.commit("applyWeights");
      },
      reset: function(){
          this.$store.commit("initGrid");
          this.localStart = "0";
          this.localFinish = "0";
      },
      addWall: function(){
          this.$store.commit("setBusyItem", this.localWall);
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
        &.busy{
            border: 1px solid red;
        }
    }
    .value{
        font-size: 200%;

        &.start{
            color: blue;
        }
        &.finish{
            color: pink;
        }
    }
    .weight{
        vertical-align: top;   
    }
</style>
