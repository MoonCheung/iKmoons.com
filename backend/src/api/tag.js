/*
 * @Description: 文章标签API
 * @Author: MoonCheung
 * @Github: https://github.com/MoonCheung
 * @Date: 2019-05-14 17:10:40
 * @LastEditors: MoonCheung
 * @LastEditTime: 2019-05-30 17:27:51
 */

import request from '@/utils/request';

export function addTags(param) {
  return request({
    url: '/api/tag/addtag',
    method: 'post',
    data: param
  });
}

export function getTags(param) {
  return request({
    url: '/api/tag/gettag',
    method: 'post',
    data: param
  });
}

export function editTags(param) {
  return request({
    url: '/api/tag/edittag',
    method: 'post',
    data: param
  });
}

export function delTags(param) {
  return request({
    url: '/api/tag/deltag',
    method: 'post',
    data: param
  });
}

export function getAllTags() {
  return request({
    url: '/api/tag/getalltag',
    method: 'get'
  });
}

export function getTagTotals() {
  return request({
    url: '/api/tag/gettagtot',
    method: 'get'
  });
}
