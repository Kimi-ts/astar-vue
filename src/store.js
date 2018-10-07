import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    grid: {
      "1": { value: "1", neibs: ["2", "5"], weight: 0 },
      "2": { value: "2", neibs: ["1", "3", "6"], weight: 0 },
      "3": { value: "3", neibs: ["2", "7", "4"], weight: 0 },
      "4": { value: "4", neibs: ["3", "8"], weight: 0 },
      "5": { value: "5", neibs: ["1", "6"], weight: 0 },
      "6": { value: "6", neibs: ["5", "2", "7"], weight: 0 },
      "7": { value: "7", neibs: ["6", "3", "8"], weight: 0 },
      "8": { value: "8", neibs: ["4", "7"], weight: 0 }
    },
    start: "0",
    finish: "0"
  },
  mutations: {
    initGrid() {
      this.state.grid = {
        "1": { value: "1", neibs: ["2", "5"], weight: 0 },
        "2": { value: "2", neibs: ["1", "3", "6"], weight: 0 },
        "3": { value: "3", neibs: ["2", "7", "4"], weight: 0 },
        "4": { value: "4", neibs: ["3", "8"], weight: 0 },
        "5": { value: "5", neibs: ["1", "6"], weight: 0 },
        "6": { value: "6", neibs: ["5", "2", "7"], weight: 0 },
        "7": { value: "7", neibs: ["6", "3", "8"], weight: 0 },
        "8": { value: "8", neibs: ["4", "7"], weight: 0 }
      };

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
  },
  actions: {

  }
})
