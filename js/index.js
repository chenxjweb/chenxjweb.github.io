var $container=$(".container");
var $row=$(".row");
var handler;
function render(data) {
    for (let i = 0; i < data.subjects.length; i++) {
        var html = `
            <div class="col-4 col-sm-4 col-md-3 col-lg-2 col-xl-2" data-id=${data.subjects[i].id}>
                <img src=${data.subjects[i].images.small}>
                <p class="name">${data.subjects[i].title}</p>
                <p class="star">评分：${data.subjects[i].rating.average}</p>
            </div>
    `;
    $row.append(html);
    }
}
function getJSONP(url) {
    if (url.indexOf('?') === -1) {
        url += '?callback=handler';
    } else {
        url += '&callback=handler';
    }
    handler=function (res) {
        try {
            console.log(res);
            render(res);
            // return res;
        } finally {
            script.parentNode.removeChild(script);
        }
    }
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.body.appendChild(script);
}
getJSONP("https://api.douban.com/v2/movie/top250?start=0&count=5");



