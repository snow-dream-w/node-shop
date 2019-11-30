const _ = require('lodash')
module.exports = class RecommendService {
    /**
     * //5ddaac06f82d1624e7faa151   推荐的商品ID
     * @param {*倒查表所有数据组成的数组} data 
     * @param {*用户ID} userId 
     * @param {*相似度最高的前n个} n 
     */
    constructor(data, userId, n) {
        this.data = data
        this.userId = userId
        this.n = n
        // 相似度的分子
        this.top = undefined
        // 相似度的分母
        this.bottom = undefined
        // 记录除用户自身外，其他所有用户的ID
        this.userArray = []
        // 作为中间值，记录当前正在进行的其他用户的商品列表
        this.userGoodsTemp = []
        // 记录用户最终相似度列表
        this.similarityList = []
        // 记录用户相似度前n个用户中所有购买的商品与本用户不重复的商品
        this.targetGoods = []
    }
    start() {
        // console.log(this.data)
        // 计算相似度，得出本用户和其他所有用户的相似度分数
        this.getUserArray()
        this.similarityList.sort((a, b) => {
            return b.grade - a.grade
        })
        // 计算目标商品
        this.getTargetGoods()
        // 此时目标商品已存在this.targetGoods中
        // console.log(this.targetGoods)
        return this.targetGoods
    }
    /**
     * 获取目标商品数组
     */
    getTargetGoods() {
        this.n > this.similarityList.length ? this.n = this.similarityList.l : this.n = this.n
        // 截至目前，以获取用户相似度的逆序排序数组，以下为获取前n个相似用户购买的所有商品中本用户没买过的
        for (let index = 0; index < this.n; index++) {
            const element = this.similarityList[index]
            // for (let obj of this.data.values()) {
            //     if (obj.userId === element.userId) {
            //         this.targetGoods.push(obj.goodsId)
            //     }
            // }
            _.filter(this.data, obj => {
                if (obj.userId == element.userId) {
                    this.targetGoods.push(obj.goodsId)
                }
                return obj.userId == element.userId
            })
        }
        // 去掉自身的商品，得到最终目标商品数组
        this.duplicateRemovalGoods()

    }
    /**
     * 去掉自身的商品，得到最终目标商品数组
     */
    duplicateRemovalGoods() {
        // 获取当前用户买过的商品
        const userGoods = _.filter(this.data, obj => {
            return obj.userId == this.userId
        })
        // 删除本用户买过的商品
        for (let obj of userGoods.values()) {
            if (this.targetGoods.includes(obj.goodsId)) {
                this.targetGoods.splice(this.targetGoods.indexOf(obj.goodsId), 1)
            }
        }
    }
    /**
     * 获取除用户自身外其他所有的用户ID
     */
    getUserArray() {
        const data = _.filter(this.data, obj => {
            return obj.userId !== this.userId
        })
        // 获取其他所有用户的ID
        let arrayTemp = []
        for (let index in data) {
            arrayTemp.push(data[index].userId)
        }
        this.userArray = [...(new Set(arrayTemp))]
        // 遍历计算与每个用户的相似度
        for (let index in this.userArray) {
            this.getUserSimilarity(this.userArray[index])
        }
    }
    /**
     * 计算与其他用户的相似度
     */
    getUserSimilarity(otherUserId) {
        const userSelfGoods = _.filter(this.data, obj => {
            return this.userId == obj.userId
        })
        this.filterUserGoods(otherUserId)
        // 计算相似度的分母
        this.bottom = Math.sqrt(userSelfGoods.length * this.userGoodsTemp.length)
        // 记录商品相似的个数
        let count = 0
        userSelfGoods.forEach(ele => {
            for (let index in this.userGoodsTemp) {
                if (ele.goodsId == this.userGoodsTemp[index].goodsId) {
                    // 惩罚热门商品,计算惩罚参数
                    const log = this.filterGoodsById(ele.goodsId)
                    // 可在此处添加weight权重，log * weight
                    count += log
                }
            }
        })
        this.top = count
        const obj = {
            userId: otherUserId,
            grade: this.top / this.bottom
        }
        this.similarityList.push(obj)
    }
    /**
     * 过滤出用户otherUserId的商品列表
     */
    filterUserGoods(otherUserId) {
        this.userGoodsTemp = _.filter(this.data, obj => {
            return obj.userId == otherUserId
        })
    }
    /**
     * 过滤出商品goodsId的商品列表
     */
    filterGoodsById(goodsId) {
        const goods = _.filter(this.data, obj => {
            return obj.goodsId == goodsId
        })
        return 1 / Math.log(1 + goods.length)
    }
}
