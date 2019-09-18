let n;

// 'count' という名前で保存されているデータを読み込む
chrome.storage.sync.get(['count'], function(result) {
  if(result.count > 0){
    n = result.count + 1;
  }
  else{ // まだ何も保存されていない場合
    n = 1;
  }

  console.log("tabelog.com 内のページを見たのは" + n + "ページ目です");

  chrome.storage.sync.set({ 'count': n }); // 'count' という名前でデータを保存する
});
