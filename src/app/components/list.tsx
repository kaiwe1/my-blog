import ListItem from "./list-item";

function List({ items, getKey, getHref, getTitle, getDescription }: {
  items: any[],
  getKey: (item: any) => string,
  getHref: (item: any) => string,
  getTitle: (item: any) => string,
  getDescription: (item: any) => string
}) {
  return (
    <ul>
      {items.map(item => (
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