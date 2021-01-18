/*
 * @Description: 文章模型
 * @Author: MoonCheung
 * @Date: 2019-05-01 16:20:33
 * @Github: https://github.com/MoonCheung
 */

const autoIncrement = require('mongoose-auto-increment');
const autopopulate = require('mongoose-autopopulate');
const mongoose = require('mongoose');
const DB = require('./db');
const Schema = mongoose.Schema;

let CountersSchema = new Schema({
  name: String
});

let ArticleSchema = new Schema({
  id: {
    type: Number,
    ref: 'id'
  },
  // 标题
  title: String,
  // 描述
  desc: String,
  banner: String,
  // 标签数组
  tag: {
    type: [String]
  },
  // 文章内容
  content: String,
  // 分类
  catg: String,
  // 访问数
  pv: {
    type: Number,
    default: 0
  },
  // 评论数组
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      autopopulate: { select: '-_id-__v', options: { sort: { id: -1 } } }
    }
  ],
  // 评论数
  cmt_count: {
    type: Number,
    default: 0
  },
  // 点赞数
  like: {
    type: Number,
    default: 0
  },
  cdate: {
    type: Date,
    default: Date.now
  },
  // 文章转载状态 => 0 原创，1 转载，2 混合
  origin: {
    type: Number,
    default: 0
  },
  // 文章公开状态 => 0 保密， 1 公开
  status: {
    type: Number,
    default: 1
  }
});

ArticleSchema.plugin(autopopulate);
ArticleSchema.plugin(autoIncrement.plugin, {
  model: 'article',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});
CountersSchema.plugin(autoIncrement.plugin, 'id');
module.exports = DB.model('article', ArticleSchema);
