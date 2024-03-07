/**
 * @fileoverview Contains a hacky-helper to find all tabbable nodes
 *  using the virtual-screen-reader.
 */

/**
 * Recursively find the next tabbable node.
 */
export const findNextTabbable = async (virtualInstance, lastNode) => {
  await virtualInstance.next();
  const nextNode = await virtualInstance.activeNode;
  if (nextNode === lastNode) {
    return;
  }
  if (nextNode.tabIndex !== undefined && nextNode.tabIndex !== -1) {
    return nextNode;
  }
  return findNextTabbable(virtualInstance, lastNode);
}

/**
 * Find all tabbable nodes in the virtual instance.
 */
export const findTabbable = async (virtualInstance) => {
  const initNode = await virtualInstance.activeNode;
  
  const nodes = new Set();
  while (true) {
    const nde = await findNextTabbable(virtualInstance, initNode);
    if (nde) {
      nodes.add(nde);
    } else {
      break;
    }
  }
  return Array.from(nodes);
}