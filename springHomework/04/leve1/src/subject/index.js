import { FormToString, GetData, LoginByToken,LoginChecked,MakeUrl,PostData,submitWantOrWatched} from "../moudle.js";
import './index.css';
import '../style.css';
import '../tag_top.css';
LoginChecked()
function restar(){
    let star_point = document.querySelectorAll(".star-point");
    let star = document.querySelectorAll(".star");
    for(let i = 0; i < star_point.length ; i++){
    let points = star_point[i].textContent;
    star[i].style.backgroundPosition = 0+"% " + (100-Math.round(points)*10) + "%"; 
    }
}

restar()
let c_stars = document.querySelectorAll(".c_stars")
let eva_score = document.querySelector("#eva_score")
let score_ch = ["很差","较差","还行","推荐","力荐"]
for (let i = 0; i < c_stars.length;i++){
    c_stars[i].addEventListener("mouseover",() => {
        for(let k = 0; c_stars.length ; k++){
            if(k <= i){
                c_stars[k].src = "./pictures/subject/staryellow.png"
            }if (k > i){
                c_stars[k].src = "./pictures/subject/star.png"
            }
            eva_score.textContent = score_ch[i]
        }

    })
}
let eva_star = document.querySelector("#eva_star")
function starsOut(){
    for(let i = 0; i < c_stars.length ; i++){
        c_stars[i].src = "./pictures/subject/star.png"
    }
    eva_score.textContent = ""
}
eva_star.addEventListener("mouseout",starsOut)



let c_stars1 = document.querySelectorAll(".c_stars1")
let eva1_score = document.querySelector("#eva1_score")
for (let i = 0; i < c_stars1.length;i++){
    c_stars1[i].addEventListener("mouseover",() => {
        for(let k = 0; c_stars1.length ; k++){
            if(k <= i){
                c_stars1[k].src = "./pictures/subject/staryellow.png"
            }if (k > i){
                c_stars1[k].src = "./pictures/subject/star.png"
            }
            eva1_score.textContent = score_ch[i]
        }

    })
}



let share_to = document.querySelector("#share_to")
let share_box = document.querySelector("#share_box")
share_to.addEventListener("mousedown",() => {
    share_to.style.backgroundColor = "rgb(255,153,51)"
})
share_to.addEventListener("mouseup",() => {
    share_to.style.backgroundColor = ""
})
let upordown = document.querySelector("#upordown")
let share_com = document.querySelector("#share_com")
share_com.style.display = "none"
{
    let flag = 0
    share_to.addEventListener("click", (event) => {
        if(flag == 0){
            share_box.classList.add("share_box_border")
            upordown.textContent = "▲"
            share_com.style.display = "block"
            event.stopPropagation()
            flag = 1
        }else{
            share_box.classList.remove("share_box_border")
            share_com.style.display = "none"
            upordown.textContent = "▼"
            flag = 0
        }
    })
}

document.onclick = function() {
	share_box.classList.remove("share_box_border")
    share_com.style.display = "none"
    upordown.textContent = "▼"
}
let arr = new Array(5).fill(0)
for(let i = 0; i <100 ;i++){
    let num = parseInt(Math.random()*10)%5
    arr[num]++
}
let rect_numscore = document.querySelectorAll(".rect_numscore")
for(let i = 0; i < 5 ;i++){
    rect_numscore[i].innerHTML = arr[i]+parseInt(Math.random()*10)*0.1+"%"
}
let rect_score = document.querySelectorAll(".rect_score")
for(let i = 0 ; i < 5 ; i++){
    rect_score[i].style.width = 6*(arr[i]/100) + "rem"
}
let kinds_than = document.querySelector("#kinds_than")
kinds_than.innerHTML = parseInt(Math.random()*100) + "%"+"<span id='kinds'>null</span>"
let commentboxborder = document.querySelector("#commentboxborder")
let commentbox_close = document.querySelector("#commentbox_close")
commentbox_close.addEventListener("click",()=> {
    commentboxborder.style.display = "none"
})
let writecomment = document.querySelectorAll(".writecomment")
for(let i = 0; i < writecomment.length ; i++){
    writecomment[i].addEventListener("click",() => {
        commentboxborder.style.display = "block"
    })
}
let filmid = parseInt(window.location.search.substr(9))+1
let adddis = document.querySelector("#adddis")
adddis.addEventListener("click",() =>{
    location.href = MakeUrl("/../discuss/index.js?film_id="+(filmid))
})
async function getfilmdata(){
    let film_data = await PostData("/film/getfilm","film_id="+filmid)
    let film = film_data.data
    let film_title = document.querySelector("#film_title")
    let film_pictures = document.querySelector("#film_pictures")
    film_pictures.children[0].src = film.poster_url
    film_title.innerHTML = film.name + "<span>"+film.release_time.substr(0,4)+"</span>"
    let film_mm = document.querySelector("#film_mm")
    film_mm.children[0].children[1].textContent = film.directer
    film_mm.children[1].children[1].textContent = film.screenwriter
    film_mm.children[3].children[1].textContent = film.type
    film_mm.children[4].children[1].textContent = film.location
    film_mm.children[5].children[1].textContent = film.language
    film_mm.children[6].children[1].textContent = film.release_time
    film_mm.children[7].children[1].textContent = film.length
    film_mm.children[8].children[1].textContent = film.other_name
    film_mm.children[9].children[1].textContent = film.imdb
    let score_all = document.querySelector("#score_all")
    score_all.children[1].children[1].textContent = film.score
    let score_big = document.querySelector("#score_big")
    score_big.textContent = film.score
    score_all.children[1].children[1].style.display = "none"
    let eva_numbers = document.querySelector("#eva_numbers")
    eva_numbers.textContent = film.post_num+"人评价"
    restar()
    let file_name = document.querySelectorAll(".file_name")
    for(let i =0; i < file_name.length; i++){
        file_name[i].textContent = film.name
    }
    let plot_information = document.querySelector("#plot_information")
    plot_information.textContent = film.introduction
    let film_actorsee =await PostData("/actor/getactorsbyfilmid","film_id="+filmid)
    let filmActorData = film_actorsee.data
    let film_actors = document.querySelector("#film_actors")
    let actornumbers = document.querySelector("#actornumbers")
    actornumbers.textContent = "全部"+filmActorData.length+"人"
    for(let i = 0; i < filmActorData.length; i++){
        let temp_actor_box = document.createElement("div")
        let temp_actor_img = document.createElement("img")
        let temp_actor_name = document.createElement("div")
        let temp_actor_pos = document.createElement("div")
        temp_actor_img.src = filmActorData[i].picture_url
        temp_actor_pos.textContent = filmActorData[i].role
        let actorMore = await PostData("/actor/searchactor","actor_id="+filmActorData[i].actor_id)
        let actorMoreData = actorMore.data
        temp_actor_name.textContent = actorMoreData.name
        temp_actor_box.classList.add("actor_box")
        temp_actor_img.classList.add("actor_img")
        temp_actor_name.classList.add("actor_name")
        temp_actor_pos.classList.add("actor_pos")
        temp_actor_box.append(temp_actor_img)
        temp_actor_box.append(temp_actor_name)
        temp_actor_box.append(temp_actor_pos)
        film_actors.append(temp_actor_box)
        temp_actor_img.i = i
        temp_actor_img.addEventListener("click",()=>{
            location.href = MakeUrl("/../actor/index.html?actor_id="+filmActorData[temp_actor_img.i].actor_id)
        })
    }
    let discussionRequest =await PostData("/longpost/getlongpostbyfilmid","film_id="+filmid)
    let discussionData = discussionRequest.data
    let discusstion = document.querySelector(".discusstion")

    for(let i = 0; i < discussionData.length; i++){
        let temp_dis_r1 = document.createElement("div")
        temp_dis_r1.classList.add("dis_r1")
        temp_dis_r1.innerHTML = "<div class='dis_title'>null</div><div class='dis_user'>来自<span>null</span></div><div class='dis_time'>null</div>"
        discusstion.append(temp_dis_r1)
    }
    for(let i = 0; i <discussionData.length; i++){
        let dis_r1= document.querySelectorAll(".dis_r1")
        dis_r1[i].children[0].textContent = discussionData[i].title
        dis_r1[i].children[1].children[0].textContent = discussionData[i].username
        dis_r1[i].children[2].textContent = discussionData[i].post_time.substr(0,19)
    }
    let sdadf = document.querySelector(".sdadf")
    sdadf.children[1].textContent = "全部"+discussionData.length+"条"
    let shorcommentRequest =await PostData("/shortpost/getshortpostbyfilmid","film_id="+(filmid-1))
    let shortcomment = shorcommentRequest.data
    let comment = document.querySelector("#comment")
    actornumbers.textContent ="全部"+ shortcomment.length + "条"
    for(let i = 0; i < shortcomment.length ; i++){
        let temp_comment_information = document.createElement("div")
        temp_comment_information.classList.add("comment_information")
        temp_comment_information.innerHTML = "<div class='ci_r1'><div class='username'>null</div>看过<div class='starsAndscore'><span class='star'></span><span class='star-point hinte'>8</span></div><div class='comment_time'>null</div></div><span class='comment_in'>null</span>"
        comment.append(temp_comment_information)
    }
    let comment_information = document.querySelectorAll(".comment_information")
    for(let i = 0; i < comment_information.length;i++){
        comment_information[i].children[0].children[0].textContent = shortcomment[i].username
        comment_information[i].children[0].children[2].textContent = shortcomment[i].post_time.substr(0,10)
        comment_information[i].children[1].textContent = shortcomment[i].txt
    }
    restar()
}
getfilmdata()
for(let i = 0; i <writecomment.length ; i++){
    writecomment[i].addEventListener("click",() =>{
        if(localStorage.getItem("token") == null){
            location.href = MakeUrl("/../index/index.html")
        }
    })
}
adddis.addEventListener("click",() =>{
    if(localStorage.getItem("token") == null){
        location.href = MakeUrl("/../index/index.html")
    }
})
submitWantOrWatched()
