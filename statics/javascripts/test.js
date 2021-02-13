let qr_code = $("#qrcode");

qr_code.qrcode({
    width: 200, //寬
    height: 200, //高
    render: "div",
    background: "#FFFFFF", //背景色
    foreground: "#1C3454", //前景色
    //text: asAddress
    text: `https://www.google.com.tw/`
});