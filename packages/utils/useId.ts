let seed = 0

/**
 * 生成组件实例内唯一的 id，用于 SVG 的 gradient/filter 等需要被引用 id 的场景，
 * 避免多个组件实例因 id 重复而互相串用。模块级计数器保证相同渲染顺序下
 * SSR 与客户端产物一致。
 */
export function useId(prefix = 'yk') {
  return `${prefix}-id-${++seed}`
}
