  export default function gridData(){
      return {
        "1": { value: "1", neibs: ["2", "5"], weight: 0, isBusy: false, color: null, square: ["2", "5", "6"] },
        "2": { value: "2", neibs: ["1", "3", "6"], weight: 0, isBusy: false, color: null, square: ["3", "6", "7"] },
        "3": { value: "3", neibs: ["2", "7", "4"], weight: 0, isBusy: false, color: null, square: ["4", "7", "8"] },
        "4": { value: "4", neibs: ["3", "8"], weight: 0, isBusy: false, color: null },
        "5": { value: "5", neibs: ["1", "6", "9"], weight: 0, isBusy: false, color: null, square: ["6", "9", "10"] },
        "6": { value: "6", neibs: ["5", "2", "7", "10"], weight: 0, isBusy: false, color: null, square: ["7", "10", "11"] },
        "7": { value: "7", neibs: ["6", "3", "8", "11"], weight: 0, isBusy: false, color: null, square: ["8", "11", "12"] },
        "8": { value: "8", neibs: ["4", "7", "12"], weight: 0, isBusy: false, color: null },
        "9": { value: "9", neibs: ["5", "10", "13"], weight: 0, isBusy: false, color: null, square: ["10", "13", "14"] },
        "10": { value: "10", neibs: ["9", "6", "11", "14"], weight: 0, isBusy: false, color: null, square: ["11", "14", "15"] },
        "11": { value: "11", neibs: ["10", "7", "12", "15"], weight: 0, isBusy: false, color: null, square: ["12", "15", "16"] },
        "12": { value: "12", neibs: ["11", "8", "16"], weight: 0, isBusy: false, color: null },
        "13": { value: "13", neibs: ["9", "14"], weight: 0, isBusy: false, color: null },
        "14": { value: "14", neibs: ["13", "10", "15"], weight: 0, isBusy: false, color: null },
        "15": { value: "15", neibs: ["14", "11", "16"], weight: 0, isBusy: false, color: null },
        "16": { value: "16", neibs: ["15", "12"], weight: 0, isBusy: false, color: null }
      };
  }