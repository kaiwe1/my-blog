import ListItem from "./list-item";

type ListProps<T> = {
  items: T[],
  getKey: (item: T) => string,
  getHref: (item: T) => string,
  getTitle: (item: T) => string,
  getDescription: (item: T) => string
};

function List<T>({ items, getKey, getHref, getTitle, getDescription }: ListProps<T>) {
  return (
    <ul>
      {items.map((item: T) => (
        <ListItem
          key={getKey(item)}
          href={getHref(item)}
          title={getTitle(item)}
          description={getDescription(item)}
        />
      ))}
    </ul>
  );
}

export default List