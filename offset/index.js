// usage |  $.offset(element).top

const offset = (element) => {
  let result = {
    top: 0,
    left: 0,
  };

  /**
   * 获取元素位置
   * @param {node} node 元素
   * @param {boolean} init
   */
  const getOffset = (node, init) => {
    if (node.nodeType !== 1) {
      return;
    }

    position = window.getComputedStyle(node)["position"];

    if (typeof init === "undefined" && position === "static") {
      getOffset(node.parentNode);
      return;
    }

    result.top = node.offsetTop + result.top - node.scrollTop;
    result.left = node.offsetLeft + result.left - node.scrollLeft;

    if (position === "fixed") {
      return;
    }

    getOffset(node.parentNode);
  };

  if (window.getComputedStyle(element)["display"] === "none") {
    return result;
  }

  let position;

  getOffset(element, true);

  return result;
};

const offset2 = (element) => {
  let result = {
    top: 0,
    left: 0,
  };

  // if version < IE11
  if (!element.getClientRects().length) {
    return result;
  }

  // 如果 DOM 节点满足 display  === 'none' , 则 直接返回  {top: 0, left: 0}
  if (window.getComputedStyle(element)["display"] === "none") {
    return result;
  }

  result = element.getBoundingClientRect();
  const docElement = element.ownerDocument.documentElement;

  return {
    top: result.top + window.scrollY - docElement.clientTop,
    left: result.left + window.scrollX - docElement.clientLeft,
  };
};
