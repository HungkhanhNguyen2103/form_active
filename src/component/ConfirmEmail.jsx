import img from '../img/mail.png'

export function ConfirmEmail(){
 
    return (
        <div>
        <div className="error-background" /> 
        <div className="error-container">
          <div className="error-logo"><img src={img} alt="img" /></div>
          <div className="error-message">
            <h3>Xác nhận email !</h3>
            <p>Chúng tôi đã gửi link xác nhận đến email bạn vừa đăng ký . Vui lòng kiểm tra email để xác thực</p>
          </div>
          {/* <div className="error-btn"><a href="/"><button className="btn btn-default">Quay lại trang chủ</button></a></div> */}
        </div>
      </div>
    )
}