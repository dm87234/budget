const r=t=>{let e=new RegExp("\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))","g");return t.toString().replace(e,",")},o=t=>/^[0-9]\d*$/.test(t);export{r as f,o as i};
