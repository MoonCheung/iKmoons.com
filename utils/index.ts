export function originState(param) {
  const mapOrigin = new Map([
    [0, '原创'],
    [1, '转载'],
    [2, '混合']
  ]);
  return mapOrigin.get(param);
}
