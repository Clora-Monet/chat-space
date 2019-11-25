$(function() {
  function buildMessage(message) {
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image){
      var img = message.image ? `<img src= ${ message.image }>` : "";
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
    } else {
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
                    </div>
                  </div>`
    }
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
});