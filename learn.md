<!--
先把功能做出來，之後再回頭理解原理、回傳值、各種不同設定值造成的效果等等的細節

之後可以做一個簡易的 react router 切換不同分頁
-->


# 功能
能做到透過 local storage 達成新增、查詢、修改、刪除的功能
- [x] 新增 todo item
- [x] 查詢 todo item
- [x] 修改 todo item
- [x] 刪除 todo item


## 筆記
- 要用 `dispatch` 觸發 slice reducers 內的 function  
  參考： src/pages/todo.tsx


## redux 如何搭配 ts 使用
- [Usage with TypeScript](https://redux.js.org/usage/usage-with-typescript)