const express=require('express')
const dotenv=require('dotenv').config();
const { GoogleGenAI } =require("@google/genai");

const app=express();
const port=3000
app.use(express.json())
const ai = new GoogleGenAI({apiKey:process.env.APIKEY});

app.post('/callai',async (req,res)=>{
 const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `${req.body.content}`,
  });
  
  res.json(response.text)
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

