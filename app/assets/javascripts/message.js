$(function() {
  function buildMessage(message) {
      var img = message.image ? `<img src= ${message.image}>` : "";
      var html = `<div class="main__messages__box">
                    <div class="main__messages__box__info">
                    <div class="main__messages__box__info__user-name">
                      ${message.name}
                    </div>
                    <div class="main__messages__box__info__creat-at">
                      ${message.create_at}
                    </div>
                    </div>
                    <div class="main__messages__box__text">
                    <p class="main__messages__box__text__content">
                      ${message.content}
                    </p>
                      ${img}
                    </div>
                  </div>`
    return html;
  }

  var buildHTML = function(message) {
    var html_template = 
      `<div class="message" data-message_id=` + message.id + `>` +
        `<div class="main__messages__box">` +
          `<div class="main__messages__box__info">` +
            `<div class="main__messages__box__info__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="main__messages__box__info__creat-at">` +
              message.created_at +
            `</div>` +
          `</div>`
    if (message.content && message.image.url) {
      //data-idが反映されるようにしている
      var html =  html_template +
        `<div class="main__messages__box__text">` +
          `<p class="main__messages__box__text__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image.url + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = html_template +
        `<div class="main__messages__box__text">` +
          `<p class="main__messages__box__text__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image.url) {
      //同様に、data-idが反映されるようにしている
      var html = html_template +
        `<div class="lower-message">` +
          `<img src="` + message.image.url + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

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
      var html = buildMessage(message);
      $('.main__messages').append(html);
      $('#new_message')[0].reset();
      $('.main__form__send-btn').prop('disabled', false);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error00');
    });
  })

  var last_message_id = $('.message:last').data('message-id');
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/[0-9]+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var groups_id = location.href.match(/\/groups\/[0-9]+\//);
      var url = groups_id[0] + "api/messages/";
      var last_message_id = $('.message:last').data('message-id');
      // console.log(last_message_id)
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: url,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          //メッセージが入ったHTMLを取得
          insertHTML = buildHTML(message);
          //メッセージを追加
          $('.main__messages').append(insertHTML);
        })
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      })
      .fail(function() {
        console.log('error');
      });
    };
  };
  setInterval(reloadMessages, 7000);
});

