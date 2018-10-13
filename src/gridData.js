  export default function gridData(){
      return {
        "1": { value: "1", neibs: ["2", "5"], weight: 0, isBusy: false },
        "2": { value: "2", neibs: ["1", "3", "6"], weight: 0, isBusy: false },
        "3": { value: "3", neibs: ["2", "7", "4"], weight: 0, isBusy: false },
        "4": { value: "4", neibs: ["3", "8"], weight: 0, isBusy: false },
        "5": { value: "5", neibs: ["1", "6"], weight: 0, isBusy: false },
        "6": { value: "6", neibs: ["5", "2", "7"], weight: 0, isBusy: false },
        "7": { value: "7", neibs: ["6", "3", "8"], weight: 0, isBusy: false },
        "8": { value: "8", neibs: ["4", "7"], weight: 0, isBusy: false }
      };
  }