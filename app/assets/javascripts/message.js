$(function() {
  function buildHTML(message) {
      var img = message.image ? `<img src= ${message.image}>` : "";

      var html = `<div class="message" data-message_id="${message.id}">
                  <div class="main__messages__box">
                    <div class="main__messages__box__info">
                    <div class="main__messages__box__info__user-name">
                      ${message.name}
                    </div>
                    <div class="main__messages__box__info__creat-at">
                      ${message.created_at}
                    </div>
                    </div>
                    <div class="main__messages__box__text">
                    <p class="main__messages__box__text__content">
                      ${message.content}
                    </p>
                      ${img}
                    </div>
                    </div>
                  </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.main__messages').append(html);
      $('#new_message')[0].reset();
      $('.main__form__send-btn').prop('disabled', false);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error00');
    });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/[0-9]+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var groups_id = location.href.match(/\/groups\/[0-9]+\//);
      var url = groups_id[0] + "api/messages/";
      var last_message_id = $('.message:last').data('message-id');
      console.log(last_message_id);
      $.ajax({
        url: url, //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        type: 'get', //ルーティングで設定した通りhttpメソッドをgetに指定
        dataType: 'json',
        data: {id: last_message_id}//dataオプションでリクエストに値を含める
      })
      .done(function(messages) {
        var insertHTML = ''; //追加するHTMLの入れ物を作る
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function (message) {
        insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.main__messages').append(insertHTML);//メッセージを追加
        })
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      })
      .fail(function() {
        console.log('error');
      });
    };
  }
  setInterval(reloadMessages, 7000);
});

