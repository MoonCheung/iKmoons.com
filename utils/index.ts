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
    color: `var(${mapOrigin.get(param)[0]})`,
    'backgroundColor': `var(${mapOrigin.get(param)[1]})`
  };
}
