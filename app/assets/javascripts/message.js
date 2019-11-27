$(function() {
  
  function buildMessage(message) {
      var img = message.image ? `<img src= ${message.image}>` : "";
      var html = `<div class="main__messages__box">
                    <div class="main__messages__box__info">
                    <div class="main__messages__box__info__user-name">
                      ${message.name}
                    </div>
                    <div class="main__messages__box__info__creat-at">
                      ${message.date}
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
  var reloadMessages = function() {
    
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('message-id');
    
    groups_id = location.href.match(/\/groups\/([0-9]+)\//);
    url = groups_id[0] + "api/messeges/";
    console.log(url);
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
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
});

