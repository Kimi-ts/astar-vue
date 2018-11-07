import Vue from 'vue'
import Vuex from 'vuex'
import getGridData from './gridData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: getGridData(),
    start: "0",
    finish: "0"
  },
  mutations: {
    initGrid() {
      for(var key in this.state.grid){
        this.state.grid[key] = getGridData()[key];
      }

      this.state.start = 0;
      this.state.finish = 0;
    },
    resetWeight() {
      for (var key in this.state.grid) {
        this.state.grid[key].weight = 0;
      }
    },
    applyWeights() {
      var grid = this.state.grid;
      var start = this.state.start;
      var finish = this.state.finish;

      var current = grid[start];
      if (!current) {
        return;
      }
      current.weight = 1;

      if (start == finish) {
        return
      }

      var stack = [];
      stack.unshift(current);

      while (stack.length > 0) {
        //get bottom item
        current = stack[stack.length - 1];
        if (current.value == finish) {
          break;
        }

        for(var i = 0; i < current.neibs.length; i++){
          var neib = current.neibs[i];

          if (!grid[neib].weight){
            grid[neib].weight = current.weight + 1;
            stack.unshift(grid[neib]);
            if (grid[neib].value == finish){
              stack = [];
            }
          }
        }

        //remove bottom item
        stack.pop();
      }
    },
    setStart(state, start) {
      state.start = start;
    },
    setFinish(state, finish) {
      state.finish = finish;
    },
    setBusyItem(state, data){
      var grid = this.state.grid;
      if (!grid[data.item]){
        return
      }

      grid[data.item].isBusy = true;
      grid[data.item].color = data.color;
      
      //remove item from other's items neibs list
      for (var key in grid) {
        var removeIndex = grid[key].neibs.indexOf(data.item);

        if (removeIndex != -1){
          grid[key].neibs.splice(removeIndex, 1);
        }
      }
    },
    removeBusyItem(state, item){
      var grid = this.state.grid;
      var initialGrid = getGridData();
      if (!grid[item] || !grid[item].isBusy){
        return;
      }

      grid[item].isBusy = false;
      grid[item].color = null;
      
      for(var key in initialGrid){
        var addIndex = initialGrid[key].neibs.indexOf(item);

        if (addIndex != -1){
          grid[key].neibs.push(item);
        }
      }
    }
  },
  actions: {

  }
})