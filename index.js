import http from "http";
import { Resend } from 'resend';
import { configDotenv } from "dotenv";
configDotenv()


const resend = new Resend(process.env.MAIL_API);

async function sendMailToResendMailAPI(user) {    
  const { data, error } = await resend.emails.send({
    from: `${user.firstName} ${user.lastName} <onboarding@resend.dev>`,
    to: ['delivered@resend.dev'],
    subject: `${user.email}`,
    text: `${user.message}`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};








const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(req.url === "/"){
      res.setHeader("Content-Type", "text/html");
      res.write(`<a href="https://daksh-me.vercel.app/">Go Portfolio</a>`);
      res.end();
    }

    if(req.method === "OPTIONS"){
        res.writeHead(204); // empty response
        return res.end();
    }

    if(req.url === "/send" && req.method === "POST"){
        let userForm = "";
        
        req.on("data", (chunk) => {
            userForm += chunk;
        });

        req.on("end", () => {  
            let mainData = JSON.parse(userForm); 
            sendMailToResendMailAPI(mainData);
            res.end(`${JSON.stringify(mainData)}`)
        });
    }
});

let PORT = 8080;
server.listen(PORT, ()=>{
  console.log("Running Server");
})