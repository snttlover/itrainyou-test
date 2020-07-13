## Навигация
Для навигации по приложению используются 2 ивента.
 
```typescript
export const navigatePush = createEvent<Navigate>()
export const navigateReplace = createEvent<Navigate>()
```
При вызове этих ивентов нужно передать объект. 
```typescript
type Navigate = {
  url: string
  query?: QueryParams
}
```
Все урлы это функции, т.е у нас есть именованный роутинг!!!
```typescript
forward({
  from: someEvent.map(_ => ({ url: routeNames.coach(), query: { a: 1, b: 'asd' } })),
  to: navigatePush
})
```
