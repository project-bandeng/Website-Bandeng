// import axios from 'axios';
// import '../App.css';
// import VerifMail from '../Image/check.png';
// import UnverifMail from '../Image/mail.png';

// const EmailVerified = () => {
//     function EmailSuccess() {
//         axios.get('http://localhost:8000/api/v1/email/verify/{id}')
//         .then(function (response) {
//             if (response.status === 200) {
//                 <div className='container-fluid Verified-Container'>
//                     <img src={{VerifMail}} alt="verified-email"/>
//                     <p>response.data</p>
//                 </div>        
//             }
//         })
//         .catch(function (error) {
//             if (error.status === 400) {
//                 <div className='container-fluid Verified-Container'>
//                     <img src={{UnverifMail}} alt="unverified-email"/>
//                     <p>error.message</p>
//                 </div>
//             }
//         });
//     }
//     return (
//         EmailSuccess()
//     );
// }

// export default EmailVerified;