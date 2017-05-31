/**
 * Created by john_ on 2017/5/16.
 */
import fetch from 'isomorphic-fetch';
export let postFetch = async (url, body) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:format(body)
    });
    let json = await response.json();
    return json;
  }
  catch (err) {
    console.log(err)
  }
};
//非简单请求用例
export let jsonFetch = async (url, body) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        });
        let json = await response.json();
        return json;
    }
    catch (err) {
        console.log(err)
    }
};

export let formFetch = async (url, body) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      body:formdata(body)
    });
    let json = await response.json();
    return json;
  }
  catch (err) {
    console.log(err)
  }
};
export let getFetch = async (url, body) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    let json = await response.json();
    return json;
  }
  catch (err) {
    console.log(err)
  }
};

let format = (body) => {
  var str = "";
  let name;
  for (name in body) {
    str += name +'='+ body[name]+'&';
  }
  str = str.substr(0,str.length-1);
  return str;
};

let formdata = (body)=>{
  let form = new FormData();
  let name;
  for (name in body) {
    console.log(body[name]);
    form.append(name,body[name]);
  }
  return form;
};
