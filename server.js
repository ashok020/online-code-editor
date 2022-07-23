const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const exec  = require('child_process').exec;
const app = express()
const port = 3000;
let max_time = 2000;
var lang_map = {
  c :{file_name : 'run.c',needBuild : true,build_cmd : 'gcc run.c -o run_c',run_cmd : 'run_c'},
  cpp : {file_name : 'run.cpp',needBuild : true,build_cmd : 'g++ run.cpp -o run',run_cmd : 'run'},
  py: {file_name : 'run.py',needBuild : false,run_cmd : 'python run.py'},
  js : {file_name : 'run.js',needBuild : false,run_cmd : 'node run.js'}};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.post('/run',async(req,res)=>{
    console.log(req.body);
    await runFile(req.body.code,req.body.input,req.body.lang,res,showOutput);
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

async function saveFile(content,filename)
{
    await fs.writeFile(filename, content, err => {
        if (err) {
            console.error(err);
          return;
        }
      });
}

async function runFile(code,input,lang,res,cb)
{
  let file_name = lang_map[lang].file_name;
  let needBuild = lang_map[lang].needBuild;
  let run_cmd = lang_map[lang].run_cmd;
  await saveFile(code,file_name);
  if(needBuild)
  {
      exec(lang_map[lang].build_cmd,(err)=>{
        if(err) return cb(res,err.message);
        else
        {
          var run = exec(run_cmd,{timeout:max_time},(err)=>{if(err) return cb(res,err.message);});
          run.stdin.setEncoding('utf-8');
          run.stdin.write(input);
          run.stdout.on('data',data => {return cb(res,data)});
          run.stderr.on('data',data => {return cb(res,data)});
          run.stdin.end();
        }
      });
  }
  else
  {
      var run = exec(run_cmd,{timeout:max_time},(err)=>{if(err) return cb(res,err.message);});
      run.stdin.setEncoding('utf-8');
      run.stdin.write(input);
      run.stdout.on('data',data => {return cb(res,data)});
      run.stderr.on('data',data => {return cb(res,data)});
      run.stdin.end();
  }
}

async function showOutput(res,output)
{
  console.log(output);
  res.end(JSON.stringify({output : output}));
}