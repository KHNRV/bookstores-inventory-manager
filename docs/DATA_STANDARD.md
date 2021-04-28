# Data Standards

## Book

```js
{
  id: 1,
  title: "Gone with the Wind",
  isbn_13: "9780446675536",
  author_id: 1
}
```

## Author

```js
{
  id: 1,
  first_name: "Margaret",
  last_name: "Mitchell"
}
```

## Store

```js
{
  id: 1,
  name: "Raffin",
  city: "Montreal"
},
```

## Transaction

### Adding to inventory

```js
{
  id: 1,
  book_id: 2
  store_id: 3
  change: 5
}
```

### Removing from inventory

```js
{
  id: 1,
  book_id: 2
  store_id: 3
  change: -6
}
```
