import { useEffect, useState } from "react";
import axios from 'axios'
import swal from 'sweetalert'
import { cookieFilter } from "../helper";



export default function Home(){

  const API_SUCCESS_MAIL = 'https://confirm-email-1.herokuapp.com/email_success/'
  
  const API_MAIL = "https://send-email-1.herokuapp.com/send_email"
  // const API_MAIL = "http://localhost:8001/send_email"

  const word = window.location.href.split('?jwt=')
  const token = cookieFilter()
  

  const [field,setField] = useState({
    code : '',
    password : '',
    email : '',
    isActive : true ,
  })

  useEffect(() => {
    const render = async () => {
      // console.log('abc');
    if(word !== undefined) {  
      // console.log('abc');      
         if(word[1] !== undefined ){
          await axios.get(API_SUCCESS_MAIL + token[1])    
         }
         
        // console.log(res);
      }   
    }
    window.history.replaceState({},"/form_active/#/email_confirm")
    render();
  }, [word,token])
  

  const onChangeField = (e) => {
    const {name , value} = e.target
    setField({
      ...field,
      [name] : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // console.log(data);
    ///send email
    const res = await axios(API_MAIL , {
      method : 'POST',
      data : field
    })
    // console.log(res);
    if(!res.data.success) {
      if(res.data.confirm === false){
        
        swal({   
          title : 'Bạn muốn thay đổi email ?',      
          text: res.data.message,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willChange)  => {
          if (willChange) {
            const update = field;
            update.confirm = true;        
            const render = async () => {
              const result = await axios(API_MAIL  , {
                method : 'POST',
                data : update,
              })
              console.log(result);
              document.cookie = `jwt_user=${result.data.accessToken}; expires= `
              // window.location.replace("https://hungkhanhnguyen2103.github.io/form_active/#/email_confirm/") 
              window.location.href = "/form_active/#/email_confirm"
              setTimeout(() => {
                window.location.reload()
              }, 500);
              
            }
            render()
          } 
        });
      }
      else return swal(res.data.message);
    }    
    else setTimeout(() => {
        document.cookie = `jwt_user=${res.data.accessToken}; expires= `
        // window.location.replace("https://hungkhanhnguyen2103.github.io/form_active/#/email_confirm/") 
        window.location.href = "/form_active/#/email_confirm"
        setTimeout(() => {
          window.location.reload()
        }, 500);
    }, 100);
    
    // else 
  }

    return(
        <>
        <div className="background" />
        <div className="text"><span>{word[1] !== undefined ? ('Xác thực thành công !') : ('Xin chào !')} </span></div>
        <div className="account">
          <div className="account__sign-up">
            <h4>Học viện bưu chính viễn thông</h4>
            <p>Nhóm 12 HKmychioca </p>
          </div>
          <div className="account__form animaltion-right right " id="sign-up">
            <form onSubmit={handleSubmit} method="POST" className="login sign-up d-block" id="form-login">
              <h3>Đăng ký dịch vụ</h3>
              <input type="text" name="code" className="btn" defaultValue={field.code} onChange={onChangeField} autoFocus required placeholder="Mã sinh viên" /><br />
              <input type="password" name="password" defaultValue={field.password} onChange={onChangeField} className="btn" required placeholder="Mật khẩu" /><br />
              <input type="email" name="email" defaultValue={field.email} onChange={onChangeField} className="btn" required placeholder="Email đăng ký" /><br /><br />
              <input type="submit" value="Đăng ký" className="btn button" />
            </form>  
          </div>
        </div>
        </>
    )
}