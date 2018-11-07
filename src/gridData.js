  export default function gridData(){
      return {
        "1": { value: "1", neibs: ["2", "5"], weight: 0, isBusy: false, color: null },
        "2": { value: "2", neibs: ["1", "3", "6"], weight: 0, isBusy: false, color: null },
        "3": { value: "3", neibs: ["2", "7", "4"], weight: 0, isBusy: false, color: null },
        "4": { value: "4", neibs: ["3", "8"], weight: 0, isBusy: false, color: null },
        "5": { value: "5", neibs: ["1", "6", "9"], weight: 0, isBusy: false, color: null },
        "6": { value: "6", neibs: ["5", "2", "7", "10"], weight: 0, isBusy: false, color: null },
        "7": { value: "7", neibs: ["6", "3", "8", "11"], weight: 0, isBusy: false, color: null },
        "8": { value: "8", neibs: ["4", "7", "12"], weight: 0, isBusy: false, color: null },
        "9": { value: "9", neibs: ["5", "10"], weight: 0, isBusy: false, color: null },
        "10": { value: "10", neibs: ["9", "6", "11"], weight: 0, isBusy: false, color: null },
        "11": { value: "11", neibs: ["10", "7", "12"], weight: 0, isBusy: false, color: null },
        "12": { value: "12", neibs: ["11", "8"], weight: 0, isBusy: false, color: null }
      };
  }