import { scrollTo, Easing } from './scroller';

export function originState(param) {
  const mapOrigin = new Map([
    [0, '原创'],
    [1, '转载'],
    [2, '混合']
  ]);
  return mapOrigin.get(param);
}

export function originColor(param) {
  const mapOrigin = new Map([
    [0, ['--turquoise', '--turquoise-opacity']],
    [1, ['--cyan', '--cyan-opacity']],
    [2, ['--orange', '--orange-opacity']]
  ]);
  return {
    color: `var(${mapOrigin.get(param)?.[0]})`,
    backgroundColor: `var(${mapOrigin.get(param)?.[1]})`
  };
}

export const scrollToTop = () => {
  scrollTo('body', 300, { easing: Easing.easeIn });
};

export const toBottom = () => {
  scrollTo(window.scrollY + window.innerHeight, 300, { easing: Easing.easeIn });
};

/**
 * 开头小写转换大写方法
 * @param param
 * @returns
 */
export const firstUpperCase = ([first, ...rest]) => first?.toUpperCase() + rest.join('');
