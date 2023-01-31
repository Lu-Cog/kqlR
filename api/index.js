import request from "@/api/request.js";

/**
 * 订单列表
 *
 */
export function getOrderList(data) {
  return request.get("rider/order_list",data,{noAuth : true});
}

/**
 * 接单
 *
 */
export function getReceOrder(data) {
  return request.get("rider/receiving_order",data,{noAuth : true});
}

/**
 * 接单详情
 *
 */
export function getOrderInfo(data) {
  return request.get("rider/order_info",data,{noAuth : true});
}


/**
 * 获取订单配置
 *
 */
export function getOrderConfig(data) {
  return request.get("order/order_config",data);
}
/**
 * 待执行
 *
 */
export function getExecuted() {
  return request.get("rider/to_be_executed",{},{noAuth : true});
}

/**
 * 送达通知
 *
 */
export function getNotice(data) {
  return request.get("rider/notice",data,{noAuth : true});
}

/**
 * 送达
 *
 */
export function getDelivery(data) {
  return request.get("rider/delivery",data,{noAuth : true});
}

/**
 * 取貨點
 *
 */
export function getStoreList(data) {
  return request.get("rider/store_list",data,{noAuth : true});
}

/**
 * 修改密码
 *
 */
export function updatePwd(data) {
  return request.get("index/rider_password_update",data);
}

/**
 * 獲取用戶信息
 *
 */
export function getUserInfo(data) {
  return request.get("index/getUserInfo",data);
}

/**
 * 條款
 *
 */
export function articleDetail(id) {
  return request.get("article/detail?article_id="+id,{},{noAuth : true});
}

/**
 * 錢包
 *
 */
export function walletList(data) {
  return request.get("rider/the_wallet_list",data);
}



/**
 * 年金
 *
 */
export function yearList(data) {
  return request.get("rider/years_price_list",data);
}

/**
 * 订单扫码绑定瓦斯行
 *
 */
export function getPickUp(data) {
  return request.get("rider/pick_up_the_goods",data);
}
/**
 *修改信息
 *
 */
export function userSave(data) {
  return request.get("index/userSave",data,{noAuth : true});
}
/**
 *賬戶註銷
 *
 */
export function cancelNo(data) {
  return request.get("index/cancel",data,{noAuth : true});
}