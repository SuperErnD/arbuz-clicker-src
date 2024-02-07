export default {
    methods: {
        callback() {
            window.history.back()
        },
        reduceNum(num) {
            let object = {}
            if (num >= 1e6) {
                let units = ["M", "B", "T", "q", "Q"];
                let order = Math.floor((Number(num).toFixed(0).length - 1) / 3) * 3
                let object = {
                    result: String((num / ('1e'+ order)).toFixed(3)),
                    unit: units[Math.floor(order / 3) - 2]
                }
                return object
            } else {
                return num
            }
        },
        filterBalance(num) {
            let reduce = this.reduceNum(num)
            if (typeof reduce === 'string') {
                return String(reduce).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } else {
                return reduce
            }
        },
        filterNumber(num) {
            return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        checkApiVersion(version) {
            if (window.Telegram.WebApp?.isVersionAtLeast(version)) {
                // window.Telegram.WebApp?.HapticFeedback?.impactOccurred('light')
                return true
            } else {
                return false
            }
        }
    }
}