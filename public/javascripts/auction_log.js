let promise = new Promise(function(resolve, reject) {
    // эта функция выполнится автоматически, при вызове new Promise
    setTimeout(() => resolve("done"), 2000);
});