var mixin = {
  filters: {
    integer (total) {
      return total.toString().split('.')[0]
    },
    point (total) {
      return total.toFixed(2).toString().split('.')[1]
    }
  },
  methods: {
    total (goodInfo, selectData) {
      return goodInfo.price * selectData.num
    }
  }
}

export default mixin
