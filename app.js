const express=require('express');
const app=express();
const fs = require('fs');
const  multer=require('multer');
const { TesseractWorker }=require('tesseract.js');
const worker= new TesseractWorker();

const storage=multer.diskStorage({
	destination:(req,file,cd)=>{
		cd(null,"./uploads");
	},
	filename:(req,file,cd)=>{
		cd(null,file.originalname);
		}
	});
	
const upload=multer({ storage:storage }).single("avatar");

app.set('view engine','ejs');

app.get('/',(req,res)=>{
	res.render('index');
});

app.post('/upload',(req,res)=>{
	upload(req,res,err=>{
		fs.readFile(`./uploads/${req.file.originalname}`,(err,data)=>{
			if(err) return console.log('error');
			worker
			  . recognize (data,"eng",{tessjs_create_pdf:'1'})
			   .progress(progress=>{
				  console.log(progress);
				})
			    .then(result=>{
				    res.redirect('/download');
				})
				.finally(()=>{worker.terminate()});
			  
           });
		});
	});

app.get('/download',(req,res)=>{
	const file=`${__dirname}/tesseract.js-ocr-result.pdf`;
	res.download(file);
	});

app.listen(3000,()=> console.log('server is running'));