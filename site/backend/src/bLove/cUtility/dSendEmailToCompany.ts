import nodemailer from 'nodemailer'

const sendEmailToCompany = async (option: {
  subject: string,
  text: string
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'soup.beehive.corporation@gmail.com',
        pass: 'icrc kdlc skdy quxp'
      }
    });
  
    const mailOptions = {
      from: "soup.beehive.corporation@gmail.com",
      to: "soup.beehive.corporation@gmail.com",
      subject: option.subject,
      text: option.text
    };
  
    transporter.sendMail(mailOptions, 
      // (error, info) => {
      //   if (error) {
      //     console.log("Some Error")
      //   } else {
      //     console.log("Success")
      //   }
      // }
    );
  } catch (error) {
    console.log("Some Error in Email")
  }
};

export default sendEmailToCompany;
