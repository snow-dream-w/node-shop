const _ = require('lodash')
module.exports = class RecommendService {
    /**
     * 构造方法
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
        // 记录用户对筛选出的各商品感兴趣程度
        this.interestedGrade = [];
        // 记录最后的返回结果
        this.result = []
    }
    /**
     * 入口
     */
    start() {
        // 计算相似度，得出本用户和其他所有用户的相似度分数
        this.getUserArray()
        this.similarityList.sort((a, b) => {
            return b.grade - a.grade
        })
        // 计算目标商品
        this.getTargetGoods()
        // 此时目标商品已存在this.targetGoods中, 然后去重
        this.targetGoods = [...new Set(this.targetGoods)]

        // 计算用户对每个商品的感兴趣程度
        for (let goodsId of this.targetGoods.values()) {
            this.getInterestedGrade(goodsId)
        }
        // 计算最终商品列表并逆序排序
        this.getFinalResult()
        console.log(this.result)
        return this.result
    }
    /**
     * 计算最终商品列表并逆序排序
     */
    getFinalResult() {
        this.interestedGrade.sort((a, b) => {
            return b.grade - a.grade
        })
        for (let obj of this.interestedGrade.values()) {
            this.result.push(obj.goodsId)
        }
    }
    /**
     * 计算用户对该商品的感兴趣程度
     * @param {*商品ID} goodsId 
     */
    getInterestedGrade(goodsId) {
        // 筛选出对商品goodsId用过行为的用户
        let array = new Set()
        for (let obj of this.data.values()) {
            if (obj.goodsId === goodsId) {
                array.add(obj.userId)
            }
        }
        const users = [...array]
        // 计算感兴趣程度
        let grade = 0
        for (let userId of users.values()) {
            for (let i = 0; i < this.n; i++) {
                if (userId === this.similarityList[i].userId) {
                    const res = this.getUserSimilarity(userId, this.similarityList[i].userId)
                    grade += res
                }
            }
        }
        // 添加到最终结果
        this.interestedGrade.push({
            goodsId: goodsId,
            grade: grade
        })
    }
    /**
     * 获取目标商品数组
     */
    getTargetGoods() {
        this.n > this.similarityList.length ? this.n = this.similarityList.l : this.n = this.n
        // 截至目前，以获取用户相似度的逆序排序数组，以下为获取前n个相似用户购买的所有商品中本用户没买过的
        for (let index = 0; index < this.n; index++) {
            const element = this.similarityList[index]
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
            this.getUserSimilarity(this.userId, this.userArray[index])
        }
    }
    /**
     * 计算两个用户的相似度
     * @param {*用户ID} userId 
     * @param {*另一个用户ID} otherUserId 
     */
    getUserSimilarity(userId, otherUserId) {
        const userSelfGoods = _.filter(this.data, obj => {
            return userId == obj.userId
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
        return obj.grade
    }
    /**
     * 过滤出用户otherUserId的商品列表
     * @param {用户ID} otherUserId 
     */
    filterUserGoods(otherUserId) {
        this.userGoodsTemp = _.filter(this.data, obj => {
            return obj.userId == otherUserId
        })
    }
    /**
     * 过滤出商品goodsId的商品列表
     * @param {商品ID} goodsId 
     */
    filterGoodsById(goodsId) {
        const goods = _.filter(this.data, obj => {
            return obj.goodsId == goodsId
        })
        return 1 / Math.log(1 + goods.length)
    }
}
