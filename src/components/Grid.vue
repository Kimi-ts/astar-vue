<template>
<div class="game">
    <div class="points">
        <p>Your points: {{points}}</p>
    </div>
    <div class="grid">
        <div class="parent">
            <div v-for="(value,item) in grid" :key="item.key" class="child">
                <div class="item">
                    <button class="value" v-bind:style="{backgroundColor: value.color}" @click="setPoint(item)">
                        *
                    </button>
                </div>
            </div>
        </div>
        <div>
            <button @click="reset">Start new game</button>
        </div>
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
      newItems: 3,
      colors: gridColours(),
      points: 0
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
        if (this.tryClearSquares() == true){
            this.points += 4;
        }
        else{
            for(var i = 0; i < this.newItems; i++){
                this.addWall();
            }
            if (this.tryClearSquares() == true){
                this.points += 4;
            }
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
    removeWall: function(item) {
      this.$store.commit("removeBusyItem", item);
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
    tryClearSquares: function(){
      for (var key in this.grid) {
          if (this.grid[key].isBusy && this.grid[key].square){
              var i = 0;
              while(i < 3 && this.grid[key].color == this.grid[this.grid[key].square[i]].color){
                  i++;
              }
              if (i == 3){
                  this.removeWall(key);
                  for(var c = 0; c < 3; c++){
                      this.removeWall(this.grid[key].square[c])
                  }
                  return true;
              }
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin: 0 auto 20px;
  width: 300px;
}
.child {
    //max-width: 30px;
}

.item {
}
.value {
  font-size: 200%;
  border-radius: 50%;
}
</style>
