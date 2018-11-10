<template>
    <div class="grid">
        <div class="parent">
            <div v-for="(value,item) in grid" :key="item.key" class="child">
                <div class="item">
                    <button class="value" v-bind:style="{backgroundColor: value.color}" @click="setPoint(item)">
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
            <button @click="reset">Start new game</button>
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
            remove wall:
            <input type="text" v-model="removeLocalWall">
            <button @click = "removeWall">Remove wall</button>
        </div>
        <div>
            <button @click ="run">Run</button>
        </div>
    </div>
</template>

<script>
import getRandomNumber from "../randomGenerator";
import gridColours from "../gridColours";

export default {
  name: "Grid",
  data: function() {
    return {
      localStart: "0",
      localFinish: "0",
      removeLocalWall: "0",
      grid: this.$store.state.grid,
      newItems: 2,
      colors: gridColours()
    };
  },
  methods: {
    run: function() {
      this.$store.commit("resetWeight");
      this.$store.commit("setStart", this.localStart);
      this.$store.commit("setFinish", this.localFinish);
      this.$store.commit("applyWeights");

      if (this.grid[this.localFinish] && this.grid[this.localFinish].weight != 0) {
        var payload = {
          item: this.localFinish,
          color: this.grid[this.localStart].color
        };
        this.$store.commit("setBusyItem", payload);
        this.$store.commit("removeBusyItem", this.localStart);
        this.localStart = "0";
        this.localFinish = "0";
        //to do: add logic for removing here
        for(var i = 0; i < this.newItems; i++){
            this.addWall();
        }
      } else {
        this.localFinish = "0";
      }
    },
    reset: function() {
      this.$store.commit("initGrid");
      this.localStart = "0";
      this.localFinish = "0";
      this.addWall();
    },
    addWall: function() {
      if (Object.values(this.grid).filter(function(item) {return item.isBusy == false}).length != 0){      
        var number = getRandomNumber(0, this.colors.length - 1);
        var color = this.colors[number].color;
        var newItem;
        do {
            newItem = getRandomNumber(1, Object.keys(this.grid).length);
        } while (this.grid[newItem].isBusy);

        var payload = {
            item: newItem.toString(),
            color: color
        };
        this.$store.commit("setBusyItem", payload);
      }
      else{
          alert("game in over!");
      }
    },
    removeWall: function() {
      this.$store.commit("removeBusyItem", this.removeLocalWall);
    },
    setPoint(data) {
      if (this.grid[data].isBusy) {
        this.setStartItem(data);
      } else {
        if (this.localStart != "0" && !this.grid[data].isBusy) {
          this.setFinishItem(data);
          this.run();
        }
      }
    },
    setStartItem(data) {
      this.localStart = data;
    },
    setFinishItem(data) {
      this.localFinish = data;
    }
  }
};
</script>

<style scoped lang="less">
.parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.child {
}

.item {
}
.value {
  font-size: 200%;
  border-radius: 50%;
}
.weight {
  vertical-align: top;
}
</style>
