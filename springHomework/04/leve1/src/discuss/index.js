import { MakeUrl, PostData,PostDataByToken,SendDataByToken} from "../moudle.js";
import './index.css';
import '../style.css';
import '../tag_top.css';
function restar(){
    let star_point = document.querySelectorAll(".star-point");
    let star = document.querySelectorAll(".star");
    for(let i = 0; i < star_point.length ; i++){
    let points = star_point[i].textContent;
    star[i].style.backgroundPosition = 0+"% " + (100-Math.round(points)*10) + "%"; 
    }
}

restar()
let film_id = window.location.search.substr(1)
let film_box = document.querySelector("#film_box")
async function initialize(){
    let filmrequest =await PostData("/film/getfilm",film_id)
    let filmdata = filmrequest.data
    film_box.children[0].src = filmdata.poster_url
    film_box.children[1].children[0].children[0].textContent = filmdata.name
    film_box.children[1].children[1].textContent = "导演:"+filmdata.directer + " 主演:"+filmdata.screenwriter+" / "+filmdata.location +" / " +filmdata.score+"分("+filmdata.post_num+"人评价)"
    film_box.children[1].children[0].children[0].addEventListener("click",()=>{
        window.location.href = MakeUrl("../review/index.html?film_id="+(parseInt(window.location.search.substr(9))-1))
    })
}
let index = document.querySelector(".index")
index.addEventListener("click",() => {
    window.location.href = MakeUrl("../index/index.html")
})
let addtitle = document.querySelector("#addtitle")
let wirite = document.querySelector("#wirite")
let submit = document.querySelector("#submit")
console.log(film_id)
submit.addEventListener("click",async() => {
    if(addtitle.value != "" && wirite.value !=""){
        let comment_post =await SendDataByToken("/longpost/addlongpost","title="+addtitle.value+"&&"+"txt="+wirite.value+"&&"+film_id+"&&likes=0&&dislikes=0&&score=4.0&&comment_num=0")
        console.log(comment_post)
        
        window.location.href = MakeUrl("/../review/index.html?"+film_id)
    }
})
initialize()