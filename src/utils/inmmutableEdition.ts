export function editItemOnList<T>({
  list,
  index,
  newValue,
}: {
  list: T[];
  index: number;
  newValue: T;
}): T[] {
  const updatedList = [...list];

  if (index >= 0) {
    updatedList[index] = newValue;
  }

  return updatedList;
}

export function editItemProperty<T, K extends keyof T>({
  list,
  index,
  property,
  newValue,
}: {
  list: T[];
  index: number;
  property: K;
  newValue: T[K];
}): T[] {
  const updatedList = [...list];

  if (index >= 0 && index < list.length) {
    const updatedItem = { ...updatedList[index] };
    updatedItem[property] = newValue;
    updatedList[index] = updatedItem;
  }

  return updatedList;
}
