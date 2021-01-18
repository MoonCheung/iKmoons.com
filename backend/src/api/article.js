/*
 * @Description: 文章API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-01 20:49:50
 * @LastEditors: MoonCheung
 * @LastEditTime: 2020-03-21 23:14:04
 */

import request from '@/utils/request';

export function insertArticle(param) {
  return request({
    url: '/api/article/insart',
    method: 'post',
    data: param
  });
}

export function articleList(param) {
  return request({
    url: '/api/article/artlist',
    method: 'post',
    data: param
  });
}

export function editArticle(param) {
  return request({
    url: '/api/article/editart',
    method: 'put',
    data: param
  });
}

export function getArtDetl(param) {
  return request({
    url: '/api/article/getartdetl',
    method: 'post',
    data: param
  });
}

export function delArticle(param) {
  return request({
    url: '/api/article/delart',
    method: 'post',
    data: param
  });
}

export function chgArtStatus(param) {
  return request({
    url: '/api/article/chgartsts',
    method: 'post',
    data: param
  });
}

export function artAllLists() {
  return request({
    url: '/api/article/artalllist',
    method: 'get'
  });
}

export function getPvTotals() {
  return request({
    url: '/api/art/getpvtot',
    method: 'get'
  });
}
